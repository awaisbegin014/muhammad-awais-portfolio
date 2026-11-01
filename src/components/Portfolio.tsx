"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, CheckCircle2, CircleDot, Copy, Database, FileSearch, Github, GitPullRequest, GraduationCap, Layers3, LockKeyhole, Maximize2, Menu, Minus, Play, Plus, Radio, Search, Send, ShieldCheck, Sparkles, Timer, Trophy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { gmailComposeUrl } from "@/lib/email";
import { awards, education, experiences, owner, projects, skillGroups, type Project } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";
import forkedScreenshot from "../../public/projects/forked.png";
import applywiseScreenshot from "../../public/projects/applywise.png";
import guiltyScreenshot from "../../public/projects/guilty.png";

const projectStories = [
  {
    name: "FORKED NUCES",
    slug: "forked",
    screenshot: forkedScreenshot,
    number: "01",
    category: "OPEN SOURCE / COMMUNITY",
    title: "Good projects deserve\na second pair of hands.",
    intro: "A verified FAST community for publishing projects and finding open issues.",
    caption: "A home for student-built software.",
    focus: "End-to-end platform development",
    systemStyle: "community",
    systemEyebrow: "CONTRIBUTION LOOP",
    systemTitle: "An open issue becomes shared credit.",
    systemStatus: "LIVE ON AWS + VERCEL",
    system: [
      { name: "Discover", label: "POSTGRESQL VIEWS", icon: Search, text: "Ranked views surface trending, skill-matched, and open-issue projects." },
      { name: "Pick an issue", label: "NEXT.JS + DRF", icon: CircleDot, text: "Verified students browse projects and choose an issue through the Next.js and Django stack." },
      { name: "Ship together", label: "ATOMIC WORKFLOW", icon: GitPullRequest, text: "Closing an issue records every contributor in one atomic operation." },
      { name: "Earn credit", label: "CONTRIBUTOR RANKING", icon: Trophy, text: "Completed work updates activity stats and contributor rankings." },
    ],
  },
  {
    name: "ApplyWise",
    slug: "applywise",
    screenshot: applywiseScreenshot,
    number: "02",
    category: "PRODUCT / JOB SEARCH",
    title: "The job search,\nwith fewer loose ends.",
    intro: "Applications, résumé versions, and interviews in one private workspace.",
    caption: "Less spreadsheet juggling. More clarity.",
    focus: "Product development & application workflows",
    systemStyle: "analysis",
    systemEyebrow: "PRIVATE EVIDENCE PIPELINE",
    systemTitle: "A résumé enters. Evidence comes out.",
    systemStatus: "DETERMINISTIC ATS V3",
    system: [
      { name: "Track", label: "ASP.NET MVC", icon: Database, text: "Each role stays connected to its deadline, interviews, notes, and submitted résumé." },
      { name: "Inspect", label: "PDFPIG + OPEN XML", icon: FileSearch, text: "Bounded workers extract text and inspect PDF or DOCX structure." },
      { name: "Score locally", label: "ATS V3 RULE ENGINE", icon: Sparkles, text: "Deterministic rules calculate readiness and job match from real evidence." },
      { name: "Explain", label: "EVIDENCE REPORT", icon: ShieldCheck, text: "The report shows matched requirements, gaps, confidence, and scoring history." },
    ],
  },
  {
    name: "Guilty by Data",
    slug: "guilty",
    screenshot: guiltyScreenshot,
    number: "03",
    category: "COMPETITION / DATA ANALYSIS",
    title: "A little mystery.\nA lot of data.",
    intro: "A live data competition for timed challenges, submissions, and standings.",
    caption: "Built for the people behind the leaderboard.",
    focus: "Platform development & competition design",
    systemStyle: "realtime",
    systemEyebrow: "REALTIME COMPETITION CIRCUIT",
    systemTitle: "One clock. One submission. Live standings.",
    systemStatus: "SUPABASE REALTIME",
    system: [
      { name: "Control", label: "ADMIN CONSOLE", icon: Play, text: "Admins publish questions, open rounds, and control timers." },
      { name: "Investigate", label: "REACT + LOCAL DRAFT", icon: Timer, text: "Teams solve each round while answers save locally." },
      { name: "Submit once", label: "VERCEL API", icon: Send, text: "The server verifies the team before accepting one final submission." },
      { name: "Score atomically", label: "SUPABASE RPC", icon: CheckCircle2, text: "One transaction validates timing, scores answers, and updates standings." },
      { name: "Broadcast", label: "REALTIME CHANNEL", icon: Radio, text: "Realtime events refresh every connected leaderboard." },
    ],
  },
];

