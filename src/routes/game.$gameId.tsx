import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { GameCard } from "@/components/GameCard";
import { games } from "@/lib/gameData";

export const Route = createFileRoute("/game/$gameId")({
  loader: ({ params }) => {
    const game = games.find((g) => g.id === params.gameId);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.game.title} - Play Free on Eros Play` },
          { name: "description", content: `Play ${loaderData.game.title} free online. ${loaderData.game.category} game with rating ${loaderData.game.rating ?? "N/A"}.` },
          { property: "og:title", content: `${loaderData.game.title} - Eros Play` },
          { property: "og:description", content: `Play ${loaderData.game.title} free online.` },
          { property: "og:image", content: loaderData.game.image },
        ]
      : [{ title: "Game Not Found - Eros Play" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Game not found</h1>
        <Link to="/" className="btn-gradient inline-block px-4 py-2 rounded-full text-sm">
          Back to home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen items-center justify-center text-center px-4">
      <div>
        <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
        <button onClick={reset} className="btn-gradient px-4 py-2 rounded-full text-sm">
          Try again
        </button>
      </div>
    </div>
  ),
  component: GameDetailPage,
});

function GameDetailPage() {
  const { game } = Route.useLoaderData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const relatedGames = games.filter((g) => g.id !== game.id && g.category === game.category).slice(0, 8);
  const moreGames = games.filter((g) => g.id !== game.id).slice(0, 16);

  // Game iframe URL
  const iframeSrc = `https://games.crazygames.com/en_US/racing-limits/index.html?v=1.355`;

  const toggleFullscreen = () => {
    const el = document.getElementById("game-frame-wrapper");
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-200 ${collapsed ? "lg:pl-16" : "lg:pl-56"}`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={collapsed} />

      <div className="min-w-0">
        <Header
          onMenuToggle={() => setSidebarOpen((o) => !o)}
          onCollapseToggle={() => setCollapsed((c) => !c)}
          collapsed={collapsed}
        />

        <main className="p-4 md:p-6 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Games</Link>
            <span>›</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">{game.category}</span>
            <span>›</span>
            <span className="text-foreground font-medium">{game.title}</span>
          </nav>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* Main content */}
            <div className="space-y-6 min-w-0">
              {/* Game player */}
              <div
                id="game-frame-wrapper"
                className="relative w-full bg-black rounded-2xl overflow-hidden border border-border"
                style={{ aspectRatio: "16/9" }}
              >
                {!isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="relative z-10 btn-gradient px-8 py-4 rounded-full text-white font-bold text-lg flex items-center gap-3 shadow-2xl"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play {game.title}
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={iframeSrc}
                    title={game.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; fullscreen; gamepad; microphone; camera"
                    allowFullScreen
                  />
                )}

                {/* Bottom toolbar */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-gradient-to-t from-black/90 to-transparent z-10">
                    <span className="text-white text-sm font-medium">{game.title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="text-white/80 hover:text-white p-1.5 rounded transition-colors"
                        aria-label="Stop"
                        title="Stop"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" /></svg>
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="text-white/80 hover:text-white p-1.5 rounded transition-colors"
                        aria-label="Fullscreen"
                        title="Fullscreen"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 7V3h4M21 7V3h-4M3 17v4h4M21 17v4h-4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Game info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{game.title}</h1>
                    <button className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full text-sm text-surface-foreground hover:bg-accent transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Developer:</dt>
                    <dd className="text-foreground font-medium">Eros Play</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Rating:</dt>
                    <dd className="text-foreground font-medium">⭐ {game.rating ?? "N/A"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Category:</dt>
                    <dd className="text-foreground font-medium">{game.category}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Released:</dt>
                    <dd className="text-foreground font-medium">2025</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Technology:</dt>
                    <dd className="text-foreground font-medium">HTML5</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Platforms:</dt>
                    <dd className="text-foreground font-medium">Browser, Mobile, Tablet</dd>
                  </div>
                </dl>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {[game.category, "Multiplayer", "Casual", "HTML5", "Free", "2D"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-surface rounded-full text-xs text-surface-foreground hover:bg-accent transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-border space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {game.title} is an exciting {game.category.toLowerCase()} game where you'll experience thrilling gameplay
                    and engaging mechanics. Play free online directly in your browser — no downloads required.
                  </p>

                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-2">How to Play {game.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Use your mouse or keyboard to control the action. Master the mechanics by practicing each level,
                      and aim to score as high as possible. Each level offers unique challenges that test your skills.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-2">Tips and Tricks</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Take your time to learn the patterns of obstacles. Quick reflexes and strategic thinking will help
                      you progress faster through the game.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related games */}
              {relatedGames.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-foreground mb-4">More {game.category} Games</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {relatedGames.map((g) => (
                      <GameCard key={g.id} game={g} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right sidebar — more games */}
            <aside className="space-y-3">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">You may also like</h3>
              <div className="grid grid-cols-2 gap-3">
                {moreGames.map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
