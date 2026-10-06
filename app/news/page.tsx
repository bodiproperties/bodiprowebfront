import { NewsList } from "@/components/molecules/NewsList";
import type { PublicNews } from "@/components/molecules/NewsArticle";

// env нь /api-гүй, зам нь /api-аар эхэлнэ (admin-тай ижил дүрэм)
const API = process.env.NEXT_PUBLIC_API_URL;

// API удаан хариулбал build/request гацахгүйн тулд 10 секундэд зогсооно
const TIMEOUT_MS = 10_000;

async function getNewsList(): Promise<PublicNews[]> {
  const url = `${API}/api/news`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[getNewsList] ${url} → ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (e) {
    console.error(`[getNewsList] ${url} failed`, e);
    return [];
  }
}

export default async function NewsPage() {
  const items = await getNewsList();
  return <NewsList items={items} />;
}