type Story = (typeof projectStories)[number];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useMotionPreference();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigation = [["Home", "home"], ["Work", "work"], ["Experience", "experience"], ["About", "about"], ["Skills", "skills"], ["Education", "education"], ["Contact", "contact"]];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    for (const id of ["home", "work", "experience", "about", "skills", "education", "contact"]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return <header className="site-header">
    <div className="site-nav page-width">
      <a href="#home" className="nav-name" aria-label="Muhammad Awais, home" onClick={() => setOpen(false)}>Muhammad Awais</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setActiveSection(id)}>{label}</a>)}
      </nav>
      <a className="resume-link" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a>
      <button className="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">{navigation.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => { setOpen(false); setActiveSection(id); }}>{label}<ArrowUpRight size={18} /></a>)}</nav>}
  </header>;
}

function Hero() {
  const reduceMotion = useMotionPreference();
  return <section className="hero page-width" id="home">
    <div className="hero-kicker"><span className="eyebrow">FULL-STACK DEVELOPER</span><span className="location"><span className="location-dot" />Karachi, Pakistan</span></div>
    <div className="hero-main">
      <div className="hero-copy">
        <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>Useful things.<br />Built with <em>care.</em></motion.h1>
        <p className="hero-description">I build websites and the systems behind them. From student ideas to tools people use at work.</p>
        <div className="hero-actions"><a href="#work" className="button button-dark">Explore my work <ArrowDownRight size={19} /></a><a href="#contact" className="text-link">Let’s talk <ArrowUpRight size={17} /></a></div>
      </div>
      <div className="hero-aside">
        <motion.div className="portrait-wrap" animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} whileHover={reduceMotion ? {} : { scale: 1.025 }}><Image className="hero-portrait" src="/profile.jpg" width={400} height={400} priority alt="Muhammad Awais" /></motion.div>
        <div className="currently"><span className="eyebrow">CURRENTLY</span><p>Building at <a href="#experience">Yellow Solutions <ArrowUpRight size={13} /></a><br /><span>Final-year CS @ FAST–NUCES</span></p></div>
      </div>
    </div>
  </section>;
}

