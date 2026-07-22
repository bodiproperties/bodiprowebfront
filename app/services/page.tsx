"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

const services = [
  {
    slug: "architecture",
    title: "Architecture Design",
    desc: "From concept to construction, we design spaces that balance function, form, and emotion.",
    img: "/images/4.jpg",
  },
  {
    slug: "interior",
    title: "Interior Design",
    desc: "We craft interior environments that feel minimal, warm, and human-centered.",
    img: "/images/7.jpg",
  },
  {
    slug: "urban",
    title: "Urban Planning",
    desc: "Large-scale spatial strategies that connect architecture with environment and society.",
    img: "/images/8.jpg",
  },
  {
    slug: "consulting",
    title: "Consulting",
    desc: "Strategic design consulting for developers, brands, and architectural firms.",
    img: "/images/9.jpg",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <Image
          src="/images/8.jpg"
          alt="Projects"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-6xl mx-auto w-full px-8 pb-20 text-white">
          <p className="text-xs tracking-[0.35em] uppercase text-[#F58220]">
            Selected Work
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-extralight leading-tight max-w-4xl">
            Architecture that balances form, light and emotion.
          </h1>
          <p className="mt-8 text-white/70 max-w-xl leading-relaxed">
            A collection of residential, commercial and conceptual projects
            designed with simplicity and timelessness.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-28 space-y-24">
        {services.map((service, i) => {
          const imageLeft = i % 2 === 0; // ээлжлэн байрлуулна
          return (
            <Link
              key={i}
              href={`/services/${service.slug}`}
              className="group grid md:grid-cols-2 gap-10 items-center"
            >
              {/* IMAGE */}
              <Reveal
                direction={imageLeft ? "left" : "right"}
                className={`relative w-full aspect-[4/3] overflow-hidden ${
                  imageLeft ? "" : "md:order-2"
                }`}
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition" />
              </Reveal>

              {/* TEXT */}
              <Reveal
                direction={imageLeft ? "right" : "left"}
                delay={150}
                className={`space-y-6 ${imageLeft ? "" : "md:order-1"}`}
              >
                <p className="text-xs tracking-[0.3em] text-[#F58220] uppercase">
                  0{i + 1}
                </p>
                <h2 className="text-3xl md:text-4xl font-extralight group-hover:tracking-wide transition">
                  {service.title}
                </h2>
                <p className="text-neutral-600 leading-relaxed max-w-md">
                  {service.desc}
                </p>
                <div className="h-px w-0 bg-black group-hover:w-28 transition-all duration-500" />
                <p className="text-xs text-neutral-400 opacity-0 group-hover:opacity-100 transition">
                  View details →
                </p>
              </Reveal>
            </Link>
          );
        })}
      </section>

      {/* IMAGE STRIP */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=2000"
          alt="studio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-extralight">
              Design is not what it looks like.
            </h2>
            <p className="mt-4 text-white/70">
              It is how it works and how it feels.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto py-28 text-center px-6">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-4xl font-extralight">
            Let&apos;s build something meaningful together.
          </h2>
          <Link
            href="/projects"
            className="mt-10 px-10 py-4 border border-black hover:bg-black hover:text-white transition tracking-[0.2em] text-sm inline-block"
          >
            START A PROJECT
          </Link>
        </Reveal>
      </section>
    </main>
  );
}