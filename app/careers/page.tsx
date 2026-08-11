"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { OpenPositionsSection } from "@/components/molecules/OpenPositionsSection";
import { HiringProcessSection } from "@/components/molecules/HiringProcessSection";
import { CareersHero } from "@/components/molecules/CareersHero";
import { TestimonialsSection } from "@/components/molecules/TestimonialsSection";

const positions = [
  { title: "Senior Architect", location: "Ulaanbaatar", type: "Full Time" },
  { title: "Interior Designer", location: "Ulaanbaatar", type: "Full Time" },
  { title: "Project Manager", location: "Ulaanbaatar", type: "Full Time" },
  { title: "Civil Engineer", location: "Ulaanbaatar", type: "Full Time" },
];

const HERO_SLIDES = [
  {
    image: "/images/hr.jpg",
    label: "Careers",
    desc: "Чадварлаг хүмүүсээс vнэ цэнтэй бүтээн байгуулалт эхэлдэг.",
  },
  {
    image: "/images/1.jpg",
    label: "Careers",
    desc: "Чадварлаг хүмүүсээс үнэ цэнтэй бүтээн байгуулалт эхэлдэг.",
  },
  {
    image: "/images/2.jpg",
    label: "Careers",
    desc: "Чадварлаг хүмүүсээс үнэ цэнтэй бүтээн байгуулалт эхэлдэг.",
  },
  {
    image: "/images/3.jpg",
    label: "Careers",
    desc: "Чадварлаг хүмүүсээс үнэ цэнтэй бүтээн байгуулалт эхэлдэг.",
  },
  {
    image: "/images/4.jpg",
    label: "Careers",
    desc: "Чадварлаг хүмүүсээс үнэ цэнтэй бүтээн байгуулалт эхэлдэг.",
  },
  {
    image: "/images/5.jpg",
    label: "Careers",
    desc: "Чадварлаг хүмүүсээс үнэ цэнтэй бүтээн байгуулалт эхэлдэг.",
  },
];

// Дэлгэцийн хэмжээнээс хамаарч карт/зай/харагдах тоог тохируулна
function useResponsiveCarousel() {
  const [config, setConfig] = useState({
    cardW: 150,
    cardH: 200,
    gap: 16,
    visible: 3,
  });

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setConfig({ cardW: 78, cardH: 104, gap: 8, visible: 2 });
      } else if (w < 640) {
        setConfig({ cardW: 92, cardH: 122, gap: 10, visible: 2 });
      } else if (w < 768) {
        setConfig({ cardW: 108, cardH: 144, gap: 12, visible: 3 });
      } else if (w < 1024) {
        setConfig({ cardW: 128, cardH: 170, gap: 14, visible: 3 });
      } else {
        setConfig({ cardW: 150, cardH: 200, gap: 16, visible: 3 });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return config;
}



export default function CareersPage() {
  return (
    <main className="bg-white text-[#4D4C4D] overflow-hidden">
      <CareersHero lang="en" />

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-8 py-28">
        <div className="grid md:grid-cols-2 gap-20">
          <Reveal direction="left">
            <p className="uppercase tracking-[0.3em] text-sm text-[#F58220]">
              Why Bodi Properties
            </p>
            <h2 className="mt-6 text-4xl font-extralight text-neutral-900">
              We believe great buildings are created by great people.
            </h2>
          </Reveal>
          <Reveal
            direction="right"
            delay={150}
            className="space-y-8 text-lg leading-relaxed"
          >
            <p>
              At Bodi Properties, we bring together architects, engineers,
              designers and construction professionals who share a passion for
              creating timeless spaces.
            </p>
            <p>
              We foster collaboration, innovation and long-term growth while
              delivering projects that positively impact communities.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-neutral-100 py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal direction="left">
            <h2 className="text-4xl font-extralight text-neutral-900 mb-16">
              Benefits
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-14">
            {[
              "Professional Development",
              "Competitive Compensation",
              "Flexible Work Environment",
              "Career Growth Opportunities",
            ].map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 120}>
                <div className="text-5xl font-extralight text-neutral-300 mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-xl text-neutral-900">{item}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="max-w-7xl mx-auto px-8 py-28">
        <OpenPositionsSection lang="en" onSelectPosition={() => {}} />
      </section>

      {/* PROCESS */}
      <section className="bg-neutral-900 text-white py-28 px-8">
        <HiringProcessSection lang="en" />
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center py-32 px-8">
        <Reveal direction="up">
          <h2 className="text-5xl font-extralight text-neutral-900 leading-tight">
            Interested in joining our team?
          </h2>
          <p className="mt-8 text-lg">
            Send your portfolio and CV to careers@bodiproperties.mn
          </p>
          <button className="mt-12 border border-black px-10 py-4 hover:bg-black hover:text-white transition cursor-pointer">
            Contact HR
          </button>
        </Reveal>
      </section>
      {/* CTA */}
      <section className="max-w-7xl mx-auto text-center py-32 px-8">
        <TestimonialsSection lang="en" />
      </section>
    </main>
  );
}
