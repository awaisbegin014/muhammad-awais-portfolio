import { ArrowUpRight, Send } from "lucide-react";
import Link from "next/link";

import { contactLinks, owner } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Build the next thing</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Open to full-stack development work, university collaborations, and problem-solving
            projects that need clean execution.
          </p>
          <Link
            href={`mailto:${owner.email}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
          >
            Send Email
            <Send className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {contactLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group rounded-[8px] border border-white/10 bg-slate-950/35 p-4 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-950/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                aria-label={`${link.label}: ${link.value}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-[8px] border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="size-4 text-slate-500 transition group-hover:text-cyan-200" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">{link.label}</p>
                <p className="mt-1 break-words text-sm font-medium text-slate-100">{link.value}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
