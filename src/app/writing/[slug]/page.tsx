import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Nav } from "@/components/nav";
import { Contact } from "@/components/contact";
import { Mdx } from "@/components/mdx";
import { Tags } from "@/components/tags";
import { formatDate, getPost, getPosts } from "@/lib/writing";
import { SITE_URL, shareImage } from "@/lib/share";

// Only the posts that exist at build time get pages (required for the static export).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      url: `${SITE_URL}/writing/${post.slug}/`,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, images: [shareImage] },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main id="main" className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <article className="mx-auto max-w-4xl">
          <Link href="/writing" className="link inline-flex items-center gap-1.5 text-sm text-muted">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All writing
          </Link>

          <header className="mt-10 border-b border-line/10 pb-10">
            <p className="eyebrow">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.02] tracking-[-0.02em]">
              {post.title}
            </h1>
            <Tags tags={post.tags} className="mt-6" />
          </header>

          <div className="prose prose-site mt-10 max-w-none">
            <Mdx source={post.body} />
          </div>
        </article>
      </main>
      <Contact />
    </>
  );
}
