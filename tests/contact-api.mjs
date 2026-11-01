import assert from "node:assert/strict";
import fs from "node:fs";
import Module from "node:module";
import path from "node:path";
import { test } from "node:test";
import ts from "typescript";

const valid = {
  name: "Test Visitor",
  email: "visitor+portfolio@example.com",
  subject: "A project & an opportunity",
  message: "First line: hello & welcome.\nSecond line: a project proposal.",
  website: "",
};

function loadRoute() {
  const filename = path.resolve("src/app/api/contact/route.ts");
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  loaded._compile(code, filename);
  return loaded.exports;
}

function request(body = valid, headers = {}) {
  return new Request("https://portfolio.example/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://portfolio.example", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("direct contact delivery", async (t) => {
  const oldKey = process.env.RESEND_API_KEY;
  const oldFrom = process.env.CONTACT_FROM_EMAIL;
  t.after(() => {
    if (oldKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = oldKey;
    if (oldFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = oldFrom;
  });
  t.mock.method(console, "error", () => {});
  const provider = t.mock.method(globalThis, "fetch", async () => Response.json({ id: "mock-message-id" }));

  await t.test("missing or blank credentials report unavailable without sending", async () => {
    const { GET, POST } = loadRoute();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;
    assert.equal((await (await GET()).json()).directDelivery, false);
    const unavailable = await POST(request());
    assert.equal(unavailable.status, 503);
    assert.match((await unavailable.json()).error, /has not been sent/);
    process.env.RESEND_API_KEY = " ";
    process.env.CONTACT_FROM_EMAIL = " ";
    assert.equal((await (await GET()).json()).directDelivery, false);
    assert.equal((await POST(request())).status, 503);
    assert.equal(provider.mock.callCount(), 0);
  });

  process.env.RESEND_API_KEY = "test-key-not-a-real-credential";
  process.env.CONTACT_FROM_EMAIL = "Portfolio <contact@example.com>";

  await t.test("invalid requests never reach the email provider", async () => {
    const { POST } = loadRoute();
    for (const body of ["{", "null", "[]", {}, { ...valid, email: "bad" },
      { ...valid, website: "spam" }, { ...valid, subject: "hi\r\nBcc: another@example.com" },
      { ...valid, name: "a" }, { ...valid, message: "a".repeat(4001) }]) {
      assert.equal((await POST(request(body))).status, 400);
    }
    assert.equal((await POST(request(valid, { origin: "https://other.example" }))).status, 403);
    assert.equal((await POST(request(valid, { "content-type": "text/plain" }))).status, 415);
    assert.equal((await POST(request("x".repeat(16001)))).status, 413);
    assert.equal(provider.mock.callCount(), 0);
  });

  await t.test("sends to the owner's inbox with the visitor as reply-to", async () => {
    const { GET, POST } = loadRoute();
    assert.equal((await (await GET()).json()).directDelivery, true);
    const response = await POST(request({ ...valid, to: "attacker@example.com" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { sent: true });
    const [url, options] = provider.mock.calls.at(-1).arguments;
    assert.equal(url, "https://api.resend.com/emails");
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.to, ["awaisshaikhcs786@gmail.com"]);
    assert.equal(payload.from, process.env.CONTACT_FROM_EMAIL);
    assert.equal(payload.reply_to, valid.email);
    assert.equal(payload.subject, `Portfolio: ${valid.subject}`);
    assert.equal(payload.text, `From: ${valid.name}\nEmail: ${valid.email}\n\n${valid.message}`);
  });

  await t.test("provider rejection and invalid acknowledgements never claim success", async () => {
    const { POST } = loadRoute();
    for (const result of [{ id: "" }, { sent: true }, null]) {
      provider.mock.mockImplementation(async () => Response.json(result));
      const response = await POST(request());
      assert.equal(response.status, 502);
      assert.equal((await response.json()).sent, undefined);
    }
    provider.mock.mockImplementation(async () => Response.json({ message: "rejected" }, { status: 403 }));
    assert.equal((await POST(request())).status, 502);
  });

  await t.test("network failures and non-JSON provider responses remain errors", async () => {
    const { POST } = loadRoute();
    provider.mock.mockImplementation(async () => { throw new Error("network unavailable"); });
    assert.equal((await POST(request())).status, 502);
    provider.mock.mockImplementation(async () => new Response("Bad gateway", { status: 502 }));
    assert.equal((await POST(request())).status, 502);
  });

  await t.test("throttles repeat submissions before contacting the provider", async () => {
    const { POST } = loadRoute();
    provider.mock.mockImplementation(async () => Response.json({ id: "mock-message-id" }));
    for (let count = 0; count < 4; count++) assert.equal((await POST(request())).status, 200);
    const callsBefore = provider.mock.callCount();
    const limited = await POST(request());
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get("retry-after"), "600");
    assert.equal(provider.mock.callCount(), callsBefore);
  });
});
