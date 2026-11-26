/** Post tags as small separate pills, so each one reads on its own. */
export function Tags({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-line/15 bg-surface/50 px-3 py-0.5 text-sm text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}
