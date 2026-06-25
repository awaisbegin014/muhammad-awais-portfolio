import Link from "next/link";

import { owner } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 {owner.name}. Full-stack developer portfolio.</p>
        <div className="flex gap-4">
          <Link
            href={owner.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            LinkedIn
          </Link>
          <Link
            href={owner.github}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
