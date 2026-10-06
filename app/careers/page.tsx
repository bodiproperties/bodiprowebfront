"use client";

import { Reveal } from "@/components/Reveal";
import { OpenPositionsSection } from "@/components/molecules/OpenPositionsSection";
import { HiringProcessSection } from "@/components/molecules/HiringProcessSection";
import { CareersHero } from "@/components/molecules/CareersHero";
import { TestimonialsSection } from "@/components/molecules/TestimonialsSection";
import { useLang } from "@/lib/language-context";

const CAREERS_EMAIL = "careers@bodiproperties.mn";

export default function CareersPage() {
  const { t, lang } = useLang();

  // Molecule component-ууд lowercase "en" | "mn" авдаг тул map хийнэ
  const childLang = lang === "MN" ? "mn" : "en";

  return (
    <main className="bg-white text-[#4D4C4D] overflow-hidden">
      <CareersHero lang={childLang} />

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-8 py-28">
        <div className="grid md:grid-cols-2 gap-20">
          <Reveal direction="left">
            <p className="uppercase tracking-[0.3em] text-sm text-[#F58220]">
              {t.hr.label}
            </p>
            <h2 className="mt-6 text-4xl font-extralight text-neutral-900">
              {t.hr.heading}
            </h2>
          </Reveal>
          <Reveal
            direction="right"
            delay={150}
            className="space-y-8 text-lg leading-relaxed"
          >
            <p>{t.hr.desc}</p>
            <p>{t.hr.desc1}</p>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-neutral-100 py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal direction="left">
            <h2 className="text-4xl font-extralight text-neutral-900 mb-16">
              {t.hr.benetitle}
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-14">
            {t.hr.benefits.map((item: string, i: number) => (
              <Reveal key={item} direction="up" delay={i * 120}>
                <div className="text-5xl font-extralight text-neutral-300 mb-6">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl text-neutral-900">{item}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="max-w-7xl mx-auto px-8 py-28">
        <OpenPositionsSection lang={childLang} onSelectPosition={() => {}} />
      </section>

      {/* HIRING PROCESS */}
      <section className="bg-neutral-900 text-white py-28 px-8">
        <HiringProcessSection lang={childLang} />
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center py-32 px-8">
        <Reveal direction="up">
          <h2 className="text-5xl font-extralight text-neutral-900 leading-tight">
            {t.hr.interest}
          </h2>
          <p className="mt-8 text-lg">{t.hr.sent}</p>
          <a
            href={`mailto:${CAREERS_EMAIL}`}
            className="mt-12 inline-block border border-black px-10 py-4 hover:bg-[#F58220] hover:border-[#F58220] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F58220] transition"
          >
            {t.hr.btn}
          </a>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto text-center py-32 px-8">
        <TestimonialsSection lang={childLang} />
      </section>
    </main>
  );
}