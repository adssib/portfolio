import type { Metadata } from "next";

import { Nav } from "@/components/nav";
import { Contact } from "@/components/contact";
import { PostList } from "@/components/post-list";
import { Em, Section } from "@/components/section";
import { getPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering notes from Adib Akkari: real problems, measurements, and what I learned.",
};

export default function WritingIndex() {
  const posts = getPosts();
  return (
    <>
      <Nav />
      <main id="main" className="pt-16">
        <Section id="writing">
          <p className="eyebrow mb-5">Writing</p>
          <h1 className="font-serif text-[clamp(2.75rem,6vw,4.75rem)] leading-none tracking-[-0.02em]">
            <Em text="Engineering *notes.*" />
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
            Written when there&apos;s a real problem, a measurement, and something I learned. No posting schedule.
          </p>
          <div className="mt-12">
            <PostList posts={posts} />
          </div>
        </Section>
      </main>
      <Contact />
    </>
  );
}
