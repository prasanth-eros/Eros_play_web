const STORAGE_KEY = "erosplay_recent_game_slugs";
const MAX = 12;

export function getRecentGameSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export function recordGameVisit(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const prev = getRecentGameSlugs().filter((s) => s !== slug);
    const next = [slug, ...prev].slice(0, MAX);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota / private mode */
  }
}
