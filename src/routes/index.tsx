import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { GameCard } from "@/components/GameCard";
import { HeroBanner } from "@/components/HeroBanner";
import { games } from "@/lib/gameData";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Eros Play - Free Online Games" },
      { name: "description", content: "Play the best free online games. Action, racing, puzzle, sports and more!" },
    ],
  }),
});

function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const topPicks = games.slice(0, 10);
  const featured = games.slice(4, 16);
  const originals = games.filter((g) => g.badge === "originals").concat(games.slice(12, 24));

  return (
    <div className={`min-h-screen transition-all duration-200 ${collapsed ? "lg:pl-16" : "lg:pl-56"}`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={collapsed} />

      <div className="min-w-0">
        <Header
          onMenuToggle={() => setSidebarOpen((o) => !o)}
          onCollapseToggle={() => setCollapsed((c) => !c)}
          collapsed={collapsed}
        />

        <main className="p-4 md:p-6 space-y-8">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Top picks */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Top picks for you</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {topPicks.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>

          {/* Featured games */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Featured games</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {featured.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>

          {/* Originals */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-foreground">Eros Play Originals</h2>
              <button className="text-xs btn-gradient px-3 py-1 rounded-full">View more</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {originals.slice(0, 6).map((game) => (
                <GameCard key={game.id} game={game} size="large" />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
