import gameBubbleShooter from "@/assets/game-bubble-shooter.png";
import bubbleShooterMenu from "@/assets/bubble-shooter-menu.png";
import bubbleShooterGameplay from "@/assets/bubble-shooter-gameplay.png";
import gameDeepsea2048Cover from "@/assets/game-deepsea2048-cover.png";
import deepsea2048Start from "@/assets/deepsea2048-start.png";
import deepsea2048Gameplay from "@/assets/deepsea2048-gameplay.png";
import type { GameRecord } from "@/lib/gameModel";
import { racingLimitsGame } from "@/lib/racingLimitsGame";

export type { GameApiResponse, GameRecord, GameTagRef, GameCategoryRef } from "@/lib/gameModel";
export { findGameByRouteId, metaDescriptionText, resolvePosterUrl, stripHtml } from "@/lib/gameModel";

const bubbleShooterDescriptionHtml = [
  "A Bubble Shooter game is a casual arcade-style game where the player aims and shoots colored bubbles to match and clear groups from the screen. The main objective is to eliminate all bubbles or achieve the highest score before the bubbles reach a certain limit.",
  "In the game, a cannon or launcher is positioned at the bottom of the screen, allowing the player to shoot bubbles upward. When three or more bubbles of the same color connect, they burst and disappear, earning points. The gameplay requires precision, strategy, and planning, as players must carefully choose angles and rebounds to create effective matches.",
  "As the levels progress, the difficulty increases with more complex bubble arrangements, limited shots, moving obstacles, or special bubbles such as bombs, rainbow bubbles, or blockers. The game often includes power-ups, combos, and scoring bonuses to enhance engagement.",
  "Bubble Shooter games are known for their simple controls, addictive gameplay, and relaxing yet challenging experience, making them popular among players of all ages on mobile devices and web platforms.",
]
  .map((p) => `<p>${p}</p>`)
  .join("");

const bubbleShooterMeta =
  "Play Bubble Shooter free on Eros Play — match colored bubbles, clear the board, and climb the levels. Casual arcade fun in your browser with no download.";

const bubbleShooter: GameRecord = {
  id: "bubble-shooter",
  name: "Bubble Shooter",
  slug: "bubble-shooter",
  https: true,
  rating: 9.0,
  desktopUrl: "https://prasanth-eros.github.io/bubble_shooter/",
  category: {
    name: "Casual",
    slug: "casual",
    enSlug: "casual",
    thumbnail: "",
    gamesCount: 0,
  },
  tags: [
    { name: "Puzzle", slug: "puzzle", enSlug: "puzzle", thumbnail: "", gamesCount: 0 },
    { name: "Arcade", slug: "arcade", enSlug: "arcade", thumbnail: "", gamesCount: 0 },
    { name: "HTML5", slug: "html5", enSlug: "html5", thumbnail: "", gamesCount: 0 },
    { name: "Free", slug: "free", enSlug: "free", thumbnail: "", gamesCount: 0 },
  ],
  descriptionFirst: bubbleShooterDescriptionHtml,
  descriptionRest: "",
  metaDescription: bubbleShooterMeta,
  developer: "Prasanth Eros",
  technology: "HTML5",
  orientation: "PORTRAIT",
  gameThumbLabels: ["new"],
  addedOn: "2026-04-22",
  basicLaunchOn: "2026-04-22",
  allowEmbed: true,
  posterImage: gameBubbleShooter,
  gameplayPreviews: [bubbleShooterMenu, bubbleShooterGameplay],
  platformsDisplay: "Browser, Mobile, Tablet",
};

const deepSea2048DescriptionHtml = [
  "<p><strong>Deep Sea</strong> is a 2048-style puzzle with an underwater twist. Slide numbered tiles on a grid to merge matching values—each merge doubles the tile and inches you closer to the highest numbers.</p>",
  "<p>Press <strong>START</strong> to open the board, then use arrow keys or swipe to move tiles. Plan ahead: every move adds a new tile, so keep space to maneuver and beat your best score.</p>",
  "<p>Track your score, moves, and ascent on the HUD. Use undo when you need a second chance, start fresh when you want a new run, and chase the calm, neon-deep-sea vibe while you climb the ladder.</p>",
].join("");

const deepSea2048Meta =
  "Play Deep Sea 2048 free in your browser — merge tiles, climb the numbers, and beat your best score in this underwater 2048-style puzzle.";

const deepSea2048: GameRecord = {
  id: "deep-sea-2048",
  name: "Deep Sea 2048",
  slug: "deep-sea-2048",
  https: true,
  rating: 8.8,
  desktopUrl: "https://abarna-eros.github.io/game-deepsea2048/",
  category: {
    name: "Puzzle",
    slug: "puzzle",
    enSlug: "puzzle",
    thumbnail: "",
    gamesCount: 0,
  },
  tags: [
    { name: "2048", slug: "2048", enSlug: "2048", thumbnail: "", gamesCount: 0 },
    { name: "Puzzle", slug: "puzzle", enSlug: "puzzle", thumbnail: "", gamesCount: 0 },
    { name: "HTML5", slug: "html5", enSlug: "html5", thumbnail: "", gamesCount: 0 },
    { name: "Casual", slug: "casual", enSlug: "casual", thumbnail: "", gamesCount: 0 },
  ],
  descriptionFirst: deepSea2048DescriptionHtml,
  descriptionRest: "",
  metaDescription: deepSea2048Meta,
  developer: "Abarna Eros",
  technology: "HTML5",
  orientation: "PORTRAIT",
  gameThumbLabels: ["new"],
  addedOn: "2026-04-22",
  basicLaunchOn: "2026-04-22",
  allowEmbed: true,
  posterImage: gameDeepsea2048Cover,
  gameplayPreviews: [deepsea2048Start, deepsea2048Gameplay],
  platformsDisplay: "Browser, Mobile, Tablet",
};

/** Deployed / catalog games (same shape as a CrazyGames-style `{ game }` payload). */
export const games: GameRecord[] = [bubbleShooter, deepSea2048, racingLimitsGame];

export interface CategoryNav {
  name: string;
  slug: string;
  icon: string;
}

/** Sidebar category links — `slug` matches `GameRecord.category.slug` when present in the catalog. */
export const categories: CategoryNav[] = [
  { name: "Action", slug: "action", icon: "⚔️" },
  { name: "Adventure", slug: "adventure", icon: "🗺️" },
  { name: "Basketball", slug: "basketball", icon: "🏀" },
  { name: "Racing", slug: "racing", icon: "🏎️" },
  { name: "Shooting", slug: "shooting", icon: "🔫" },
  { name: "Puzzle", slug: "puzzle", icon: "🧩" },
  { name: "Sports", slug: "sports", icon: "⚽" },
  { name: "Fighting", slug: "fighting", icon: "🥊" },
  { name: "Horror", slug: "horror", icon: "👻" },
  { name: "Sandbox", slug: "sandbox", icon: "🧱" },
  { name: "Strategy", slug: "strategy", icon: "♟️" },
  { name: "Pool", slug: "pool", icon: "🎱" },
  { name: "Casual", slug: "casual", icon: "🎮" },
  { name: "Multiplayer", slug: "multiplayer", icon: "👥" },
  { name: "Clicker", slug: "clicker", icon: "👆" },
  { name: "Driving", slug: "driving", icon: "🚗" },
  { name: "Stickman", slug: "stickman", icon: "🏃" },
  { name: "Tower Defense", slug: "tower-defense", icon: "🏰" },
];
