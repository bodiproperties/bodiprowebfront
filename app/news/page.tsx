import { NewsList } from "@/components/molecules/NewsList";
import type { PublicNews } from "@/components/molecules/NewsArticle";

// env нь /api-гүй, зам нь /api-аар эхэлнэ (admin-тай ижил дүрэм)
const API = process.env.NEXT_PUBLIC_API_URL;

async function getNewsList(): Promise<PublicNews[]> {
  try {
    const res = await fetch(`${API}/api/news`, { next: { revalidate: 60 } });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const items = await getNewsList();
  return <NewsList items={items} />;
}