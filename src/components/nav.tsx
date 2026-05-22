"use client";

import Link from "next/link";

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
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="glass flex h-12 w-full items-center justify-between rounded-full px-4">
          <Link
            href="#top"
            className="font-mono text-sm font-medium tracking-tight"
          >
            adib<span className="text-muted-foreground">.akkari</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="#contact"
            className="md:hidden rounded-full bg-white/5 px-3 py-1.5 text-xs"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
