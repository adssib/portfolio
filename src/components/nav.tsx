import profile from "@/content/profile.json";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
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
          <ul className="mr-3 hidden items-center gap-6 text-[0.95rem] text-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary px-5 py-2 text-sm">
            Get in touch
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
