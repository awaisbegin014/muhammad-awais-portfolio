import { GraduationCap } from "lucide-react";

import type { Education } from "@/data/portfolio";

type EducationCardProps = {
  item: Education;
};

export function EducationCard({ item }: EducationCardProps) {
  return (
    <article className="rounded-[8px] border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-[8px] border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
          <GraduationCap className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
          <p className="mt-1 text-sm text-slate-300">{item.institute}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1 text-xs font-medium text-slate-200">
          {item.years}
        </span>
        <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
          {item.score}
        </span>
      </div>
    </article>
  );
}
