import { useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen, Bell, Heart, ChevronDown } from "lucide-react";
import coinIcon from "@/assets/coin.png";

export function Header({
  onMenuToggle,
  onCollapseToggle,
  collapsed = false,
}: {
  onMenuToggle: () => void;
  onCollapseToggle?: () => void;
  collapsed?: boolean;
}) {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-4 py-3 bg-background/90 backdrop-blur-md border-b border-border">
      {/* Mobile menu */}
      <button onClick={onMenuToggle} className="lg:hidden text-foreground p-1" aria-label="Open menu">
        <Menu size={24} />
      </button>

      {/* Desktop collapse toggle */}
      {onCollapseToggle && (
        <button
          onClick={onCollapseToggle}
          className="hidden lg:inline-flex text-foreground p-1 hover:text-primary transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
        </button>
      )}

      <h1 className="text-xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent hidden sm:block">
        Eros Play
      </h1>

      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search games and categories"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full bg-surface px-4 py-2 pl-10 text-sm text-surface-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gradient-start/50"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex" aria-label="Favorites">
          <Heart size={20} />
        </button>

        {/* Profile chip with coin badge */}
        <button
          className="flex items-center gap-1.5 transition-opacity hover:opacity-90"
          aria-label="Profile"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-background">
              <img
                src="https://i.pravatar.cc/80?img=47"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -right-3 -top-1 flex items-center gap-0.5 bg-gradient-to-r from-orange-500 to-amber-400 text-white text-[11px] font-bold rounded-full pl-0.5 pr-1.5 py-0.5 shadow-md ring-2 ring-background">
              <img src={coinIcon} alt="coins" className="w-3.5 h-3.5" />
              30
            </span>
          </div>
          <ChevronDown size={18} className="text-foreground ml-2" />
        </button>
      </div>
    </header>
  );
}
