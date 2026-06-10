"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, X, TerminalSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import t from "@/content/terminal.json";

/* ────────────────────────────────────────────────────────────────────────
   adib.sh — an interactive portfolio terminal.
   Docked launcher (bottom-right) → compact window → fullscreen. All copy lives
   in src/content/terminal.json; the command logic + layout live here.
   ──────────────────────────────────────────────────────────────────────── */

type Mode = "closed" | "compact" | "full";
type Line = { id: number; node: React.ReactNode };

const PROMPT_USER = t.prompt.user;
const PROMPT_HOST = t.prompt.host;

// Tiny helpers for colored output
type SpanProps = { children: React.ReactNode; className?: string };
const A = ({ children, className }: SpanProps) => (
  <span className={cn("text-[hsl(var(--brand))]", className)}>{children}</span>
);
const Dim = ({ children, className }: SpanProps) => (
  <span className={cn("text-zinc-500", className)}>{children}</span>
);
const W = ({ children, className }: SpanProps) => (
  <span className={cn("text-zinc-100", className)}>{children}</span>
);

function Row({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-pre-wrap leading-relaxed">{children}</div>;
}

const SECTIONS = [
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "certs",
  "contact",
];

const COMMANDS = [
  "help",
  "whoami",
  ...SECTIONS,
  "resume",
  "social",
  "ls",
  "cat",
  "clear",
  "neofetch",
  "sudo",
  "rm",
  "hire",
  "coffee",
  "history",
  "exit",
];

type RunResult = {
  output?: React.ReactNode;
  action?: "clear" | "open-cv" | "close";
};

function neofetch(): React.ReactNode {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
      <pre className="text-[hsl(var(--brand))] leading-[1.15]">
        {t.neofetch.art}
      </pre>
      <div>
        <Row>
          <A>{PROMPT_USER}</A>
          <Dim>@</Dim>
          <A>{PROMPT_HOST}</A>
        </Row>
        <Row>
          <Dim>————————————————————</Dim>
        </Row>
        {t.neofetch.info.map(([k, v]) => (
          <Row key={k}>
            <A>{k.padEnd(6)}</A>
            <Dim>: </Dim>
            <W>{v}</W>
          </Row>
        ))}
      </div>
    </div>
  );
}

