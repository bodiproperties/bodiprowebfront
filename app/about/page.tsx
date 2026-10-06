"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Target, Eye, X, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { RoadmapSection } from "@/components/molecules/RoadmapSection";
import AboutHero from "@/components/molecules/AboutHero";
import { useLang } from "@/lib/language-context";

const inputClass =
  "w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-[#F58220] focus:bg-white";

export default function AboutPage() {
  const { t, lang } = useLang();
  const a = t.about;
  const f = a.form;
  const childLang = lang === "MN" ? "mn" : "en";

  const [openModal, setOpenModal] = useState(false);

  // Modal нээлттэй үед: Escape-ээр хаах, body scroll түгжих
  useEffect(() => {
    if (!openModal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenModal(false);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openModal]);

  // TODO: Express backend-ийн contact endpoint руу POST болгох. Одоогоор mail client нээнэ.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `${f.name}: ${data.get("name")}`,
      `${f.phone}: ${data.get("phone")}`,
      `${f.email}: ${data.get("email")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${t.contact.email}?subject=${encodeURIComponent(
      f.mailSubject,
    )}&body=${encodeURIComponent(body)}`;
    setOpenModal(false);
  };

  return (
    <main className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <AboutHero />

      {/* INTRO — AboutHero-ийн "#about-intro" товч энд гүйлгэнэ */}
      <section id="about-intro" className="max-w-5xl mx-auto px-6 py-28 scroll-mt-24">
        <Reveal direction="left">
          <h2 className="text-3xl md:text-5xl font-extralight leading-snug text-center">
            {a.valuesTitle}
          </h2>
        </Reveal>
        <Reveal direction="right" delay={150}>
          <p className="mt-10 text-neutral-600 leading-relaxed text-center">
            {a.intro}
          </p>
        </Reveal>
      </section>

      {/* MISSION / VISION — bordered cards */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 grid md:grid-cols-2 gap-6">
        <Reveal direction="left">
          <div className="h-full border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-neutral-400 hover:shadow-md">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-[#F58220]" />
              <h2 className="text-2xl font-light text-neutral-900">
                {a.missionTitle}
              </h2>
            </div>
            <p className="mt-5 text-neutral-600 leading-relaxed">{a.mission}</p>
          </div>
        </Reveal>
        <Reveal direction="right" delay={150}>
          <div className="h-full border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-neutral-400 hover:shadow-md">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-[#F58220]" />
              <h2 className="text-2xl font-light text-neutral-900">
                {a.visionTitle}
              </h2>
            </div>
            <p className="mt-5 text-neutral-600 leading-relaxed">{a.vision}</p>
          </div>
        </Reveal>
      </section>

      {/* IMAGE STRIP */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-[60vh]">
          <Image
            src="/images/3.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative h-[60vh]">
          <Image
            src="/images/6.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* STATS — bordered card grid */}
      <section className="max-w-5xl mx-auto px-6 py-28 grid grid-cols-2 md:grid-cols-4 gap-4">
        {a.stats.map((stat, i) => (
          <Reveal key={stat.label} direction="up" delay={i * 120}>
            <div className="border h-40 border-neutral-200 bg-white p-6 text-center transition-all duration-300 hover:border-[#F58220] hover:shadow-md">
              <p className="text-4xl font-extralight text-neutral-900">
                {stat.num}
              </p>
              <p className="text-xs tracking-[0.25em] text-neutral-500 uppercase mt-2">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ROADMAP */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pb-10">
        <RoadmapSection lang={childLang} />
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-black text-white">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-5xl font-extralight">{a.ctaTitle}</h2>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="mt-10 cursor-pointer border border-white px-10 py-4 text-sm uppercase tracking-widest transition hover:bg-white hover:text-black active:scale-95"
          >
            {a.ctaBtn}
          </button>
        </Reveal>
      </section>

      {/* MODAL */}
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpenModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-contact-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto border border-neutral-200 bg-white p-10"
          >
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="absolute right-6 top-6 text-neutral-400 transition hover:text-black cursor-pointer"
              aria-label={f.close}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F58220]" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F58220]">
                {f.label}
              </p>
            </div>
            <h2 id="about-contact-title" className="mt-4 text-3xl font-extralight">
              {f.title}
            </h2>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={f.name}
                aria-label={f.name}
                className={inputClass}
              />
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder={f.phone}
                aria-label={f.phone}
                className={inputClass}
              />
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder={f.email}
                aria-label={f.email}
                className={inputClass}
              />
              <textarea
                name="message"
                rows={4}
                required
                placeholder={f.message}
                aria-label={f.message}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="mt-6 flex cursor-pointer items-center gap-2 bg-neutral-900 px-10 py-4 text-sm uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-[#F58220] active:scale-95"
              >
                {f.submit}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}