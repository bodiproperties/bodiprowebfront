"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import ServicesHero from "@/components/molecules/ServiceHero";
import { useLang } from "@/lib/language-context";

// Текст translations-д, зураг энд — slug-аар холбогдоно
const SERVICE_IMAGES: Record<string, string> = {
  architecture: "/images/4.jpg",
  interior: "/images/7.jpg",
  urban: "/images/8.jpg",
  consulting: "/images/9.jpg",
};

export default function ServicesPage() {
  const { t } = useLang();
  const s = t.services;

  return (
    <main className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <ServicesHero />

      {/* SERVICES — ServicesHero-ийн "#services" товч энд гүйлгэнэ */}
      <section
        id="services"
        className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-28 space-y-24 scroll-mt-24"
      >
        {s.items.map((service, i) => {
          const imageLeft = i % 2 === 0; // ээлжлэн байрлуулна
          return (
            <Link
              key={service.slug}
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
                  src={SERVICE_IMAGES[service.slug]}
                  alt={service.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
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
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-3xl md:text-4xl font-extralight group-hover:tracking-wide transition">
                  {service.title}
                </h2>
                <p className="text-neutral-600 leading-relaxed max-w-md">
                  {service.desc}
                </p>
                <div className="h-px w-0 bg-black group-hover:w-28 transition-all duration-500" />
                <p className="text-xs text-neutral-400 opacity-0 group-hover:opacity-100 transition">
                  {s.viewDetails} →
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
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-extralight">
              {s.stripTitle}
            </h2>
            <p className="mt-4 text-white/70">{s.stripDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto py-28 text-center px-6">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-4xl font-extralight">
            {s.ctaTitle}
          </h2>
          <a
            href={`mailto:${t.contact.email}`}
            className="mt-10 px-10 py-4 border border-black hover:bg-black hover:text-white transition tracking-[0.2em] uppercase text-sm inline-block"
          >
            {t.projects.ctaBtn}
          </a>
        </Reveal>
      </section>
    </main>
  );
}