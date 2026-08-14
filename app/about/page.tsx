"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RoadmapSection } from "@/components/molecules/RoadmapSection";
import { Target, Eye, X, Send } from "lucide-react";
import AboutHero from "@/components/molecules/AboutHero";

/* Scroll дээр харагдах үед гулсаж орж ирэх бүрхүүл */
function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden =
    direction === "left"
      ? "-translate-x-16 opacity-0"
      : direction === "right"
        ? "translate-x-16 opacity-0"
        : "translate-y-12 opacity-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        shown ? "translate-x-0 translate-y-0 opacity-100" : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <main className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <AboutHero />
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <Reveal direction="left">
          <h2 className="text-3xl md:text-5xl font-extralight leading-snug text-center">
            Алсын хараа эрхэм зорлиго
          </h2>
        </Reveal>
        <Reveal direction="right" delay={150}>
          <p className="mt-10 text-neutral-600 leading-relaxed text-center">
            Бодь Пропертийз" ХХК нь анх 1997 онд vл хөдлөх хөрөнгө, барилга
            угсралтын ажлын төлөвлөлт, санхvvжилт, хэрэгжилтийг иж бvрнээр нь
            гvйцэтгэгч төслийн байгууллагын хэлбэрээр vйл ажиллагаа явуулж
            эхэлсэн. Байгуулагдсанаас хойш барилгын салбар цаашлаад улс,
            нийслэлийн их бvтээн байгуулалт, өнгө төрхөд бодитой хувь нэмэр
            оруулсан олон төслvvдийг амжилттай хэрэгжvvлсэн.
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
                Эрхэм зорлиго
              </h2>
            </div>
            <p className="mt-5 text-neutral-600 leading-relaxed">
              Бид чанар, инновац, тогтвортой хөгжлийг эрхэмлэн, хэрэглэгчдийн
              хэрэгцээ, хvлээлтэд нийцсэн аюулгvй, vнэ цэнтэй бvтээн байгуулалтыг
              хэрэгжvvлж, амьдрах болон ажиллах таатай орчныг бvрдvvлэхийг
              зорьдог.
            </p>
          </div>
        </Reveal>
        <Reveal direction="right" delay={150}>
          <div className="h-full border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-neutral-400 hover:shadow-md">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-[#F58220]" />
              <h2 className="text-2xl font-light text-neutral-900">
                Алсын хараа
              </h2>
            </div>
            <p className="mt-5 text-neutral-600 leading-relaxed">
              Барилга, vл хөдлөх хөрөнгийн салбарт инновац, чанар, тогтвортой
              хөгжлөөр манлайлан, Монголын ирээдvйн vнэ цэнтэй орон зайг бvтээх
              тэргvvлэгч компани байна.
            </p>
          </div>
        </Reveal>
      </section>

      {/* IMAGE STRIP */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-[60vh]">
          <Image
            src="/images/3.jpg"
            alt="Interior"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-[60vh]">
          <Image
            src="/images/6.jpg"
            alt="Exterior"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* STATS — bordered card grid */}
      <section className="max-w-5xl mx-auto px-6 py-28 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["60+", "Төслийн удирдлага, зөвлөх vйлчилгээ"],
          ["122+", "Манай ажилтнууд"],
          ["140+", "Олон улсын стандарт хангасан ажиллагаа"],
          ["31+", "Бодит Бvтээн байгуулалтууд"],
        ].map(([num, label], i) => (
          <Reveal key={i} direction="up" delay={i * 120}>
            <div className="border border-neutral-200 bg-white p-6 text-center transition-all duration-300 hover:border-[#F58220] hover:shadow-md">
              <p className="text-4xl font-extralight text-neutral-900">{num}</p>
              <p className="text-xs tracking-[0.25em] text-neutral-500 uppercase mt-2">
                {label}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* DIRECTOR MESSAGE */}
      <section className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-20 items-center">
        <Reveal direction="left" className="relative h-[500px]">
          <Image
            src="/images/prodirector.jpg"
            alt="Director"
            fill
            className="object-contain"
          />
        </Reveal>
        <Reveal direction="right" delay={150}>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#F58220]" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F58220]">
              Захиралын мэндчилгээ
            </p>
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl font-extralight leading-tight">
            Манай байгууллагын цахим хуудсанд тавтай морилно уу.
          </h2>
          <p className="mt-8 text-neutral-600 leading-relaxed">
            1997 онд байгуулагдсан Бодь Пропертийз ХХК нь vл хөдлөх хөрөнгө,
            барилга бvтээн байгуулалтын төслvvдийг төлөвлөлтөөс хэрэгжилт хvртэл
            цогцоор нь хэрэгжvvлэн ажиллаж байна. Байгуулагдсан цагаасаа эхлэн
            Монгол Улсын бvтээн байгуулалт, хөрөнгө оруулалтын салбарт vнэтэй
            хувь нэмэр оруулж, чанар, инновац, мэргэжлийн ур чадвараараа олон
            удаа шилдэг байгууллагаар шалгарсан. Манай чадварлаг хамт олон орчин
            vеийн техник, технологийг ашиглан захиалагчдын хэрэгцээнд нийцсэн,
            чанартай, найдвартай бvтээн байгуулалтыг хэрэгжvvлж, харилцагчдынхаа
            итгэлийг хvлээсээр ирсэн. Бид цаашид ч хvний нөөц, инновац,
            тогтвортой хөгжлийг эрхэмлэн, vнэ цэнтэй орон зай, бvтээн
            байгуулалтыг бий болгохын төлөө тууштай ажиллах болно.
          </p>
          <div className="mt-10 border-l-2 border-[#F58220] pl-5">
            <p className="text-xl font-light">Б.ТЭГШБАЯР</p>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-400 mt-2">
              Бодь Пропертийз ХХК-н Гvйцэтгэх Захирал
            </p>
          </div>
        </Reveal>
      </section>

      {/* ROADMAP */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pb-10">
        <RoadmapSection lang="mn" />
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-black text-white">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-5xl font-extralight">
            Let&apos;s build something timeless together
          </h2>
          <button
            onClick={() => setOpenModal(true)}
            className="mt-10 cursor-pointer border border-white px-10 py-4 text-sm tracking-widest transition hover:bg-white hover:text-black active:scale-95"
          >
            CONTACT US
          </button>
        </Reveal>
      </section>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl border border-neutral-200 bg-white p-10">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-6 top-6 text-neutral-400 transition hover:text-black"
              aria-label="Хаах"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F58220]" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F58220]">
                Contact Us
              </p>
            </div>
            <h2 className="mt-4 text-3xl font-extralight">
              Start Your Project
            </h2>

            <form className="mt-10 space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-[#F58220] focus:bg-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-[#F58220] focus:bg-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-[#F58220] focus:bg-white"
              />
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full resize-none border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-[#F58220] focus:bg-white"
              />
              <button
                type="submit"
                className="mt-6 flex cursor-pointer items-center gap-2 bg-neutral-900 px-10 py-4 text-sm tracking-[0.2em] text-white shadow-sm transition hover:bg-[#F58220] active:scale-95"
              >
                SEND MESSAGE
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}