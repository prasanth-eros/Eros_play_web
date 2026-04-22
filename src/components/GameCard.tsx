import { Link } from "@tanstack/react-router";
import type { GameRecord, GameThumbLabel } from "@/lib/gameModel";
import { resolvePosterUrl } from "@/lib/gameModel";

const badgeClass: Record<GameThumbLabel, string> = {
  originals: "badge-tag badge-originals",
  updated: "badge-tag badge-updated",
  top: "badge-tag badge-top",
  new: "badge-tag badge-new",
};

const badgeLabel: Record<GameThumbLabel, string> = {
  originals: "⭐ Originals",
  updated: "🔄 Updated",
  top: "🔥 Top",
  new: "✨ New",
};

function thumbBadge(game: GameRecord): GameThumbLabel | undefined {
  const raw = game.gameThumbLabels?.[0];
  return raw && raw in badgeClass ? raw : undefined;
}

export function GameCard({ game, size = "normal" }: { game: GameRecord; size?: "normal" | "large" }) {
  const h = size === "large" ? "h-56 md:h-72" : "h-36 md:h-44";
  const poster = resolvePosterUrl(game);
  const badge = thumbBadge(game);

  return (
    <Link
      to="/game/$gameId"
      params={{ gameId: game.slug }}
      className={`game-card ${h} group block`}
    >
      {badge && (
        <span className={badgeClass[badge]}>{badgeLabel[badge]}</span>
      )}
      <img src={poster} alt={game.name} loading="lazy" width={512} height={512} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-sm font-bold text-foreground">{game.name}</p>
        {game.rating != null && (
          <p className="text-xs text-muted-foreground">⭐ {game.rating}</p>
        )}
      </div>
    </Link>
  );
}
