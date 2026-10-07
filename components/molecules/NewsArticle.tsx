"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/components/molecules/BackButton";
import { useLang } from "@/lib/language-context";

export type PublicNews = {
  id: string;
  slug?: string;
  title?: { en?: string; mn?: string };
  desc?: { en?: string; mn?: string };
  youtubeUrl?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
};

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=2000";

const IMG_RE = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/i;

/** Зөвхөн сонгосон хэлний утга — нөгөө хэл рүү fallback хийхгүй */
function pick(v: { en?: string; mn?: string } | undefined, lang: "EN" | "MN") {
  if (!v) return "";
  return (lang === "MN" ? v.mn : v.en) ?? "";
}

/** Мэдээ тухайн хэл дээр оруулагдсан эсэх (гарчиг эсвэл контент) */
export function hasNewsLang(item: PublicNews, lang: "EN" | "MN") {
  const text = (s = "") =>
    s
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();
  return Boolean(text(pick(item.title, lang)) || text(pick(item.desc, lang)));
}

function readingMinutes(html: string) {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return Math.max(1, Math.round(words.length / 200));
}

function formatDate(iso: string | null | undefined, lang: "EN" | "MN") {
  if (!iso) return "";
  const d = new Date(iso);
  if (lang === "MN") {
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function youtubeEmbed(url?: string | null) {
  const id = url?.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|v=|shorts\/)([A-Za-z0-9_-]{11})/,
  )?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

// Tiptap HTML-ийг анхны дизайны typography-тай ижил харагдуулна.
// Admin editor-ын бүх боломж (H1–H3, bold/italic/underline/strike, highlight,
// code, align, list, quote, line, link, image, YouTube, table) энд хамрагдсан.
const ARTICLE_CLASS = [
  "space-y-10 leading-relaxed text-neutral-700",
  // Хоосон мөр (<p></p>) — том зай үүсгэхгүй
  "[&_p:empty]:hidden",
  // Эхний догол мөр — lead
  "[&>p:first-child]:text-xl [&>p:first-child]:font-light [&>p:first-child]:leading-relaxed [&>p:first-child]:text-neutral-900",
  // Гарчгууд
  "[&_h1]:text-3xl [&_h1]:font-extralight [&_h1]:leading-tight [&_h1]:text-neutral-900",
  "[&_h2]:text-2xl [&_h2]:font-extralight [&_h2]:text-neutral-900",
  "[&_h3]:text-xl [&_h3]:font-light [&_h3]:text-neutral-900",
  // Иш татах
  "[&_blockquote]:border-l-2 [&_blockquote]:border-black [&_blockquote]:py-2 [&_blockquote]:pl-6 [&_blockquote]:text-xl [&_blockquote]:font-extralight [&_blockquote]:text-neutral-900",
  // Текстийн тэмдэглэгээ
  "[&_strong]:font-medium [&_strong]:text-neutral-900",
  "[&_em]:italic [&_u]:underline [&_u]:underline-offset-4 [&_s]:line-through",
  "[&_mark]:bg-[#F58220]/20 [&_mark]:px-0.5 [&_mark]:text-inherit",
  "[&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-60",
  // Код
  "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:bg-neutral-100 [&_code]:px-1",
  "[&_pre]:overflow-x-auto [&_pre]:bg-neutral-100 [&_pre]:p-5 [&_pre]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0",
  // Жагсаалт
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2",
  // Зураас
  "[&_hr]:border-neutral-200",
  // Зураг, YouTube
  "[&_img]:my-14 [&_img]:h-auto [&_img]:w-full [&_img]:object-cover",
  "[&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full",
  // Хүснэгт
  "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
  "[&_th]:border [&_th]:border-neutral-200 [&_th]:bg-neutral-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-medium",
  "[&_td]:border [&_td]:border-neutral-200 [&_td]:p-3",
].join(" ");

export function NewsArticle({
  item,
  list,
}: {
  item: PublicNews;
  list: PublicNews[];
}) {
  const { t, lang } = useLang();
  const d = t.news.detail;

  const title = pick(item.title, lang);
  const rawHtml = pick(item.desc, lang);

  // Hero-д эхний зургийг ашиглана. Body-д admin-д оруулсан бүх контент
  // (зураг, видео, текст) өөрчлөлтгүй, бүтнээрээ харагдана.
  const heroImage = useMemo(
    () => rawHtml.match(IMG_RE)?.[1] ?? FALLBACK_HERO,
    [rawHtml],
  );
  // Контент доторх зургууд: дэлгэцэнд ойртох үед л татагдана, хуудсыг гацаахгүй
  const bodyHtml = useMemo(
    () =>
      rawHtml.replace(
        /<img(?![^>]*\sloading=)/gi,
        '<img loading="lazy" decoding="async"',
      ),
    [rawHtml],
  );

  const minutes = readingMinutes(rawHtml);
  const date = formatDate(item.publishedAt ?? item.createdAt, lang);

  // YouTube URL тусдаа ирсэн ч body дотор аль хэдийн embed хийгдээгүй бол харуулна
  const ytEmbed = /<iframe[^>]+youtube/i.test(rawHtml)
    ? null
    : youtubeEmbed(item.youtubeUrl);

  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setPageUrl(window.location.href), []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard зөвшөөрөлгүй үед чимээгүй өнгөрнө */
    }
  };

  const enc = encodeURIComponent;

  // Дараагийн мэдээ — зөвхөн сонгосон хэл дээр байгаа мэдээнүүдээс
  const next = useMemo(() => {
    const same = list.filter((n) => hasNewsLang(n, lang));
    const idx = same.findIndex((n) => n.id === item.id);
    return idx >= 0 && same.length > 1 ? same[(idx + 1) % same.length] : null;
  }, [list, lang, item.id]);
  const nextTitle = next ? pick(next.title, lang) : "";

  // Энэ мэдээ сонгосон хэл дээр байхгүй (жишээ нь EN мэдээг MN горимд нээсэн)
  if (!hasNewsLang(item, lang)) {
    return (
      <main className="bg-white text-neutral-900">
        <section className="max-w-3xl mx-auto px-8 pt-48 pb-40 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-neutral-400">
            {d.label}
          </p>
          <p className="mt-6 text-2xl font-extralight text-neutral-700">
            {d.notAvailable}
          </p>
          <Link
            href="/news"
            className="mt-10 inline-block text-sm border-b border-black pb-1 hover:opacity-50 transition"
          >
            {d.allArticles} →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white text-neutral-900">
      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* TITLE */}
        <div className="relative max-w-5xl mx-auto px-8 pb-16 text-white">
          <p className="text-xs tracking-[0.35em] uppercase text-white/70">
            {d.label}
          </p>

          <h1 className="mt-6 text-4xl md:text-6xl font-extralight leading-tight">
            {title}
          </h1>

          <p className="mt-6 text-white/70 text-sm tracking-widest">
            {date && (
              <>
                {d.published} {date} •{" "}
              </>
            )}
            {minutes} {d.minRead}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-[240px_1fr] gap-16">
        {/* SIDEBAR */}
        <aside className="hidden md:block">
          <div className="sticky top-24 space-y-10 text-sm text-neutral-500">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
                {d.category}
              </p>
              <p className="mt-2 text-neutral-700">{d.categoryValue}</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
                {d.author}
              </p>
              <p className="mt-2 text-neutral-700">{d.authorValue}</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
                {d.readingTime}
              </p>
              <p className="mt-2 text-neutral-700">
                {minutes} {d.min}
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-200 space-y-2">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
                {d.share}
              </p>
              <a
                href={`https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-black cursor-pointer"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-black cursor-pointer"
              >
                LinkedIn
              </a>
              <button
                type="button"
                onClick={copyLink}
                className="block hover:text-black cursor-pointer"
              >
                {copied ? d.copied : d.copyLink}
              </button>
            </div>
          </div>
        </aside>

        {/* ARTICLE — Tiptap HTML */}
        <div>
          {ytEmbed && (
            <div className="relative w-full aspect-video mb-14 overflow-hidden">
              <iframe
                src={ytEmbed}
                title={title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <article
            className={ARTICLE_CLASS}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </div>
      </section>

      {/* NEXT ARTICLE */}
      {next && (
        <section className="max-w-6xl mx-auto px-8 pb-32">
          <div className="border-t border-neutral-200 pt-10 flex justify-between items-center gap-6">
            <p className="text-sm text-neutral-500 shrink-0">{d.nextArticle}</p>

            <Link
              href={`/news/${next.slug || next.id}`}
              className="text-sm text-right border-b border-black pb-1 hover:opacity-50 transition"
            >
              {nextTitle} →
            </Link>
          </div>
        </section>
      )}
      <BackButton href="/news" label={d.allArticles} />
    </main>
  );
}
