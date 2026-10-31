type GmailMessage = {
  to: string;
  subject?: string;
  body?: string;
};

/** Open Gmail on the web instead of invoking the device's default mail app. */
export function gmailComposeUrl({ to, subject, body }: GmailMessage) {
  const parameters = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) parameters.set("su", subject);
  if (body) parameters.set("body", body);
  return `https://mail.google.com/mail/?${parameters.toString()}`;
}