function SystemPreview({ story, step, onStepChange }: { story: Story; step: number; onStepChange: (index: number) => void }) {
  const activeNode = story.system[step];
  const ActiveIcon = activeNode.icon;

  const nodeButton = (node: Story["system"][number], index: number, className = "") => {
    const Icon = node.icon;
    return <button key={node.name} type="button" className={`${className}${step === index ? " active" : ""}`} aria-pressed={step === index} onClick={() => onStepChange(index)}>
      <span className="system-node-icon"><Icon size={16} strokeWidth={1.8} /></span>
      <span className="system-node-copy"><strong>{node.name}</strong><small>{node.label}</small></span>
      <span className="system-node-index">0{index + 1}</span>
    </button>;
  };

  return <div className={`system-preview system-${story.systemStyle}`}>
    <div className="system-topline"><span>{story.systemEyebrow}</span><span className="system-live"><i />{story.systemStatus}</span></div>
    <div className="system-intro"><h4>{story.systemTitle}</h4><div className="system-inline-detail" aria-live="polite"><span className="system-inline-icon"><ActiveIcon size={17} /></span><div><span className="eyebrow">0{step + 1} / {activeNode.label}</span><p>{activeNode.text}</p></div></div></div>

    {story.systemStyle === "community" && <div className="community-map" aria-label="FORKED NUCES contribution loop">
      <div className="community-orbit" aria-hidden="true"><span>PROJECT</span><strong>Open issue</strong><small>needs a contributor</small></div>
      <div className="community-route">{story.system.map((node, index) => nodeButton(node, index, `community-stop stop-${index}`))}</div>
      <span className="community-return" aria-hidden="true">credit improves discovery <ArrowRight size={13} /></span>
    </div>}

    {story.systemStyle === "analysis" && <div className="analysis-map" aria-label="ApplyWise private analysis pipeline">
      <div className="analysis-inputs"><span><FileSearch size={14} />Résumé file</span><span><Database size={14} />Job description</span></div>
      <div className="analysis-merge"><span>PRIVATE, TENANT-SCOPED INPUT</span></div>
      <div className="analysis-pipeline">{story.system.map((node, index) => <div className="analysis-stage" key={node.name}>{nodeButton(node, index)}{index < story.system.length - 1 && <ArrowRight size={15} className="analysis-arrow" />}</div>)}</div>
      <div className="analysis-vault"><LockKeyhole size={15} /><strong>Private storage boundary</strong><span>EF Core · SQL Server · files outside the public web root</span></div>
    </div>}

    {story.systemStyle === "realtime" && <div className="realtime-map" aria-label="Guilty by Data realtime competition circuit">
      <div className="realtime-admin"><span className="realtime-lane-label">ADMIN LANE</span>{nodeButton(story.system[0], 0)}<span className="admin-signal"><ArrowDownRight size={14} /> opens round</span></div>
      <div className="realtime-circuit"><span className="realtime-lane-label">TEAM + SERVER LANE</span><div className="realtime-stages">{story.system.slice(1).map((node, offset) => {
        const index = offset + 1;
        return <div className="realtime-stage" key={node.name}>{nodeButton(node, index)}{index < story.system.length - 1 && <ArrowRight size={14} className="realtime-arrow" />}</div>;
      })}</div></div>
      <div className="realtime-return"><Radio size={14} /><span>safe database changes stream back to every connected scoreboard</span></div>
    </div>}

  </div>;
}

