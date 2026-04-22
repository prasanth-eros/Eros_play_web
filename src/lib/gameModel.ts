/**
 * Canonical game shape aligned with CrazyGames-style API responses.
 * Use `{ game: GameRecord }` as the envelope when mirroring remote APIs.
 */

export type GameThumbLabel = "originals" | "updated" | "top" | "new";

export interface GameCategoryRef {
  name: string;
  slug: string;
  enSlug: string;
  thumbnail: string;
  gamesCount: number;
}

export interface GameTagRef {
  name: string;
  slug: string;
  enSlug: string;
  thumbnail: string;
  gamesCount: number;
}

export interface GameCovers {
  "1x1"?: string;
  "2x3"?: string;
  "16x9"?: string;
}

export interface GameHierarchyItem {
  thumbnail: string;
  isCategory?: boolean;
  name: string;
  slug: string;
  enSlug: string;
}

export interface GameMultiplayerOptions {
  maxLobbySize?: number;
  minLobbySize?: number;
  isMultiplayer?: boolean;
  hasModeratedChat?: boolean;
  supportsInstantJoin?: boolean;
}

/** Inner `game` object from a typical game detail API response. */
export interface GameRecord {
  id: string;
  name: string;
  slug: string;
  https?: boolean;
  rating?: number;
  upvotes?: number;
  downvotes?: number;
  desktopUrl: string;
  category: GameCategoryRef;
  tags?: GameTagRef[];
  descriptionFirst?: string;
  descriptionRest?: string;
  metaDescription?: string;
  developer?: string;
  developerId?: string;
  controls?: string;
  playStoreUrl?: string | null;
  appStoreUrl?: string | null;
  steamStoreUrl?: string | null;
  technology?: string;
  cover?: string;
  covers?: GameCovers;
  hierarchy?: GameHierarchyItem[];
  allowEmbed?: boolean;
  sandbox?: boolean;
  orientation?: string;
  gameThumbLabels?: GameThumbLabel[];
  addedOn?: string;
  basicLaunchOn?: string;
  lastSignificantUpdatedOn?: string;
  multiplayerOptions?: GameMultiplayerOptions;
  structuredData?: Record<string, unknown>;
  loaderConfig?: Record<string, unknown>;
  /** When set, used as the card/poster image (local import URL or absolute URL). */
  posterImage?: string;
  /** Optional screenshots shown on the game detail page (bundled imports or absolute URLs). */
  gameplayPreviews?: string[];
  /** Plain label for the details panel when not parsed from HTML. */
  platformsDisplay?: string;
}

/** Standard API wrapper for a single game payload. */
export type GameApiResponse = { game: GameRecord };

export const CRAZY_IMGS_BASE = "https://imgs.crazygames.com/";

export function resolvePosterUrl(game: GameRecord): string {
  if (game.posterImage) return game.posterImage;
  const key = game.covers?.["16x9"] ?? game.cover;
  if (!key) return "";
  if (key.startsWith("http://") || key.startsWith("https://")) return key;
  return `${CRAZY_IMGS_BASE}${key}?format=auto&quality=85&metadata=none&width=800`;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function metaDescriptionText(game: GameRecord): string {
  if (game.metaDescription) return stripHtml(game.metaDescription);
  if (game.descriptionFirst) return stripHtml(game.descriptionFirst);
  return `Play ${game.name} on Eros Play.`;
}

export function findGameByRouteId(games: GameRecord[], routeId: string): GameRecord | undefined {
  return games.find((g) => g.slug === routeId || g.id === routeId);
}
