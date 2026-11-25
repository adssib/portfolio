import { Fragment } from "react";

import { cn } from "@/lib/utils";

/** Shared section frame: consistent width, gutters, and vertical rhythm. */
export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-page px-5 py-20 md:px-8 xl:px-12 md:py-28", className)}>
      {children}
    </section>
  );
}

/** Renders copy where *wrapped words* become the muted serif italic. */
export function Em({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") ? (
          <em key={i} className="text-muted">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function Heading({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1] tracking-[-0.02em]">
        <Em text={title} />
      </h2>
    </div>
  );
}
