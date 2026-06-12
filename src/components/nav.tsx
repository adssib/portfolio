"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/scroll";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

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

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="glass flex h-12 w-full items-center justify-between rounded-full px-3 sm:px-4">
          <Link
            href="#top"
            aria-label="Back to top, Adib Akkari"
            className="font-mono text-sm font-medium tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              scrollToHash("#top");
            }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash(l.href);
                    }}
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
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-4 mt-2 md:hidden"
          >
            <div className="glass flex flex-col rounded-2xl p-2">
              {links.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      scrollToHash(l.href);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 font-mono text-sm transition-colors",
                      isActive
                        ? "bg-brand/10 text-brand"
                        : "text-muted-foreground hover:bg-brand/10 hover:text-brand"
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