function ProjectStory({ story, project }: { story: Story; project: Project }) {
  const [view, setView] = useState<"interface" | "system">("interface");
  const [step, setStep] = useState(0);
  return <article className={`project-story project-${story.slug}`} aria-labelledby={`${story.slug}-title`}>
    <div className="project-text">
      <div className="project-meta"><span>{story.number}</span><span className="eyebrow">{story.category}</span></div>
      <h3 id={`${story.slug}-title`}>{story.title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h3>
      <p className="project-intro">{story.intro}</p>
      <div className="project-role"><span className="eyebrow">MY PART</span><p>{story.focus}</p></div>
      <ul className="project-stack" aria-label="Technologies">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <div className="project-links">{project.live && <a className="text-link" href={project.live} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={16} /><span className="sr-only">: {project.name}</span></a>}{project.github && <a className="source-link" href={project.github} target="_blank" rel="noreferrer"><Github size={16} /><span>Source</span><span className="sr-only">: {project.name}</span></a>}</div>
    </div>
    <div className="project-visual">
      <div className="project-viewbar"><div className="view-switch" role="group" aria-label={`${project.name} preview view`}><button aria-pressed={view === "interface"} onClick={() => setView("interface")}>Interface</button><button aria-pressed={view === "system"} onClick={() => setView("system")}><Layers3 size={13} /> Under the hood</button></div></div>
      <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className={`project-stage${view === "system" ? " system-active" : " screenshot-active"}`}>
        {view === "interface" ? <a className="project-interface-preview" href={story.screenshot.src} target="_blank" rel="noreferrer" aria-label={`View full-size ${project.name} screenshot`}><Image src={story.screenshot} alt={`${project.name} website interface`} sizes="(max-width: 800px) calc(100vw - 40px), 750px" quality={90} className="project-interface-image" /><span className="screenshot-expand"><Maximize2 size={14} />View full size</span></a> : <SystemPreview story={story} step={step} onStepChange={setStep} />}
      </motion.div>
    </div>
  </article>;
}

function Work({ selected, onSelect }: { selected: number; onSelect: (index: number) => void }) {
  const investment = projects.find(project => project.name === "Investment Recommendation System")!;
  const reduceMotion = useMotionPreference();
  const story = projectStories[selected];
  return <section id="work" className="work-section section-space">
    <div className="page-width">
      <Reveal className="section-heading"><div><span className="eyebrow section-label">01 / SELECTED WORK</span><h2 className="page-heading">Made to be <em>used.</em></h2></div></Reveal>
      <div className="project-picker" role="group" aria-label="Choose a project">{projectStories.map((item, index) => <button key={item.slug} aria-pressed={selected === index} aria-controls="selected-project" onClick={() => onSelect(index)}><span>{item.number}</span>{item.name}<ArrowUpRight size={15} /></button>)}</div>
      <div className="project-list" id="selected-project"><AnimatePresence mode="wait" initial={false}><motion.div key={story.slug} initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }} transition={{ duration: 0.22 }}><ProjectStory story={story} project={projects.find(project => project.name === story.name)!} /></motion.div></AnimatePresence></div>
      <a className="more-project" href={investment.github} target="_blank" rel="noreferrer"><div className="more-project-icon"><span /><span /><span /><span /><span /></div><div><span className="eyebrow">PYTHON & MACHINE LEARNING</span><h3>Investment Recommendation System</h3><p>Personalized recommendations built in Streamlit.</p></div><ArrowUpRight size={27} className="more-project-arrow" /><span className="sr-only">View GitHub repository</span></a>
    </div>
  </section>;
}

