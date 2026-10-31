import {
  BrainCircuit,
  Award,
  BookOpen,
  Code2,
  Database,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";
import { gmailComposeUrl } from "@/lib/email";

export type NavItem = {
  label: string;
  href: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

export type Experience = {
  role: string;
  organization: string;
  date: string;
  highlights: string[];
};

export type Project = {
  name: string;
  tech: string[];
  description: string[];
  live?: string;
  github?: string;
  featured?: boolean;
};

export type Education = {
  degree: string;
  institute: string;
  years: string;
  score: string;
};

export const owner = {
  name: "Muhammad Awais",
  location: "Karachi, Pakistan",
  email: "awaisshaikhcs786@gmail.com",
  phone: "+92-327-2726270",
  linkedin: "https://linkedin.com/in/muhammad-awais",
  github: "https://github.com/codexbegin14",
  headline: "Full-Stack Web Developer",
  summary:
    "Full-stack developer and final-year Computer Science student experienced in client websites, internal business systems, and multi-tenant applications. Delivered five full-stack client websites and built an internal CRM end to end. Combines React and Next.js, Node.js, and Django development with AI/ML skills and recommendation-system experience.",
  heroLine:
    "I build client websites, internal business systems, and multi-tenant applications across the full stack - from polished React and Next.js interfaces to Node.js and Django APIs, databases, deployment, and AI-powered features.",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: owner.email,
    href: gmailComposeUrl({ to: owner.email }),
    icon: Mail,
  },
  {
    label: "Phone",
    value: owner.phone,
    href: "tel:+923272726270",
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/muhammad-awais",
    href: owner.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/codexbegin14",
    href: owner.github,
    icon: Github,
  },
  {
    label: "Location",
    value: owner.location,
    href: "https://maps.google.com/?q=Karachi%2C%20Pakistan",
    icon: MapPin,
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "Python", "C", "C++", "SQL"],
  },
  {
    title: "Frontend",
    icon: Globe2,
    skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "Django REST Framework", "ASP.NET Core", "REST APIs"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase"],
  },
  {
    title: "AI / Machine Learning",
    icon: BrainCircuit,
    skills: ["LLM Fine-tuning", "Deep Learning", "Recommender Systems", "Pandas", "Scikit-learn"],
  },
  {
    title: "Tools",
    icon: TerminalSquare,
    skills: ["Git", "GitHub Actions", "Docker", "Linux", "Vercel", "Render", "WordPress"],
  },
];

export const experiences: Experience[] = [
  {
    role: "Full-Stack Developer (Full-Time)",
    organization: "Yellow Solutions",
    date: "Jul 2026 - Present",
    highlights: [
      "Built an internal CRM end to end, implementing the frontend and backend for in-house project management and data tracking.",
      "Delivered five full-stack client websites and currently work on five client projects, developing features and tailoring functionality to client requirements.",
      "Maintained and enhanced Yellow Tools, Yellow Agency, and yellowsolutions.pk, and contributed to a learning management system.",
    ],
  },
  {
    role: "Developer Intern (Remote)",
    organization: "Auton8",
    date: "Aug 2026 - Sep 2026",
    highlights: [
      "Developed frontend and backend features for an internal workflow-recording application that captures and saves step-by-step actions for automated testing.",
      "Built reusable Next.js components and Node.js/Express REST APIs to store and retrieve workflow data in MongoDB.",
    ],
  },
  {
    role: "Full-Stack Developer (Contract)",
    organization: "BoxTech - Dubai, UAE (Remote)",
    date: "Apr 2026 - Jun 2026",
    highlights: [
      "Developed a multi-tenant truck-tracking system with isolated data access and tenant-specific workflows for multiple client organizations.",
      "Designed PostgreSQL schemas and REST APIs for fleet tracking and reporting, and built an AI chatbot backend with conversation management, message storage, and API integrations.",
    ],
  },
  {
    role: "Head",
    organization: "Guilty by Data - FAST NUCES",
    date: "Jan 2026 - June 2026",
    highlights: [
      "Led Guilty by Data, an investigative data-driven contest for ACM Developers' Day, with participation from students across different universities.",
      "Designed and developed the contest platform, including participant login, timed rounds, leaderboard tracking, admin workflows, question design, and dataset preparation.",
    ],
  },
  {
    role: "Co-Head",
    organization: "CodeSprint - FAST NUCES",
    date: "March 2025 - January 2026",
    highlights: [
      "Co-led development of a full-stack platform for a university coding competition, enabling smooth participant registration, contest management, problem access, and a live scoreboard with real-time result tracking.",
    ],
  },
  {
    role: "Head of Workshop Team",
    organization: "GitHub Society, FAST NUCES",
    date: "Aug 2024 - Present",
    highlights: [
      "Led hands-on workshops on Git and GitHub workflows, collaborative development practices, and effective use of GitHub Copilot.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "ApplyWise",
    tech: [".NET 10", "ASP.NET Core MVC", "C#", "Entity Framework Core", "SQL Server", "Bootstrap 5"],
    featured: true,
    live: "https://applywise.runasp.net",
    github: "https://github.com/codexbegin14/ApplyWise",
    description: [
      "Built a private job-search workspace that connects application tracking, resume versions, interviews, reminders, and performance analytics in one per-user dashboard.",
      "Implemented explainable ATS and job-match scoring, best-resume recommendations, an A4 PDF resume builder, and rule-based job-post risk checks with secure identity and private file storage.",
    ],
  },
  {
    name: "FORKED NUCES",
    tech: ["Next.js", "Django REST Framework", "PostgreSQL", "Redis", "Docker"],
    featured: true,
    live: "https://forked-nuces.vercel.app",
    github: "https://github.com/codexbegin14/FORKED-NUCES",
    description: [
      "Built the platform end to end for FAST-NUCES students to register, publish projects, and raise issues for open-source contributions.",
      "Enabled students to browse project issues, contribute solutions, and collaborate on resolving them.",
    ],
  },
  {
    name: "Investment Recommendation System",
    tech: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    github: "https://github.com/codexbegin14/Investment-Recommendation-System",
    description: [
      "Combined collaborative SVD, content-based, and demographic and risk filtering to personalize stock and fund recommendations.",
      "Integrated weighted scoring and an interactive Streamlit interface to rank investments based on user profiles and preferences.",
    ],
  },
  {
    name: "Guilty by Data",
    tech: ["React.js", "Supabase", "Vercel"],
    featured: true,
    live: "https://guilty-by-data.vercel.app/",
    description: [
      "Designed data-analysis questions and built the competition platform for participants to access challenges and submit solutions.",
      "Implemented scoring, participant leaderboards, and an admin dashboard to manage questions and competition content.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "B.S. Computer Science",
    institute: "FAST-NUCES, Karachi",
    years: "2023 - 2027 (Expected)",
    score: "CGPA: 3.12 / 4.00",
  },
  {
    degree: "Intermediate",
    institute: "Cadet College Petaro",
    years: "2020 - 2022",
    score: "Percentage: 90%",
  },
  {
    degree: "Matriculation",
    institute: "Cadet College Petaro",
    years: "2018 - 2020",
    score: "Percentage: 84%",
  },
];

export const awards = [
  {
    title: "Coder Cup Runner-up in Batch",
    source: "FAST University",
    icon: Award,
  },
  {
    title: "Runner-up, Vibe Coding Competition",
    source: "FAST University",
    icon: Code2,
  },
  {
    title: "Best Reader",
    source: "Cadet College Petaro",
    icon: BookOpen,
  },
];
