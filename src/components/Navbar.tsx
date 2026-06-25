"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { navItems, owner } from "@/data/portfolio";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050a14]/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link
          href="#home"
          className="group inline-flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          onClick={closeMenu}
        >
          <span className="grid size-10 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 font-mono text-sm font-bold text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.22)]">
            MA
          </span>
          <span className="hidden text-sm font-semibold text-white sm:inline">{owner.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/resume.pdf"
          target="_blank"
          className="hidden rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200/70 hover:bg-amber-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 lg:inline-flex"
        >
          Resume
        </Link>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#050a14]/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/resume.pdf"
              target="_blank"
              onClick={closeMenu}
              className="mt-2 rounded-2xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              Download Resume
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
