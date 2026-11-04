"use client";

import { useId, useRef, useState } from "react";
import { Plus } from "lucide-react";

import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

type Details = {
  context: string;
  areas: string[];
  did: string[];
  influence: { metric: string; label: string }[];
  exposed: string[];
};

export type Role = {
  org: string;
  role: string;
  period: string;
  logo?: string;
  details?: Details;
};

function RowSummary({ role }: { role: Role }) {
  return (
    <>
      {role.logo ? (
        // Logos sit on a light tile so black marks stay visible in dark mode
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-line/10">
          <img src={asset(role.logo)} alt={`${role.org} logo`} className="h-full w-full object-contain" />
        </span>
      ) : (
        // No logo yet: the first letter on an accent tile
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 font-serif text-xl text-accent ring-1 ring-accent/25"
        >
          {role.org[0]}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{role.org}</span>
        <span className="block text-sm text-muted">{role.role}</span>
        {/* On phones the date moves under the title so long titles keep their width */}
        <span className="block text-sm text-muted sm:hidden">{role.period}</span>
      </span>
      <span className="hidden shrink-0 text-right text-sm text-muted sm:block">{role.period}</span>
    </>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap content-start gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-line/15 px-3 py-1 text-sm text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

type Tab = { label: string; has: (d: Details) => boolean; render: (d: Details) => React.ReactNode };

const allTabs: Tab[] = [
  {
    label: "What I did",
    has: (d) => d.did.length > 0,
    render: (d: Details) => (
      <ul className="list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed marker:text-accent">
        {d.did.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Influence",
    has: (d) => d.influence.length > 0,
    render: (d: Details) => (
      <ul className="grid content-start gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {d.influence.map((item) => (
          <li key={item.metric}>
            <span className="block font-serif text-2xl leading-tight text-green">{item.metric}</span>
            <span className="block text-sm text-muted">{item.label}</span>
          </li>
        ))}
      </ul>
    ),
  },
  { label: "Areas", has: (d) => d.areas.length > 0, render: (d) => <Chips items={d.areas} /> },
  { label: "Exposed to", has: (d) => d.exposed.length > 0, render: (d) => <Chips items={d.exposed} /> },
];

/** One tab of detail at a time keeps an open row well under a screen tall. */
function RoleDetails({ details }: { details: Details }) {
  const id = useId();
  // Tabs with nothing in them yet (say, no numbers for a new role) are skipped
  const tabs = allTabs.filter((t) => t.has(details));
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="pb-6 md:pl-14">
      <p className="max-w-3xl font-serif text-lg italic leading-snug text-muted">{details.context}</p>

      <div
        role="tablist"
        aria-label="Experience details"
        onKeyDown={onKeyDown}
        className="mt-4 flex gap-5 border-b border-line/10"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-2 pb-2 text-sm transition-colors duration-300",
              active === i
                ? "border-accent font-medium text-ink"
                : "border-transparent text-muted hover:text-ink"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="mt-4"
        >
          {tab.render(details)}
        </div>
      ))}
    </div>
  );
}

function ExpandableRow({
  role,
  details,
  open,
  onToggle,
}: {
  role: Role;
  details: Details;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const row = useRef<HTMLLIElement>(null);

  return (
    <li ref={row} className="border-b border-line/10">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 py-4 text-left"
        >
          <RowSummary role={role} />
          <Plus
            aria-hidden
            className={cn(
              "h-5 w-5 shrink-0 text-accent transition-transform duration-500 ease-in-out group-hover:scale-110",
              open && "rotate-45"
            )}
          />
        </button>
      </h3>
      {/* grid-rows 0fr → 1fr animates to the content's natural height */}
      <div
        id={id}
        role="region"
        aria-label={`${role.org} details`}
        className={cn(
          "grid transition-[grid-template-rows,visibility] duration-500 ease-in-out",
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        )}
        // Scroll only as far as needed to get the whole open row on screen.
        onTransitionEnd={(e) => {
          if (open && e.target === e.currentTarget && e.propertyName === "grid-template-rows") {
            row.current?.scrollIntoView({ block: "nearest" });
          }
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <RoleDetails details={details} />
        </div>
      </div>
    </li>
  );
}

/** Work history. Rows with details unfold in place, one at a time. */
export function ExperienceList({ roles }: { roles: Role[] }) {
  const [openOrg, setOpenOrg] = useState<string | null>(null);

  return (
    <ul className="border-t border-line/10">
      {roles.map((role) =>
        role.details ? (
          <ExpandableRow
            key={role.org}
            role={role}
            details={role.details}
            open={openOrg === role.org}
            onToggle={() => setOpenOrg(openOrg === role.org ? null : role.org)}
          />
        ) : (
          <li key={role.org} className="flex items-center gap-4 border-b border-line/10 py-4">
            <RowSummary role={role} />
            {/* Keeps the dates lined up with the rows that have a plus */}
            <span aria-hidden className="h-5 w-5 shrink-0" />
          </li>
        )
      )}
    </ul>
  );
}
