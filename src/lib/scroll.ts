/**
 * Smooth-scrolls to an in-page section and *verifies the landing*: native
 * hash scrolling can drift or stop short when animations run during the
 * scroll, so after the scroll settles we re-measure and correct any offset.
 * Honors prefers-reduced-motion with an instant jump.
 */

// Matches the sections' scroll-mt-24 (96px): 64px fixed header + breathing room.
const HEADER_OFFSET = 96;

export function scrollToHash(href: string) {
  const id = href.replace(/^.*#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  // Tell the target section it's being jumped to: its heading decode completes
  // instantly so the reader doesn't land on mid-scramble cipher text.
  window.dispatchEvent(new CustomEvent("portfolio:jump", { detail: id }));

  const destination = () =>
    Math.max(
      0,
      Math.round(el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
    );

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: destination(), behavior: reduced ? "auto" : "smooth" });
  history.pushState(null, "", `#${id}`);

  // After the scroll ends, fix any drift (layout shifts, interrupted scroll).
  const correct = () => {
    if (Math.abs(window.scrollY - destination()) > 2) {
      window.scrollTo({ top: destination(), behavior: "auto" });
    }
  };
  const supportsScrollEnd = "onscrollend" in window;
  if (supportsScrollEnd) {
    window.addEventListener("scrollend", correct, { once: true });
  } else {
    setTimeout(correct, 1000);
  }
}
