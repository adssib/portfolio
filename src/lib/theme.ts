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

  // The CSS pre-clips ::view-transition-new(root) to a 0px circle at this
  // point, so the new theme can't flash fullscreen on the frames before the
  // animation below attaches.
  root.style.setProperty("--wipe-x", `${x}px`);
  root.style.setProperty("--wipe-y", `${y}px`);

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
          // Long and ease-in-out so the sweep itself reads, not just the result
          duration: 1300,
          easing: "cubic-bezier(0.45, 0, 0.25, 1)",
          // Hold the final frame: without this the clip snaps back to the 0px
          // CSS value when the animation ends, flashing the old theme.
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    })
    .catch(() => {});

  return next;
}
