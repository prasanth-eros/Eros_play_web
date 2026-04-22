import { games, categories, type CategoryNav } from "@/lib/gameData";
import type { GameRecord, GameThumbLabel } from "@/lib/gameModel";

export const BROWSE_FILTERS = [
  "new",
  "popular",
  "updated",
  "originals",
  "multiplayer",
  "recent",
  "leaderboards",
] as const;

export type BrowseFilter = (typeof BROWSE_FILTERS)[number];

export function isBrowseFilter(value: string): value is BrowseFilter {
  return (BROWSE_FILTERS as readonly string[]).includes(value);
}

export function categoryBySlug(slug: string): CategoryNav | undefined {
  return categories.find((c) => c.slug === slug);
}

export function gamesInCategory(slug: string): GameRecord[] {
  return games.filter((g) => g.category.slug === slug || g.category.enSlug === slug);
}

function hasThumb(game: GameRecord, label: GameThumbLabel): boolean {
  return Boolean(game.gameThumbLabels?.includes(label));
}

export function gamesForBrowseFilter(filter: BrowseFilter): GameRecord[] {
  switch (filter) {
    case "new":
      return games.filter((g) => hasThumb(g, "new"));
    case "originals":
      return games.filter((g) => hasThumb(g, "originals"));
    case "updated":
      return games.filter((g) => hasThumb(g, "updated"));
    case "popular":
      return [...games].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "multiplayer":
      return games.filter(
        (g) =>
          g.multiplayerOptions?.isMultiplayer ||
          g.tags?.some((t) => t.slug === "multiplayer" || t.name.toLowerCase() === "multiplayer"),
      );
    case "recent":
      return [];
    case "leaderboards":
      return [];
    default:
      return [];
  }
}

export function browseFilterTitle(filter: BrowseFilter): string {
  switch (filter) {
    case "new":
      return "New games";
    case "popular":
      return "Popular games";
    case "updated":
      return "Updated games";
    case "originals":
      return "Originals";
    case "multiplayer":
      return "Multiplayer";
    case "recent":
      return "Recently played";
    case "leaderboards":
      return "Leaderboards";
    default:
      return "Browse";
  }
}
