import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GameCard } from "@/components/GameCard";
import { GamesPageFrame } from "@/components/GamesPageFrame";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { games } from "@/lib/gameData";
import { findGameByRouteId, metaDescriptionText, resolvePosterUrl } from "@/lib/gameModel";
import { recordGameVisit } from "@/lib/recentGames";

export const Route = createFileRoute("/game/$gameId")({
  loader: ({ params }) => {
    const game = findGameByRouteId(games, params.gameId);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Game Not Found - Eros Play" }] };
    const g = loaderData.game;
    const desc = metaDescriptionText(g);
    const descShort = desc.length > 160 ? `${desc.slice(0, 157)}...` : desc;
    return {
      meta: [
        { title: `${g.name} - Play Free on Eros Play` },
        { name: "description", content: descShort },
        { property: "og:title", content: `${g.name} - Eros Play` },
        { property: "og:description", content: descShort },
        { property: "og:image", content: resolvePosterUrl(g) },
      ],
    };
  },
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
        <button type="button" onClick={reset} className="btn-gradient px-4 py-2 rounded-full text-sm">
          Try again
        </button>
      </div>
    </div>
  ),
  component: GameDetailPage,
});

const htmlBlockClass =
  "game-html text-sm text-muted-foreground leading-relaxed space-y-3 [&_h2]:mt-4 [&_h2]:text-foreground [&_h2]:text-base [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_p]:leading-relaxed";

