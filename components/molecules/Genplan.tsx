"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ImageOff } from "lucide-react";

interface RoomSection {
  title: string;
  text: string;
  image: string;
}

interface Plot {
  id: number;
  x: number;
  y: number;
  status: "available" | "reserved" | "sold";
  title: string;
  area: string;
  price?: string;
  description?: string;
  heroImage?: string;
  rooms?: RoomSection[];
}

interface BlockLabel {
  label: string;
  x: number;
  y: number;
}

const STATUS_LABEL: Record<Plot["status"], string> = {
  available: "Зарагдаагvй",
  reserved: "Захиалгатай",
  sold: "Зарагдсан",
};

const STATUS_COLOR: Record<Plot["status"], string> = {
  available: "bg-[#F58220]",
  reserved: "bg-amber-400",
  sold: "bg-neutral-400",
};

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Props {
  image: string;
  plots: Plot[];
  blocks?: BlockLabel[];
}

export function Genplan({ image, plots, blocks = [] }: Props) {
  const [active, setActive] = useState<Plot | null>(null);
  const [open, setOpen] = useState(false);
  const [startRect, setStartRect] = useState<Rect | null>(null);
  const [genplanError, setGenplanError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const openDetail = (p: Plot, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setStartRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setActive(p);
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
      {/* Ерөнхий зураг + тоон цэгvvд + Block шошго */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100">
        {!genplanError ? (
          <Image
            src={"/images/house.jpg"}
            alt="Ерөнхий төлөвлөгөө"
            fill
            className="object-cover"
            onError={() => setGenplanError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-300">
            <ImageOff className="h-8 w-8" />
            <p className="text-xs uppercase tracking-[0.2em]">
              Genplan зураг олдсонгvй
            </p>
          </div>
        )}

        {/* Block шошгонууд */}
        {blocks.map((b, i) => (
          <span
            key={i}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 shadow-md"
          >
            {b.label}
          </span>
        ))}

        {/* Villa pin-vvд — цагаан дугуй, дугаартай, тасралтгvй pulse-той */}
        {plots.map((p) => (
          <button
            key={p.id}
            onClick={(e) => openDetail(p, e)}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            aria-label={`${p.title} — ${STATUS_LABEL[p.status]}`}
          >
            {/* Pulse ring — тасралтгvй өргөсч алга болно */}
            <span className="pulse-ring absolute inset-0 rounded-full bg-white" />
            <span
              className="pulse-ring absolute inset-0 rounded-full bg-white"
              style={{ animationDelay: "1s" }}
            />

            {/* Гол pin */}
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-medium text-neutral-900 shadow-lg ring-4 ring-white/40 transition-transform group-hover:scale-110">
              {p.id}
            </span>
          </button>
        ))}
      </div>

      {/* Легенд */}
      <div className="mt-4 flex flex-wrap gap-5">
        {(Object.keys(STATUS_LABEL) as Plot["status"][]).map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-2 text-xs text-neutral-500"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${STATUS_COLOR[s]}`} />
            {STATUS_LABEL[s]}
          </span>
        ))}
      </div>

      {/* Pulse animation-ий CSS */}
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
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>

      {/* MODAL — document.body руу portal хийж, ямар ч transform-ний нөлөөнөөс ангид байлгана */}
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
                      src={"/images/ha.jpg"}
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
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${STATUS_COLOR[active.status]}`}
                      />
                      #{active.id} · {STATUS_LABEL[active.status]}
                    </div>
                    <h2 className="mt-3 text-4xl font-extralight md:text-6xl">
                      {active.title}
                    </h2>
                    <p className="mt-3 text-sm text-white/80 md:text-base">
                      Талбай: {active.area}
                      {active.price && ` · vнэ: ${active.price}`}
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

                {active.rooms?.map((room, i) => {
                  const imageLeft = i % 2 === 0;
                  return (
                    <div
                      key={i}
                      className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-2"
                    >
                      <div
                        className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100 ${
                          imageLeft ? "" : "md:order-2"
                        }`}
                      >
                        <Image
                          src={"/images/3.jpg"}
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

                <div className="h-20" />
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}