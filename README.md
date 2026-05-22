# Adib Akkari · Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/<NETLIFY_SITE_ID>/deploy-status)](https://app.netlify.com/sites/adib-akkari/deploys)
[![CI](https://github.com/adssib/portfolio/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/adssib/portfolio/actions/workflows/ci.yml)
[![Live](https://img.shields.io/badge/Live-adib--akkari.netlify.app-7c3aed?logo=netlify&logoColor=white)](https://adib-akkari.netlify.app)

Personal portfolio site. Dark, glassy, single-page scroll.

Built with **Next.js 14 (App Router)** · **TypeScript** · **Tailwind CSS** · **shadcn/ui** · **Framer Motion** · **react-icons** · **Geist**.

> **Setup note:** swap `<NETLIFY_SITE_ID>` in the Netlify badge above for the real Site API ID. Find it under **Netlify dashboard → Site configuration → General → Site information → Site ID** (it's a UUID, looks like `12345678-abcd-…`).

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

## CV (LaTeX → PDF)

The "View CV" button in the hero links to `/cv.pdf`. LaTeX source lives in `cv/cv.tex`.

```bash
# requires pdflatex on the host
# WSL/Debian/Ubuntu: sudo apt install texlive-latex-extra texlive-fonts-extra
npm run cv
```

Output is copied to `public/cv.pdf`, served by Next.js (and bundled into the Docker image at build time).

## Project structure

```
.
├─ .github/workflows/ci.yml  # GitHub Actions: typecheck + lint + build on push to master
├─ Dockerfile                # multi-stage build, standalone Next.js output
├─ docker-compose.yml        # `docker compose up` → site on :3000
├─ .dockerignore
├─ cv/
│  ├─ cv.tex                 # LaTeX source for the CV
│  └─ build/                 # pdflatex working dir (gitignored)
├─ scripts/
│  └─ build-cv.sh            # pdflatex + copy to public/cv.pdf
├─ public/
│  └─ cv.pdf                 # generated; served by the "View CV" button
└─ src/
   ├─ app/
   │  ├─ layout.tsx          # Geist fonts, metadata + Open Graph
   │  ├─ page.tsx            # single-page composition
   │  └─ globals.css         # tokens, animated bg keyframes
   ├─ components/
   │  ├─ background.tsx      # aceternity-style animated purple aurora
   │  ├─ nav.tsx
   │  ├─ hero.tsx
   │  ├─ about.tsx
   │  ├─ experience.tsx      # vertical timeline w/ DevOps & Testing subgroups
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

All site content lives in its respective component under `src/components/`. No CMS, edit the file, the dev server hot-reloads. For Docker, rebuild with `docker compose up -d --build`.

## Deploy on Netlify

Stock Next.js 14 app, the official Netlify Next.js Runtime handles everything.

1. Push the repo to GitHub.
2. **Netlify dashboard → Add new site → Import an existing project**, pick this repo.
3. Build settings (auto-detected):
   - **Base directory:** *blank*
   - **Build command:** `npm run build`
   - **Publish directory:** *blank* (the Next.js Runtime sets it)
4. Hit Deploy.

Future pushes to `master` auto-deploy. The CI workflow above runs in parallel to type-check and verify the build before/while Netlify deploys.

Custom domain: **Site configuration → Domains → Add custom domain**. Then update `SITE_URL` in `src/app/layout.tsx` so Open Graph absolute paths resolve correctly.

## CI

`.github/workflows/ci.yml` triggers on `push` to `master` (and manual dispatch). It runs:

- `npm ci`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

If any step fails, the badge goes red and you get a notification — independent of Netlify's own build, so issues are caught even if Netlify's adapter would have masked them.

## Notes

- Dark-mode only. No theme toggle by design.
- Background is a fixed full-viewport animated gradient (SVG goo filter + 5 keyframed blobs + a cursor-following violet glow). Sits behind everything with `pointer-events: none`.
- Sections fade in on scroll once, no re-trigger.
