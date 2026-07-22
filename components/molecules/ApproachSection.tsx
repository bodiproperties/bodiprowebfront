"use client";

import { useLang } from "@/lib/language-context";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Reveal } from "@/components/Reveal";

export function ApproachSection() {
  const { t } = useLang();

  return (
    <section
      id="approach"
      className="py-24 px-8 bg-neutral-100 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <Reveal direction="left">
          <SectionLabel text={t.approach.label} />
          <h2 className="text-5xl font-light mb-16">{t.approach.heading}</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {t.approach.items.map(
            (
              item: { num: string | number; title: string; desc: string },
              i: number,
            ) => (
              <Reveal
                key={item.num}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={(i % 2) * 120}
              >
                <div className="group border-t border-neutral-300 hover:border-neutral-900 px-6 py-8 transition-colors duration-500 ease-out hover:bg-neutral-900 cursor-default">
                  <div className="flex gap-4 mb-4">
                    <span className="text-sm text-neutral-400 transition-colors duration-500 group-hover:text-neutral-500">
                      ({item.num})
                    </span>
                    <h3 className="text-xl font-light text-neutral-900 transition-all duration-500 group-hover:text-white group-hover:translate-x-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description — орон зайг үргэлж эзэлдэг тул hover үед юу ч хөдлөхгүй */}
                  <div className="transition-all duration-500 ease-out md:opacity-0 md:translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-neutral-500 leading-relaxed pl-12 transition-colors duration-500 group-hover:text-neutral-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