function runCommand(raw: string): RunResult {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const c = cmd.toLowerCase();

  switch (c) {
    case "":
      return {};
    case "help":
      return {
        output: (
          <div>
            <Row>
              <Dim>Available commands — try one:</Dim>
            </Row>
            <div className="mt-1 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
              {[
                ["whoami", "the short version"],
                ["about", "who I am"],
                ["experience", "where I've shipped"],
                ["skills", "stack & tools"],
                ["projects", "featured work"],
                ["education", "school"],
                ["certs", "certifications"],
                ["contact", "reach me"],
                ["resume", "open my CV"],
                ["social", "links"],
                ["neofetch", "the flex"],
                ["clear", "wipe screen"],
              ].map(([name, desc]) => (
                <Row key={name}>
                  <A>{name.padEnd(11)}</A>
                  <Dim>{desc}</Dim>
                </Row>
              ))}
            </div>
            <Row>
              <Dim className="mt-1 block">
                tip: ↑/↓ history · Tab to autocomplete · Esc to minimize
              </Dim>
            </Row>
          </div>
        ),
      };
    case "whoami":
      return {
        output: (
          <Row>
            <W>{t.whoami.name}</W> <Dim>—</Dim> <A>{t.whoami.role}</A>{" "}
            <Dim>{t.whoami.tail}</Dim>
          </Row>
        ),
      };
    case "about":
      return {
        output: (
          <div>
            {t.about.map((p, i) => (
              <Row key={i}>{i === 0 ? <W>{p}</W> : <Dim>{p}</Dim>}</Row>
            ))}
          </div>
        ),
      };
    case "experience":
    case "work":
      return {
        output: (
          <div className="flex flex-col gap-2">
            {t.experience.map((e) => (
              <div key={e.company}>
                <Row>
                  <A>{e.company}</A> <Dim>{e.meta}</Dim>
                </Row>
                <Row>
                  <Dim>{"  "}{e.summary}</Dim>
                </Row>
              </div>
            ))}
          </div>
        ),
      };
    case "skills":
      return {
        output: (
          <div className="flex flex-col gap-1">
            {t.skills.map((s) => (
              <Row key={s.k}>
                <A>{s.k.padEnd(6)}</A>
                <Dim>: </Dim>
                <W>{s.v}</W>
              </Row>
            ))}
          </div>
        ),
      };
    case "projects":
      return {
        output: (
          <div className="flex flex-col gap-2">
            {t.projects.map((proj) => (
              <div key={proj.name}>
                <Row>
                  <A>{proj.name}</A> <Dim>{proj.tagline}</Dim>
                </Row>
                {proj.lines.map((ln) => (
                  <Row key={ln}>
                    <Dim>{"  "}{ln}</Dim>
                  </Row>
                ))}
              </div>
            ))}
          </div>
        ),
      };
    case "education":
      return {
        output: (
          <Row>
            <W>{t.education.degree}</W> <Dim>—</Dim>{" "}
            <A>{t.education.school}</A> <Dim>{t.education.meta}</Dim>
          </Row>
        ),
      };
    case "certs":
    case "certifications":
      return {
        output: (
          <div className="flex flex-col gap-1">
            {t.certs.map((cert) => (
              <Row key={cert.name}>
                <A>{cert.name}</A> <Dim>{cert.issuer}</Dim>
              </Row>
            ))}
          </div>
        ),
      };
    case "contact":
    case "social":
      return {
        output: (
          <div className="flex flex-col gap-1">
            {t.contact.map((l) => (
              <Row key={l.k}>
                <A>{l.k.padEnd(8)}</A>
                <Dim>: </Dim>
                <W>{l.v}</W>
              </Row>
            ))}
          </div>
        ),
      };
    case "resume":
    case "cv":
      return {
        action: "open-cv",
        output: (
          <Row>
            <Dim>opening </Dim>
            <A>cv.pdf</A>
            <Dim> in a new tab…</Dim>
          </Row>
        ),
      };
    case "ls":
      return {
        output: (
          <Row>
            {SECTIONS.map((s) => (
              <span key={s} className="text-[hsl(var(--brand))] mr-4">
                {s}
              </span>
            ))}
          </Row>
        ),
      };
    case "cat": {
      const target = (args[0] || "").toLowerCase().replace(/\.txt$/, "");
      if (SECTIONS.includes(target)) return runCommand(target);
      return {
        output: (
          <Row>
            <Dim>cat: </Dim>
            <W>{args[0] || ""}</W>
            <Dim>: No such file. Try: {SECTIONS.join(", ")}</Dim>
          </Row>
        ),
      };
    }
    case "neofetch":
      return { output: neofetch() };
    case "sudo": {
      if (args.length === 0) {
        return {
          output: (
            <Row>
              <Dim>{t.eggs.sudoUsage}</Dim>
            </Row>
          ),
        };
      }
      const res = runCommand(args.join(" "));
      return {
        ...res,
        output: (
          <div className="flex flex-col gap-1.5">
            <Row>
              <Dim>[sudo] password for </Dim>
              <A>{PROMPT_USER}</A>
              <Dim>: ••••••••</Dim>
            </Row>
            {res.output}
          </div>
        ),
      };
    }
    case "rm": {
      const a = args.join(" ");
      const reckless =
        /-[a-z]*r[a-z]*f|-[a-z]*f[a-z]*r|-r\b/.test(a) ||
        args.includes("/") ||
        args.includes("*") ||
        args.includes("~") ||
        args.includes(".");
      if (reckless) {
        return {
          output: (
            <div className="flex flex-col gap-0.5">
              <Row>
                <Dim>rm: descending into </Dim>
                <W>/</W>
                <Dim> …</Dim>
              </Row>
              <Row>
                <Dim>{t.eggs.rmRemoving}</Dim>
              </Row>
              <Row>
                <A>██████████ 100%</A>
              </Row>
              <Row>
                <A>{t.eggs.rmPsych}</A> <Dim>{t.eggs.rmPsychTail}</Dim>
              </Row>
            </div>
          ),
        };
      }
      return {
        output: (
          <Row>
            <Dim>rm: refusing to remove anything — </Dim>
            <A>{t.eggs.rmSafe}</A>
          </Row>
        ),
      };
    }
    case "hire":
      return {
        output: (
          <div>
            <Row>
              <A>{t.eggs.hireTitle}</A>
            </Row>
            <Row>
              <W>{t.eggs.hireBody}</W>
            </Row>
          </div>
        ),
      };
    case "coffee":
      return {
        output: (
          <pre className="text-[hsl(var(--brand))]">{t.eggs.coffee}</pre>
        ),
      };
    case "history":
      return {
        output: (
          <Row>
            <Dim>(use ↑/↓ to navigate command history)</Dim>
          </Row>
        ),
      };
    case "exit":
    case "quit":
    case "close":
      return { action: "close" };
    case "clear":
    case "cls":
      return { action: "clear" };
    default:
      return {
        output: (
          <Row>
            <Dim>command not found: </Dim>
            <W>{c}</W>
            <Dim>
              {" "}
              — type <A>help</A>
            </Dim>
          </Row>
        ),
      };
  }
}

const WELCOME: React.ReactNode = (
  <div>
    <Row>
      <A>{t.welcome.title}</A> <Dim>{t.welcome.note}</Dim>
    </Row>
    <Row>
      <Dim>{t.welcome.hint}</Dim>
    </Row>
  </div>
);

