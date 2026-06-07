"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, MapPin, Sparkles } from "lucide-react";

import { DecryptText } from "@/components/ui/decrypt-text";
import { Spotlight } from "@/components/ui/spotlight";
import { MovingBorderButton } from "@/components/ui/moving-border-button";
import { Magnetic } from "@/components/ui/magnetic";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[92vh] w-full max-w-5xl flex-col justify-center overflow-hidden px-5 pt-24 sm:px-6 sm:pt-28"
    >
      {/* Kept to the upper-right and very faint in light mode so it never
          smudges the header/logo; comes alive in dark mode. */}
      <Spotlight className="-right-1/4 -top-1/3 text-foreground/[0.07] dark:text-foreground/80" />

      {/* Soft scrim of the page color behind the headline so the background
          dots never compete with the text. Subtle in dark mode. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100 dark:opacity-30"
        style={{
          background:
            "radial-gradient(58% 46% at 34% 44%, hsl(var(--background)) 0%, hsl(var(--background) / 0.72) 44%, transparent 78%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col gap-6 sm:gap-8"
      >
        <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] text-muted-foreground sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-foreground" />
          <span className="truncate">
            Available for new grad SWE / ML roles · Spring 2027
          </span>
        </div>

        <h1 className="font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <DecryptText text="Adib Akkari." startDelay={120} />
          <br />
          <DecryptText
            className="text-foreground"
            text="Software Engineer"
            startDelay={420}
          />{" "}
          building <span className="text-muted-foreground">AI systems</span>{" "}
          end-to-end.
        </h1>

        <p className="max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          I build production AI systems and full-stack apps. Currently interning
          at <span className="text-foreground">Ericsson</span> on a cloud-native
          IAM platform serving{" "}
          <span className="text-foreground">130M+ users</span>. Previously
          rescued 20+ years of source code at Novatek through a custom VCS
          migration. Recently fine-tuned Llama 3 8B with QLoRA to build AskDB, a
          natural-language-to-SQL engine.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Magnetic className="w-full sm:w-auto">
            <MovingBorderButton
              href="/cv.pdf"
              external
              ariaLabel="View CV (opens PDF in new tab)"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              View CV
            </MovingBorderButton>
          </Magnetic>

          <Magnetic className="w-full sm:w-auto">
            <Link
              href="#contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-foreground/15 bg-transparent px-7 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.04] sm:w-auto"
            >
              Get in touch
            </Link>
          </Magnetic>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Montréal, QC
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-foreground/20 md:inline-block" />
          <span>
            B.Eng Software Engineering · Concordia University · 2022–2027
          </span>
        </div>
      </motion.div>
    </section>
  );
}
