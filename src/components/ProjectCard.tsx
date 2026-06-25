import { ArrowUpRight, Github, Star } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[8px] border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-4">
        <div>
          {project.featured ? (
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
              <Star className="size-3.5" aria-hidden="true" />
              Featured
            </span>
          ) : null}
          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-cyan-300/15 bg-cyan-300/8 px-3 py-1 text-xs font-medium text-cyan-100"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
        {project.description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        {project.live ? (
          <Link
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            aria-label={`Open live site for ${project.name}`}
          >
            Live
            <ArrowUpRight className="size-4" />
          </Link>
        ) : null}
        {project.github ? (
          <Link
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/7 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            aria-label={`Open GitHub repository for ${project.name}`}
          >
            GitHub
            <Github className="size-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
