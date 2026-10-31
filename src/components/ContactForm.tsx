"use client";

import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { owner } from "@/data/portfolio";
import { gmailComposeUrl } from "@/lib/email";

export function ContactForm() {
  const [directDelivery, setDirectDelivery] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [outcome, setOutcome] = useState<"success" | "error" | "gmail" | null>(null);
  const [gmailLink, setGmailLink] = useState("");
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contact", { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data) setDirectDelivery(data.directDelivery === true); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      name: String(values.get("name") ?? "").trim(),
      email: String(values.get("email") ?? "").trim(),
      subject: String(values.get("subject") ?? "").trim(),
      message: String(values.get("message") ?? "").trim(),
      website: String(values.get("website") ?? ""),
    };
    if (payload.name.length < 2 || payload.subject.length < 2 || payload.message.length < 10) {
      setOutcome("error");
      setFeedback("Please add your name, a subject, and a message of at least 10 characters.");
      return;
    }
    const gmailUrl = gmailComposeUrl({
      to: owner.email,
      subject: payload.subject,
      body: `Hi Awais,\n\n${payload.message}\n\nFrom: ${payload.name}\nEmail: ${payload.email}`,
    });
    setGmailLink(gmailUrl);
    setFeedback("");
    setOutcome(null);

    if (!directDelivery) {
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
      setOutcome("gmail");
      setFeedback("Review your message and click Send in Gmail. If Gmail didn’t open, use the link below.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.sent !== true) throw new Error(result.error || "Your message could not be sent. Please try again.");
      setOutcome("success");
      setFeedback("Your message has been sent. Thanks for getting in touch!");
      setGmailLink("");
      form.reset();
    } catch (error) {
      setOutcome("error");
      setFeedback(error instanceof Error && error.name !== "TimeoutError" ? error.message : "Delivery took too long. Try again, or continue in Gmail below.");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => { if (feedback) feedbackRef.current?.focus({ preventScroll: true }); }, [feedback]);

  return <form className="contact-form" onSubmit={submit} aria-label="Contact Awais">
    <div className="form-row">
      <label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="What should I call you?" minLength={2} maxLength={100} required disabled={sending} /></label>
      <label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required disabled={sending} /></label>
    </div>
    <label htmlFor="contact-subject">What’s this about?<input id="contact-subject" name="subject" placeholder="A project, an opportunity, a hello…" minLength={2} maxLength={160} required disabled={sending} /></label>
    <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" placeholder="A little about what you have in mind." rows={4} minLength={10} maxLength={4000} required disabled={sending} /></label>
    <div className="form-trap" aria-hidden="true"><label htmlFor="contact-website">Leave this empty<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-submit-row"><p>{directDelivery ? "Send directly from this form." : "Review and send your message in Gmail. Opens in a new tab."}</p><button type="submit" disabled={sending}>{sending ? <><LoaderCircle className="send-spinner" size={17} />Sending…</> : <>{directDelivery ? "Send message" : "Continue in Gmail"}<ArrowUpRight size={18} /></>}</button></div>
    {feedback && <p ref={feedbackRef} tabIndex={-1} className={`form-feedback ${outcome}`} role={outcome === "error" ? "alert" : "status"}>{outcome === "success" && <Check size={17} />}{feedback}{gmailLink && outcome !== "success" && <a href={gmailLink} target="_blank" rel="noopener noreferrer">{outcome === "gmail" ? "Open Gmail compose" : "Continue in Gmail instead"}<ArrowUpRight size={14} /></a>}</p>}
  </form>;
}