export function Terminal() {
  const [mode, setMode] = useState<Mode>("closed");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [hint, setHint] = useState(false);

  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nextId = () => ++idRef.current;

  const push = useCallback((node: React.ReactNode) => {
    setLines((ls) => [...ls, { id: nextId(), node }]);
  }, []);

  const open = useCallback(() => {
    setHint(false);
    setMode((m) => (m === "closed" ? "compact" : m));
    setLines((ls) => (ls.length === 0 ? [{ id: nextId(), node: WELCOME }] : ls));
    setTimeout(() => inputRef.current?.focus(), 60);
  }, []);

  const close = useCallback(() => setMode("closed"), []);

  // Launcher hint: nudge once after a few seconds.
  useEffect(() => {
    if (mode !== "closed") return;
    const timer = setTimeout(() => setHint(true), 4500);
    return () => clearTimeout(timer);
  }, [mode]);

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, mode]);

  // Esc minimizes from anywhere when open
  useEffect(() => {
    if (mode === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, close]);

  const submit = () => {
    const value = input;
    const trimmed = value.trim();
    push(
      <Row>
        <A>{PROMPT_USER}</A>
        <Dim>@</Dim>
        <A>{PROMPT_HOST}</A>
        <Dim>:~$ </Dim>
        <W>{value}</W>
      </Row>
    );
    if (trimmed) setHistory((h) => [...h, trimmed]);
    setHistIdx(null);
    setInput("");

    const { output, action } = runCommand(value);
    if (action === "clear") {
      setLines([]);
      return;
    }
    if (action === "close") {
      close();
      return;
    }
    if (action === "open-cv") {
      if (output) push(output);
      window.open("/cv.pdf", "_blank", "noopener,noreferrer");
      return;
    }
    if (output) push(output);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const word = input.trim();
      if (!word) return;
      const match = COMMANDS.find((cmd) => cmd.startsWith(word));
      if (match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const isFull = mode === "full";

  const promptLine = (
    <div className="flex items-center" onClick={() => inputRef.current?.focus()}>
      <A>{PROMPT_USER}</A>
      <Dim>@</Dim>
      <A>{PROMPT_HOST}</A>
      <Dim>:~$&nbsp;</Dim>
      <div className="relative flex-1">
        <span className="whitespace-pre">{input}</span>
        <span className="term-cursor ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-[hsl(var(--brand))] align-middle" />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="terminal input"
          className="absolute inset-0 w-full cursor-text bg-transparent text-transparent caret-transparent outline-none"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* ── Launcher ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mode === "closed" && (
          <motion.div
            key="launcher"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2"
          >
            <AnimatePresence>
              {hint && (
                <motion.button
                  type="button"
                  onClick={open}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="hidden rounded-lg border border-foreground/10 bg-card/90 px-3 py-1.5 text-xs text-muted-foreground shadow-lg backdrop-blur sm:block"
                >
                  {t.launcher.hint}
                </motion.button>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={open}
              aria-label="Open adib.sh terminal"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/90 px-4 py-2.5 text-sm shadow-lg backdrop-blur transition-colors hover:border-brand/50"
            >
              <span className="text-[hsl(var(--brand))]">
                <TerminalSquare className="h-4 w-4" />
              </span>
              <span className="font-medium">
                {t.launcher.name}
                <span className="text-muted-foreground">{t.launcher.ext}</span>
              </span>
              <span className="term-cursor h-3.5 w-2 bg-[hsl(var(--brand))]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Terminal window ──────────────────────────────────────── */}
      <AnimatePresence>
        {mode !== "closed" && (
          <>
            {isFull && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMode("compact")}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              />
            )}
            <motion.div
              key="window"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className={cn(
                "fixed z-50 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0d] font-mono text-[13px] text-zinc-200 shadow-2xl",
                isFull
                  ? "inset-3 md:inset-10"
                  : "bottom-5 right-5 h-[min(70vh,540px)] w-[min(440px,92vw)]"
              )}
            >
              {/* title bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Close terminal"
                    onClick={close}
                    className="h-3 w-3 rounded-full bg-[#ff5f57]"
                  />
                  <button
                    type="button"
                    aria-label="Minimize terminal"
                    onClick={close}
                    className="h-3 w-3 rounded-full bg-[#febc2e]"
                  />
                  <button
                    type="button"
                    aria-label="Toggle fullscreen"
                    onClick={() => setMode(isFull ? "compact" : "full")}
                    className="h-3 w-3 rounded-full bg-[#28c840]"
                  />
                </div>
                <span className="select-none text-xs text-zinc-500">
                  {PROMPT_USER}@{PROMPT_HOST}: ~/adib.sh
                </span>
                <div className="flex items-center gap-1 text-zinc-500">
                  <button
                    type="button"
                    aria-label={isFull ? "Exit fullscreen" : "Fullscreen"}
                    onClick={() => setMode(isFull ? "compact" : "full")}
                    className="rounded p-1 hover:bg-white/10 hover:text-zinc-200"
                  >
                    {isFull ? (
                      <Minimize2 className="h-3.5 w-3.5" />
                    ) : (
                      <Maximize2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Close terminal"
                    onClick={close}
                    className="rounded p-1 hover:bg-white/10 hover:text-zinc-200"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* body */}
              <div
                ref={bodyRef}
                onClick={() => inputRef.current?.focus()}
                className="term-scroll flex-1 cursor-text overflow-y-auto px-3 py-3"
              >
                <div className="flex flex-col gap-1.5">
                  {lines.map((l) => (
                    <div key={l.id} className="term-line-in">
                      {l.node}
                    </div>
                  ))}
                  {promptLine}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
