"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[92vh] w-full max-w-5xl flex-col justify-center px-6 pt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-8"
      >
        <div className="inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-violet-300" />
          <span>Available for new grad SWE / ML roles · Spring 2027</span>
        </div>

        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Adib Akkari.
          <br />
          <span className="gradient-text">Software engineer</span> building{" "}
          <span className="text-muted-foreground">AI systems</span> end-to-end.
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

        <div className="flex flex-wrap items-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-black hover:bg-white/90"
          >
            <Link
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Download className="transition-transform group-hover:translate-y-0.5" />
              View CV
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white/15 bg-white/[0.02] hover:bg-white/5"
          >
            <Link href="#contact">Get in touch</Link>
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Montréal, QC
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-white/20 md:inline-block" />
          <span>
            B.Eng Software Engineering · Concordia University · 2022–2027
          </span>
        </div>
      </motion.div>
    </section>
  );
}
