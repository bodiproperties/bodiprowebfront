"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { ProjectModal } from "@/components/molecules/ProjectModal";
import { Genplan } from "@/components/molecules/Genplan";

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

const tabs = ["All", "Interior", "Apartment", "Office", "Garden", "Construction"];

const GENPLAN_PLOTS = [
  {
    id: 1,
    x: 22,
    y: 68,
    status: "available" as const,
    title: "Block 1 · Villa 1",
    area: "320 м²",
    price: "$450,000",
    heroImage: "/images/villa1-hero.jpg",
    description:
      "3 давхар, том цонхтой, өмнөх талдаа хаалттай терраст luxury villa. Байгалийн гэрэл, орчин vеийн загварыг хослуулсан.",
    rooms: [
      {
        title: "Зочны өрөө",
        text: "Өндөр таазтай, том цонхтой, гэрэлтэй зочны өрөө нь гэр бvлийн цуглаанд тохиромжтой.",
        image: "/images/villa1-living.jpg",
      },
      {
        title: "Гал тогоо",
        text: "Орчин vеийн тоног төхөөрөмжтэй, том island-тай нээлттэй гал тогоо.",
        image: "/images/villa1-kitchen.jpg",
      },
      {
        title: "Унтлагын өрөө",
        text: "Master bedroom нь өөрийн угаалгын өрөөтэй, гарцтай терраст.",
        image: "/images/villa1-bedroom.jpg",
      },
      {
        title: "Давхрын төлөвлөгөө",
        text: "Villa-ийн бvтэц, өрөөнvvдийн байршил, талбайн тооцоо.",
        image: "/images/villa1-floorplan.jpg",
      },
    ],
  },
  {
    id: 2,
    x: 30,
    y: 46,
    status: "reserved" as const,
    title: "Block 1 · Villa 2",
    area: "280 м²",
    price: "$450,000",
    heroImage: "/images/villa1-hero.jpg",
    description:
      "3 давхар, том цонхтой, өмнөх талдаа хаалттай терраст luxury villa. Байгалийн гэрэл, орчин vеийн загварыг хослуулсан.",
    rooms: [
      {
        title: "Зочны өрөө",
        text: "Өндөр таазтай, том цонхтой, гэрэлтэй зочны өрөө нь гэр бvлийн цуглаанд тохиромжтой.",
        image: "/images/villa1-living.jpg",
      },
      {
        title: "Гал тогоо",
        text: "Орчин vеийн тоног төхөөрөмжтэй, том island-тай нээлттэй гал тогоо.",
        image: "/images/villa1-kitchen.jpg",
      },
      {
        title: "Унтлагын өрөө",
        text: "Master bedroom нь өөрийн угаалгын өрөөтэй, гарцтай терраст.",
        image: "/images/villa1-bedroom.jpg",
      },
      {
        title: "Давхрын төлөвлөгөө",
        text: "Villa-ийн бvтэц, өрөөнvvдийн байршил, талбайн тооцоо.",
        image: "/images/villa1-floorplan.jpg",
      },
    ],
  },
  {
    id: 3,
    x: 45,
    y: 25,
    status: "sold" as const,
    title: "Block 1 · Villa 1",
    area: "320 м²",
    price: "$450,000",
    heroImage: "/images/villa1-hero.jpg",
    description:
      "3 давхар, том цонхтой, өмнөх талдаа хаалттай терраст luxury villa. Байгалийн гэрэл, орчин vеийн загварыг хослуулсан.",
    rooms: [
      {
        title: "Зочны өрөө",
        text: "Өндөр таазтай, том цонхтой, гэрэлтэй зочны өрөө нь гэр бvлийн цуглаанд тохиромжтой.",
        image: "/images/villa1-living.jpg",
      },
      {
        title: "Гал тогоо",
        text: "Орчин vеийн тоног төхөөрөмжтэй, том island-тай нээлттэй гал тогоо.",
        image: "/images/villa1-kitchen.jpg",
      },
      {
        title: "Унтлагын өрөө",
        text: "Master bedroom нь өөрийн угаалгын өрөөтэй, гарцтай терраст.",
        image: "/images/villa1-bedroom.jpg",
      },
      {
        title: "Давхрын төлөвлөгөө",
        text: "Villa-ийн бvтэц, өрөөнvvдийн байршил, талбайн тооцоо.",
        image: "/images/villa1-floorplan.jpg",
      },
    ],
  },
];