function ExperienceList({ start, end }: { start: number; end?: number }) {
  return <div className="experience-list">{experiences.slice(start, end).map((item, index) => <details className="experience-row" key={item.organization}><summary><span className="experience-index">0{start + index + 1}</span><div className="experience-title"><h3>{item.organization.replace(" - FAST NUCES", "").replace(" - Dubai, UAE (Remote)", "")}</h3><p>{item.role}{item.organization.includes("BoxTech") && " · Dubai, UAE / Remote"}</p></div><span className="experience-date">{item.date.replace("June", "Jun").replace("March", "Mar").replace("January", "Jan")}</span><span className="experience-toggle"><Plus size={18} className="open-icon" /><Minus size={18} className="close-icon" /></span></summary><div className="experience-body"><ul>{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></div></details>)}</div>;
}

function ExperienceSection() {
  return <section id="experience" className="experience-chapters"><div className="experience-section screen-panel page-width"><Reveal><div className="section-heading"><div><span className="eyebrow section-label">02 / EXPERIENCE</span><h2 className="page-heading">Where I’ve<br /><em>put in the work.</em></h2></div><p>Products, platforms, and teams.</p></div><ExperienceList start={0} end={3} /></Reveal></div><div className="community-section screen-panel page-width"><Reveal><div className="section-heading"><div><span className="eyebrow section-label">02.1 / COMMUNITY</span><h2>Built together.<br /><em>Learned together.</em></h2></div><p>Competitions, workshops, and open source.</p></div><ExperienceList start={3} /></Reveal></div></section>;
}

function About() {
  return <section id="about" className="about-section"><div className="about-intro-section screen-panel page-width"><Reveal>
    <div className="about-top"><div><span className="eyebrow section-label">03 / ABOUT</span><h2 className="page-heading">A little<br /><em>background.</em></h2></div><div className="about-copy"><p>Computer Science student at FAST–NUCES, graduating in 2027.</p><p>I build full-stack products and community platforms with clear, useful workflows.</p><a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-link">View résumé <ArrowUpRight size={17} /></a></div></div>
    </Reveal></div></section>;
}

function SkillsSection() {
  return <section id="skills" className="skills-section" aria-labelledby="skills-heading">
    <div className="page-width">
      <Reveal className="section-heading"><div><span className="eyebrow section-label">04 / SKILLS</span><h2 id="skills-heading">Skills &<br /><em>technologies.</em></h2></div></Reveal>
      <Reveal className="skills-groups">{skillGroups.map(group => {
        const Icon = group.icon;
        return <article className="skills-group" key={group.title} aria-label={group.title}>
          <h3><Icon size={22} aria-hidden="true" />{group.title}</h3>
          <ul className="skills-list">{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </article>;
      })}</Reveal>
    </div>
  </section>;
}

function EducationAndHonors() {
  return <section id="education" className="education-section" aria-labelledby="education-heading">
    <div className="page-width">
      <Reveal className="section-heading"><div><span className="eyebrow section-label">05 / EDUCATION & HONORS</span><h2 id="education-heading">Education &<br /><em>recognition.</em></h2></div></Reveal>
      <Reveal className="education-layout">
        <div className="academic-column"><h3 className="education-column-heading"><GraduationCap size={21} />Academic background</h3><div className="academic-entries">{education.map((item, index) => <article className="academic-entry" key={item.degree}><span className="academic-number">0{index + 1}</span><div><h4>{item.degree}</h4><p>{item.institute}</p><div className="academic-meta"><span>{item.years}</span><span className="academic-result">{item.score}</span></div></div></article>)}</div></div>
        <div className="honors-column"><h3 className="education-column-heading">Honors & awards</h3><div className="honor-entries">{awards.map(award => { const Icon = award.icon; return <article className="honor-entry" key={award.title}><span className="honor-icon"><Icon size={20} aria-hidden="true" /></span><div><h4>{award.title}</h4><p>{award.source}</p></div></article>; })}</div></div>
      </Reveal>
    </div>
  </section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(owner.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch { window.open(gmailComposeUrl({ to: owner.email }), "_blank", "noopener,noreferrer"); }
  }
  return <section id="contact" className="contact-section"><div className="page-width">
    <div className="contact-top"><span className="eyebrow section-label">06 / CONTACT</span></div>
    <Reveal className="contact-layout"><div><h2><a className="contact-headline" href="#contact-name">Have something<br />in <em>mind?</em><ArrowUpRight aria-hidden="true" /></a></h2></div><ContactForm /></Reveal>
    <div className="contact-bottom"><div className="email-group"><a href={gmailComposeUrl({ to: owner.email })} target="_blank" rel="noopener noreferrer" aria-label={`Email ${owner.email} using Gmail`}>{owner.email}</a><button onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email address"}>{copied ? <Check size={17} /> : <Copy size={17} />}</button><span role="status" className="copy-status">{copied ? "Copied!" : ""}</span></div><div className="social-links"><a href={owner.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href={owner.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a><a href="tel:+923272726270">Call <ArrowUpRight size={15} /></a></div></div>
    <div className="footer-baseline"><span>© {new Date().getFullYear()} Muhammad Awais</span><a href="#main-content">BACK TO TOP <ArrowUpRight size={13} /></a></div>
  </div></section>;
}

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const reduceMotion = useMotionPreference();
  return <MotionConfig reducedMotion="user"><a href="#main-content" className="skip-link">Skip to content</a><motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" /><Navigation /><motion.main id="main-content" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}><Hero /><Work selected={selectedProject} onSelect={setSelectedProject} /><ExperienceSection /><About /><SkillsSection /><EducationAndHonors /><Contact /></motion.main></MotionConfig>;
}
