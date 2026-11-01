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
npm run test:contact
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

Visitors fill in the contact form and click **Send email**. The form posts to `POST /api/contact`, which sends the email through Resend on the server. Visitors stay on the portfolio and do not need Gmail, an email app, or a Resend account. The button shows a sending state, and the form clears only after the provider accepts the email. Errors preserve the visitor's message and allow another attempt.

For direct server-side email delivery:

1. Create a [Resend API key](https://resend.com/api-keys) and [verify your sending domain](https://resend.com/domains).
2. For local development, copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`.
3. Set `CONTACT_FROM_EMAIL` to a sender on that verified domain, for example `Muhammad Awais Portfolio <contact@your-verified-domain.com>`. Do not use the visitor's address or your Gmail inbox as this sender.
4. Restart the development server after setting these variables.
5. For Vercel, open the project's **Settings → Environment Variables**, add both values for the environments you use (Production and, if needed, Preview), then redeploy. Local `.env.local` values are not automatically available in production.
6. Submit a message from the deployed form and check `awaisshaikhcs786@gmail.com`, including Spam, to confirm delivery. Provider acceptance alone cannot guarantee inbox placement.

The form always submits directly to the server. `GET /api/contact` remains available as a configuration readiness check; `directDelivery: true` means both server variables are present, not that their credentials or deliverability have been verified. Missing configuration returns HTTP 503 with an honest error and never opens Gmail or claims success. Server logs identify missing configuration and provider rejection status without exposing credentials or message contents.

The API only sends to `awaisshaikhcs786@gmail.com`, uses the visitor's address for replies, validates inputs, limits message length, rejects cross-origin browser submissions and honeypot values, and applies best-effort in-memory throttling per server instance. For larger traffic, use a shared distributed rate limiter. Credentials stay on the server and must never use a `NEXT_PUBLIC_` prefix or be committed to Git.

The provider request follows the [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email). The separate email-address links still offer Gmail compose through `src/lib/email.ts`; the contact form never uses them.

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
