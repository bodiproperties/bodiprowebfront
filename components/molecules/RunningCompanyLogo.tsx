"use client";

import Image from "next/image";

export default function RunningCompanyLogo() {
  const logos = [
    "/images/Bodi-properties-english2.png",
    "/images/Group22.png",
    "/images/Bodi-properties-mongol.png",
    "/images/Group27.png",
    "/images/Group20.png",
  ];

  return (
    <>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        .marquee-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 6rem;
          padding-right: 6rem;
        }

        .marquee-logo-wrap {
          position: relative;
          padding: 1.5rem 2rem;
          border-radius: 1rem;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .marquee-logo-wrap:hover {
          background-color: white;
          box-shadow: 0 8px 24px -8px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }

        .marquee-logo {
          filter: grayscale(1) opacity(0.55);
          transition: filter 0.4s ease;
        }
        .marquee-logo-wrap:hover .marquee-logo {
          filter: grayscale(0) opacity(1);
        }

        .marquee-mask {
          -webkit-mask-image: linear-gradient(
            to right, transparent 0, black 10%, black 90%, transparent 100%
          );
          mask-image: linear-gradient(
            to right, transparent 0, black 10%, black 90%, transparent 100%
          );
        }
      `}</style>

      <section className="relative w-full bg-gradient-to-b from-white to-gray-50/60 py-10 overflow-hidden">
        {/* Section label */}
        <div className="max-w-[1400px] mx-auto px-8 mb-10 flex items-center gap-3">
          <div className="w-8 h-px bg-[#F58220]" />
          <p className="text-xs text-neutral-500 tracking-[0.25em] font-medium uppercase">
            Манай хамтрагчид
          </p>
        </div>

        <div className="marquee-mask w-full overflow-hidden">
          <div className="marquee-track">
            {[0, 1, 2, 3].map((groupIdx) => (
              <div key={groupIdx} className="marquee-group" aria-hidden={groupIdx > 0}>
                {logos.map((logo, i) => (
                  <div key={`${groupIdx}-${i}`} className="marquee-logo-wrap">
                    <Image
                      src={logo}
                      alt={groupIdx === 0 ? "Company logo" : ""}
                      width={140}
                      height={40}
                      className="marquee-logo shrink-0"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Subtle divider lines top/bottom */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </section>
    </>
  );
}