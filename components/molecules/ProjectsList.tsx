"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ProjectModal } from "@/components/molecules/ProjectModal";
import ProjectsHero from "@/components/molecules/ProjectsHero";
import { useLang } from "@/lib/language-context";
import { toProject, projectHasLang, type ApiProject } from "@/lib/projects-api";

const TABS = [
  "All",
  "Interior",
  "Apartment",
  "Office",
  "Garden",
  "Construction",
] as const;
type Tab = (typeof TABS)[number];

export function ProjectsList({ items }: { items: ApiProject[] }) {
  const { t, lang } = useLang();
  const p = t.projects;

  // API өгөгдлийг одоогийн Project хэлбэрт хувиргана — дизайн өөрчлөгдөхгүй
  // Зөвхөн сонгосон хэл дээр оруулсан төслүүд
  const projects = useMemo(
    () =>
      items
        .filter((it) => projectHasLang(it, lang))
        .map((it) => toProject(it, lang)),
    [items, lang],
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? projects[selectedIndex] : null;
  const [activeTab, setActiveTab] = useState<Tab>("All");

  useEffect(() => {
    setSelectedIndex(null);
  }, [lang]);

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % projects.length,
    );
  };

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <>
      <main className="bg-white text-black overflow-hidden">
        {/* HERO */}
        <ProjectsHero />

        {/* STATS */}
        <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-4 gap-12 text-center">
          {p.stats.map((stat, i) => (
            <Reveal key={stat.label} direction="up" delay={i * 120}>
              <h2 className="text-5xl font-extralight">{stat.num}</h2>
              <p className="mt-3 text-xs tracking-[0.3em] uppercase text-neutral-500">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </section>

        {/* HEADER — ProjectsHero-ийн "#projects" товч энд гүйлгэнэ */}
        <section
          id="projects"
          className="max-w-6xl mx-auto px-8 mb-16 scroll-mt-24"
        >
          <Reveal direction="left">
            <p className="text-xs tracking-[0.35em] text-[#F58220] uppercase">
              {p.portfolio}
            </p>
            <h2 className="mt-5 text-4xl md:text-6xl font-extralight">
              {p.featuredTitle}
            </h2>
          </Reveal>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap gap-8 border-b border-neutral-200 pb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`relative text-sm tracking-[0.25em] uppercase pb-3 transition cursor-pointer ${
                  activeTab === tab
                    ? "text-black"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                {p.tabs[tab]}
                {activeTab === tab && (
                  <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#F58220]" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* GRID — бүх tab ижил байдлаар category-оор шүүнэ.
            Genplan / Garden map-ууд mock өгөгдөлтэй (хуурамч үнэ) байсан тул түр хассан. */}
        {filteredProjects.length === 0 ? (
          <section className="max-w-6xl mx-auto px-8 py-16 text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-neutral-400">
              {p.empty}
            </p>
          </section>
        ) : (
          <section className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12">
            {filteredProjects.map((project, i) => (
              <Reveal
                key={project.id}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(projects.indexOf(project))}
                  className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-label={`${p.viewProject}: ${project.title}`}
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      quality={80}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition" />
                    <div className="absolute bottom-7 left-7 opacity-0 group-hover:opacity-100 transition duration-500">
                      <p className="text-white text-xs tracking-[0.3em] uppercase">
                        {p.viewProject} →
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
            <blockquote>
              <p className="text-4xl md:text-5xl font-extralight leading-tight">
                “{p.quote}”
              </p>
              <footer className="mt-8 text-neutral-500 tracking-[0.3em] uppercase text-sm">
                {p.quoteAuthor}
              </footer>
            </blockquote>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200">
          <div className="max-w-6xl mx-auto px-8 py-24 flex flex-col md:flex-row justify-between items-center gap-8">
            <Reveal direction="left">
              <h2 className="text-3xl md:text-5xl font-extralight">
                {p.ctaTitle}
              </h2>
              <p className="mt-4 text-neutral-500">{p.ctaDesc}</p>
            </Reveal>
            <Reveal direction="right" delay={150}>
              <a
                href={`mailto:${t.contact.email}`}
                className="inline-block px-10 py-4 border border-black hover:bg-[#F58220] hover:border-[#F58220] hover:text-white transition tracking-[0.2em] uppercase text-sm"
              >
                {p.ctaBtn}
              </a>
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
