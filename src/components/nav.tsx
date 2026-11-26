import Link from "next/link";

import profile from "@/content/profile.json";
import { asset } from "@/lib/asset";
import { getPosts } from "@/lib/writing";

// Same order as the page. Links start with "/" so they also work from the blog pages.
const sections = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
];

export function Nav() {
  // Writing only appears once there is something to read.
  const links = getPosts().length > 0 ? [...sections, { href: "/writing", label: "Writing" }] : sections;
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-[4.5rem] max-w-page items-center justify-between px-5 md:px-8 xl:px-12">
        <Link href="/" className="font-serif text-[1.75rem] leading-none tracking-tight">
          {profile.short}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-4 hidden items-center gap-6 text-[0.95rem] text-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Contact and the résumé stay visible on phones, where the section links hide */}
          <a href="#contact" className="mr-3 text-[0.95rem] text-muted transition-colors hover:text-ink sm:mr-4">
            Get in touch
          </a>
          <a
            href={asset(profile.cv)}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 rounded-full border border-line/20 px-3.5 py-1.5 text-[0.9rem] transition-colors hover:border-line/45"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
