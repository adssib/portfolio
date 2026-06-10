"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");

  // Highlight the nav link for whichever section currently sits in the middle
  // band of the viewport. The asymmetric rootMargin makes "active" flip as a
  // section crosses the upper third rather than only when fully on screen.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

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
              {links.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-brand/10 text-brand"
                        : "text-muted-foreground hover:bg-brand/10 hover:text-brand"
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
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
