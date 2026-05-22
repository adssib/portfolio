"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

import { Section } from "@/components/section";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";

const links = [
  {
    label: "Email",
    value: "adibakkari@gmail.com",
    href: "mailto:adibakkari@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/adssib",
    href: "https://github.com/adssib",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/adib-akkari",
    href: "https://linkedin.com/in/adib-akkari",
    icon: LinkedinIcon,
  },
];

export function Contact() {
  return (
    <Section id="contact" eyebrow="06 / Contact" title="">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Let&apos;s build something
          <br />
          <span className="gradient-text">worth building.</span>
        </h2>
        <p className="mt-6 max-w-xl text-balance text-muted-foreground md:text-lg">
          I&apos;m always open to interesting conversations: AI infra, full-stack
          systems, or just an introduction.
        </p>

        <div className="mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glass glass-hover group flex flex-col items-start gap-3 rounded-2xl p-5 text-left"
            >
              <div className="flex w-full items-center justify-between">
                <l.icon className="h-5 w-5 text-foreground" />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {l.label}
                </div>
                <div className="mt-1 break-all text-sm text-foreground">
                  {l.value}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="mt-24 flex flex-col items-center gap-2 text-xs text-muted-foreground md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Adib Akkari. Montréal, QC.</span>
        <span className="font-mono">
          Built with Next.js · Tailwind · Framer Motion
        </span>
      </footer>
    </Section>
  );
}
