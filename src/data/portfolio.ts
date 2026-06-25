import {
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
  headline: "Computer Science Student & Full-Stack Developer",
  summary:
    "Computer Science junior with a strong grasp of modern web technologies, passionate about writing clean, efficient code that solves real-world problems. Experienced in building web applications and continuously learning to improve system design and development practices.",
  heroLine:
    "Computer Science junior with a strong grasp of modern web technologies, passionate about writing clean, efficient code that solves real-world problems. Experienced in building web applications and continuously learning to improve system design and development practices",
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
    href: `mailto:${owner.email}`,
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
    skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Figma"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "Django REST Framework", ".NET Framework", "Supabase", "Redis"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase"],
  },
  {
    title: "Tools",
    icon: TerminalSquare,
    skills: ["Git", "GitHub Actions", "Linux Debian", "Docker", "Bash Scripting", "Vercel"],
  },
];

export const experiences: Experience[] = [
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
    name: "FORKED NUCES",
    tech: ["Next.js", "Python", "Django REST Framework", "PostgreSQL", "Redis", "Docker"],
    featured: true,
    live: "https://forked-nuces.vercel.app",
    github: "https://github.com/codexbegin14/FORKED-NUCES",
    description: [
      "Developed a community-driven platform for FAST-NUCES students enabling NU-domain verified users to open-source their projects within the university and collaborate across batches.",
      "Enabled students to complete stalled projects by connecting them with skill-matched collaborators.",
    ],
  },
  {
    name: "Investment Recommendation System",
    tech: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    github: "https://github.com/codexbegin14/Investment-Recommendation-System",
    description: [
      "Developed a recommendation system that suggests stocks and funds to invest in based on user preferences using content-based and user-based filtering techniques.",
      "Integrated financial datasets and built portfolio recommendations with interactive visualizations for investment insights.",
    ],
  },
  {
    name: "Guilty by Data",
    tech: ["React.js", "Supabase", "Vercel"],
    featured: true,
    live: "https://guilty-by-data.vercel.app/",
    description: [
      "Built a full-stack investigative competition platform with participant login, three structured rounds, timed challenges, round-wise progression, and leaderboard tracking.",
      "Developed an admin dashboard for inserting questions and managing contest content, paired with an immersive investigative interface for a mystery-solving experience.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "B.S. Computer Science",
    institute: "FAST National University",
    years: "2023 - 2027",
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
