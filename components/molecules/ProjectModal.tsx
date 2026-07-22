"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useLang } from "@/lib/language-context";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import type { Project } from "@/lib/data";

interface Props {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
}

export function ProjectModal({ project, onClose, onNext }: Props) {
  const { t } = useLang();
  const [closing, setClosing] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const handleClose = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    setActiveImage(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, handleClose]);

  if (!project) return null;

  // 🔧 Локал зургууд — public/images/ дотор эдгээр нэрээр файлаа хийнэ
  const images = [project.image, ...project.gallery];

  const stagger = (i: number) => ({
    animationDelay: `${0.15 + i * 0.08}s`,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-100 flex justify-end"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${
          closing ? "opacity-0 transition-opacity duration-300" : "voss-backdrop"
        }`}
      />

      {/* Sliding panel docked to the right */}
      <div
        className={`relative z-10 bg-white h-full w-full max-w-7xl overflow-y-auto ${
          closing
            ? "translate-x-full opacity-0 transition-all duration-300 ease-in"
            : "voss-panel-right"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          {/* ◀ ЗҮҮН/ДЭЭД: тогтмол (sticky) том зураг — z-20 (контентын дээр) */}
          <div className="relative z-20 w-full md:w-[64%] shrink-0 sticky top-0 h-[55vh] md:h-screen bg-neutral-200 overflow-hidden">
            <Image
              key={activeImage}
              src={images[activeImage]}
              alt={`${project.title} — ${project.type}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover voss-modal-image"
            />

            {/* Дээд хэсгийн харанхуй gradient — товч уншигдахуйц байх */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

            {/* ID label */}
            <span className="absolute top-5 left-6 text-xs text-white/90 tracking-[0.2em] z-10">
              {String(project.id).padStart(2, "0")} /{" "}
              {t.projects.heading.toUpperCase()}
            </span>

            {/* Close товч */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-6 z-10 flex items-center gap-2 text-xs tracking-[0.2em] text-white/90 hover:text-white transition-colors"
              aria-label={t.projects.close}
            >
              {t.projects.close}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* ▶ БАРУУН/ДООД: гүйдэг контент — relative z-0 (зургийн ард) */}
          <div className="relative z-0 w-full md:w-[36%] px-8 md:px-10 py-10 md:py-14 bg-white">
            {/* Title block */}
            <div className="voss-stagger" style={stagger(0)}>
              <p className="text-xs text-neutral-400 tracking-[0.2em] mb-3">
                {project.type}
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-neutral-900 leading-[1.05]">
                {project.title}
              </h2>
            </div>

            {/* Meta grid */}
            <div
              className="grid grid-cols-2 gap-6 border-t border-neutral-100 mt-10 pt-8 voss-stagger"
              style={stagger(1)}
            >
              {[
                { label: t.projects.modal.client, value: project.detail.client },
                { label: t.projects.modal.location, value: project.location },
                { label: t.projects.modal.area, value: project.detail.area },
                { label: t.projects.modal.year, value: project.year },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] text-neutral-400 tracking-[0.18em] mb-2">
                    {label}
                  </p>
                  <p className="text-sm font-light text-neutral-800 leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div
              className="border-t border-neutral-100 mt-8 pt-8 voss-stagger"
              style={stagger(2)}
            >
              <p className="text-[10px] text-neutral-400 tracking-[0.18em] mb-4">
                {t.projects.modal.overview}
              </p>
              <p className="text-base text-neutral-600 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Gallery thumbnails */}
            <div
              className="border-t border-neutral-100 mt-8 pt-8 voss-stagger"
              style={stagger(4)}
            >
              <p className="text-[10px] text-neutral-400 tracking-[0.18em] mb-4">
                {t.projects.modal.gallery}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-[4/3] overflow-hidden bg-neutral-200 transition-opacity ${
                      activeImage === i
                        ? "ring-2 ring-neutral-900"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`${t.projects.modal.gallery} ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 33vw, 140px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Services + status */}
            <div
              className="grid grid-cols-1 gap-8 border-t border-neutral-100 mt-8 pt-8 voss-stagger"
              style={stagger(3)}
            >
              <div>
                <p className="text-[10px] text-neutral-400 tracking-[0.18em] mb-4">
                  {t.projects.modal.services}
                </p>
                <ul className="flex flex-col gap-2">
                  {project.detail.services.map((s) => (
                    <li key={s} className="text-sm font-light text-neutral-800">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 tracking-[0.18em] mb-4">
                  {t.projects.modal.status}
                </p>
                <p className="text-sm font-light text-neutral-800">
                  {project.detail.status}
                </p>
              </div>
            </div>

            {/* Next project */}
            {onNext && (
              <button
                onClick={onNext}
                className="group flex items-center justify-between w-full border-t border-neutral-100 mt-8 pt-8 voss-stagger"
                style={stagger(5)}
              >
                <span className="text-xs text-neutral-400 tracking-[0.2em]">
                  {t.projects.modal.next}
                </span>
                <ArrowIcon className="w-5 h-5 text-neutral-800 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}