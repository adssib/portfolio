import { asset } from "@/lib/asset";

type Props = {
  src: string;
  alt: string;
  caption: string;
};

/** A polaroid resting slightly rotated; it settles straight while hovered. */
export function PhotoCard({ src, alt, caption }: Props) {
  return (
    <figure className="rotate-[2.5deg] rounded-md bg-surface p-3 pb-0 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)] ring-1 ring-line/10 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:rotate-0">
      <div className="aspect-[4/5] overflow-hidden rounded-sm">
        <img src={asset(src)} alt={alt} className="h-full w-full object-cover" />
      </div>
      <figcaption className="py-4 text-center font-serif text-xl italic text-muted">{caption}</figcaption>
    </figure>
  );
}
