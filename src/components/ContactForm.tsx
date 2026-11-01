"use client";

import { Check, LoaderCircle, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [outcome, setOutcome] = useState<"success" | "error" | null>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  const submittingRef = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
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
    setFeedback("");
    setOutcome(null);
    submittingRef.current = true;
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.sent !== true) {
        setOutcome("error");
        setFeedback(typeof result?.error === "string" ? result.error : "Your message could not be sent. Please try again shortly.");
        return;
      }
      setOutcome("success");
      setFeedback("Your message has been sent. Thanks for getting in touch!");
      form.reset();
    } catch (error) {
      setOutcome("error");
      setFeedback(error instanceof Error && error.name === "TimeoutError"
        ? "Sending took too long to confirm. Your message is still here; please wait a moment before trying again."
        : "Unable to connect. Please check your connection and try again. Your message is still here.");
    } finally {
      submittingRef.current = false;
      setSending(false);
    }
  }

  useEffect(() => { if (feedback) feedbackRef.current?.focus({ preventScroll: true }); }, [feedback]);

  return <form className="contact-form" onSubmit={submit} aria-label="Contact Awais" aria-busy={sending}>
    <div className="form-row">
      <label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="What should I call you?" minLength={2} maxLength={100} required disabled={sending} /></label>
      <label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required disabled={sending} /></label>
    </div>
    <label htmlFor="contact-subject">What’s this about?<input id="contact-subject" name="subject" placeholder="A project, an opportunity, a hello…" minLength={2} maxLength={160} required disabled={sending} /></label>
    <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" placeholder="A little about what you have in mind." rows={4} minLength={10} maxLength={4000} required disabled={sending} /></label>
    <div className="form-trap" aria-hidden="true"><label htmlFor="contact-website">Leave this empty<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-submit-row"><p>Send your message straight to my inbox.</p><button type="submit" disabled={sending}>{sending ? <><LoaderCircle className="send-spinner" size={17} aria-hidden="true" />Sending…</> : <>Send email<Send size={18} aria-hidden="true" /></>}</button></div>
    {feedback && <p ref={feedbackRef} tabIndex={-1} className={`form-feedback ${outcome}`} role={outcome === "error" ? "alert" : "status"}>{outcome === "success" && <Check size={17} aria-hidden="true" />}{feedback}</p>}
  </form>;
}
