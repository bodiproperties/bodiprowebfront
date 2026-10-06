import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  NewsArticle,
  type PublicNews,
} from "@/components/molecules/NewsArticle";

// env нь /api-гүй, зам нь /api-аар эхэлнэ (admin-тай ижил дүрэм)
const API = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  params: Promise<{ id: string }>;
};

async function getNews(slug: string): Promise<PublicNews | null> {
  const res = await fetch(`${API}/api/news/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`News fetch failed: ${res.status}`);
  return res.json();
}

async function getNewsList(): Promise<PublicNews[]> {
  try {
    const res = await fetch(`${API}/api/news`, { next: { revalidate: 60 } });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const firstImage = (html = "") =>
  html.match(/<img[^>]*\ssrc=["']([^"']+)["']/i)?.[1] ?? null;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getNews(id).catch(() => null);
  if (!item) return { title: "News" };

  const title = item.title?.mn || item.title?.en || "News";
  const body = item.desc?.mn || item.desc?.en || "";
  const image = firstImage(item.desc?.mn) || firstImage(item.desc?.en);

  return {
    title,
    description: stripHtml(body).slice(0, 160),
    openGraph: { title, images: image ? [image] : undefined },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const [item, list] = await Promise.all([getNews(id), getNewsList()]);
  if (!item) notFound();

  // "Дараагийн мэдээ"-г client талд сонгосон хэлээр нь шүүж олно
  return <NewsArticle item={item} list={list} />;
}
