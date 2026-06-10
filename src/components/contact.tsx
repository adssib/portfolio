"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

import { Section } from "@/components/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import contact from "@/content/contact.json";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export function Contact() {
  return (
    <Section id="contact" eyebrow={contact.eyebrow} title="">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          {contact.headingTop}
          <br />
          <span className="gradient-text">{contact.headingAccent}</span>
        </h2>
        <p className="mt-6 max-w-xl text-balance text-muted-foreground md:text-lg">
          {contact.blurb}
        </p>

        <div className="mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
          {contact.links.map((l) => {
            const Icon = ICONS[l.icon] ?? Mail;
            return (
              <SpotlightCard
                as={Link}
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass glass-hover group flex flex-col items-start gap-3 rounded-2xl p-5 text-left"
              >
                <div className="flex w-full items-center justify-between">
                  <Icon className="h-5 w-5 text-foreground" />
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
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      <footer className="mt-24 flex flex-col items-center gap-2 text-xs text-muted-foreground md:flex-row md:justify-between">
        <span>
          © {new Date().getFullYear()} {contact.footerName}
        </span>
        <span className="font-mono">{contact.footerBuilt}</span>
      </footer>
    </Section>
  );
}
