/** @type {import('next').NextConfig} */
// Output target is chosen via BUILD_TARGET:
//   docker  → standalone server bundle (for the Dockerfile)
//   static  → fully static export to ./out for GitHub Pages, served under
//             /portfolio (the project-page path at adssib.github.io/portfolio)
//   (unset) → default, for `next dev` and platform adapters
const target = process.env.BUILD_TARGET;
const isStatic = target === "static";

// Served from a subpath on GitHub Pages. Override with PAGES_BASE_PATH="" if
// you later move to a custom domain or the adssib.github.io root.
const basePath = isStatic
  ? process.env.PAGES_BASE_PATH ?? "/portfolio"
  : undefined;

const nextConfig = {
  output: target === "docker" ? "standalone" : isStatic ? "export" : undefined,
  // Required for static export; harmless otherwise (no next/image in use).
  images: { unoptimized: true },
  basePath: basePath || undefined,
};

export default nextConfig;
