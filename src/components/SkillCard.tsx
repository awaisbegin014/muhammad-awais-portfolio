import type { SkillGroup } from "@/data/portfolio";

type SkillCardProps = {
  group: SkillGroup;
};

export function SkillCard({ group }: SkillCardProps) {
  const Icon = group.icon;

  return (
    <article className="group rounded-[8px] border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.07]">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-[8px] border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-white">{group.title}</h3>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5 text-xs font-medium text-slate-200 transition group-hover:border-cyan-300/20"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
