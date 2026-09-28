import contact from "@/content/contact.json";
import profile from "@/content/profile.json";
import { asset } from "@/lib/asset";
import { Heading } from "@/components/section";

export function Contact() {
  return (
    <footer id="contact">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div>
          <Heading eyebrow={contact.eyebrow} title={contact.title} />
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">{contact.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary px-7 py-3">
              {contact.cta}
            </a>
            <a href={asset(profile.cv)} target="_blank" rel="noopener noreferrer" className="btn-ghost px-7 py-3">
              {contact.cv}
            </a>
          </div>
        </div>

        <ul className="self-center border-t border-line/10">
          {contact.rows.map((r) => (
            <li key={r.label} className="border-b border-line/10">
              <a
                href={r.href}
                target={r.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-5"
              >
                <span className="eyebrow">{r.label}</span>
                <span className="truncate transition-colors group-hover:text-accent">{r.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto flex max-w-page items-center justify-between border-t border-line/10 px-5 py-8 md:px-8">
        <span className="font-serif text-xl">
          {profile.short}
          <span className="text-accent">.</span>
        </span>
        <span className="text-sm text-muted">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
