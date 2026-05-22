"use client";

import Link from "next/link";
import { ExternalLink, Database } from "lucide-react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/brand-icons";

const tech = [
  "Python",
  "PyTorch",
  "Llama 3 8B",
  "QLoRA",
  "Hugging Face",
  "Flask",
  "Next.js",
  "TypeScript",
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03 — Projects"
      title="Featured work"
    >
      <article className="glass glass-hover overflow-hidden rounded-2xl">
        <div className="grid md:grid-cols-5">
          {/* Screenshot placeholder */}
          <div className="relative md:col-span-3 md:border-r md:border-white/10">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 80% at 20% 0%, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0) 60%), radial-gradient(60% 80% at 100% 100%, rgba(6,182,212,0.30) 0%, rgba(6,182,212,0) 60%), linear-gradient(180deg, #0c0c0e 0%, #07070a 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(ellipse at center, black 50%, transparent 80%)",
                }}
              />

              <div className="relative flex h-full w-full items-center justify-center p-8">
                <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0a0a0c]/85 p-4 shadow-2xl backdrop-blur">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                      askdb · query
                    </span>
                  </div>
                  <div className="font-mono text-[11px] leading-relaxed">
                    <p className="text-muted-foreground">
                      &gt; show me top 5 customers by revenue this quarter
                    </p>
                    <p className="mt-2 text-violet-300">SELECT</p>
                    <p className="pl-3 text-foreground">
                      c.name,{" "}
                      <span className="text-cyan-300">
                        SUM(o.total) AS revenue
                      </span>
                    </p>
                    <p className="text-violet-300">FROM</p>
                    <p className="pl-3 text-foreground">
                      customers c{" "}
                      <span className="text-violet-300">JOIN</span> orders o{" "}
                      <span className="text-violet-300">ON</span> o.customer_id
                      = c.id
                    </p>
                    <p className="text-violet-300">WHERE</p>
                    <p className="pl-3 text-foreground">
                      o.created_at &gt;= date_trunc(&apos;quarter&apos;,
                      now())
                    </p>
                    <p className="text-violet-300">
                      GROUP BY{" "}
                      <span className="text-foreground">c.name</span>
                    </p>
                    <p className="text-violet-300">
                      ORDER BY{" "}
                      <span className="text-foreground">revenue DESC</span>
                    </p>
                    <p className="text-violet-300">
                      LIMIT <span className="text-foreground">5</span>
                      <span className="text-foreground">;</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-6 md:col-span-2 md:p-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Database className="h-3.5 w-3.5" />
              April 2026
            </div>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              AskDB
            </h3>
            <p className="text-sm text-muted-foreground md:text-[0.95rem]">
              A natural-language-to-SQL engine. Users provide a DDL schema and
              query their database in plain English. Built on a fine-tuned
              Llama 3 8B with QLoRA, trained on a unified pipeline of 134K
              examples drawn from 5 sources.
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="relative pl-5">
                <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-white/40" />
                Unified 134K NL-to-SQL examples across 5 datasets into one
                training corpus.
              </li>
              <li className="relative pl-5">
                <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-white/40" />
                Fine-tuned Llama 3 8B with QLoRA (4-bit NF4, LoRA rank 16) on a
                single GPU.
              </li>
              <li className="relative pl-5">
                <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-white/40" />
                Flask inference API + Next.js frontend with schema upload and
                query history.
              </li>
            </ul>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="border-white/10 bg-white/[0.03] text-[11px] font-normal text-muted-foreground"
                >
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.02] hover:bg-white/5"
              >
                <Link
                  href="https://github.com/adssib"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon className="h-4 w-4" />
                  Code
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-full bg-white text-black hover:bg-white/90"
              >
                <Link href="#" target="_blank" rel="noreferrer">
                  Live demo
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}
