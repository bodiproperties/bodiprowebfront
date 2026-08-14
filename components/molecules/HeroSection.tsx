"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/language-context";

function useCountUp(target: number, start: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

export function HeroSection() {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  const lines: string[] = t.hero.heading.split("\n");

  const projectsCount = useCountUp(12, loaded);
  const yearCount = useCountUp(2018, loaded);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      setOffset({ x: (px - 0.5) * 14, y: (py - 0.5) * 14 });
      setSpot({ x: px * 100, y: py * 100 });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-white"
      aria-label="Hero"
    >
      {/* Дэвсгэрийн торлол — хулгана дагасан spotlight-той grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: loaded ? 1 : 0,
          background: `radial-gradient(360px circle at ${spot.x}% ${spot.y}%, rgba(245,130,32,0.08), transparent 70%)`,
        }}
      />

      {/* Босоо хажуугийн текст */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <p
          className="text-[10px] uppercase tracking-[0.5em] text-neutral-300"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Ulaanbaatar · Mongolia · 47.9184° N
        </p>
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 items-center gap-0 px-6 pt-24 pb-32 lg:grid-cols-[1.15fr_1fr] lg:px-14">
        {/* ===== ЗVVН — typography ===== */}
        <div className="relative z-10">
          <div
            className="flex items-center gap-4"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 700ms ease 100ms, transform 700ms ease 100ms",
            }}
          >
            <span className="h-px w-12 bg-[#F58220]" />
            <p className="text-xs uppercase tracking-[0.35em] text-[#F58220]">
              {t.hero.tagline}
            </p>
          </div>

          <h1 className="mt-10 select-none">
            {lines.map((line: string, i: number) => {
              const isOutline = i === (t.hero.outlineIndex ?? 1);
              const longest = Math.max(...lines.map((l) => l.length));
              const sizeClass =
                longest > 12
                  ? "text-[7.5vw] lg:text-[4.4rem]"
                  : longest > 8
                    ? "text-[9.5vw] lg:text-[5.6rem]"
                    : "text-[13vw] lg:text-[7.5rem]";
              return (
                <span
                  key={i}
                  className="block overflow-visible"
                  style={{ lineHeight: 1.25, marginBottom: "0.05em" }}
                >
                  <span
                    className={`block ${sizeClass} font-extralight ${
                      isOutline ? "text-transparent" : "text-neutral-950"
                    }`}
                    style={{
                      lineHeight: 1.25,
                      ...(isOutline
                        ? { WebkitTextStroke: "1.5px #0a0a0a" }
                        : {}),
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateY(0)" : "translateY(110%)",
                      transition: `opacity 900ms ease ${250 + i * 140}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${250 + i * 140}ms`,
                    }}
                  >
                    {line}
                  </span>
                </span>
              );
            })}
          </h1>

          {/* Гар зурсан мэт зураас — гарчгийн доор */}
          <svg
            width="180"
            height="12"
            viewBox="0 0 180 12"
            className="mt-4"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 300ms ease 900ms",
            }}
          >
            <path
              d="M2 8 Q 45 2, 90 7 T 178 5"
              fill="none"
              stroke="#F58220"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: loaded ? 0 : 200,
                transition:
                  "stroke-dashoffset 1100ms cubic-bezier(0.65,0,0.35,1) 950ms",
              }}
            />
          </svg>

          {/* Тоон статистик — count-up */}
          <div
            className="mt-10 flex flex-wrap items-center gap-10"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 700ms ease 750ms, transform 700ms ease 750ms",
            }}
          >
            <div>
              <p className="text-3xl font-extralight tabular-nums text-neutral-950">
                {projectsCount}+
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                Төсөл
              </p>
            </div>
            <div className="h-10 w-px bg-neutral-200" />
            <div>
              <p className="text-3xl font-extralight tabular-nums text-neutral-950">
                {yearCount}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                Оноос хойш
              </p>
            </div>
            <div className="h-10 w-px bg-neutral-200" />
            <div>
              <p className="text-3xl font-extralight text-neutral-950">UB</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                Байршил
              </p>
            </div>
          </div>
        </div>

        {/* ===== БАРУУН — Blueprint → Reality зурган панель ===== */}
        <div className="relative mt-16 lg:mt-0">
          <div
            className="absolute -right-4 -top-4 h-full w-full border border-[#F58220]/60"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 900ms ease 900ms",
            }}
          />

          <div
            className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100"
            style={{
              clipPath: loaded ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
              transition: "clip-path 1100ms cubic-bezier(0.77,0,0.175,1) 400ms",
            }}
          >
            {/* Зураг — эхлээд хар цагаан, дараа нь өнгөтэй болно */}
            <div
              className="absolute inset-[-30px]"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(1.06)`,
                filter: loaded
                  ? "grayscale(0) contrast(1)"
                  : "grayscale(1) contrast(1.1)",
                transition:
                  "transform 600ms cubic-bezier(0.22,1,0.36,1), filter 1400ms ease 900ms",
              }}
            >
              <Image
                src="/images/11.jpg"
                alt="Modern concrete building with geometric facade"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Blueprint шугам — барилгын ирмэг дагасан, зурагдаж гарна */}
            <svg
              viewBox="0 0 400 500"
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{
                opacity: loaded ? 0 : 1,
                transition: "opacity 600ms ease 1300ms",
              }}
            >
              {[
                "M40 460 L40 160 L140 90 L280 90 L360 160 L360 460 Z",
                "M40 300 L360 300",
                "M140 300 L140 460",
                "M260 300 L260 460",
                "M180 160 L180 300",
                "M220 160 L220 300",
              ].map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#F58220"
                  strokeWidth="1.2"
                  style={{
                    strokeDasharray: 1400,
                    strokeDashoffset: loaded ? 0 : 1400,
                    transition: `stroke-dashoffset 1300ms cubic-bezier(0.65,0,0.35,1) ${300 + i * 120}ms`,
                  }}
                />
              ))}
            </svg>

            <div className="absolute bottom-5 left-5 bg-white/90 px-4 py-2.5 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-900">
                Featured — 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ДООД — running marquee ===== */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-neutral-100 bg-white py-4">
        <div className="marquee flex whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-8 flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-neutral-300"
                >
                  Architecture
                  <span className="h-1 w-1 rounded-full bg-[#F58220]" />
                  Interior
                  <span className="h-1 w-1 rounded-full bg-[#F58220]" />
                  Landscape
                  <span className="h-1 w-1 rounded-full bg-[#F58220]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll заагч */}
      <div className="absolute bottom-20 right-8 hidden flex-col items-center gap-3 lg:flex">
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-neutral-400"
          style={{ writingMode: "vertical-rl" }}
        >
          {t.hero.scroll}
        </span>
        <span className="scroll-line block h-14 w-px bg-neutral-300" />
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .scroll-line {
          position: relative;
          overflow: hidden;
        }
        .scroll-line::after {
          content: "";
          position: absolute;
          left: 0;
          top: -100%;
          width: 100%;
          height: 100%;
          background: #f58220;
          animation: scroll-drop 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
        }
        @keyframes scroll-drop {
          0% {
            top: -100%;
          }
          60% {
            top: 100%;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </section>
  );
}
