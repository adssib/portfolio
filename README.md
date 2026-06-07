# Adib Akkari · Portfolio

[![Deploy to GitHub Pages](https://github.com/adssib/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/adssib/portfolio/actions/workflows/deploy.yml)
[![Live](https://img.shields.io/badge/Live-adssib.github.io%2Fportfolio-111111?logo=github&logoColor=white)](https://adssib.github.io/portfolio/)

Personal portfolio site. Minimalist, monochrome, single-page scroll, with an
interactive cursor-reactive dot-grid background, an encrypted/decrypt text
effect on the name, and a light/dark theme toggle.

Built with **Next.js 14 (App Router)** · **TypeScript** · **Tailwind CSS** ·
**shadcn/ui** · **Framer Motion** · **react-icons** · **Geist**, plus a set of
**Aceternity-inspired** components (decrypt text, spotlight, moving-border
button, card spotlight, text-generate, magnetic buttons).

---

## Local dev

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## One-command run (Docker)

```bash
docker compose up -d --build
```

Open <http://localhost:3000>. To stop: `docker compose down`. The image is
multi-stage off `node:20-alpine`, uses Next.js `standalone` output (~180 MB,
non-root, port 3000).

## Deploy — GitHub Pages

The site is a fully static export served at
**<https://adssib.github.io/portfolio/>**.

- Pushes to **`master`** trigger `.github/workflows/deploy.yml`, which builds a
  static export and publishes it to GitHub Pages (Pages source = GitHub Actions).
- Build the export locally the same way CI does:

  ```bash
  BUILD_TARGET=static npm run build   # → ./out
  ```

- Because it's served from the `/portfolio` project path, `next.config.mjs`
  sets `basePath: "/portfolio"` for the static build. Moving to a custom domain
  or the `adssib.github.io` root? Set `PAGES_BASE_PATH=""`.

## Project structure

```
.
├─ .github/workflows/deploy.yml  # static export → GitHub Pages
├─ next.config.mjs               # BUILD_TARGET: docker | static (Pages) | dev
├─ Dockerfile                    # multi-stage, standalone Next.js output
├─ docker-compose.yml
├─ scripts/shot.mjs              # Playwright screenshot helper (UI checks)
├─ public/cv.pdf                 # served by the "View CV" button
└─ src/
   ├─ app/
   │  ├─ layout.tsx              # Geist fonts, metadata, no-flash theme init
   │  ├─ page.tsx                # single-page composition
   │  ├─ globals.css             # mono tokens (light + .dark), utilities
   │  ├─ icon.tsx · apple-icon.tsx · opengraph-image.tsx
   ├─ components/
   │  ├─ background.tsx          # interactive cursor-reactive dot-grid
   │  ├─ theme-toggle.tsx        # light/dark switch (persisted)
   │  ├─ nav.tsx · hero.tsx · about.tsx
   │  ├─ experience.tsx          # vertical timeline
   │  ├─ projects.tsx            # AskDB card
   │  ├─ certifications.tsx      # expandable cards
   │  ├─ skills.tsx              # brand-icon chip grid (grayscale → color)
   │  ├─ contact.tsx · section.tsx · brand-icons.tsx
   │  └─ ui/                     # button, card, badge, decrypt-text,
   │                             # spotlight, moving-border-button,
   │                             # spotlight-card, text-generate, magnetic
   └─ lib/utils.ts
```

## Notes

- **Light by default, with a dark-mode toggle.** The theme is set before paint
  (inline script in `layout.tsx`) to avoid a flash, and persisted to
  `localStorage`.
- The background is a fixed, full-viewport canvas dot-grid that brightens around
  the cursor. It's masked out of the top nav strip and respects
  `prefers-reduced-motion` (renders static).
- Accessibility: reduced-motion support throughout, skip-to-content link,
  visible focus rings, and the decrypt text exposes the real string via
  `aria-label`.
- Sections fade in on scroll once, no re-trigger.
