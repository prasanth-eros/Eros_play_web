import type { GameRecord } from "@/lib/gameModel";

/** Catalog entry shaped like the CrazyGames game detail `game` object (trimmed optional bulk). */
export const racingLimitsGame: GameRecord = {
  id: "22275",
  name: "Racing Limits",
  slug: "racing-limits",
  https: true,
  rating: 9.1,
  upvotes: 507936,
  downvotes: 49728,
  desktopUrl: "https://games.crazygames.com/en_US/racing-limits/index.html",
  category: {
    name: "Driving",
    slug: "driving",
    enSlug: "driving",
    thumbnail: "tags/driving/thumb-1751624750677.png",
    gamesCount: 290,
  },
  tags: [
    { name: "Mobile", slug: "mobile", enSlug: "mobile", thumbnail: "tags/mobile/thumb-1714486209442.png", gamesCount: 1971 },
    { name: "3D", slug: "3d", enSlug: "3d", thumbnail: "tags/3d/thumb-1752503652920.png", gamesCount: 1340 },
    { name: "Car", slug: "car", enSlug: "car", thumbnail: "tags/car/thumb-1751626053494.png", gamesCount: 364 },
    { name: "Racing", slug: "racing", enSlug: "racing", thumbnail: "tags/racing/thumb-1751476718418.png", gamesCount: 127 },
    { name: "With Friends", slug: "with-friends", enSlug: "with-friends", thumbnail: "tags/with-friends/thumb-1751479863974.png", gamesCount: 129 },
    { name: "Drifting", slug: "drifting", enSlug: "drifting", thumbnail: "tags/drifting/thumb-1751538062374.png", gamesCount: 112 },
    { name: "Multiplayer", slug: "multiplayer", enSlug: "multiplayer", thumbnail: "tags/multiplayer/thumb-1751540045563.png", gamesCount: 333 },
    { name: "Speed", slug: "speed", enSlug: "speed", thumbnail: "tags/speed/thumb-1751538508678.png", gamesCount: 151 },
    { name: "Mission", slug: "mission", enSlug: "mission", thumbnail: "tags/mission/thumb-1750934588262.png", gamesCount: 202 },
  ],
  descriptionFirst:
    "<p>Racing Limits is a racing game that lets you push your skills to the max. Race and overtake vehicles in city and highway traffic with four thrilling game modes: carrier, infinite, against-time, and free mode. Choose between one-way and two-way traffic, and experience three times of day - &#39;Morning,&#39; &#39;Sunset,&#39; and &#39;Night.&#39; With multiple camera angles, sensitive controls, and realistic physics, it&#39;s a high-speed adventure you won&#39;t want to miss. Customize, upgrade, and take on numerous race events in this graphically stunning racing world!</p>",
  descriptionRest:
    "<h2>Release Date</h2><ul><li>March 2018 (iOS)</li><li>April 2018 (Android)</li><li>November 2023 (WebGL)</li></ul><h2>Platforms</h2><ul><li>Web browser</li><li>Android</li><li>iOS</li></ul>",
  metaDescription:
    "Racing Limits is a racing game that lets you push your skills to the max. Race and overtake vehicles in city and highway traffic with four thrilling game modes: carrier, infinite, against-time, and free mode. Choose between one-way and two-way traffic, and experience three times of day - &#39;Morning,&#39; &#39;Sunset,&#39; and &#39;Night.&#39; With multiple camera angles, sensitive controls, and realistic physics, it&#39;s a high-speed adventure you won&#39;t want to miss. Customize, upgrade, and take on numerous race events in this graphically stunning racing world!",
  developer: "Valvolex",
  developerId: "AVgeEmcsFUdmUokEOpiU1eAgIPJ2",
  controls:
    "<h2>Controls</h2><ul><li>Up arrow key to accelerate</li><li>Down arrow key to decelerate</li><li>Left and right arrow keys to steer</li><li>C to change the camera view</li><li>F to use nitro</li><li>E to horn</li><li>W to gear up in manual gear mode</li><li>D to gear down in manual gear mode </li><li>ESC to quit current progress</li></ul>",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.sbkgames.RacingLimits&hl=en_US",
  appStoreUrl: "https://apps.apple.com/us/app/racing-limits/id1324210753",
  steamStoreUrl: null,
  technology: "unity",
  cover: "racing-limits_16x9/20250711091800/racing-limits_16x9-cover",
  covers: {
    "1x1": "racing-limits_1x1/20250711091800/racing-limits_1x1-cover",
    "2x3": "racing-limits_2x3/20250711091800/racing-limits_2x3-cover",
    "16x9": "racing-limits_16x9/20250711091800/racing-limits_16x9-cover",
  },
  hierarchy: [
    { thumbnail: "tags/driving/thumb-1751624750677.png", isCategory: true, name: "Driving", slug: "driving", enSlug: "driving" },
    { thumbnail: "tags/car/thumb-1751626053494.png", isCategory: false, name: "Car", slug: "car", enSlug: "car" },
  ],
  allowEmbed: true,
  sandbox: true,
  orientation: "LANDSCAPE",
  gameThumbLabels: ["originals"],
  addedOn: "2023-11-06",
  basicLaunchOn: "2023-11-06",
  lastSignificantUpdatedOn: "2026-04-09",
  multiplayerOptions: {
    maxLobbySize: 2,
    minLobbySize: 2,
    isMultiplayer: true,
    hasModeratedChat: false,
    supportsInstantJoin: true,
  },
  platformsDisplay: "Web browser, Android, iOS",
};
