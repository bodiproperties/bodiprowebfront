"use client";

import Image from "next/image";
import { useLang } from "@/lib/language-context";
import { Reveal } from "@/components/Reveal";

export function QuoteSection() {
  const { t } = useLang();

  return (
    <section className="relative py-32 px-8 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=800&fit=crop"
          alt="Architectural detail of modern building with dramatic light and shadow"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative max-w-[1400px] mx-auto text-center">
        <Reveal direction="up">
          <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed max-w-3xl mx-auto mb-8">
            {t.quote.text}
          </blockquote>
          <p className="text-xs text-neutral-400 tracking-[0.2em]">
            {t.quote.author}
          </p>
        </Reveal>
      </div>
    </section>
  );
}