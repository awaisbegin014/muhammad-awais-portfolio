import { Hero } from "@/components/Hero";
import { MotionDiv } from "@/components/Motion";
import { Navbar } from "@/components/Navbar";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillCard } from "@/components/SkillCard";
import { owner, skillGroups } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050a14] text-white">
      <Navbar />
      <Hero />

      <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="About"
            title="A developer shaped by systems, contests, and clean execution"
            description={owner.summary}
          />
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="grid gap-5 md:grid-cols-2"
          >
            {[
              {
                title: "Full-stack builder",
                text: "Designs practical web systems with clear user flows, reliable backend logic, and deployment-ready polish. Comfortable moving across the interface, API, database, and deployment layers to turn an idea into a working product.",
                points: [
                  "Builds responsive interfaces with React, Next.js, and Tailwind CSS.",
                  "Connects APIs, authentication flows, databases, and admin workflows.",
                  "Ships with Git, Docker, Vercel, and clean project structure in mind.",
                ],
              },
              {
                title: "Problem solver",
                text: "Works from messy requirements toward structured workflows, useful abstractions, and measurable outcomes. Enjoys breaking larger problems into smaller decisions, testing assumptions, and keeping systems understandable.",
                points: [
                  "Turns contest and platform requirements into usable workflows.",
                  "Focuses on timed rounds, scoreboards, dashboards, and collaboration logic.",
                  "Writes code that is easier to review, debug, and extend later.",
                ],
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </MotionDiv>
        </div>
      </section>

      <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Skills"
            title="A compact stack for modern web systems"
            description="Core tools grouped for quick scanning, from language fundamentals to deployment and collaboration."
          />
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
          >
            {skillGroups.map((group) => (
              <SkillCard key={group.title} group={group} />
            ))}
          </MotionDiv>
        </div>
      </section>
    </main>
  );
}
