import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { categories } from "@/lib/gameData";
import type { BrowseFilter } from "@/lib/gameFilters";

const navItems: {
  label: string;
  icon: string;
  to: "home" | "browse";
  filter?: BrowseFilter;
}[] = [
  { label: "Home", icon: "🏠", to: "home" },
  { label: "Recently played", icon: "🕐", to: "browse", filter: "recent" },
  { label: "New", icon: "✨", to: "browse", filter: "new" },
  { label: "Popular Games", icon: "🔥", to: "browse", filter: "popular" },
  { label: "Updated", icon: "🔄", to: "browse", filter: "updated" },
  { label: "Originals", icon: "⭐", to: "browse", filter: "originals" },
  { label: "Multiplayer", icon: "👥", to: "browse", filter: "multiplayer" },
  { label: "Leaderboards", icon: "🏆", to: "browse", filter: "leaderboards" },
];

function navRowClasses(active: boolean, collapsed: boolean) {
  const layout =
    "group relative flex w-full items-center gap-1.5 rounded-lg border py-1.5 transition-all duration-200 ease-out " +
    (collapsed ? "justify-center px-0.5" : "px-1.5");
  if (active) {
    return (
      `${layout} border-primary/50 bg-gradient-to-br from-primary/25 via-cyan-500/[0.12] to-transparent ` +
      "text-white shadow-[0_0_28px_-6px_rgba(0,184,248,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] " +
      "before:pointer-events-none before:absolute before:inset-y-0.5 before:left-0 before:w-[2px] before:rounded-full before:bg-gradient-to-b before:from-[var(--gradient-start)] before:to-[var(--gradient-end)]"
    );
  }
  return (
    `${layout} border-transparent text-sidebar-foreground/90 ` +
    "hover:border-white/15 hover:bg-white/[0.06] hover:text-foreground " +
    "hover:shadow-[0_0_22px_-8px_rgba(92,182,23,0.25)] active:scale-[0.98]"
  );
}

function iconPodClasses(active: boolean) {
  const base =
    "flex size-8 shrink-0 items-center justify-center rounded-md text-[0.95rem] leading-none transition-all duration-200 ";
  if (active) {
    return (
      base +
      "border border-primary/60 bg-black/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_18px_-2px_rgba(0,184,248,0.45)]"
    );
  }
  return (
    base +
    "border border-white/[0.1] bg-black/35 shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] " +
    "group-hover:border-primary/45 group-hover:bg-black/50 group-hover:shadow-[0_0_16px_-3px_rgba(92,182,23,0.28)]"
  );
}

function SectionLabel({ collapsed, children }: { collapsed: boolean; children: ReactNode }) {
  if (collapsed) return null;
  return (
    <p className="px-0.5 pb-0.5 pt-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/55">
      {children}
    </p>
  );
}

function SidebarDivider() {
  return (
    <div
      className="mx-0.5 my-2 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-80"
      aria-hidden
    />
  );
}

export function Sidebar({
  open,
  onClose,
  collapsed = false,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const homeActive = pathname === "/";
  const browseActive = (f: BrowseFilter) => pathname === `/browse/${f}`;

  const asideWidth = collapsed ? "w-14" : "w-52";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/65 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`sidebar-gaming fixed top-0 left-0 z-50 h-screen overflow-y-auto scrollbar-hide transition-[width,transform] duration-200 ease-out lg:translate-x-0 ${asideWidth} ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Subtle HUD corner accents */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(135deg, transparent 48%, rgba(255,255,255,0.5) 49%, transparent 50%),
              linear-gradient(-135deg, transparent 48%, rgba(255,255,255,0.35) 49%, transparent 50%)`,
            backgroundSize: "14px 14px",
          }}
          aria-hidden
        />

        <div className="relative flex flex-col px-1.5 pb-4 pt-14 lg:pt-2.5">
          {!collapsed && (
            <div className="mb-2 px-0.5">
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/35 px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_-8px_rgba(0,184,248,0.18)]">
                <div className="absolute -right-4 -top-4 size-16 rounded-full bg-primary/15 blur-xl" aria-hidden />
                <div className="relative flex items-center gap-1.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-gradient-to-br from-primary/30 to-cyan-500/20 text-base shadow-[0_0_14px_-4px_rgba(0,184,248,0.45)]">
                    🎮
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-black uppercase tracking-[0.12em] text-white/95 leading-tight">
                      Eros Play
                    </p>
                    <p className="text-[9px] font-medium leading-tight text-primary/90">Game hub</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <SectionLabel collapsed={collapsed}>Menu</SectionLabel>
          <div className="space-y-px">
            {navItems.map((item) => {
              const active =
                item.to === "home" ? homeActive : browseActive(item.filter ?? "new");
              const row = navRowClasses(active, collapsed);
              const pod = iconPodClasses(active);

              if (item.to === "home") {
                return (
                  <Link
                    key={item.label}
                    to="/"
                    title={collapsed ? item.label : undefined}
                    className={row}
                    onClick={() => onNavigate?.()}
                  >
                    <span className={pod} aria-hidden>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="min-w-0 truncate text-[12px] font-semibold leading-snug tracking-tight">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.label}
                  to="/browse/$filter"
                  params={{ filter: item.filter! }}
                  title={collapsed ? item.label : undefined}
                  className={row}
                  onClick={() => onNavigate?.()}
                >
                  <span className={pod} aria-hidden>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="min-w-0 truncate text-[12px] font-semibold leading-snug tracking-tight">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <SidebarDivider />

          <SectionLabel collapsed={collapsed}>Genres</SectionLabel>
          <div className="space-y-px">
            {categories.map((cat) => {
              const active = pathname === `/category/${cat.slug}`;
              const row = navRowClasses(active, collapsed);
              const pod = iconPodClasses(active);
              return (
                <Link
                  key={cat.slug}
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  title={collapsed ? cat.name : undefined}
                  className={row}
                  onClick={() => onNavigate?.()}
                >
                  <span className={pod} aria-hidden>
                    {cat.icon}
                  </span>
                  {!collapsed && (
                    <span className="min-w-0 truncate text-[12px] font-semibold leading-snug tracking-tight">
                      {cat.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
