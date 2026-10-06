"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLang } from "@/lib/language-context";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import {
  toProject,
  projectHasLang,
  projectDescriptionHtml,
  type ApiProject,
} from "@/lib/projects-api";

type Props = {
  item: ApiProject;
  list: ApiProject[];
};

// Tiptap HTML-ийн typography — panel-ийн анхны text-base стильтэй ижил
const DESC_CLASS = [
  "text-base text-neutral-600 leading-relaxed space-y-4",
  "[&_h2]:text-xl [&_h2]:font-light [&_h2]:text-neutral-900",
  "[&_h3]:text-lg [&_h3]:font-light [&_h3]:text-neutral-900",
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_a]:underline [&_a]:underline-offset-4",
  "[&_img]:my-6 [&_img]:w-full [&_img]:h-auto",
  "[&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:h-auto",
  "[&_strong]:font-medium [&_strong]:text-neutral-900",
].join(" ");

export function ProjectDetailPanel({ item, list }: Props) {
  const router = useRouter();
  const { t, lang } = useLang();
  const [closing, setClosing] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const project = useMemo(() => toProject(item, lang), [item, lang]);
  const descHtml = projectDescriptionHtml(item, lang);
  const available = projectHasLang(item, lang);

  // Дараагийн төсөл + дугаар — зөвхөн сонгосон хэл дээр байгаа төслүүдээс
  const { nextId, position } = useMemo(() => {
    const same = list.filter((p) => projectHasLang(p, lang));
    const idx = same.findIndex((p) => String(p.id) === String(item.id));
    return {
      nextId:
        idx >= 0 && same.length > 1
          ? String(same[(idx + 1) % same.length].id)
          : null,
      position: idx >= 0 ? idx + 1 : 1,
    };
  }, [list, lang, item.id]);

  // Үндсэн зураг + gallery (давхардалгүй). Өмнө нь /images/1-6.jpg гэж hardcode байсан.
  const images = useMemo(
    () => Array.from(new Set([project.image, ...project.gallery].filter(Boolean))),
    [project],
  );

  const handleClose = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      router.back(); // эсвэл router.push("/projects")
    }, 300);
  }, [router]);

  const goNext = useCallback(() => {
    if (!nextId) return;
    setActiveImage(0);
    router.push(`/projects/${nextId}`);
  }, [nextId, router]);

  useEffect(() => {
    setActiveImage(0);
  }, [item.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  const stagger = (i: number) => ({
    animationDelay: `${0.15 + i * 0.08}s`,
  });

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
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${
          closing
            ? "opacity-0 transition-opacity duration-300"
            : "voss-backdrop"
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
          {/* ◀ ЗҮҮН/ДЭЭД: тогтмол (sticky) том зураг */}
          <div className="relative z-20 w-full md:w-[64%] shrink-0 sticky top-0 h-[55vh] md:h-screen bg-neutral-200 overflow-hidden">
            <Image
              key={activeImage}
              src={images[activeImage] ?? project.image}
              alt={`${project.title} — ${project.type}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover voss-modal-image"
            />

            {/* Дээд хэсгийн харанхуй gradient */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

            {/* ID label */}
            <span className="absolute top-5 left-6 text-xs text-white/90 tracking-[0.2em] z-10">
              {String(position).padStart(2, "0")} /{" "}
              {t.projects.heading.toUpperCase()}
            </span>

            {/* Close товч */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-6 z-10 flex items-center gap-2 text-xs tracking-[0.2em] text-white/90 hover:text-white transition-colors"
              aria-label={t.projects.close}
            >
              {t.projects.close}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* ▶ БАРУУН/ДООД: гүйдэг контент */}
          <div className="relative z-0 w-full md:w-[36%] px-8 md:px-10 py-10 md:py-14 bg-white">
            {!available ? (
              <div className="voss-stagger" style={stagger(0)}>
                <p className="text-xs text-neutral-400 tracking-[0.2em] mb-3">
                  {t.projects.heading.toUpperCase()}
                </p>
                <p className="text-xl font-light text-neutral-700 leading-snug">
                  {t.projects.notAvailable}
                </p>
                <button
                  onClick={() => router.push("/projects")}
                  className="mt-8 text-sm border-b border-black pb-1 hover:opacity-50 transition"
                >
                  {t.projects.allProjects} →
                </button>
              </div>
            ) : (
            <>
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
            {project.longDescription && (
              <div
                className="border-t border-neutral-100 mt-8 pt-8 voss-stagger"
                style={stagger(2)}
              >
                <p className="text-[10px] text-neutral-400 tracking-[0.18em] mb-4">
                  {t.projects.modal.overview}
                </p>
                <div
                  className={DESC_CLASS}
                  dangerouslySetInnerHTML={{ __html: descHtml }}
                />
              </div>
            )}

            {/* Gallery thumbnails — 1-ээс олон зураг байвал */}
            {images.length > 1 && (
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
            )}

            {/* Services + status */}
            <div
              className="grid grid-cols-1 gap-8 border-t border-neutral-100 mt-8 pt-8 voss-stagger"
              style={stagger(3)}
            >
              {project.detail.services.length > 0 && (
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
              )}
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
            {nextId && (
              <button
                onClick={goNext}
                className="group flex items-center justify-between w-full border-t border-neutral-100 mt-8 pt-8 voss-stagger"
                style={stagger(5)}
              >
                <span className="text-xs text-neutral-400 tracking-[0.2em]">
                  {t.projects.modal.next}
                </span>
                <ArrowIcon className="w-5 h-5 text-neutral-800 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            )}
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}