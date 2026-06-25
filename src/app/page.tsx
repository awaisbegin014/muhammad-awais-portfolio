import { Award } from "lucide-react";

import { EducationCard } from "@/components/EducationCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { MotionDiv } from "@/components/Motion";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillCard } from "@/components/SkillCard";
import { awards, education, experiences, owner, projects, skillGroups } from "@/data/portfolio";

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

      <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Projects"
            title="Featured builds with real workflows"
            description="Project cards focus on deployed systems, user flows, and engineering choices instead of visual noise."
          />
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="grid gap-5 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </MotionDiv>
        </div>
      </section>

      <section id="experience" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Experience"
            title="Leadership through platforms and workshops"
            description="A timeline of technical leadership across university contests, developer societies, and data-driven event systems."
          />
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
          >
            <ExperienceTimeline items={experiences} />
          </MotionDiv>
        </div>
      </section>

      <section id="education" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Education"
            title="Academic foundation"
            description="Computer Science studies at FAST National University supported by a disciplined pre-university academic track."
          />
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="grid gap-5 md:grid-cols-3"
          >
            {education.map((item) => (
              <EducationCard key={`${item.degree}-${item.years}`} item={item} />
            ))}
          </MotionDiv>
        </div>
      </section>

      <section id="awards" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Honors"
            title="Recognition across coding and academics"
            description="A concise record of awards reflecting competitive programming interest, rapid building, and academic discipline."
          />
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="grid gap-5 md:grid-cols-3"
          >
            {awards.map((award) => {
              const Icon = award.icon ?? Award;

              return (
                <article
                  key={award.title}
                  className="rounded-[8px] border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/[0.07]"
                >
                  <span className="grid size-11 place-items-center rounded-[8px] border border-amber-300/25 bg-amber-300/10 text-amber-100">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{award.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{award.source}</p>
                </article>
              );
            })}
          </MotionDiv>
        </div>
      </section>
    </main>
  );
}
