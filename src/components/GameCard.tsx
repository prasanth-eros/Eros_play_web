import { Link } from "@tanstack/react-router";
import type { Game } from "@/lib/gameData";

const badgeClass: Record<string, string> = {
  originals: "badge-tag badge-originals",
  updated: "badge-tag badge-updated",
  top: "badge-tag badge-top",
  new: "badge-tag badge-new",
};

const badgeLabel: Record<string, string> = {
  originals: "⭐ Originals",
  updated: "🔄 Updated",
  top: "🔥 Top",
  new: "✨ New",
};

export function GameCard({ game, size = "normal" }: { game: Game; size?: "normal" | "large" }) {
  const h = size === "large" ? "h-56 md:h-72" : "h-36 md:h-44";

  return (
    <Link
      to="/game/$gameId"
      params={{ gameId: game.id }}
      className={`game-card ${h} group block`}
    >
      {game.badge && (
        <span className={badgeClass[game.badge]}>{badgeLabel[game.badge]}</span>
      )}
      <img src={game.image} alt={game.title} loading="lazy" width={512} height={512} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-sm font-bold text-foreground">{game.title}</p>
        {game.rating && (
          <p className="text-xs text-muted-foreground">⭐ {game.rating}</p>
        )}
      </div>
    </Link>
  );
}
