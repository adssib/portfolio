import { Fragment } from "react";

import { cn } from "@/lib/utils";

/** Shared section frame: consistent width, gutters, and vertical rhythm.
 *  `flush` drops the top padding for a section that follows straight on from
 *  the one above. Scroll margins cancel the top padding so every nav jump lands
 *  with its heading the same short distance under the fixed nav. */
export function Section({
  id,
  className,
  flush = false,
  children,
}: {
  id: string;
  className?: string;
  flush?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28 xl:px-12",
        flush ? "scroll-mt-6" : "-scroll-mt-14 pt-20 md:-scroll-mt-[5.5rem] md:pt-28",
        className
      )}
    >
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
