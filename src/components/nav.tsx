"use client";

import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="glass flex h-12 w-full items-center justify-between rounded-full px-3 sm:px-4">
          <Link
            href="#top"
            aria-label="Back to top, Adib Akkari"
            className="font-mono text-sm font-medium tracking-tight"
          >
            adib<span className="text-brand">.akkari</span>
          </Link>
          <div className="flex items-center gap-1">
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 md:flex"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href="#contact"
              aria-label="Jump to contact"
              className="md:hidden inline-flex h-9 items-center rounded-full bg-foreground/5 px-3 text-xs"
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
