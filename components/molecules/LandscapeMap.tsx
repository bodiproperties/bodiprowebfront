"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ImageOff } from "lucide-react";

interface Zone {
  id: number;
  x: number;
  y: number;
  category: "trees" | "flowers" | "water" | "lawn" | "path";
  title: string;
  stat: string;
  description?: string;
  heroImage?: string;
  gallery?: string[];
}

const CATEGORY_LABEL: Record<Zone["category"], string> = {
  trees: "Мод",
  flowers: "Цэцэг",
  water: "Усан сан",
  lawn: "Ногоон талбай",
  path: "Явган зам",
};

const CATEGORY_COLOR: Record<Zone["category"], string> = {
  trees: "bg-green-600",
  flowers: "bg-pink-500",
  water: "bg-blue-500",
  lawn: "bg-lime-500",
  path: "bg-neutral-500",
};

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Props {
  image: string;
  zones: Zone[];
}

export function LandscapeMap({ image, zones }: Props) {
  const [active, setActive] = useState<Zone | null>(null);
  const [open, setOpen] = useState(false);
  const [startRect, setStartRect] = useState<Rect | null>(null);
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const openDetail = (z: Zone, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setStartRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setActive(z);
    setImgIndex(0);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });
  };

  const closeDetail = () => {
    setOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => {
      setActive(null);
      setStartRect(null);
    }, 450);
  };

  useEffect(() => {
    if (active && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [active]);

  const style: React.CSSProperties = open
    ? { top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 }
    : startRect
      ? {
          top: startRect.top,
          left: startRect.left,
          width: startRect.width,
          height: startRect.height,
          borderRadius: "9999px",
        }
      : {};

  return (
    <div className="relative">
      {/* Ландшафтын зураг + бvсvvд */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100">
        {!imgError ? (
          <Image
            src={"/images/sp.jpg"}
            alt="Цэцэрлэгийн төлөвлөгөө"
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-300">
            <ImageOff className="h-8 w-8" />
            <p className="text-xs uppercase tracking-[0.2em]">
              Зураг олдсонгvй
            </p>
          </div>
        )}

        {zones.map((z) => (
          <button
            key={z.id}
            onClick={(e) => openDetail(z, e)}
            style={{ left: `${z.x}%`, top: `${z.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            aria-label={`${z.title} — ${CATEGORY_LABEL[z.category]}`}
          >
            <span className="pulse-ring absolute inset-0 rounded-full bg-white" />
            <span
              className="pulse-ring absolute inset-0 rounded-full bg-white"
              style={{ animationDelay: "1s" }}
            />
            <span
              className={`relative flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white/40 transition-transform group-hover:scale-110 ${CATEGORY_COLOR[z.category]}`}
            >
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          </button>
        ))}
      </div>

      {/* Легенд */}
      <div className="mt-4 flex flex-wrap gap-5">
        {(Object.keys(CATEGORY_LABEL) as Zone["category"][]).map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-2 text-xs text-neutral-500"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${CATEGORY_COLOR[c]}`} />
            {CATEGORY_LABEL[c]}
          </span>
        ))}
      </div>

      <style jsx>{`
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
      `}</style>

      {/* MODAL */}
      {active &&
        mounted &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[200] bg-black transition-opacity duration-500"
              style={{ opacity: open ? 1 : 0 }}
              onClick={closeDetail}
            />

            <div
              className="fixed z-[201] overflow-hidden bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={style}
            >
              <div
                ref={scrollRef}
                className="h-full overflow-y-auto"
                style={{
                  opacity: open ? 1 : 0,
                  transition: "opacity 300ms ease 150ms",
                }}
              >
                <button
                  onClick={closeDetail}
                  className="fixed right-6 top-6 z-[210] flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg backdrop-blur transition-transform hover:scale-105"
                  aria-label="Хаах"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative h-[70vh] w-full bg-neutral-100">
                  {active.heroImage ? (
                    <Image
                      src={active.heroImage}
                      alt={active.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-300">
                      <ImageOff className="h-10 w-10" />
                      <p className="text-xs uppercase tracking-[0.2em]">
                        Зураг алга
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white md:p-14">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/70">
                      <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_COLOR[active.category]}`} />
                      {CATEGORY_LABEL[active.category]}
                    </div>
                    <h2 className="mt-3 text-4xl font-extralight md:text-6xl">
                      {active.title}
                    </h2>
                    <p className="mt-3 text-sm text-white/80 md:text-base">
                      {active.stat}
                    </p>
                  </div>
                </div>

                {active.description && (
                  <div className="mx-auto max-w-3xl px-8 py-16 text-center">
                    <p className="text-lg font-light leading-relaxed text-neutral-700 md:text-xl">
                      {active.description}
                    </p>
                  </div>
                )}

                {/* Зурган галерей */}
                {active.gallery && active.gallery.length > 0 && (
                  <div className="mx-auto max-w-5xl px-8 pb-20">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-100">
                      <Image
                        src={active.gallery[imgIndex]}
                        alt={active.title}
                        fill
                        className="object-cover transition-opacity duration-300"
                      />
                    </div>
                    {active.gallery.length > 1 && (
                      <div className="mt-4 flex justify-center gap-2">
                        {active.gallery.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${
                              i === imgIndex ? "w-6 bg-neutral-900" : "w-1.5 bg-neutral-300"
                            }`}
                            aria-label={`Зураг ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="h-20" />
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}