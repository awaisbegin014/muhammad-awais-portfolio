import type { Experience } from "@/data/portfolio";

type ExperienceTimelineProps = {
  items: Experience[];
};

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300/50 via-white/15 to-transparent sm:block" />
      <div className="space-y-6">
        {items.map((item, index) => (
          <article
            key={`${item.role}-${item.organization}`}
            className="relative rounded-[8px] border border-white/10 bg-white/[0.045] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.07] sm:ml-12 sm:p-6"
          >
            <span className="absolute -left-[2.72rem] top-7 hidden size-4 rounded-full border-2 border-cyan-200 bg-[#07111f] shadow-[0_0_24px_rgba(34,211,238,0.5)] sm:block" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.role}</h3>
                <p className="mt-1 text-sm font-medium text-slate-300">{item.organization}</p>
              </div>
              <p className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                {item.date}
              </p>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-3 size-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
