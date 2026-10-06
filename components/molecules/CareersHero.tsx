"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { HERO_SLIDES } from "@/data/careersData";
import { Language } from "@/types";

interface CareersHeroProps {
  lang: Language;
}

const AUTO_PLAY_INTERVAL = 6000;
const FADE_DURATION = 0.7; // секунд — crossfade хурд
const N = HERO_SLIDES.length;

const UI = {
  en: {
    tag: "Bodi Properties · Careers 2026",
    active: "Active",
    pause: "Pause",
    play: "Play",
    prev: "Previous",
    next: "Next",
    goTo: "Go to slide",
  },
  mn: {
    tag: "Бодь Пропертийз · Карьер 2026",
    active: "Идэвхтэй",
    pause: "Зогсоох",
    play: "Тоглуулах",
    prev: "Өмнөх",
    next: "Дараах",
    goTo: "Слайд руу шилжих",
  },
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Гадны (Unsplash/Pexels) зургийн URL-д хэрэгтэй өргөнийг тавина.
 * unoptimized: true үед next/image resize хийдэггүй тул үүнгүйгээр
 * thumbnail бүр 2000px зураг татаж, decode хийхэд гацдаг.
 */
function sized(url: string, width: number) {
  if (!url.startsWith("http")) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    u.searchParams.delete("h");
    if (u.hostname.includes("unsplash")) u.searchParams.set("q", "75");
    return u.toString();
  } catch {
    return url;
  }
}

/** Дэлгэцэнд тохирох background өргөн (cache давхардахгүйн тулд 3 шат) */
function pickBgWidth() {
  const px = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  if (px <= 1000) return 1000;
  if (px <= 1700) return 1600;
  return 2400;
}

function useResponsiveCarousel() {
  const [config, setConfig] = useState({ cardW: 160, cardH: 215, gap: 16, visible: 3 });

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const next =
        w < 480
          ? { cardW: 88, cardH: 118, gap: 8, visible: 2 }
          : w < 640
            ? { cardW: 105, cardH: 140, gap: 10, visible: 2 }
            : w < 768
              ? { cardW: 120, cardH: 160, gap: 12, visible: 3 }
              : w < 1024
                ? { cardW: 140, cardH: 185, gap: 14, visible: 3 }
                : { cardW: 160, cardH: 215, gap: 16, visible: 3 };
      // Breakpoint өөрчлөгдөөгүй бол re-render хийхгүй
      setConfig((prev) => (prev.cardW === next.cardW ? prev : next));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return config;
}

