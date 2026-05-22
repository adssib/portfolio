# Adib Akkari · Portfolio

Personal portfolio site. Dark, glassy, single-page scroll.

Built with **Next.js 14 (App Router)** · **TypeScript** · **Tailwind CSS** · **shadcn/ui** · **Framer Motion** · **react-icons** · **Geist**.

---

## One-command run (Docker)

```bash
docker compose up -d --build
```

Then open <http://localhost:3000>. To stop: `docker compose down`.

Image is multi-stage, built off `node:20-alpine`, uses Next.js `standalone` output → final image around ~180 MB. Runs as non-root, exposes port 3000.

Equivalent raw Docker:

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Local dev (no Docker)

```bash
npm install
npm run dev
```

## CV (LaTeX → PDF)

The "View CV" button in the hero links to `/cv.pdf`. The LaTeX source lives in `cv/cv.tex`.

```bash
# requires pdflatex on the host
# WSL/Debian/Ubuntu: sudo apt install texlive-latex-extra texlive-fonts-extra
npm run cv
```

Output is copied to `public/cv.pdf`, which is then served by Next.js (and bundled into the Docker image at build time).

## Project structure

```
.
├─ Dockerfile              # multi-stage build, standalone Next.js output
├─ docker-compose.yml      # `docker compose up` → site on :3000
├─ .dockerignore
├─ cv/
│  ├─ cv.tex               # LaTeX source for the CV
│  └─ build/               # pdflatex working dir (gitignored)
├─ scripts/
│  └─ build-cv.sh          # pdflatex + copy to public/cv.pdf
├─ public/
│  └─ cv.pdf               # generated; served by the "View CV" button
└─ src/
   ├─ app/
   │  ├─ layout.tsx        # Geist fonts, metadata + Open Graph
   │  ├─ page.tsx          # single-page composition
   │  └─ globals.css       # tokens, animated bg keyframes
   ├─ components/
   │  ├─ background.tsx    # aceternity-style animated purple aurora
   │  ├─ nav.tsx           # sticky blurred top nav
   │  ├─ hero.tsx          # focal aurora + intro
   │  ├─ about.tsx
   │  ├─ experience.tsx    # vertical timeline w/ DevOps & Testing subgroups
   │  ├─ projects.tsx      # AskDB card (under-construction badge)
   │  ├─ certifications.tsx # expandable cards with sub-courses
   │  ├─ skills.tsx        # brand-icon chip grid
   │  ├─ contact.tsx
   │  ├─ section.tsx       # shared wrapper with fade-in-up
   │  ├─ brand-icons.tsx   # inline SVGs (GitHub, LinkedIn, PowerShell)
   │  └─ ui/               # shadcn primitives: button, card, badge
   └─ lib/utils.ts
```

## Editing content

All site content lives in its respective component under `src/components/`. No CMS — edit the file, the dev server hot-reloads. For Docker, rebuild with `docker compose up -d --build`.

## Deploy on Vercel

Stock Next.js 14 app, no special config needed. Push to GitHub, import at <https://vercel.com/new>, hit deploy.

Update `SITE_URL` in `src/app/layout.tsx` once the production URL is known so Open Graph absolute paths resolve correctly.

## Notes

- Dark-mode only. No theme toggle by design.
- Background is a fixed, full-viewport animated gradient (SVG goo filter + 5 keyframed blobs + a cursor-following violet glow). Sits behind everything with `pointer-events: none`.
- Sections fade in on scroll once, no re-trigger.
