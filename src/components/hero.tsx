import profile from "@/content/profile.json";
import { asset } from "@/lib/asset";
import { Em } from "@/components/section";

export function Hero() {
  return (
    <>
      <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        {/* Landscape blended into the page; it sits under the title and fades out at both ends */}
        <img
          src={asset(profile.heroPhoto.src)}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="surface hero-photo absolute inset-0 -z-10 h-full w-full object-cover object-[center_45%]"
        />

        <div className="mx-auto w-full max-w-page px-5 pt-36 text-center md:px-8 xl:px-12 md:pt-44">
          <h1 className="rise font-serif text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.025em]">
            <Em text={profile.title} />
          </h1>
          <p
            className="rise mx-auto mt-6 max-w-[22ch] font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.12]"
            style={{ animationDelay: "0.15s" }}
          >
            {profile.tagline}
          </p>
          <p className="rise mt-4 text-muted" style={{ animationDelay: "0.3s" }}>
            {profile.sub}
          </p>
        </div>
      </section>

      {/* Slow strip of engineering results */}
      <div className="overflow-hidden border-y border-line/10 py-4" aria-label="Highlights">
        <ul className="marquee flex w-max whitespace-nowrap">
          {[...profile.marquee, ...profile.marquee].map((item, i) => (
            <li
              key={i}
              aria-hidden={i >= profile.marquee.length}
              className="px-8 text-xs font-medium uppercase tracking-[0.2em] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
