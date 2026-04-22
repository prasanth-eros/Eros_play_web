import { useState, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export function GamesPageFrame({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-200 ${collapsed ? "lg:pl-14" : "lg:pl-52"}`}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onNavigate={() => setSidebarOpen(false)}
      />

      <div className="min-w-0">
        <Header
          onMenuToggle={() => setSidebarOpen((o) => !o)}
          onCollapseToggle={() => setCollapsed((c) => !c)}
          collapsed={collapsed}
        />
        {children}
      </div>
    </div>
  );
}
