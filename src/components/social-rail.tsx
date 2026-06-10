import Link from "next/link";
import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import profile from "@/content/profile.json";

const socials = [
  { label: "GitHub", href: profile.links.githubUrl, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.links.linkedinUrl, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.links.email}`, Icon: Mail },
];

/**
 * Fixed left-edge social rail — always reachable while scrolling, so visitors
 * never have to scroll to the footer for GitHub/LinkedIn. Desktop only (the
 * footer carries the same links on mobile).
 */
export function SocialRail() {
  return (
    <div className="fixed bottom-0 left-6 z-30 hidden flex-col items-center gap-5 xl:flex">
      <ul className="flex flex-col items-center gap-4">
        {socials.map(({ label, href, Icon }) => (
          <li key={label}>
            <Link
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="block text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-brand"
            >
              <Icon className="h-5 w-5" />
            </Link>
          </li>
        ))}
      </ul>
      {/* line trailing down to the bottom edge */}
      <span aria-hidden className="h-24 w-px bg-foreground/20" />
    </div>
  );
}
