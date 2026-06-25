# Muhammad Awais Portfolio

A modern, responsive portfolio website for Muhammad Awais, a Computer Science student at FAST National University and full-stack developer focused on clean systems, practical workflows, and real-world problem solving.

## Overview

This portfolio presents Muhammad Awais through a polished dark interface inspired by FAST NUCES colors: deep navy, soft gray, controlled cyan accents, and subtle gold highlights. The site is designed to feel professional, futuristic, readable, and easy to maintain.

## Features

- Responsive hero section with profile image and intro copy
- About section focused on full-stack development and problem solving
- Grouped skills and technologies
- Project showcase with tech badges, live links, and GitHub links
- Experience timeline for FAST NUCES leadership and workshops
- Education and honors sections
- Contact section with email, phone, LinkedIn, GitHub, and location links
- Subtle Framer Motion animations
- SEO metadata and Open Graph configuration
- Vercel-ready deployment configuration

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- Vercel

## Project Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    Contact.tsx
    EducationCard.tsx
    ExperienceTimeline.tsx
    Footer.tsx
    Hero.tsx
    Motion.tsx
    Navbar.tsx
    ProjectCard.tsx
    SectionTitle.tsx
    SkillCard.tsx
  data/
    portfolio.ts
public/
  profile.jpg
  resume.pdf
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment

The project is ready for Vercel deployment.

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the framework preset as Next.js.
4. Deploy using the default build command:

```bash
npm run build
```

## Portfolio Data

All portfolio content is stored in:

```text
src/data/portfolio.ts
```

Update this file to edit personal details, skills, projects, education, experience, awards, and contact links.

## Assets

- Profile image: `public/profile.jpg`
- Resume PDF: `public/resume.pdf`

## Contact

- Email: [awaisshaikhcs786@gmail.com](mailto:awaisshaikhcs786@gmail.com)
- LinkedIn: [linkedin.com/in/muhammad-awais](https://linkedin.com/in/muhammad-awais)
- GitHub: [github.com/codexbegin14](https://github.com/codexbegin14)

---

Built with care for a clean, professional full-stack developer portfolio.
