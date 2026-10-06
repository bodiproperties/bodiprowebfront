import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  NewsArticle,
  type PublicNews,
} from "@/components/molecules/NewsArticle";

// env нь /api-гүй, зам нь /api-аар эхэлнэ (admin-тай ижил дүрэм)
const API = process.env.NEXT_PUBLIC_API_URL;

// API удаан хариулбал build/request гацахгүйн тулд 10 секундэд зогсооно
const TIMEOUT_MS = 10_000;

type Props = {
  // Next.js 15+: params нь Promise
  params: Promise<{ id: string }>;
};

async function getNews(slug: string): Promise<PublicNews | null> {
  const url = `${API}/api/news/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error(`[getNews] ${url} failed`, e);
    return null;
  }
}

async function getNewsList(): Promise<PublicNews[]> {
  const url = `${API}/api/news`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

const stripHtml = (html = "") =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const firstImage = (html = "") =>
  html.match(/<img[^>]*\ssrc=["']([^"']+)["']/i)?.[1] ?? null;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getNews(id);
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