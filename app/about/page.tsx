"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { log } from "console";

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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
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
        <Image
          src="/images/news.jpg"
          alt="Architecture building"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <p className="text-xs tracking-[0.35em] text-[#F58220] uppercase">
            БИДНИЙ ТУХАЙ
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-extralight text-white leading-tight max-w-4xl">
            We design spaces that define modern living
          </h1>
        </div>
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
            Бодь Пропертийз” ХХК нь анх 1997 онд үл хөдлөх хөрөнгө, барилга угсралтын ажлын төлөвлөлт, санхүүжилт, хэрэгжилтийг иж бүрнээр нь гүйцэтгэгч төслийн байгууллагын хэлбэрээр үйл ажиллагаа явуулж эхэлсэн. Байгуулагдсанаас хойш барилгын салбар цаашлаад улс, нийслэлийн их бүтээн байгуулалт, өнгө төрхөд бодитой хувь нэмэр оруулсан олон төслүүдийг амжилттай хэрэгжүүлсэн. 
          </p>
        </Reveal>
      </section>

      {/* MISSION / VISION */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 grid md:grid-cols-2 gap-16">
        <Reveal direction="left">
          <h2 className="text-2xl font-light mb-4">Эрхэм зорлиго</h2>
          <p className="text-neutral-600 leading-relaxed">
            To design functional and emotional spaces that improve the way
            people live, work, and interact with their environment.
          </p>
        </Reveal>
        <Reveal direction="right" delay={150}>
          <h2 className="text-2xl font-light mb-4">Алсын хараа</h2>
          <p className="text-neutral-600 leading-relaxed">
            To become a globally recognized architecture studio known for
            minimal, timeless and sustainable design solutions.
          </p>
        </Reveal>
      </section>

      {/* IMAGE STRIP */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-[60vh]">
          <Image src="/images/3.jpg" alt="Interior" fill className="object-cover" />
        </div>
        <div className="relative h-[60vh]">
          <Image src="/images/6.jpg" alt="Exterior" fill className="object-cover" />
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-6 py-28 grid grid-cols-2 md:grid-cols-4 text-center gap-10">
        {[
          ["60+", "Нийт барилгын Төслийн удирдлага, зөвлөх үйлчилгээ"],
          ["122+", "Манай ажилтнууд"],
          ["140+", "Олон улсын стандарт, мэргэжлийн чанар хангасан ажиллагаа"],
          ["31+", "Бодит Бүтээн байгуулалтууд"],
        ].map(([num, label], i) => (
          <Reveal key={i} direction="up" delay={i * 120}>
            <p className="text-4xl font-extralight">{num}</p>
            <p className="text-xs tracking-[0.25em] text-neutral-500 uppercase mt-2">
              {label}
            </p>
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
          <p className="text-xs tracking-[0.35em] text-[#F58220] uppercase">
            Director&apos;s Message
          </p>
          <h2 className="mt-6 text-4xl md:text-5xl font-extralight leading-tight">
            Designing spaces with purpose and timeless value.
          </h2>
          <p className="mt-8 text-neutral-600 leading-relaxed">
            We approach every project with dedication, creativity, and respect
            for the people who will inhabit these spaces. Our mission is to
            deliver architecture that combines beauty, functionality, and
            sustainability for generations to come.
          </p>
          <div className="mt-10">
            <p className="text-xl font-light">TEGSHBAYAR.B</p>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-400 mt-2">
              Chief Executive Officer, Bodi Properties LLC
            </p>
          </div>
        </Reveal>
      </section>

      {/* ROADMAP */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 pb-10">
        <Reveal direction="left">
          <h2 className="text-2xl font-light mb-10">Roadmap</h2>
        </Reveal>
        <div className="space-y-8">
          {[
            ["2024", "Studio foundation and first residential projects"],
            ["2025", "Expansion into international architecture market"],
            ["2026", "Launch of sustainable smart architecture division"],
            ["2027", "Global collaborations and landmark projects"],
          ].map(([year, text], i) => (
            <Reveal
              key={i}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 100}
            >
              <div className="flex gap-10 border-b border-neutral-200 pb-6">
                <span className="text-sm text-neutral-400 w-20">{year}</span>
                <p className="text-neutral-700">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-black text-white">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-5xl font-extralight">
            Let&apos;s build something timeless together
          </h2>
          <button
            onClick={() => setOpenModal(true)}
            className="mt-10 px-10 py-4 border border-white hover:bg-white hover:text-black transition tracking-widest text-sm cursor-pointer"
          >
            CONTACT US
          </button>
        </Reveal>
      </section>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl p-10 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-black text-2xl"
            >
              ×
            </button>
            <p className="text-xs tracking-[0.3em] uppercase text-[#F58220]">
              Contact Us
            </p>
            <h2 className="mt-4 text-3xl font-extralight">Start Your Project</h2>
            <form className="mt-10 space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border-b border-neutral-300 outline-none py-3"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border-b border-neutral-300 outline-none py-3"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border-b border-neutral-300 outline-none py-3"
              />
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full border-b border-neutral-300 outline-none py-3 resize-none"
              />
              <button
                type="submit"
                className="mt-6 bg-black text-white px-10 py-4 tracking-[0.2em] text-sm hover:bg-neutral-800 transition"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}