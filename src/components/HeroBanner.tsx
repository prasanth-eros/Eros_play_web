import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import heroCover from "@/assets/game-bubble-shooter.png";
import heroMenu from "@/assets/bubble-shooter-menu.png";
import heroGameplay from "@/assets/bubble-shooter-gameplay.png";
import { games } from "@/lib/gameData";

/** Featured hero game (first in catalog). */
const game = games[0]!;

const slides = [
  {
    image: heroCover,
    title: game.name,
    subtitle: "Match colors, clear the board, and beat your high score — play free in your browser.",
    badge: "✨ Now live",
  },
  {
    image: heroMenu,
    title: game.name,
    subtitle: "Simple controls, relaxing flow, and levels that ramp up the challenge.",
    badge: "🎮 Deployed on Eros Play",
  },
  {
    image: heroGameplay,
    title: game.name,
    subtitle: "Aim the cannon, plan your angles, and pop groups of three or more.",
    badge: "⭐ Casual arcade",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "3/1", minHeight: 200 }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={640}
            {...(i === 0 ? {} : { loading: "lazy" as const })}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 z-10">
            <span className="inline-block w-fit text-xs font-bold px-3 py-1 rounded-full btn-gradient text-white mb-3">
              {slide.badge}
            </span>
            <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">{slide.title}</h2>
            <p className="text-sm md:text-lg text-white/80 mb-4 max-w-md">
              {slide.subtitle}
            </p>
            <Link
              to="/game/$gameId"
              params={{ gameId: game.slug }}
              className="btn-gradient w-fit px-6 py-2.5 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity inline-flex items-center justify-center"
            >
              Play Now
            </Link>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
