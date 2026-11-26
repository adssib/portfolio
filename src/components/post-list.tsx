import Link from "next/link";

import { formatDate, type PostMeta } from "@/lib/writing";

/** One row per post: title and summary on the left, date and reading time on the right. */
export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="border-t border-line/10">
      {posts.map((p) => (
        <li key={p.slug} className="border-b border-line/10">
          <Link
            href={`/writing/${p.slug}`}
            className="group grid gap-3 py-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12"
          >
            <div>
              <h3 className="font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight transition-colors group-hover:text-accent">
                {p.title}
                {p.draft && (
                  <span className="ml-3 align-middle font-sans text-xs uppercase tracking-[0.16em] text-accent">
                    Draft
                  </span>
                )}
              </h3>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted">{p.summary}</p>
              {p.tags.length > 0 && <p className="mt-3 text-sm text-muted">{p.tags.join(" · ")}</p>}
            </div>
            <p className="text-sm text-muted md:text-right">
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span className="block">{p.minutes} min read</span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
