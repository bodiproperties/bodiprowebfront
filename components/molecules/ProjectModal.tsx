"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/language-context";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import type { Project } from "@/lib/data";

type Props = {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
};

export function ProjectModal({ project, onClose, onNext }: Props) {
  const { t } = useLang();
  const [closing, setClosing] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  // Нүүр зураг + gallery — хоосон утгагүй, давхардалгүй.
  // Өмнө нь gallery хоосон үед images[0] = "" болж preload алдаа өгдөг байсан.
  const images = useMemo(() => {
    if (!project) return [];
    return Array.from(
      new Set([project.image, ...(project.gallery ?? [])].filter(Boolean)),
    );
  }, [project]);

  const current = images[activeImage] ?? images[0];

  const handleClose = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  // Төсөл солигдоход эхний зураг руу буцна
  useEffect(() => {
    setActiveImage(0);
  }, [project?.id]);

  // Escape + body scroll lock
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" && images.length > 1)
        setActiveImage((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft" && images.length > 1)
        setActiveImage((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, handleClose, images.length]);

  if (!project || !current) return null;

  const stagger = (i: number) => ({ animationDelay: `${0.15 + i * 0.08}s` });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[100] flex justify-end"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 ${
          closing ? "opacity-0 transition-opacity duration-300" : "voss-backdrop"
        }`}
      />

      {/* Sliding panel */}
      <div
        className={`relative z-10 h-full w-full max-w-7xl overflow-y-auto bg-white ${
          closing
            ? "translate-x-full opacity-0 transition-all duration-300 ease-in"
            : "voss-panel-right"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          {/* ◀ Том зураг */}
          <div className="relative z-20 h-[55vh] w-full shrink-0 overflow-hidden bg-neutral-900 md:sticky md:top-0 md:h-screen md:w-[64%]">
            {/* Ачаалж байх үед бүдэг placeholder */}
            {loadedSrc !== current && (
              <div className="absolute inset-0 animate-pulse bg-neutral-800" />
            )}
            <Image
              key={current}
              src={current}
              alt={`${project.title} — ${project.type}`}
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 64vw"
              onLoad={() => setLoadedSrc(current)}
              className={`object-cover transition-opacity duration-500 ${
                loadedSrc === current ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />

            <span className="absolute left-6 top-5 z-10 text-xs tracking-[0.2em] text-white/90">
              {String(activeImage + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>

            <button
              onClick={handleClose}
              className="absolute right-6 top-5 z-10 flex items-center gap-2 text-xs tracking-[0.2em] text-white/90 transition-colors hover:text-white"
              aria-label={t.projects.close}
            >
              {t.projects.close}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* ▶ Контент */}
          <div className="relative z-0 w-full bg-white px-8 py-10 md:w-[36%] md:px-10 md:py-14">
            <div className="voss-stagger" style={stagger(0)}>
              <p className="mb-3 text-xs tracking-[0.2em] text-neutral-400">
                {project.type}
              </p>
              <h2 className="text-3xl font-light leading-[1.05] text-neutral-900 md:text-4xl">
                {project.title}
              </h2>
            </div>

            <div
              className="voss-stagger mt-10 grid grid-cols-2 gap-6 border-t border-neutral-100 pt-8"
              style={stagger(1)}
            >
              {[
                { label: t.projects.modal.client, value: project.detail.client },
                { label: t.projects.modal.location, value: project.location },
                { label: t.projects.modal.area, value: project.detail.area },
                { label: t.projects.modal.year, value: project.year },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="mb-2 text-[10px] tracking-[0.18em] text-neutral-400">
                    {label}
                  </p>
                  <p className="text-sm font-light leading-snug text-neutral-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {project.longDescription && (
              <div
                className="voss-stagger mt-8 border-t border-neutral-100 pt-8"
                style={stagger(2)}
              >
                <p className="mb-4 text-[10px] tracking-[0.18em] text-neutral-400">
                  {t.projects.modal.overview}
                </p>
                <p className="whitespace-pre-line text-base leading-relaxed text-neutral-600">
                  {project.longDescription}
                </p>
              </div>
            )}

            {images.length > 1 && (
              <div
                className="voss-stagger mt-8 border-t border-neutral-100 pt-8"
                style={stagger(3)}
              >
                <p className="mb-4 text-[10px] tracking-[0.18em] text-neutral-400">
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
                        quality={60}
                        sizes="160px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div
              className="voss-stagger mt-8 grid grid-cols-1 gap-8 border-t border-neutral-100 pt-8"
              style={stagger(4)}
            >
              {project.detail.services.length > 0 && (
                <div>
                  <p className="mb-4 text-[10px] tracking-[0.18em] text-neutral-400">
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
              )}
              <div>
                <p className="mb-4 text-[10px] tracking-[0.18em] text-neutral-400">
                  {t.projects.modal.status}
                </p>
                <p className="text-sm font-light text-neutral-800">
                  {project.detail.status}
                </p>
              </div>
            </div>

            <button
              onClick={onNext}
              className="voss-stagger group mt-8 flex w-full items-center justify-between border-t border-neutral-100 pt-8"
              style={stagger(5)}
            >
              <span className="text-xs tracking-[0.2em] text-neutral-400">
                {t.projects.modal.next}
              </span>
              <ArrowIcon className="h-5 w-5 text-neutral-800 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}