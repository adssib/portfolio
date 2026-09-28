import profile from "@/content/profile.json";
import { asset } from "@/lib/asset";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Freelance" },
  { href: "#outside", label: "Outside" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-[4.5rem] max-w-page items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-serif text-[1.75rem] leading-none tracking-tight">
          {profile.short}
          <span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-4 hidden items-center gap-6 text-[0.95rem] text-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Resume and contact stay visible on phones, where the section links hide */}
          <a
            href={asset(profile.cv)}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3 text-[0.95rem] text-muted transition-colors hover:text-ink sm:mr-4"
          >
            Resume
          </a>
          <a href="#contact" className="mr-2 text-[0.95rem] text-muted transition-colors hover:text-ink">
            Get in touch
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
