"use client";

import { useLang } from "@/lib/language-context";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { useEffect, useRef, useState } from "react";

/** Scroll хийж харагдах үед start-аас end хүртэл тоолдог тоолуур */
function Counter({
  end,
  start = 1,
  duration = 1600,
  play,
}: {
  end: number;
  start?: number;
  duration?: number;
  play: boolean;
}) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutCubic — эхэндээ хурдан, төгсгөлд нь зөөлөн
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [play, end, start, duration]);

  return <>{value}</>;
}

export function StudioSection() {
  const { t } = useLang();
  const statsRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPlay(true);
          observer.disconnect(); // зөвхөн нэг удаа тоолно
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="studio"
      className="py-24 px-8 bg-neutral-900 text-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <Reveal direction="left">
          <SectionLabel text={t.studio.label} />
          <h2 className="text-4xl md:text-5xl font-light leading-[1.2] max-w-3xl mb-16">
            {t.studio.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <Reveal direction="left">
            <p className="text-neutral-400 leading-relaxed">{t.studio.p1}</p>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <p className="text-neutral-400 leading-relaxed">{t.studio.p2}</p>
          </Reveal>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 border-t border-neutral-800 pt-12"
        >
          {[
            { end: 87, label: t.studio.stats.projects },
            { end: 14, label: t.studio.stats.awards },
            { end: 22, label: t.studio.stats.years },
          ].map((s, i) => (
            <Reveal key={i} direction="up" delay={i * 120}>
              <p className="text-5xl font-light mb-2">
                <Counter end={s.end} play={play} />
              </p>
              <p className="text-xs text-neutral-500 tracking-[0.15em]">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
