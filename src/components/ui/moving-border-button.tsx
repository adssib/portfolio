"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Moving-border button (adapted from Aceternity UI). A conic-gradient ring
 * sweeps continuously around the pill (see `.moving-border-wrap` in
 * globals.css), with a solid inner surface. Monochrome and theme-aware.
 */
type MovingBorderButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export function MovingBorderButton({
  href,
  children,
  className,
  external,
  ariaLabel,
}: MovingBorderButtonProps) {
  return (
    <span className="moving-border-wrap inline-flex w-full sm:w-auto">
      <Link
        href={href}
        aria-label={ariaLabel}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={cn(
          "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-background px-7 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto",
          className
        )}
      >
        {children}
      </Link>
    </span>
  );
}
