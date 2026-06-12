import type { Metadata } from "next";
import Link from "next/link";

import { DecryptText } from "@/components/ui/decrypt-text";

export const metadata: Metadata = {
  title: "404 — command not found",
};

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0d] font-mono text-[13px] text-zinc-200 shadow-2xl">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="select-none text-xs text-zinc-500">
            adib@portfolio: ~/404
          </span>
          <span className="w-12" />
        </div>

        {/* body */}
        <div className="flex flex-col gap-3 px-5 py-6">
          <p className="leading-relaxed">
            <span className="text-[hsl(var(--brand))]">adib</span>
            <span className="text-zinc-500">@</span>
            <span className="text-[hsl(var(--brand))]">portfolio</span>
            <span className="text-zinc-500">:~$ </span>
            <span className="text-zinc-100">cd ./this-page</span>
          </p>
          <p className="text-zinc-500">
            bash: cd: ./this-page: No such file or directory
          </p>

          <DecryptText
            text="404"
            className="my-2 text-6xl font-semibold tracking-tight text-zinc-100 md:text-7xl"
            charStep={300}
          />

          <p className="text-zinc-500">
            this page was <span className="text-zinc-100">rm -rf</span>
            {"'d"} — or it never existed. either way, nothing to see here.
          </p>

          <p className="mt-3 leading-relaxed">
            <span className="text-[hsl(var(--brand))]">adib</span>
            <span className="text-zinc-500">@</span>
            <span className="text-[hsl(var(--brand))]">portfolio</span>
            <span className="text-zinc-500">:~$ </span>
            <Link
              href="/"
              className="text-zinc-100 underline decoration-[hsl(var(--brand))] decoration-2 underline-offset-4 transition-colors hover:text-[hsl(var(--brand))]"
            >
              cd ~
            </Link>
            <span className="term-cursor ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-[hsl(var(--brand))] align-middle" />
          </p>
        </div>
      </div>
    </main>
  );
}
