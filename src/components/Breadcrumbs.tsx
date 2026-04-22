import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import type { BrowseFilter } from "@/lib/gameFilters";

export type BreadcrumbSegment =
  | { label: string; to: "home" }
  | { label: string; to: "category"; slug: string }
  | { label: string; to: "browse"; filter: BrowseFilter }
  | { label: string; current: true };

function Segment({ segment }: { segment: BreadcrumbSegment }) {
  if ("current" in segment && segment.current) {
    return <span className="font-medium text-foreground">{segment.label}</span>;
  }
  if (segment.to === "home") {
    return (
      <Link to="/" className="hover:text-foreground transition-colors">
        {segment.label}
      </Link>
    );
  }
  if (segment.to === "category") {
    return (
      <Link to="/category/$slug" params={{ slug: segment.slug }} className="hover:text-foreground transition-colors">
        {segment.label}
      </Link>
    );
  }
  return (
    <Link to="/browse/$filter" params={{ filter: segment.filter }} className="hover:text-foreground transition-colors">
      {segment.label}
    </Link>
  );
}

export function Breadcrumbs({ items, className }: { items: BreadcrumbSegment[]; className?: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={["flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground", className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((segment, i) => (
        <Fragment key={`${i}-${segment.label}`}>
          {i > 0 && (
            <span className="text-muted-foreground/60 select-none" aria-hidden="true">
              ›
            </span>
          )}
          <Segment segment={segment} />
        </Fragment>
      ))}
    </nav>
  );
}
