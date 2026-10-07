"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Sparkles } from "lucide-react";
import { useLang } from "@/lib/language-context";

function ProjectsHero() {
  const { t } = useLang();
  const p = t.projects;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-neutral-900">
      <Image
        src="/images/12.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover transition-transform duration-[2500ms] ease-out"
        style={{ transform: loaded ? "scale(1.08)" : "scale(1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/45 to-black/65" />

      {/* Дэвсгэрийн торлол */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Гол контент — дэлгэцийн вертикаль голд, баруун талд эгнүүлсэн */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-8 text-white">
          <div className="ml-auto max-w-2xl text-right">
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
                {p.heroPill}
              </span>
            </div>

            {/* Accent line + label */}
            <div
              className="mt-6 flex items-center justify-end gap-3"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 700ms ease 150ms, transform 700ms ease 150ms",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F58220]">
                {p.heroLabel}
              </p>
              <span className="h-[2px] w-8 bg-[#F58220]" />
            </div>

            {/* Гарчиг — доороосоо гарч ирнэ */}
            <h1 className="mt-6 select-none overflow-hidden">
              <span
                className="block text-5xl font-extralight leading-tight md:text-7xl"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(110%)",
                  transition:
                    "opacity 900ms ease 280ms, transform 900ms cubic-bezier(0.22,1,0.36,1) 280ms",
                }}
              >
                {p.heroTitle1}
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
                {p.heroTitle2}
              </span>
            </h1>

            <p
              className="mt-8 ml-auto max-w-xl leading-relaxed text-white/70"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 700ms ease 700ms, transform 700ms ease 700ms",
              }}
            >
              {p.heroDesc}
            </p>

            {/* CTA — төслийн жагсаалт руу гүйлгэнэ */}
            <div
              className="mt-10 flex justify-end"
              style={{
                opacity: loaded ? 1 : 0,
                transition: "opacity 700ms ease 950ms",
              }}
            >
              <a
                href="#projects"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.1em] text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F58220]"
              >
                <ArrowDown className="h-3.5 w-3.5" />
                {p.heroCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsHero;
