# Muhammad Awais Portfolio

A modern, responsive portfolio website for Muhammad Awais, a Computer Science student at FAST National University and full-stack developer focused on clean systems, practical workflows, and real-world problem solving.

## Overview

An editorial, single-page portfolio with warm paper, ink, and rust colors, larger typography, screen-sized desktop chapters, and responsive mobile layouts. Introduction, project screenshots, work, experience, background, and contact appear in one continuous page. Motion includes section reveals, a floating portrait, project transitions, and a reading-progress line, with reduced-motion support.

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

## Portfolio design and walkthroughs

The homepage uses a warm paper, ink, and rust palette with an editorial layout. The active implementation is in `src/components/Portfolio.tsx`, with interactive project walkthroughs in `src/components/ProjectDemo.tsx` and responsive styles in `src/app/globals.css`.

The Interface views use the owner's supplied screenshots of FORKED NUCES, ApplyWise, and Guilty by Data, stored in `public/projects/`. Screenshots keep their full aspect ratio and can be opened at full size. Each project also links to its live product or source repository. The interactive “Under the hood” controls explain the documented technology and workflows.

The portfolio supports keyboard navigation, reduced motion preferences, responsive mobile navigation, expandable experience details, and email copying. The résumé is served from `public/resume.pdf`.

## Page sections

- `/#home`: introduction and links to work and contact
- `/#work`: switch between project screenshots and interactive system overviews
- `/#experience`: professional roles and community leadership
- `/#about`: personal background
- `/#skills`: dedicated skills and technologies section with six readable groups
- `/#education`: dedicated academic background and honors section
- `/#contact`: contact form, email, phone, and social links

Navigation scrolls to each section and highlights the section currently in view. Project screenshots and the project switcher appear in the Work section. Older `/work`, `/experience`, `/about`, and `/contact` URLs redirect to their section anchors.

The main page components are in `src/components/Portfolio.tsx`. Typography and screen-layout refinements are in `src/app/refinements.css`.

## Email delivery

Without server credentials, the contact form uses Gmail on the web. The visitor completes the fields and chooses **Continue in Gmail**, which opens a new tab with the recipient, subject, name, email, and message filled in. The visitor reviews the message and clicks **Send** in Gmail; Gmail may ask them to sign in first. This does not invoke Outlook or the device's default email app. Opening Gmail does not claim the email was sent. A visible compose link remains available if the browser blocks the new tab.

For direct server-side email delivery:

1. Copy `.env.example` to `.env.local`.
2. Set `RESEND_API_KEY` to your own Resend API key.
3. Set `CONTACT_FROM_EMAIL` to a sender address on a verified domain in your Resend account.
4. Restart the development server. For deployment, add the same variables to your hosting environment.

The form detects readiness through `GET /api/contact` and switches to direct sending automatically. The API only sends to `awaisshaikhcs786@gmail.com`, uses the visitor's address for replies, validates inputs, limits message length, rejects cross-origin browser submissions and honeypot values, and applies best-effort in-memory throttling per server instance. For larger traffic, use a shared distributed rate limiter. Credentials stay on the server.

The provider request follows the [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email). Without configured credentials, direct delivery returns an explicit unavailable response. Delivery errors preserve the form and offer a prefilled Gmail compose link. All portfolio email links open Gmail explicitly. They use a shared URL builder in `src/lib/email.ts` so special characters and line breaks are encoded correctly.

### Editing content

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
