import { Fragment } from "react";

/**
 * Renders a content string with **highlighted** segments. Anything wrapped in
 * double asterisks gets `markClass`; everything else renders as-is. Lets the
 * JSON content files carry inline emphasis without any JSX.
 *
 *   "serving **130M+ users**"  →  serving <span class={markClass}>130M+ users</span>
 */
export function RichText({
  text,
  markClass = "text-foreground",
}: {
  text: string;
  markClass?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\*\*([^*]+)\*\*$/.exec(part);
        return m ? (
          <span key={i} className={markClass}>
            {m[1]}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}
