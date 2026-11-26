import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PostList } from "@/components/post-list";
import { Heading, Section } from "@/components/section";
import { getPosts } from "@/lib/writing";

/** Latest posts on the homepage. Renders nothing until there is at least one. */
export function WritingSection() {
  const posts = getPosts().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <Section id="writing" flush>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading eyebrow="Writing" title="Engineering *notes.*" />
        <Link href="/writing" className="link inline-flex items-center gap-1.5 font-medium">
          All writing
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-10">
        <PostList posts={posts} />
      </div>
    </Section>
  );
}
