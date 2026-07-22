"use client";

import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/language-context";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { ProjectModal } from "@/components/molecules/ProjectModal";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  const { t } = useLang();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selected = selectedIndex !== null ? projects[selectedIndex] : null;

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % projects.length
    );
  };

  return (
    <>
      <section id="projects" className="py-24 px-8 bg-neutral-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <Reveal direction="left">
            <div className="flex items-baseline justify-between mb-16">
              <div>
                <SectionLabel text={t.projects.label} />
                <h2 className="text-5xl font-light">{t.projects.heading}</h2>
              </div>
              <p className="text-sm text-neutral-500">{t.projects.count}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Reveal key={project.id} direction={index % 2 === 0 ? "left" : "right"}>
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="group w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                  aria-label={`${t.projects.viewProject}: ${project.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 mb-6">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.type} in ${project.location}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs tracking-[0.2em] border border-white/60 px-5 py-2">
                        {t.projects.viewProject}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <span className="text-sm text-neutral-400">
                        {String(project.id).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl font-light mb-2 group-hover:text-neutral-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-neutral-500 tracking-[0.1em]">
                          {project.type} / {project.location} / {project.year}
                        </p>
                      </div>
                    </div>
                    <ArrowIcon className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selected}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
      />
    </>
  );
}