# Adib Akkari · Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/9091909e-b7ce-457d-be0c-f2fa8ef83256/deploy-status)](https://app.netlify.com/projects/adib-akkari/deploys)
[![Live](https://img.shields.io/badge/Live-adib--akkari.netlify.app-7c3aed?logo=netlify&logoColor=white)](https://adib-akkari.netlify.app)

Personal portfolio site. Dark, glassy, single-page scroll, animated starfield background.

Built with **Next.js 14 (App Router)** · **TypeScript** · **Tailwind CSS** · **shadcn/ui** · **Framer Motion** · **react-icons** · **Geist**.


---

## One-command run (Docker)

```bash
docker compose up -d --build
```

Then open <http://localhost:3000>. To stop: `docker compose down`.

Image is multi-stage, built off `node:20-alpine`, uses Next.js `standalone` output → final image around ~180 MB. Runs as non-root, exposes port 3000.

## Local dev (no Docker)

```bash
npm install
npm run dev
```

## CV

The "View CV" button in the hero links to `/cv.pdf`. Drop your PDF at `public/cv.pdf` and Next.js serves it statically. No build step.

## Project structure

```
.
├─ Dockerfile                # multi-stage build, standalone Next.js output
├─ docker-compose.yml        # `docker compose up` → site on :3000
├─ .dockerignore
├─ public/cv.pdf             # served by the "View CV" button (add your own)
└─ src/
   ├─ app/
   │  ├─ layout.tsx          # Geist fonts, metadata + Open Graph
   │  ├─ page.tsx            # single-page composition
   │  └─ globals.css         # tokens, twinkle + shooting-star keyframes
   ├─ components/
   │  ├─ background.tsx      # starfield + shooting stars
   │  ├─ nav.tsx
   │  ├─ hero.tsx
   │  ├─ about.tsx
   │  ├─ experience.tsx      # vertical timeline, DevOps & Testing subgroups
   │  ├─ projects.tsx        # AskDB card (under-construction badge)
   │  ├─ certifications.tsx  # expandable cards with sub-courses
   │  ├─ skills.tsx          # brand-icon chip grid
   │  ├─ contact.tsx
   │  ├─ section.tsx         # shared wrapper with fade-in-up
   │  ├─ brand-icons.tsx     # inline SVGs (GitHub, LinkedIn, PowerShell)
   │  └─ ui/                 # shadcn primitives: button, card, badge
   └─ lib/utils.ts
```

## Editing content

All content lives in its respective component under `src/components/`. No CMS, edit the file, the dev server hot-reloads. For Docker, rebuild with `docker compose up -d --build`.

## Deploy on Netlify

Stock Next.js 14 app, the official Netlify Next.js Runtime handles everything.

1. Push the repo to GitHub.
2. **Netlify dashboard → Add new site → Import an existing project**, pick this repo.
3. Build settings (auto-detected):
   - **Base directory:** *blank*
   - **Build command:** `npm run build`
   - **Publish directory:** *blank* (the Next.js Runtime sets it)
4. Hit Deploy.

Future pushes to `master` auto-deploy. Custom domain: **Site configuration → Domains → Add custom domain**, then update `SITE_URL` in `src/app/layout.tsx` so Open Graph absolute paths resolve correctly.

## Notes

- Dark-mode only. No theme toggle by design.
- Background is a fixed full-viewport starfield (~90 twinkling dots + 3 shooting stars). Sits behind everything with `pointer-events: none`. Cheap on CPU/GPU.
- Sections fade in on scroll once, no re-trigger.
