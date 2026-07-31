"use client";

import Link from "next/link";
import { useLang } from "@/lib/language-context";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Reveal } from "@/components/Reveal";

export function JournalSection() {
  const { t } = useLang();

  return (
    <section id="journal" className="py-24 px-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Reveal direction="left">
          <SectionLabel text={t.journal.label} />
          <h2 className="text-5xl font-light mb-16">{t.journal.heading}</h2>
        </Reveal>

        <div>
          {t.journal.items.map(
            (item: { date: string; title: string; tag: string }, i: number) => (
              <Reveal key={i} direction="up" delay={i * 90}>
                <Link
                  href="#"
                  className="flex items-center justify-between py-6 border-t border-neutral-200 group hover:bg-neutral-50 transition-colors -mx-4 px-4"
                >
                  <div className="flex items-center gap-8">
                    <span className="text-sm text-neutral-400 w-28 shrink-0">
                      {item.date}
                    </span>
                    <h3 className="text-base md:text-lg font-light group-hover:text-neutral-500 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-400 tracking-[0.1em] shrink-0 ml-4 hidden md:block">
                    {item.tag}
                  </span>
                </Link>
              </Reveal>
            ),
          )}
          <div className="border-t border-neutral-200" />
        </div>
      </div>
    </section>
  );
}
