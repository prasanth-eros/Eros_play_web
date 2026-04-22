import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GameCard } from "@/components/GameCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GamesPageFrame } from "@/components/GamesPageFrame";
import { games } from "@/lib/gameData";
import {
  browseFilterTitle,
  gamesForBrowseFilter,
  isBrowseFilter,
  type BrowseFilter,
} from "@/lib/gameFilters";
import type { GameRecord } from "@/lib/gameModel";
import { getRecentGameSlugs } from "@/lib/recentGames";

export const Route = createFileRoute("/browse/$filter")({
  loader: ({ params }) => {
    if (!isBrowseFilter(params.filter)) throw notFound();
    const filter = params.filter;
    const list = filter === "recent" ? [] : gamesForBrowseFilter(filter);
    return { filter, games: list };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${browseFilterTitle(loaderData.filter)} - Eros Play` },
          {
            name: "description",
            content: `Discover ${browseFilterTitle(loaderData.filter).toLowerCase()} on Eros Play — play free in your browser.`,
          },
        ]
      : [{ title: "Browse - Eros Play" }],
  }),
  notFoundComponent: () => (
    <GamesPageFrame>
      <main className="p-4 md:p-6">
        <p className="text-foreground font-medium">This browse view does not exist.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
          Back to games
        </Link>
      </main>
    </GamesPageFrame>
  ),
  component: BrowsePage,
});

function gamesFromRecentSlugs(slugs: string[]): GameRecord[] {
  const order = new Map(slugs.map((s, i) => [s, i]));
  return games
    .filter((g) => order.has(g.slug))
    .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
}

function BrowsePage() {
  const { filter, games: serverList } = Route.useLoaderData();
  const [recentGames, setRecentGames] = useState<GameRecord[]>([]);

  useEffect(() => {
    if (filter !== "recent") return;
    setRecentGames(gamesFromRecentSlugs(getRecentGameSlugs()));
  }, [filter]);

  const list = filter === "recent" ? recentGames : serverList;
  const title = browseFilterTitle(filter as BrowseFilter);

  const emptyMessage = (() => {
    if (filter === "leaderboards") return "Leaderboards are coming soon.";
    if (filter === "recent")
      return "Play a game to build your history — your recently played titles will show up here.";
    return "No games match this filter right now.";
  })();

  return (
    <GamesPageFrame>
      <main className="p-4 md:p-6 space-y-6">
        <Breadcrumbs className="mb-2" items={[{ label: "Games", to: "home" }, { label: title, current: true }]} />

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">Curated from games deployed on Eros Play.</p>
        </div>

        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-xl border border-border bg-card/30 px-4 py-8 text-center">
            {emptyMessage}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {list.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        )}
      </main>
    </GamesPageFrame>
  );
}
