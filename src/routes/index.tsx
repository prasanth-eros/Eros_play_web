import { createFileRoute } from "@tanstack/react-router";
import { GameCard } from "@/components/GameCard";
import { GamesPageFrame } from "@/components/GamesPageFrame";
import { HeroBanner } from "@/components/HeroBanner";
import { games } from "@/lib/gameData";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Eros Play - Free Online Games" },
      {
        name: "description",
        content: "Play deployed free online games on Eros Play — browse by category or jump into Bubble Shooter and more.",
      },
    ],
  }),
});

function Index() {
  return (
    <GamesPageFrame>
      <main className="p-4 md:p-6 space-y-8">
        <HeroBanner />

        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Deployed games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>
      </main>
    </GamesPageFrame>
  );
}
