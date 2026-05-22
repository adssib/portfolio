/** @type {import('next').NextConfig} */
// `standalone` output is only needed when building the Docker image.
// Netlify / Vercel use their own platform adapters and don't want it.
const nextConfig = {
  output: process.env.BUILD_TARGET === "docker" ? "standalone" : undefined,
};

export default nextConfig;