function GameDetailPage() {
  const { game } = Route.useLoaderData();
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const relatedGames = games
    .filter((g) => g.slug !== game.slug && g.category.name === game.category.name)
    .slice(0, 8);
  const moreGames = games.filter((g) => g.slug !== game.slug).slice(0, 16);

  const iframeSrc = game.desktopUrl;
  const poster = resolvePosterUrl(game);
  const isPortrait = game.orientation === "PORTRAIT";

  const toggleFullscreen = () => {
    const el = document.getElementById("game-frame-wrapper");
    if (!el) return;
    if (!document.fullscreenElement) {
      void el.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  };

  const tagNames = game.tags?.map((t) => t.name) ?? [];
  const aboutHtml = `${game.descriptionFirst ?? ""}${game.descriptionRest ?? ""}`;
  const controlsHtml = game.controls ?? "";

  useEffect(() => {
    recordGameVisit(game.slug);
    setLightboxSrc(null);
  }, [game.slug]);

  return (
    <GamesPageFrame>
      <main className="p-4 md:p-6 space-y-6">
        <Breadcrumbs
          className="mb-2"
          items={[
            { label: "Games", to: "home" },
            { label: game.category.name, to: "category", slug: game.category.slug },
            { label: game.name, current: true },
          ]}
        />

          <div className={`grid grid-cols-1 gap-6 ${moreGames.length > 0 ? "xl:grid-cols-[1fr_320px]" : ""}`}>
            <div className="space-y-6 min-w-0">
              <div
                id="game-frame-wrapper"
                className={`relative w-full bg-black rounded-2xl overflow-hidden border border-border ${
                  isPortrait
                    ? "max-w-none h-[min(85vh,900px)] min-h-[280px]"
                    : "max-w-5xl mx-auto xl:mx-0 aspect-video"
                }`}
              >
                {!isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={poster}
                      alt={game.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="relative z-10 btn-gradient px-8 py-4 rounded-full text-white font-bold text-lg flex items-center gap-3 shadow-2xl"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play {game.name}
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={iframeSrc}
                    title={game.name}
                    className="absolute inset-0 block h-full w-full min-h-0 min-w-full border-0"
                    style={{ width: "100%", height: "100%" }}
                    allow="autoplay; fullscreen; gamepad; microphone; camera"
                    allowFullScreen
                  />
                )}

                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-gradient-to-t from-black/90 to-transparent z-10">
                    <span className="text-white text-sm font-medium">{game.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(false)}
                        className="text-white/80 hover:text-white p-1.5 rounded transition-colors"
                        aria-label="Stop"
                        title="Stop"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="6" width="12" height="12" />
                        </svg>
                      </button>
                      <button
                        type="button"
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

              {game.gameplayPreviews && game.gameplayPreviews.length > 0 && (
                <section
                  aria-labelledby="gameplay-preview-heading"
                  className="rounded-2xl border border-border bg-gradient-to-br from-card/40 to-card/10 p-4 shadow-inner"
                >
                  <h2 id="gameplay-preview-heading" className="text-lg font-bold text-foreground mb-3">
                    Gameplay preview
                  </h2>
                  <p className="mb-3 text-xs text-muted-foreground">Click an image to enlarge.</p>
                  <div className="flex gap-3 overflow-x-auto overscroll-x-contain pb-1 snap-x snap-mandatory [scrollbar-width:thin]">
                    {game.gameplayPreviews.map((src, i) => (
                      <figure
                        key={`${game.slug}-preview-${i}`}
                        className="shrink-0 snap-center overflow-hidden rounded-xl border border-border/90 bg-black/30 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]"
                      >
                        <button
                          type="button"
                          className="block w-full cursor-zoom-in rounded-xl p-0 text-left ring-offset-background transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          onClick={() => setLightboxSrc(src)}
                          aria-label={`Open preview ${i + 1} full size`}
                        >
                          <img
                            src={src}
                            alt={`${game.name} — preview ${i + 1}`}
                            width={400}
                            height={640}
                            loading="lazy"
                            decoding="async"
                            className={
                              isPortrait
                                ? "pointer-events-none block h-auto max-h-56 w-auto max-w-[min(100%,240px)] object-cover object-top sm:max-h-64 sm:max-w-[260px]"
                                : "pointer-events-none block h-auto max-h-48 w-full max-w-md object-cover"
                            }
                          />
                        </button>
                      </figure>
                    ))}
                  </div>

                  <Dialog open={lightboxSrc !== null} onOpenChange={(open) => !open && setLightboxSrc(null)}>
                    <DialogContent className="max-h-[92vh] w-[min(96vw,1100px)] max-w-[min(96vw,1100px)] gap-0 border-border bg-black/95 p-3 sm:p-5">
                      <DialogTitle className="sr-only">
                        {game.name} — gameplay preview
                      </DialogTitle>
                      {lightboxSrc ? (
                        <>
                          <img
                            src={lightboxSrc}
                            alt={`${game.name} — full preview`}
                            className="mx-auto max-h-[min(85vh,900px)] w-auto max-w-full object-contain"
                          />
                          <div className="mt-4 flex justify-center">
                            <DialogClose asChild>
                              <button
                                type="button"
                                className="rounded-full border border-border bg-secondary px-6 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                              >
                                Close
                              </button>
                            </DialogClose>
                          </div>
                        </>
                      ) : null}
                    </DialogContent>
                  </Dialog>
                </section>
              )}

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{game.name}</h1>
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full text-sm text-surface-foreground hover:bg-accent transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Developer:</dt>
                    <dd className="text-foreground font-medium">{game.developer ?? "—"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Rating:</dt>
                    <dd className="text-foreground font-medium">⭐ {game.rating ?? "N/A"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Category:</dt>
                    <dd className="text-foreground font-medium">{game.category.name}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Released:</dt>
                    <dd className="text-foreground font-medium">{game.basicLaunchOn ?? game.addedOn ?? "—"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Technology:</dt>
                    <dd className="text-foreground font-medium">{game.technology ?? "—"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground w-32">Platforms:</dt>
                    <dd className="text-foreground font-medium">{game.platformsDisplay ?? "Web"}</dd>
                  </div>
                </dl>

                {tagNames.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tagNames.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-surface rounded-full text-xs text-surface-foreground cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-border space-y-4">
                  <h2 className="text-lg font-bold text-foreground">About this game</h2>
                  {aboutHtml ? (
                    <div className={htmlBlockClass} dangerouslySetInnerHTML={{ __html: aboutHtml }} />
                  ) : null}
                </div>

                {controlsHtml ? (
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className={htmlBlockClass} dangerouslySetInnerHTML={{ __html: controlsHtml }} />
                  </div>
                ) : null}
              </div>

              {relatedGames.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-foreground mb-4">More {game.category.name} games</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {relatedGames.map((g) => (
                      <GameCard key={g.slug} game={g} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {moreGames.length > 0 && (
              <aside className="space-y-3">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">You may also like</h3>
                <div className="grid grid-cols-2 gap-3">
                  {moreGames.map((g) => (
                    <GameCard key={g.slug} game={g} />
                  ))}
                </div>
              </aside>
            )}
          </div>
        </main>
    </GamesPageFrame>
  );
}
