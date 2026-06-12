"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { toggleTheme } from "@/lib/theme";

/**
 * Light/dark theme toggle. Flips the `dark` class on <html> and persists the
 * choice to localStorage. The initial class is set pre-paint by an inline
 * script in the layout, so this only mirrors/updates it (no flash).
 * The switch ripples out from this button via the View Transitions API
 * (see src/lib/theme.ts).
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const rect = ref.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined;
    setDark(toggleTheme(origin));
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      {/* Render nothing icon-specific until mounted to avoid a hydration mismatch */}
      {mounted && (dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
    </button>
  );
}