export default function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? projects[selectedIndex] : null;
  const [activeTab, setActiveTab] = useState("All");

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % projects.length
    );
  };

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const stats = [
    ["80+", "Projects"],
    ["12", "Years Experience"],
    ["25+", "Clients"],
    ["10+", "Awards"],
  ];

  return (
    <>
      <main className="bg-white text-black overflow-hidden">
        {/* HERO */}
        <section className="relative h-[85vh] flex items-end overflow-hidden">
          <Image
            src="/images/12.jpg"
            alt="Projects Hero"
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
              created through simplicity, proportion and timeless design.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-4 gap-12 text-center">
          {stats.map(([num, label], i) => (
            <Reveal key={i} direction="up" delay={i * 120}>
              <h2 className="text-5xl font-extralight">{num}</h2>
              <p className="mt-3 text-xs tracking-[0.3em] uppercase text-neutral-500">
                {label}
              </p>
            </Reveal>
          ))}
        </section>

        {/* HEADER */}
        <section className="max-w-6xl mx-auto px-8 mb-16">
          <Reveal direction="left">
            <p className="text-xs tracking-[0.35em] text-[#F58220] uppercase">
              Portfolio
            </p>
            <h2 className="mt-5 text-4xl md:text-6xl font-extralight">
              Featured Projects
            </h2>
          </Reveal>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap gap-8 border-b border-neutral-200 pb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-sm tracking-[0.25em] uppercase pb-3 transition cursor-pointer ${
                  activeTab === tab
                    ? "text-black"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#F58220]" />
                )}
              </button>
            ))}
          </div>
        </section>

       {/* GRID эсвэл GENPLAN (Construction сонгогдвол) */}
        {activeTab === "Construction" ? (
          <section className="max-w-6xl mx-auto px-8">
            <Reveal direction="up">
              <Genplan image="/images/genplan.jpg" plots={GENPLAN_PLOTS} />
            </Reveal>
          </section>
        ) : (
          <section className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12">
            {filteredProjects.map((project, i) => (
              <Reveal key={project.id} direction={i % 2 === 0 ? "left" : "right"}>
                <button
                  onClick={() => setSelectedIndex(projects.indexOf(project))}
                  className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-label={`View ${project.title}`}
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition" />
                    <div className="absolute bottom-7 left-7 opacity-0 group-hover:opacity-100 transition duration-500 cursor-pointer">
                      <p className="text-white text-xs tracking-[0.3em] uppercase">
                        View Project →
                      </p>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="mt-6 flex justify-between">
                    <div>
                      <h3 className="text-2xl font-extralight group-hover:tracking-wide transition">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-500">
                        {project.location}
                      </p>
                    </div>
                    <span className="text-xs tracking-[0.3em] text-neutral-400">
                      {project.year}
                    </span>
                  </div>

                  <div className="mt-5 h-px w-0 bg-black group-hover:w-28 transition-all duration-500" />
                </button>
              </Reveal>
            ))}
          </section>
        )}

        {/* QUOTE SECTION */}
        <section className="max-w-5xl mx-auto px-8 py-36 text-center">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-extralight leading-tight">
              &quot;Architecture begins where engineering ends and emotion
              begins.&quot;
            </h2>
            <p className="mt-8 text-neutral-500 tracking-[0.3em] uppercase text-sm">
              Studio Philosophy
            </p>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200">
          <div className="max-w-6xl mx-auto px-8 py-24 flex flex-col md:flex-row justify-between items-center gap-8">
            <Reveal direction="left">
              <h2 className="text-3xl md:text-5xl font-extralight">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-neutral-500">
                Let&apos;s create spaces that inspire and endure.
              </p>
            </Reveal>
            <Reveal direction="right" delay={150}>
              <button className="px-10 py-4 border border-black hover:bg-black hover:text-white transition tracking-[0.2em] text-sm cursor-pointer">
                START A PROJECT
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Modal — grid дээр гарч ирнэ, ард нь grid үлдэнэ */}
      <ProjectModal
        project={selected}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
      />
    </>
  );
}