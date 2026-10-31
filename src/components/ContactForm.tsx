"use client";

import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { owner } from "@/data/portfolio";

export function ContactForm() {
  const [directDelivery, setDirectDelivery] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [outcome, setOutcome] = useState<"success" | "error" | "draft" | null>(null);
  const [draftLink, setDraftLink] = useState("");
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
    if (payload.name.length < 2 || payload.message.length < 10) {
      setOutcome("error");
      setFeedback("Please add your name and a message of at least 10 characters.");
      return;
    }
    const emailDraft = `mailto:${owner.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(`Hi Awais,\n\n${payload.message}\n\nFrom: ${payload.name}\nEmail: ${payload.email}`)}`;
    setDraftLink(emailDraft);
    setFeedback("");
    setOutcome(null);

    if (!directDelivery) {
      window.location.href = emailDraft;
      setOutcome("draft");
      setFeedback("Your email draft is ready. Send it from your email app to finish.");
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
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      setOutcome("success");
      setFeedback("Your message has been sent. Thanks for getting in touch!");
      setDraftLink("");
      form.reset();
    } catch (error) {
      setOutcome("error");
      setFeedback(error instanceof Error && error.name !== "TimeoutError" ? error.message : "Delivery took too long. Try again, or use the email draft below.");
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
    <div className="form-submit-row"><p>{directDelivery ? "Your message goes straight to my inbox." : "Opens your email app with your message filled in."}</p><button type="submit" disabled={sending}>{sending ? <><LoaderCircle className="send-spinner" size={17} />Sending…</> : <>{directDelivery ? "Send message" : "Open email draft"}<ArrowUpRight size={18} /></>}</button></div>
    {feedback && <p ref={feedbackRef} tabIndex={-1} className={`form-feedback ${outcome}`} role={outcome === "error" ? "alert" : "status"}>{outcome === "success" && <Check size={17} />}{feedback}{draftLink && outcome !== "success" && <a href={draftLink}>{outcome === "draft" ? "Open draft again" : "Use an email draft instead"}<ArrowUpRight size={14} /></a>}</p>}
  </form>;
}
