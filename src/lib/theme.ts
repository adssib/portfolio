/**
 * Theme switching with a View Transitions circle wipe: the new theme ripples
 * out from the trigger point (the toggle button, or top-right as a fallback).
 * Browsers without the API — and users with reduced motion — get an instant
 * switch. Returns whether the new theme is dark.
 */
export function toggleTheme(origin?: { x: number; y: number }): boolean {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");

  const apply = () => {
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof doc.startViewTransition !== "function" || reduced) {
    apply();
    return next;
  }

  const x = origin?.x ?? window.innerWidth - 40;
  const y = origin?.y ?? 40;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  doc
    .startViewTransition(apply)
    .ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    })
    .catch(() => {});

  return next;
}
