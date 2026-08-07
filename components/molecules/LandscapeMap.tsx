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

// category бvрийн RGB (glow, border, icon chip-д ашиглана)
const CATEGORY_RGB: Record<Zone["category"], string> = {
  trees: "34,197,94",
  flowers: "236,72,153",
  water: "59,130,246",
  lawn: "132,204,22",
  path: "163,163,163",
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

  const rgb = active ? CATEGORY_RGB[active.category] : "245,130,32";

  const cardImages = active
    ? [active.heroImage, ...(active.gallery || [])].filter(
        (v): v is string => Boolean(v),
      ).slice(0, 3)
    : [];

  // Staggered animation-ий хувийн класс vvсгэгч
  const stagger = (delayMs: number) => ({
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 500ms ease ${delayMs}ms, transform 500ms ease ${delayMs}ms`,
  });

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
            <p className="text-xs uppercase tracking-[0.2em]">Зураг олдсонгvй</p>
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
          <span key={c} className="inline-flex items-center gap-2 text-xs text-neutral-500">
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
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
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
            />

            <div
              className="fixed z-[201] overflow-hidden bg-neutral-900 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={style}
            >
              <div
                ref={scrollRef}
                className="h-full w-full overflow-y-auto"
                style={{ opacity: open ? 1 : 0, transition: "opacity 300ms ease 100ms" }}
              >
                {/* ===== HERO ===== */}
                <div className="relative min-h-screen w-full">
                  {active.heroImage ? (
                    <Image
                      src={active.heroImage}
                      alt={active.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-500">
                      <ImageOff className="h-10 w-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Category-ийн өнгөт зөөлөн glow — карт стекийн ард */}
                  <div
                    className="pointer-events-none absolute right-[8%] top-1/2 hidden h-[500px] w-[400px] -translate-y-1/2 rounded-full blur-[120px] md:block"
                    style={{ backgroundColor: `rgba(${rgb},0.25)` }}
                  />

                  {/* Хаах товч */}
                  <button
                    onClick={closeDetail}
                    className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-transform hover:scale-105"
                    aria-label="Хаах"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Контент grid */}
                  <div className="relative z-[5] grid min-h-screen grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:px-14">
                    {/* ЗVVН — текст */}
                    <div className="max-w-xl">
                      <div
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-xl"
                        style={{
                          borderColor: `rgba(${rgb},0.4)`,
                          backgroundColor: `rgba(${rgb},0.15)`,
                          ...stagger(0),
                        }}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_COLOR[active.category]}`} />
                        {CATEGORY_LABEL[active.category]}
                      </div>

                      <h2
                        className="mt-6 text-5xl font-extralight leading-[1.05] text-white md:text-7xl"
                        style={stagger(80)}
                      >
                        {active.title}
                      </h2>

                      {active.description && (
                        <p
                          className="mt-6 text-base leading-relaxed text-white/75 md:text-lg"
                          style={stagger(160)}
                        >
                          {active.description}
                        </p>
                      )}

                      {/* Icon chip-той статистик мөр */}
                      <div className="mt-10 flex flex-wrap gap-6" style={stagger(240)}>
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-full"
                            style={{ backgroundColor: `rgba(${rgb},0.18)` }}
                          >
                            <Ruler className="h-4 w-4 text-white" />
                          </span>
                          <span className="text-sm text-white/80">
                            {active.stat.split("·")[0]?.trim() || active.stat}
                          </span>
                        </div>
                        {active.category === "trees" && (
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-9 w-9 items-center justify-center rounded-full"
                              style={{ backgroundColor: `rgba(${rgb},0.18)` }}
                            >
                              <TreePine className="h-4 w-4 text-white" />
                            </span>
                            <span className="text-sm text-white/80">Уугуул зvйл</span>
                          </div>
                        )}
                        {active.category === "water" && (
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-9 w-9 items-center justify-center rounded-full"
                              style={{ backgroundColor: `rgba(${rgb},0.18)` }}
                            >
                              <Droplets className="h-4 w-4 text-white" />
                            </span>
                            <span className="text-sm text-white/80">Тайван орчин</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-full"
                            style={{ backgroundColor: `rgba(${rgb},0.18)` }}
                          >
                            <Leaf className="h-4 w-4 text-white" />
                          </span>
                          <span className="text-sm text-white/80">Байгальд ээлтэй</span>
                        </div>
                      </div>
                    </div>

                    {/* БАРУУН — 3 glass карт, staggered, hover lift */}
                    <div className="relative flex flex-col gap-4 md:pl-6">
                      <div
                        className="group rounded-2xl border p-6 backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1"
                        style={{
                          borderColor: `rgba(${rgb},0.3)`,
                          backgroundColor: `rgba(${rgb},0.1)`,
                          ...stagger(320),
                        }}
                      >
                        <p className="text-4xl font-extralight text-white">
                          {active.stat.split("·")[0]?.trim() || active.stat}
                        </p>
                        {active.stat.includes("·") && (
                          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/50">
                            {active.stat.split("·").slice(1).join("·").trim()}
                          </p>
                        )}
                      </div>

                      {cardImages[1] && (
                        <div
                          className="overflow-hidden rounded-2xl border backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1"
                          style={{
                            borderColor: `rgba(${rgb},0.3)`,
                            backgroundColor: `rgba(${rgb},0.1)`,
                            ...stagger(400),
                          }}
                        >
                          <div className="relative h-32 w-full">
                            <Image src={cardImages[1]} alt="" fill className="object-cover" />
                          </div>
                          <div className="p-4">
                            <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                              Дэлгэрэнгvй
                            </p>
                            <p className="mt-1 text-sm text-white/80">
                              {CATEGORY_LABEL[active.category]} бvсийн дизайн
                            </p>
                          </div>
                        </div>
                      )}

                      {cardImages[2] ? (
                        <div
                          className="overflow-hidden rounded-2xl border backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1"
                          style={{
                            borderColor: `rgba(${rgb},0.3)`,
                            backgroundColor: `rgba(${rgb},0.1)`,
                            ...stagger(480),
                          }}
                        >
                          <div className="relative h-32 w-full">
                            <Image src={cardImages[2]} alt="" fill className="object-cover" />
                          </div>
                          <div className="p-4">
                            <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                              Арчилгаа
                            </p>
                            <p className="mt-1 text-sm text-white/80">
                              Тогтмол vйлчилгээтэй
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="rounded-2xl border p-6 backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1"
                          style={{
                            borderColor: `rgba(${rgb},0.3)`,
                            backgroundColor: `rgba(${rgb},0.1)`,
                            ...stagger(480),
                          }}
                        >
                          <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                            Байршил
                          </p>
                          <p className="mt-2 text-sm text-white/80">
                            Genplan дээр #{active.id} тэмдэглэгээтэй
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ===== Room хэсэг (доор, scroll хийхэд) ===== */}
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
                        <Image src={room.image} alt={room.title} fill className="object-cover" />
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

                <div className="h-20 bg-white" />
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}