export function CareersHero({ lang }: CareersHeroProps) {
  const ui = UI[lang] ?? UI.en;
  const reduceMotion = useReducedMotion();
  const { cardW, cardH, gap, visible } = useResponsiveCarousel();

  const [active, setActive] = useState(0);
  const [visibleStart, setVisibleStart] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [bgW, setBgW] = useState(1600);

  const decoded = useRef<Set<string>>(new Set());
  const requested = useRef(0);

  useEffect(() => setBgW(pickBgWidth()), []);

  // Зургийг урьдчилан татаж decode хийнэ — crossfade эхлэхэд бэлэн байна
  const preload = useCallback(
    (i: number) => {
      const src = sized(HERO_SLIDES[i].image, bgW);
      if (decoded.current.has(src)) return Promise.resolve();
      const img = new Image();
      img.src = src;
      return img
        .decode()
        .catch(() => undefined)
        .then(() => {
          decoded.current.add(src);
        });
    },
    [bgW],
  );

  const ensureThumbVisible = useCallback(
    (i: number) => {
      setVisibleStart((start) => {
        if (i >= start && i < start + visible) return start;
        return Math.max(0, Math.min(i, N - visible));
      });
    },
    [visible],
  );

  const goTo = useCallback(
    (i: number) => {
      requested.current = i;
      ensureThumbVisible(i);
      preload(i).then(() => {
        // Хэрэглэгч дунд нь өөр слайд сонгосон бол хуучныг алгасна
        if (requested.current === i) setActive(i);
      });
    },
    [preload, ensureThumbVisible],
  );

  const next = useCallback(() => goTo((requested.current + 1) % N), [goTo]);
  const prev = useCallback(() => goTo((requested.current - 1 + N) % N), [goTo]);

  // Дараагийн слайдыг арын горимд бэлдэнэ
  useEffect(() => {
    preload((active + 1) % N);
  }, [active, preload]);

  // Tab нуугдсан үед autoplay зогсооно
  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const running = isPlaying && !hovering && pageVisible && !reduceMotion;

  // Autoplay — слайд бүрт нэг setTimeout, interval давхардахгүй
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(next, AUTO_PLAY_INTERVAL);
    return () => clearTimeout(id);
  }, [active, running, next]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const step = cardW + gap;
    const moved = Math.round(info.offset.x / step);
    setVisibleStart((start) => Math.max(0, Math.min(start - moved, N - visible)));
  };

  const slide = HERO_SLIDES[active];

  return (
    <section className="relative h-[92vh] min-h-[640px] overflow-hidden bg-neutral-950 select-none">
      {/* Progress bar — width биш scaleX (layout дахин тооцоолохгүй) */}
      {running && (
        <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-white/10">
          <motion.div
            key={active}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
            style={{ originX: 0 }}
            className="h-full bg-[#F58220]"
          />
        </div>
      )}

      {/* ===== Background — зөвхөн идэвхтэй + гарч буй 2 давхарга DOM-д байна ===== */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Хуучин зураг шинэ нь бүрэн гарч ирэх хүртэл доор нь хэвээр үлдэнэ —
          // ингэснээр дундуур нь харанхуй "dip" үүсэхгүй
          exit={{ opacity: 0, transition: { delay: FADE_DURATION, duration: 0.01 } }}
          transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
          style={{ willChange: "opacity" }}
        >
          <motion.img
            src={sized(slide.image, bgW)}
            alt=""
            referrerPolicy="no-referrer"
            decoding="async"
            fetchPriority={active === 0 ? "high" : "auto"}
            initial={{ scale: 1 }}
            animate={{ scale: reduceMotion ? 1 : 1.07 }}
            transition={{ duration: AUTO_PLAY_INTERVAL / 1000 + 1.5, ease: "linear" }}
            className="h-full w-full object-cover"
            style={{
              willChange: "transform",
              objectPosition: slide.position ?? "center",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Уншигдах байдлын gradient — backdrop-filter ашиглахгүй (frame бүрт дахин зурдаг) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/30 to-transparent" />

      {/* ===== Зүүн талын текст ===== */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-20 text-white sm:px-8 sm:pb-24">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-neutral-200">
            <Sparkles className="h-3.5 w-3.5 text-[#F58220]" />
            <span className="uppercase tracking-[0.12em]">{ui.tag}</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } }}
              aria-live="polite"
            >
              <div className="flex items-center gap-3">
                <span className="h-[2.5px] w-10 bg-[#F58220]" />
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F58220] sm:text-sm">
                  {slide.label[lang]}
                </p>
              </div>

              <h1 className="mt-4 text-3xl font-light leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {slide.title[lang]}
              </h1>

              <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">
                {slide.desc[lang]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots + Play/Pause */}
          <div className="mt-8 flex items-center gap-2.5">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`${ui.goTo} ${idx + 1}`}
                aria-current={idx === active}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  idx === active ? "w-10 bg-[#F58220]" : "w-2 bg-white/30 hover:bg-white/70"
                }`}
              />
            ))}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="ml-4 flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-white/80 transition hover:bg-black/60 hover:text-white"
              aria-label={isPlaying ? ui.pause : ui.play}
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5 text-[#F58220]" />
              ) : (
                <Play className="h-3.5 w-3.5 text-[#F58220]" />
              )}
              <span className="hidden sm:inline">{isPlaying ? ui.pause : ui.play}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== Баруун талын thumbnail — hover дээр л autoplay зогсоно ===== */}
      <div
        className="absolute bottom-20 right-4 z-20 outline-none sm:bottom-auto sm:right-8 sm:top-1/2 sm:-translate-y-1/2 lg:right-16"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        tabIndex={0}
        aria-roledescription="carousel"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
      >
        <div
          className="cursor-grab overflow-hidden px-1 py-2 active:cursor-grabbing"
          style={{ width: cardW * visible + gap * (visible - 1) + 8 }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -((N - visible) * (cardW + gap)), right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
            animate={{ x: -visibleStart * (cardW + gap) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex"
            style={{ gap }}
          >
            {HERO_SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`group relative shrink-0 cursor-pointer overflow-hidden text-left transition-[opacity,transform,box-shadow] duration-300 ${
                    isActive
                      ? "z-10 scale-[1.04] opacity-100 shadow-2xl shadow-black/80 ring-2 ring-[#F58220]"
                      : "opacity-70 ring-1 ring-white/30 hover:opacity-100 hover:ring-white/70"
                  }`}
                  style={{ width: cardW, height: cardH }}
                  aria-label={s.label[lang]}
                >
                  <img
                    src={sized(s.image, 400)}
                    alt=""
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: s.position ?? "center" }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1">
                    <span className="rounded border border-white/20 bg-black/60 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                      {pad(i + 1)}
                    </span>
                    {isActive && (
                      <span className="rounded bg-[#F58220] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-white">
                        {ui.active}
                      </span>
                    )}
                  </div>

                  <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="block truncate text-[10px] font-semibold uppercase tracking-wider text-[#F58220]">
                      {s.category[lang]}
                    </span>
                    <span className="line-clamp-1 text-xs font-medium text-white transition-colors group-hover:text-amber-200">
                      {s.label[lang]}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label={ui.prev}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-white/20 bg-black/40 text-white shadow-lg transition-all hover:border-[#F58220] hover:bg-[#F58220] active:scale-90"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={ui.next}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-white/20 bg-black/40 text-white shadow-lg transition-all hover:border-[#F58220] hover:bg-[#F58220] active:scale-90"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-xs text-white/80">
            {pad(active + 1)} <span className="text-white/30">/</span> {pad(N)}
          </span>
        </div>
      </div>
    </section>
  );
}