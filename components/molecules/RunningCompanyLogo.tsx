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
          animation: scroll 35s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        .marquee-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 5rem;
          padding-right: 5rem;
        }

        .marquee-logo {
          filter: grayscale(1);
          opacity: 0.4;
          transition: filter 0.5s ease, opacity 0.5s ease;
        }
        .marquee-logo:hover {
          filter: grayscale(0);
          opacity: 1;
        }

        .marquee-mask {
          -webkit-mask-image: linear-gradient(
            to right, transparent 0, black 12%, black 88%, transparent 100%
          );
          mask-image: linear-gradient(
            to right, transparent 0, black 12%, black 88%, transparent 100%
          );
        }
      `}</style>

      <section className="w-full bg-gray-50 border-t border-b border-neutral-200 py-14">
        
        <div className="marquee-mask w-full overflow-hidden">
          <div className="marquee-track">
            {[0, 1, 2, 3].map((groupIdx) => (
              <div key={groupIdx} className="marquee-group" aria-hidden={groupIdx > 0}>
                {logos.map((logo, i) => (
                  <Image
                    key={`${groupIdx}-${i}`}
                    src={logo}
                    alt={groupIdx === 0 ? "Company logo" : ""}
                    width={140}
                    height={40}
                    className="marquee-logo shrink-0"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}