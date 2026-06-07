/** @type {import('next').NextConfig} */
// Output target is chosen via BUILD_TARGET:
//   docker  → standalone server bundle (for the Dockerfile)
//   static  → fully static export to ./out (drop straight onto GitHub Pages)
//   (unset) → default, for `next dev` and platform adapters
const target = process.env.BUILD_TARGET;

const nextConfig = {
  output:
    target === "docker" ? "standalone" : target === "static" ? "export" : undefined,
  // Required for static export; harmless otherwise (no next/image in use).
  images: { unoptimized: true },
};

export default nextConfig;
