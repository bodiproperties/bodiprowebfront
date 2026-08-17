"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";

function ServicesHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-neutral-900 sm:h-[90vh]">
      <Image
        src="/images/8.jpg"
        alt="Projects"
        fill
        priority
        className="object-cover transition-transform duration-[2500ms] ease-out"
        style={{ transform: loaded ? "scale(1.08)" : "scale(1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/50 sm:bg-gradient-to-l sm:from-black/30 sm:via-black/45 sm:to-black/65" />

      {/* Дэвсгэрийн торлол */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Гол контент — mobile: доод, голлуулсан; sm+: вертикаль голд, зvvн эгнvvлсэн */}
      <div className="relative z-10 flex h-full items-end sm:items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 text-white sm:px-8 sm:pb-0">
          <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:max-w-2xl sm:text-left">
            {/* Badge pill */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-md sm:gap-2 sm:px-4 sm:py-1.5"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(-10px)",
                transition: "opacity 600ms ease, transform 600ms ease",
              }}
            >
              <Sparkles className="h-3 w-3 shrink-0 text-[#F58220] sm:h-3.5 sm:w-3.5" />
              <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/80 sm:text-[11px] sm:tracking-[0.15em]">
                Bodi Properties · vйл ажиллагаа 2026
              </span>
            </div>

            {/* Accent line + label */}
            <div
              className="mt-4 flex items-center justify-center gap-2 sm:mt-6 sm:justify-start sm:gap-3"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 700ms ease 150ms, transform 700ms ease 150ms",
              }}
            >
              <span className="h-[2px] w-6 bg-[#F58220] sm:w-8" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F58220] sm:text-xs sm:tracking-[0.35em]">
                vйл ажиллагаа
              </p>
            </div>

            {/* Гарчиг — доороосоо гарч ирнэ */}
            <h1 className="mt-4 max-w-4xl select-none overflow-hidden sm:mt-6">
              <span
                className="block text-3xl font-extralight leading-tight sm:text-5xl md:text-7xl"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(110%)",
                  transition:
                    "opacity 900ms ease 280ms, transform 900ms cubic-bezier(0.22,1,0.36,1) 280ms",
                }}
              >
                Хэлбэр, мэдрэмжийн
              </span>
              <span
                className="mt-1 block text-3xl font-extralight leading-tight text-transparent sm:mt-2 sm:text-5xl md:text-7xl"
                style={{
                  WebkitTextStroke: "1px #fff",
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(110%)",
                  transition:
                    "opacity 900ms ease 420ms, transform 900ms cubic-bezier(0.22,1,0.36,1) 420ms",
                }}
              >
                төгс тэнцвэр
              </span>
            </h1>

            <p
              className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-white/70 sm:mx-0 sm:mt-8 sm:max-w-xl sm:text-base"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 700ms ease 700ms, transform 700ms ease 700ms",
              }}
            >
              "Бодь Пропертийз" ХХК нь Монгол Улсын барилгын салбарын хөгжилтэй
              хөл нийлvvлэн, чанартай бvтээн байгуулалтыг хэрэгжvvлэн ажиллаж
              байна.
            </p>

            {/* Dot progress + Play */}
            <div
              className="mt-6 flex items-center justify-center gap-3 sm:mt-10 sm:justify-start sm:gap-4"
              style={{
                opacity: loaded ? 1 : 0,
                transition: "opacity 700ms ease 950ms",
              }}
            >
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === 0 ? "w-5 bg-[#F58220] sm:w-6" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <button className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.1em]">
                <Play className="h-2.5 w-2.5 fill-current sm:h-3 sm:w-3" />
                Тоймыг vзэх
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesHero;
