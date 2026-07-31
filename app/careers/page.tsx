"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const positions = [
  { title: "Senior Architect", location: "Ulaanbaatar", type: "Full Time" },
  { title: "Interior Designer", location: "Ulaanbaatar", type: "Full Time" },
  { title: "Project Manager", location: "Ulaanbaatar", type: "Full Time" },
  { title: "Civil Engineer", location: "Ulaanbaatar", type: "Full Time" },
];

export default function CareersPage() {
  return (
    <main className="bg-white text-[#4D4C4D] overflow-hidden">
      {/* HERO */}
      <section className="relative h-[90vh] overflow-hidden flex items-end">
        <Image
          src="/images/hr.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-8 pb-24 text-white">
          <p className="uppercase tracking-[0.35em] text-sm text-[#F58220]">
            Careers
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-extralight max-w-4xl leading-tight">
            Чадварлаг хүмүүсээс үнэ цэнтэй бүтээн байгуулалт эхэлдэг.
          </h1>
        </div>
      </section>

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
          <Reveal direction="right" delay={150} className="space-y-8 text-lg leading-relaxed">
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
      <section className="max-w-6xl mx-auto px-8 py-28">
        <Reveal direction="left">
          <p className="uppercase tracking-[0.3em] text-sm text-[#F58220]">
            Open Positions
          </p>
          <h2 className="mt-6 text-4xl font-extralight text-neutral-900 mb-16">
            Current Opportunities
          </h2>
        </Reveal>
        <div className="space-y-8">
          {positions.map((job, i) => (
            <Reveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 80}>
              <div className="border-b border-neutral-200 pb-8 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl text-neutral-900 font-light">
                    {job.title}
                  </h3>
                  <p className="mt-3 text-neutral-500">
                    {job.location} · {job.type}
                  </p>
                </div>
                <button className="border border-neutral-900 px-8 py-3 hover:bg-black hover:text-white transition cursor-pointer">
                  Apply
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-neutral-900 text-white py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal direction="left">
            <h2 className="text-4xl font-extralight mb-20">Hiring Process</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-14">
            {["Application", "Interview", "Assessment", "Offer"].map((step, i) => (
              <Reveal key={i} direction="up" delay={i * 120}>
                <div className="text-6xl text-white/20 mb-6">0{i + 1}</div>
                <h3 className="text-xl font-light">{step}</h3>
              </Reveal>
            ))}
          </div>
        </div>
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
    </main>
  );
}