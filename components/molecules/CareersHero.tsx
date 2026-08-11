import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_SLIDES } from "@/data/careersData";
import { Language } from "@/types";

interface CareersHeroProps {
  lang: Language;
}

function useResponsiveCarousel() {
  const [config, setConfig] = useState({
    cardW: 150,
    cardH: 200,
    gap: 16,
    visible: 3,
  });

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setConfig({ cardW: 88, cardH: 118, gap: 8, visible: 2 });
      } else if (w < 640) {
        setConfig({ cardW: 105, cardH: 140, gap: 10, visible: 2 });
      } else if (w < 768) {
        setConfig({ cardW: 120, cardH: 160, gap: 12, visible: 3 });
      } else if (w < 1024) {
        setConfig({ cardW: 140, cardH: 185, gap: 14, visible: 3 });
      } else {
        setConfig({ cardW: 160, cardH: 215, gap: 16, visible: 3 });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return config;
}

export function CareersHero({ lang }: CareersHeroProps) {
  const [active, setActive] = useState(0);
  const [visibleStart, setVisibleStart] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { cardW, cardH, gap, visible } = useResponsiveCarousel();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_PLAY_INTERVAL = 6000;

  const selectSlide = (i: number) => {
    setActive(i);
    // Keep thumbnail in view
    if (i >= visibleStart + visible || i < visibleStart) {
      setVisibleStart(Math.max(0, Math.min(i, HERO_SLIDES.length - visible)));
    }
  };

  const shiftNext = () => {
    const nextActive = (active + 1) % HERO_SLIDES.length;
    setActive(nextActive);
    if (nextActive >= visibleStart + visible || nextActive < visibleStart) {
      setVisibleStart(
        nextActive === 0
          ? 0
          : Math.min(nextActive, HERO_SLIDES.length - visible),
      );
    }
  };

  const shiftPrev = () => {
    const prevActive = (active - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    setActive(prevActive);
    if (prevActive < visibleStart || prevActive >= visibleStart + visible) {
      setVisibleStart(
        Math.max(0, Math.min(prevActive, HERO_SLIDES.length - visible)),
      );
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        shiftNext();
      }, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, isPlaying, visibleStart, visible]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") shiftNext();
      if (e.key === "ArrowLeft") shiftPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, visibleStart, visible]);

  const scrollToPositions = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-[92vh] min-h-[640px] overflow-hidden bg-neutral-950 select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Top Animated Progress Bar */}
      {isPlaying && (
        <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-white/10">
          <motion.div
            key={active}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
            className="h-full bg-gradient-to-r from-[#F58220] to-amber-400"
          />
        </div>
      )}

      {/* ===== Background Images — Smooth Crossfade & Ken Burns Zoom ===== */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-[1000ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt={s.label[lang]}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-[12000ms] ease-out ${
              i === active ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Multi-layered Vignette & Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/30 to-transparent" />
      <div className="absolute inset-0 bg-black/15 backdrop-brightness-[0.95]" />

      {/* ===== Left Side Animated Content ===== */}
      <div className="relative z-10 flex h-full max-w-7xl mx-auto items-end px-6 pb-20 sm:pb-24 text-white sm:px-8">
        <div className="max-w-3xl">
          {/* Glassmorphic Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-neutral-200 font-medium mb-4 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
            <span>BODI PROPERTIES • CAREERS 2026</span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-[2.5px] bg-[#F58220]"></span>
                <p className="uppercase tracking-[0.35em] text-xs sm:text-sm font-bold text-[#F58220]">
                  {HERO_SLIDES[active].label[lang]}
                </p>
              </div>

              <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.12] tracking-tight drop-shadow-md">
                {HERO_SLIDES[active].title[lang]}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-neutral-300 font-light max-w-xl leading-relaxed">
                {HERO_SLIDES[active].desc[lang]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicator Dots & Play/Pause */}
          <div className="mt-8 flex items-center gap-2.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === active
                    ? "w-10 bg-[#F58220]"
                    : "w-2 bg-white/30 hover:bg-white/70"
                }`}
              />
            ))}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="ml-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition text-xs backdrop-blur-sm border border-white/10 cursor-pointer"
              title={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#F58220]" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#F58220]" />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Right side Floating Thumbnail Window (Clean background, Mouse Drag enabled) ===== */}
      <div className="absolute right-4 bottom-20 z-20 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto sm:right-8 lg:right-16">
        <div
          className="overflow-hidden py-2 px-1 cursor-grab active:cursor-grabbing"
          style={{ width: cardW * visible + gap * (visible - 1) + 8 }}
        >
          <motion.div
            drag="x"
            dragConstraints={{
              left: -((HERO_SLIDES.length - visible) * (cardW + gap)),
              right: 0,
            }}
            dragElastic={0.1}
            animate={{
              x: -visibleStart * (cardW + gap),
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="flex"
            style={{ gap }}
          >
            {HERO_SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={s.id}
                  onClick={() => selectSlide(i)}
                  className={`relative shrink-0 overflow-hidden transition-all duration-300 cursor-pointer group select-none ${
                    isActive
                      ? "ring-2 ring-[#F58220] scale-[1.04] opacity-100 z-10 shadow-2xl shadow-black/80"
                      : "ring-1 ring-white/30 opacity-70 hover:opacity-100 hover:ring-white/70"
                  }`}
                  style={{ width: cardW, height: cardH }}
                  aria-label={s.label[lang]}
                >
                  <img
                    src={s.image}
                    alt={s.label[lang]}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badge (Active indicator or slide number) */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 pointer-events-none">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/60 text-white backdrop-blur-sm border border-white/20">
                      0{i + 1}
                    </span>
                    {isActive && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#F58220] text-white shadow-sm">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Card Title & Category */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left pointer-events-none">
                    <span className="text-[10px] text-[#F58220] uppercase tracking-wider block font-semibold truncate">
                      {s.category[lang]}
                    </span>
                    <span className="text-xs text-white font-medium line-clamp-1 group-hover:text-amber-200 transition-colors">
                      {s.label[lang]}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Arrows — Below Thumbnail Box */}
        <div className="mt-4 flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <button
              onClick={shiftPrev}
              aria-label="Өмнөх"
              className="flex h-10 w-10 items-center justify-center bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-[#F58220] hover:border-[#F58220] active:scale-90 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={shiftNext}
              aria-label="Дараах"
              className="flex h-10 w-10 items-center justify-center bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-[#F58220] hover:border-[#F58220] active:scale-90 cursor-pointer shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <span className="text-xs text-white/80 font-mono bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
            0{active + 1} <span className="text-white/30">/</span> 0
            {HERO_SLIDES.length}
          </span>
        </div>
      </div>
    </section>
  );
}
