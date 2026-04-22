import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GameCard } from "@/components/GameCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GamesPageFrame } from "@/components/GamesPageFrame";
import { categoryBySlug, gamesInCategory } from "@/lib/gameFilters";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category, games: gamesInCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} games - Eros Play` },
          {
            name: "description",
            content: `Browse ${loaderData.category.name} games on Eros Play. Play free in your browser.`,
          },
        ]
      : [{ title: "Category not found - Eros Play" }],
  }),
  notFoundComponent: () => (
    <GamesPageFrame>
      <main className="p-4 md:p-6">
        <p className="text-foreground font-medium">Category not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
          Back to games
        </Link>
      </main>
    </GamesPageFrame>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, games: list } = Route.useLoaderData();

  return (
    <GamesPageFrame>
      <main className="p-4 md:p-6 space-y-6">
        <Breadcrumbs
          className="mb-2"
          items={[{ label: "Games", to: "home" }, { label: category.name, current: true }]}
        />

        <div className="flex items-end gap-3 flex-wrap">
          <span className="text-4xl" aria-hidden>
            {category.icon}
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{category.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">Games in this category on Eros Play.</p>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-xl border border-border bg-card/30 px-4 py-8 text-center">
            No games in this category yet. Check back soon.
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
