import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects-api";

const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodiprowebfront.vercel.app"
).replace(/\/$/, "");
const API = process.env.NEXT_PUBLIC_API_URL;

// Нэг цаг тутам шинэчилнэ — шинэ мэдээ/төсөл автоматаар орно
export const revalidate = 3600;

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

type NewsLite = {
  id: string;
  slug?: string;
  updatedAt?: string;
  publishedAt?: string | null;
};

const STATIC_ROUTES: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/news", changeFrequency: "daily", priority: 0.9 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/services/architecture", changeFrequency: "monthly", priority: 0.6 },
  { path: "/services/interior", changeFrequency: "monthly", priority: 0.6 },
  { path: "/services/urban", changeFrequency: "monthly", priority: 0.6 },
  { path: "/services/consulting", changeFrequency: "monthly", priority: 0.6 },
];

async function getNewsLite(): Promise<NewsLite[]> {
  try {
    const res = await fetch(`${API}/api/news`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const [news, projects] = await Promise.all([getNewsLite(), getProjects()]);

  const newsPages: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE}/news/${encodeURIComponent(n.slug || n.id)}`,
    lastModified: new Date(n.updatedAt || n.publishedAt || now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE}/projects/${p.id}`,
    lastModified: new Date(p.publishedAt || now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...newsPages, ...projectPages];
}