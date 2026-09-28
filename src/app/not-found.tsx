import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center px-5 md:px-8">
      <div className="mx-auto w-full max-w-page">
        <h1 className="font-serif text-[clamp(3rem,8vw,5.5rem)] leading-none tracking-[-0.02em]">
          Wrong trail.
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">This page doesn&apos;t exist. The way back is below.</p>
        <Link href="/" className="btn-primary mt-8">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
