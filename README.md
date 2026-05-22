# Adib Akkari — Portfolio

Personal portfolio site. Dark, glassy, single-page scroll.

Built with **Next.js 14 (App Router)** · **TypeScript** · **Tailwind CSS** · **shadcn/ui** · **Framer Motion** · **Lucide** · **Geist**.

## Local development

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        # root layout, Geist fonts, metadata + OG
│  ├─ page.tsx          # single-page composition of all sections
│  └─ globals.css       # tokens, dark theme, noise texture, gradient text
├─ components/
│  ├─ nav.tsx           # sticky blurred top nav
│  ├─ hero.tsx          # ambient aurora + intro
│  ├─ about.tsx         # bio + stat cards
│  ├─ experience.tsx    # vertical timeline
│  ├─ projects.tsx      # AskDB featured card
│  ├─ skills.tsx        # 5-category grid
│  ├─ certifications.tsx
│  ├─ contact.tsx       # email / GitHub / LinkedIn
│  ├─ section.tsx       # shared section wrapper w/ fade-in-up
│  └─ ui/               # shadcn primitives: button, card, badge
└─ lib/utils.ts         # cn() helper
```

## Editing content

All site content (experience, projects, skills, certifications, contact links) is colocated in its respective component under `src/components/`. There is no CMS — edit the file, save, the dev server hot-reloads.

## Deploy on Vercel

This is a stock Next.js 14 app, no extra config needed.

1. Push the repo to GitHub.
2. Import the project at <https://vercel.com/new>.
3. Framework preset: **Next.js** (auto-detected). Build command, install command, and output directory all default-correct.
4. Hit **Deploy**.

For a custom domain, add it under *Project Settings → Domains*.

Update `SITE_URL` in `src/app/layout.tsx` once the production URL is known so Open Graph absolute paths resolve correctly.

## Notes

- Dark mode only — no theme toggle by design.
- Sections fade in on scroll once (no re-trigger).
- Aurora glow and noise overlay are purely decorative.
