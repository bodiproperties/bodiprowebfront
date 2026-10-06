"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Search, Calendar, ArrowRight, Sparkles } from "lucide-react";
import NewsHero from "@/components/molecules/NewsHero";
import { useLang } from "@/lib/language-context";
import {
  hasNewsLang,
  type PublicNews,
} from "@/components/molecules/NewsArticle";

type Lang = "EN" | "MN";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=1000&fit=crop";

/** Зөвхөн сонгосон хэлний утга — нөгөө хэл рүү fallback хийхгүй */
function pick(v: { en?: string; mn?: string } | undefined, lang: Lang) {
  if (!v) return "";
  return (lang === "MN" ? v.mn : v.en) ?? "";
}

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (s: string, max = 180) =>
  s.length > max ? `${s.slice(0, max).replace(/\s+\S*$/, "")}…` : s;

const firstImage = (html = "") =>
  html.match(/<img[^>]*\ssrc=["']([^"']+)["']/i)?.[1] ?? null;

const firstYoutubeThumb = (html = "") => {
  const id = html.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|v=|shorts\/)([A-Za-z0-9_-]{11})/,
  )?.[1];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

function formatDate(iso: string | null | undefined, lang: Lang) {
  if (!iso) return "";
  const d = new Date(iso);
  if (lang === "MN") {
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** API-ийн мэдээг картын өгөгдөл болгоно */
function toCard(item: PublicNews, lang: Lang) {
  const html = pick(item.desc, lang);
  const allHtml = `${item.desc?.mn ?? ""} ${item.desc?.en ?? ""}`;
  return {
    id: item.id,
    href: `/news/${item.slug || item.id}`,
    title: pick(item.title, lang),
    excerpt: truncate(stripHtml(html)),
    image:
      firstImage(html) ||
      firstImage(allHtml) ||
      firstYoutubeThumb(allHtml) ||
      FALLBACK_IMAGE,
    date: item.publishedAt ?? item.createdAt ?? null,
  };
}

export function NewsList({ items }: { items: PublicNews[] }) {
  const { t, lang } = useLang();
  const n = t.news;

  const [searchQuery, setSearchQuery] = useState("");

  // Зөвхөн сонгосон хэл дээр оруулсан мэдээнүүд
  const langItems = useMemo(
    () => items.filter((it) => hasNewsLang(it, lang)),
    [items, lang],
  );
  const cards = useMemo(
    () => langItems.map((it) => toCard(it, lang)),
    [langItems, lang],
  );
  // Тухайн хэлний хамгийн шинэ мэдээ (API шинээс хуучин руу эрэмбэлдэг)
  const featuredId = langItems[0]?.id;

  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.excerpt.toLowerCase().includes(q),
    );
  }, [cards, searchQuery]);

  return (
    <main className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <NewsHero />

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-4 gap-10 text-center">
        {n.pageStats.map((stat, i) => (
          <Reveal key={stat.label} direction="up" delay={i * 120}>
            <h2 className="text-5xl font-extralight">{stat.num}</h2>
            <p className="mt-3 text-xs tracking-[0.3em] uppercase text-neutral-500">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </section>

      {/* HEADER + SEARCH — NewsHero-ийн "#articles" товч энд гүйлгэнэ */}
      <section
        id="articles"
        className="max-w-6xl mx-auto px-8 mb-16 scroll-mt-24 border-b border-neutral-200 pb-10"
      >
        <Reveal direction="left">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#F58220]" />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#F58220]">
              {n.latest}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl md:text-6xl font-extralight text-neutral-900">
                {n.sectionTitle}
              </h2>
              <p className="mt-3 max-w-xl font-light text-neutral-500">
                {n.sectionDesc}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={n.searchPlaceholder}
                aria-label={n.searchPlaceholder}
                className="w-full border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm transition focus:border-[#F58220] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ARTICLES */}
      <div className="max-w-6xl mx-auto px-8 space-y-8">
        {filteredCards.length === 0 ? (
          <div className="border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-base text-neutral-500">{n.empty}</p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 text-xs font-semibold uppercase text-[#F58220] underline cursor-pointer"
              >
                {n.clearFilters}
              </button>
            )}
          </div>
        ) : (
          filteredCards.map((card, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <Reveal
                key={card.id}
                direction={imageLeft ? "left" : "right"}
                delay={Math.min(i, 4) * 80}
              >
                <Link
                  href={card.href}
                  className="group grid items-center gap-0 border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-400 hover:shadow-md md:grid-cols-2"
                >
                  {/* IMAGE */}
                  <div
                    className={`relative aspect-[16/10] overflow-hidden ${
                      imageLeft ? "" : "md:order-2"
                    }`}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
                  </div>

                  {/* CONTENT */}
                  <div
                    className={`p-8 md:p-10 ${imageLeft ? "" : "md:order-1"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                        {n.detail.categoryValue}
                      </span>
                      {card.id === featuredId && (
                        <span className="flex items-center gap-1 bg-[#F58220]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#F58220]">
                          <Sparkles className="h-3 w-3" />
                          {n.featured}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-2xl font-light leading-tight tracking-tight text-neutral-900 transition group-hover:tracking-wide md:text-3xl">
                      {card.title}
                    </h2>

                    {card.date && (
                      <div className="mt-3 flex items-center gap-1.5 text-sm font-light text-neutral-500">
                        <Calendar className="h-4 w-4 text-[#F58220]" />
                        <time dateTime={card.date}>
                          {formatDate(card.date, lang)}
                        </time>
                      </div>
                    )}

                    {card.excerpt && (
                      <p className="mt-4 max-w-md leading-relaxed text-neutral-500">
                        {card.excerpt}
                      </p>
                    )}

                    <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-900 transition group-hover:text-[#F58220]">
                      {n.readMore}
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })
        )}
      </div>

      {/* QUOTE */}
      <section className="max-w-5xl mx-auto px-8 py-36 text-center">
        <Reveal direction="up">
          <blockquote>
            <p className="text-4xl md:text-5xl font-extralight leading-tight">
              “{n.quote}”
            </p>
            <footer className="mt-8 text-sm tracking-[0.3em] uppercase text-neutral-500">
              {n.quoteAuthor}
            </footer>
          </blockquote>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-8 py-24 flex flex-col md:flex-row justify-between items-center gap-8">
          <Reveal direction="left">
            <h2 className="text-3xl md:text-5xl font-extralight">
              {n.ctaTitle}
            </h2>
            <p className="mt-4 text-neutral-500">{n.ctaDesc}</p>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <button
              type="button"
              className="px-10 py-4 border border-black hover:bg-[#F58220] hover:text-white transition text-sm tracking-[0.2em] uppercase cursor-pointer"
            >
              {n.subscribe}
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}