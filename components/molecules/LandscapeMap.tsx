"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ImageOff, Leaf, Ruler, Droplets, TreePine } from "lucide-react";

interface RoomSection {
  title: string;
  text: string;
  image: string;
}

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
  rooms?: RoomSection[];
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

const CATEGORY_RGB: Record<Zone["category"], string> = {
  trees: "34,197,94",
  flowers: "236,72,153",
  water: "59,130,246",
  lawn: "132,204,22",
  path: "163,163,163",
};

interface Props {
  image: string;
  zones: Zone[];
}

export function LandscapeMap({ image, zones }: Props) {
  const [active, setActive] = useState<Zone | null>(null);
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const openDetail = (z: Zone) => {
    setActive(z);
    setActiveImageIndex(0);
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
      setActiveImageIndex(0);
    }, 400);
  };

  useEffect(() => {
    if (active && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [active]);

  const rgb = active ? CATEGORY_RGB[active.category] : "245,130,32";

  const allImages = active
    ? [active.heroImage, ...(active.gallery || [])].filter((v): v is string =>
        Boolean(v),
      )
    : [];

  const bgImage = allImages[activeImageIndex] || allImages[0];

  const stagger = (delayMs: number) => ({
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 500ms ease ${delayMs}ms, transform 500ms ease ${delayMs}ms`,
  });

  return (
    <div className="relative">
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
            onClick={() => openDetail(z)}
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
          <div
            className="fixed inset-0 z-[200] bg-neutral-900 transition-opacity duration-400 ease-out"
            style={{ opacity: open ? 1 : 0 }}
          >
            <div ref={scrollRef} className="h-full w-full">
              {/* ===== HERO — яг нэг дэлгэцэд багтдаг (h-screen, scroll шаардлагагvй) ===== */}
              <div className="relative h-screen w-full">
                {bgImage ? (
                  <Image
                    key={bgImage}
                    src={bgImage}
                    alt={active.title}
                    fill
                    className="object-cover transition-opacity duration-500"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-500">
                    <ImageOff className="h-10 w-10" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/45" />

                <button
                  onClick={closeDetail}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-transform hover:scale-105 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
                  aria-label="Хаах"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Контент — бvгд дэлгэцэд багтахаар компакт хэмжээтэй */}
                <div className="relative z-[5] flex h-full w-full flex-col justify-center px-6 py-16 sm:px-10 md:px-14">
                  <div className="max-w-xl">
                    <div
                      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-xl sm:px-4 sm:py-1.5 sm:text-[11px]"
                      style={{
                        borderColor: `rgba(${rgb},0.4)`,
                        backgroundColor: `rgba(${rgb},0.15)`,
                        ...stagger(0),
                      }}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${CATEGORY_COLOR[active.category]}`}
                      />
                      {CATEGORY_LABEL[active.category]}
                    </div>

                    <h2
                      className="mt-4 text-3xl font-extralight leading-[1.05] text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
                      style={stagger(80)}
                    >
                      {active.title}
                    </h2>

                    {active.description && (
                      <p
                        className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-base"
                        style={stagger(160)}
                      >
                        {active.description}
                      </p>
                    )}

                    <div
                      className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4"
                      style={stagger(240)}
                    >
                      <div
                        className="rounded-xl border p-3.5 backdrop-blur-xl sm:p-5"
                        style={{
                          borderColor: `rgba(${rgb},0.3)`,
                          backgroundColor: `rgba(${rgb},0.1)`,
                        }}
                      >
                        <div className="flex items-center gap-2 text-white/50">
                          <Ruler className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase tracking-[0.2em]">
                            Хэмжээс
                          </span>
                        </div>
                        <p className="mt-1.5 text-xl font-extralight text-white sm:mt-2 sm:text-2xl">
                          {active.stat.split("·")[0]?.trim() || active.stat}
                        </p>
                        {active.stat.includes("·") && (
                          <p className="mt-1 text-xs text-white/60">
                            {active.stat.split("·").slice(1).join("·").trim()}
                          </p>
                        )}
                      </div>

                      <div
                        className="flex items-center gap-3 rounded-xl border p-3.5 backdrop-blur-xl sm:p-5"
                        style={{
                          borderColor: `rgba(${rgb},0.3)`,
                          backgroundColor: `rgba(${rgb},0.1)`,
                        }}
                      >
                        {active.category === "trees" && (
                          <>
                            <TreePine className="h-5 w-5 shrink-0 text-white sm:h-6 sm:w-6" />
                            <span className="text-sm text-white/80">
                              Уугуул зvйлийн мод
                            </span>
                          </>
                        )}
                        {active.category === "water" && (
                          <>
                            <Droplets className="h-5 w-5 shrink-0 text-white sm:h-6 sm:w-6" />
                            <span className="text-sm text-white/80">
                              Хиймэл нуур, тайван орчин
                            </span>
                          </>
                        )}
                        {active.category !== "trees" &&
                          active.category !== "water" && (
                            <>
                              <Leaf className="h-5 w-5 shrink-0 text-white sm:h-6 sm:w-6" />
                              <span className="text-sm text-white/80">
                                Байгальд ээлтэй дизайн
                              </span>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Баруун доод буланд — жижиг thumbnail мөр */}
                {allImages.length > 0 && (
                  <div
                    className="absolute bottom-4 right-4 z-10 flex max-w-[70vw] gap-2 sm:bottom-6 sm:right-6 sm:max-w-none sm:gap-2.5"
                    style={stagger(320)}
                  >
                    {allImages.map((img, i) => {
                      const isActive = i === activeImageIndex;
                      return (
                        <button
                          key={img + i}
                          onClick={() => setActiveImageIndex(i)}
                          className={`relative aspect-square h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 sm:h-16 sm:w-16 ${
                            isActive
                              ? "scale-105 shadow-xl"
                              : "opacity-55 hover:opacity-100"
                          }`}
                          style={{
                            borderColor: isActive
                              ? `rgba(${rgb},0.9)`
                              : "rgba(255,255,255,0.25)",
                          }}
                          aria-label={`Зураг ${i + 1}`}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ===== Room хэсэг (hero-ийн доор, доош scroll хийвэл харагдана) ===== */}
              {active.rooms?.map((room, i) => {
                const imageLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 bg-white px-8 py-16 md:grid-cols-2"
                  >
                    <div
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100 ${
                        imageLeft ? "" : "md:order-2"
                      }`}
                    >
                      <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className={imageLeft ? "" : "md:order-1"}>
                      <p className="text-xs uppercase tracking-[0.25em] text-[#F58220]">
                        0{i + 1}
                      </p>
                      <h3 className="mt-3 text-2xl font-extralight text-neutral-900 md:text-3xl">
                        {room.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                        {room.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
