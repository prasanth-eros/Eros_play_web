import { categories } from "@/lib/gameData";

const navItems = [
  { label: "Home", icon: "🏠", active: true },
  { label: "Recently played", icon: "🕐" },
  { label: "New", icon: "✨" },
  { label: "Popular Games", icon: "🔥" },
  { label: "Updated", icon: "🔄" },
  { label: "Originals", icon: "⭐" },
  { label: "Multiplayer", icon: "👥" },
  { label: "Leaderboards", icon: "🏆" },
];

export function Sidebar({
  open,
  onClose,
  collapsed = false,
}: {
  open: boolean;
  onClose: () => void;
  collapsed?: boolean;
}) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-sidebar overflow-y-auto scrollbar-hide border-r border-sidebar-border transition-all duration-200 lg:translate-x-0 ${
          collapsed ? "w-16" : "w-56"
        } ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-3 pt-16 lg:pt-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                collapsed ? "justify-center" : ""
              } ${
                item.active
                  ? "btn-gradient"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="border-t border-sidebar-border mx-3 my-2" />

        <div className="px-3 pb-6 space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              title={collapsed ? cat.name : undefined}
              className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <span>{cat.icon}</span>
              {!collapsed && <span>{cat.name}</span>}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
