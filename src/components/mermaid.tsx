"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Reads a colour token from globals.css (stored as "r g b") as a hex string mermaid accepts. */
function token(name: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [r, g, b] = v.split(/\s+/).map(Number);
  return "#" + [r, g, b].map((n) => (n || 0).toString(16).padStart(2, "0")).join("");
}

/** Renders a mermaid diagram in the site's colours. */
export function Mermaid({ chart }: { chart: string }) {
  const box = useRef<HTMLDivElement>(null);
  const id = "m" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const mermaid = (await import("mermaid")).default;
      const ink = token("--ink");
      const bg = token("--bg");
      const surface = token("--surface");
      const accent = token("--accent");
      const muted = token("--muted");
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: '"Instrument Sans Variable", ui-sans-serif, system-ui, sans-serif',
        themeVariables: {
          background: bg,
          primaryColor: surface,
          primaryTextColor: ink,
          primaryBorderColor: muted,
          lineColor: accent,
          secondaryColor: bg,
          tertiaryColor: bg,
          clusterBkg: bg,
          clusterBorder: muted,
          titleColor: ink,
          edgeLabelBackground: bg,
          fontSize: "14px",
        },
        flowchart: { curve: "basis", htmlLabels: true, nodeSpacing: 30, rankSpacing: 30, padding: 10 },
      });
      try {
        const { svg } = await mermaid.render(`${id}-${Date.now()}`, chart);
        if (!cancelled && box.current) {
          box.current.innerHTML = svg;
          // Keep the diagram at its natural size so labels stay readable; the box scrolls if it's wider.
          const el = box.current.querySelector("svg");
          const natural = el?.style.maxWidth;
          if (el && natural) {
            el.removeAttribute("width");
            el.style.width = natural;
            el.style.maxWidth = "none";
          }
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    draw();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (failed) {
    return (
      <pre className="overflow-x-auto rounded-md bg-surface p-4 text-sm ring-1 ring-line/10">
        <code>{chart}</code>
      </pre>
    );
  }
  return (
    <div
      ref={box}
      role="img"
      aria-label="Diagram"
      // Diagrams may spill past the text column on wide screens, like a figure in a print layout
      className="not-prose my-10 flex min-h-24 overflow-x-auto rounded-md bg-surface/60 p-5 ring-1 ring-line/10 xl:-mx-40 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:shrink-0"
    />
  );
}
