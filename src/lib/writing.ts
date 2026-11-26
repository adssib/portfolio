import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** Blog posts are MDX files in src/content/writing; the file name is the URL slug. */
const DIR = path.join(process.cwd(), "src/content/writing");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  draft: boolean;
  minutes: number;
};

export type Post = PostMeta & { body: string };

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: String(data.title),
    date: String(data.date),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    minutes: Math.max(1, Math.round(words / 220)),
    body: content,
  };
}

/** Newest first. Drafts show while developing locally but never in a production build. */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(read)
    .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
