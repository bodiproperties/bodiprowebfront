"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";

function AboutHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-neutral-900">
      <Image
        src="/images/news.jpg"
        alt="Architecture building"
        fill
        priority
        className="object-cover transition-transform duration-[2500ms] ease-out"
        style={{ transform: loaded ? "scale(1.08)" : "scale(1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />

      {/* Дэвсгэрийн торлол */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Гол контент — голлуулсан */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Badge pill */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 600ms ease, transform 600ms ease",
          }}
        >
          <Sparkles className="h-3.5 w-3.5 text-[#F58220]" />
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">
            Bodi Properties · Тухай 2026
          </span>
        </div>

        {/* Accent line + label */}
        <div
          className="mt-6 flex items-center gap-3"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 700ms ease 150ms, transform 700ms ease 150ms",
          }}
        >
          <span className="h-[2px] w-8 bg-[#F58220]" />
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F58220]">
            Бидний тухай
          </p>
          <span className="h-[2px] w-8 bg-[#F58220]" />
        </div>

        {/* Гарчиг */}
        <h1 className="mt-8 max-w-4xl select-none overflow-hidden">
          <span
            className="block text-5xl font-extralight leading-tight text-white md:text-7xl"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(110%)",
              transition:
                "opacity 900ms ease 280ms, transform 900ms cubic-bezier(0.22,1,0.36,1) 280ms",
            }}
          >
            Бүтээн байгуулалтаар
          </span>
          <span
            className="mt-2 block text-5xl font-extralight leading-tight text-transparent md:text-7xl"
            style={{
              WebkitTextStroke: "1.5px #fff",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(110%)",
              transition:
                "opacity 900ms ease 420ms, transform 900ms cubic-bezier(0.22,1,0.36,1) 420ms",
            }}
          >
            ирээдүйг бүтээнэ
          </span>
        </h1>

        <p
          className="mt-8 max-w-lg text-base leading-relaxed text-white/70"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 700ms ease 700ms, transform 700ms ease 700ms",
          }}
        >
          1997 оноос хойш чанар, инновац, тогтвортой хөгжлийг эрхэмлэн
          ажилладаг.
        </p>

        {/* Dot progress + Play — голлуулсан */}
        <div
          className="mt-12 flex items-center gap-4"
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
                  i === 0 ? "w-6 bg-[#F58220]" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
          <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-white backdrop-blur-md transition-colors hover:bg-white/20">
            <Play className="h-3 w-3 fill-current" />
            Тоймыг vзэх
          </button>
        </div>
      </div>

      <style jsx>{`
        section {
          font-family: "Space Grotesk", var(--font-sans, sans-serif);
        }
      `}</style>
    </section>
  );
}

export default AboutHero;
