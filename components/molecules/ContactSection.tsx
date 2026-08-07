"use client";

import { useLang } from "@/lib/language-context";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Reveal } from "@/components/Reveal";

export function ContactSection() {
  const { t } = useLang();
  const lines = t.contact.heading.split("\n");

  return (
    <section
      id="contact"
      className="py-24 px-8 bg-neutral-900 text-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Зүүн тал: контент */}
          <Reveal direction="left">
            <SectionLabel text={t.contact.label} />
            <h2 className="text-4xl md:text-5xl font-light leading-[1.2] mb-12">
              {lines.map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <a
              href={`mailto:${t.contact.email}`}
              className="inline-block text-2xl font-light text-white hover:text-neutral-400 transition-colors mb-16 border-b border-neutral-700 pb-2"
            >
              {t.contact.email}
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
              {t.contact.offices.map(
                (office: { city: string; address: string; phone: string }) => (
                  <div key={office.city}>
                    <p className="text-xs text-neutral-500 tracking-[0.2em] mb-4">
                      {office.city}
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-2 whitespace-pre-line">
                      {office.address}
                    </p>
                    <p className="text-neutral-400">{office.phone}</p>
                  </div>
                ),
              )}
            </div>
          </Reveal>

          {/* Баруун тал: зураг (hover дээр өнгөтэй болно) */}
          <Reveal
            direction="right"
            delay={150}
            className="relative overflow-hidden"
          >
            <img
              src="/images/7.jpg"
              alt=""
              className="w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
