import gameBlastZone from "@/assets/game-blast-zone.jpg";
import gameTurboDrift from "@/assets/game-turbo-drift.jpg";
import gameGemCrush from "@/assets/game-gem-crush.jpg";
import gameStarWars from "@/assets/game-star-wars.jpg";
import gameDragonQuest from "@/assets/game-dragon-quest.jpg";
import gameStickFight from "@/assets/game-stick-fight.jpg";
import gameZombieSiege from "@/assets/game-zombie-siege.jpg";
import gameGoalMaster from "@/assets/game-goal-master.jpg";
import gameBlockCraft from "@/assets/game-block-craft.jpg";
import gameDunkMasters from "@/assets/game-dunk-masters.jpg";
import game8BallPool from "@/assets/game-8ball-pool.jpg";
import gameTowerWars from "@/assets/game-tower-wars.jpg";
import gameNinjaDash from "@/assets/game-ninja-dash.jpg";
import gameSpaceBlitz from "@/assets/game-space-blitz.jpg";
import gameCandyBlast from "@/assets/game-candy-blast.jpg";
import gamePiratePlunder from "@/assets/game-pirate-plunder.jpg";
import gameRobotRampage from "@/assets/game-robot-rampage.jpg";
import gameIceClimber from "@/assets/game-ice-climber.jpg";
import gameWordWizard from "@/assets/game-word-wizard.jpg";
import gameMegaKart from "@/assets/game-mega-kart.jpg";
import gameSlimeHop from "@/assets/game-slime-hop.jpg";
import gameCastleSiege from "@/assets/game-castle-siege.jpg";
import gameBubblePop from "@/assets/game-bubble-pop.jpg";
import gameShadowStrike from "@/assets/game-shadow-strike.jpg";

export type Badge = "originals" | "updated" | "top" | "new";

export interface Game {
  id: string;
  title: string;
  image: string;
  badge?: Badge;
  category: string;
  rating?: number;
}

export const games: Game[] = [
  { id: "1", title: "Blast Zone", image: gameBlastZone, badge: "originals", category: "Action", rating: 9.1 },
  { id: "2", title: "Turbo Drift", image: gameTurboDrift, badge: "top", category: "Racing", rating: 8.7 },
  { id: "3", title: "Gem Crush", image: gameGemCrush, badge: "updated", category: "Puzzle", rating: 8.4 },
  { id: "4", title: "Star Wars IO", image: gameStarWars, badge: "originals", category: "Shooting", rating: 9.3 },
  { id: "5", title: "Dragon Quest", image: gameDragonQuest, category: "Adventure", rating: 8.9 },
  { id: "6", title: "Stick Fight", image: gameStickFight, badge: "new", category: "Fighting", rating: 8.2 },
  { id: "7", title: "Zombie Siege", image: gameZombieSiege, badge: "updated", category: "Horror", rating: 8.6 },
  { id: "8", title: "Goal Master", image: gameGoalMaster, badge: "top", category: "Sports", rating: 8.8 },
  { id: "9", title: "Block Craft", image: gameBlockCraft, category: "Sandbox", rating: 9.0 },
  { id: "10", title: "Dunk Masters", image: gameDunkMasters, badge: "new", category: "Basketball", rating: 8.5 },
  { id: "11", title: "8 Ball Pool", image: game8BallPool, badge: "originals", category: "Pool", rating: 8.7 },
  { id: "12", title: "Tower Wars", image: gameTowerWars, badge: "updated", category: "Strategy", rating: 8.3 },
  { id: "13", title: "Ninja Dash", image: gameNinjaDash, badge: "new", category: "Action", rating: 8.8 },
  { id: "14", title: "Space Blitz", image: gameSpaceBlitz, badge: "top", category: "Shooting", rating: 9.0 },
  { id: "15", title: "Candy Blast", image: gameCandyBlast, badge: "originals", category: "Puzzle", rating: 8.5 },
  { id: "16", title: "Pirate Plunder", image: gamePiratePlunder, category: "Adventure", rating: 8.7 },
  { id: "17", title: "Robot Rampage", image: gameRobotRampage, badge: "updated", category: "Action", rating: 8.9 },
  { id: "18", title: "Ice Climber", image: gameIceClimber, badge: "new", category: "Adventure", rating: 8.3 },
  { id: "19", title: "Word Wizard", image: gameWordWizard, category: "Puzzle", rating: 8.1 },
  { id: "20", title: "Mega Kart", image: gameMegaKart, badge: "top", category: "Racing", rating: 9.2 },
  { id: "21", title: "Slime Hop", image: gameSlimeHop, badge: "originals", category: "Casual", rating: 8.4 },
  { id: "22", title: "Castle Siege", image: gameCastleSiege, badge: "updated", category: "Strategy", rating: 8.6 },
  { id: "23", title: "Bubble Pop", image: gameBubblePop, category: "Casual", rating: 8.0 },
  { id: "24", title: "Shadow Strike", image: gameShadowStrike, badge: "new", category: "Fighting", rating: 9.1 },
];

export const categories = [
  { name: "Action", icon: "⚔️" },
  { name: "Adventure", icon: "🗺️" },
  { name: "Basketball", icon: "🏀" },
  { name: "Racing", icon: "🏎️" },
  { name: "Shooting", icon: "🔫" },
  { name: "Puzzle", icon: "🧩" },
  { name: "Sports", icon: "⚽" },
  { name: "Fighting", icon: "🥊" },
  { name: "Horror", icon: "👻" },
  { name: "Sandbox", icon: "🧱" },
  { name: "Strategy", icon: "♟️" },
  { name: "Pool", icon: "🎱" },
  { name: "Casual", icon: "🎮" },
  { name: "Multiplayer", icon: "👥" },
  { name: "Clicker", icon: "👆" },
  { name: "Driving", icon: "🚗" },
  { name: "Stickman", icon: "🏃" },
  { name: "Tower Defense", icon: "🏰" },
];
