import type { Project } from "@/lib/data";

// Admin-тай ижил дүрэм: env нь /api-гүй, зам нь /api-аар эхэлнэ
const API = process.env.NEXT_PUBLIC_API_URL;

/** Backend-ийн serializeProject()-ийн хэлбэр */
export type ApiProject = {
  id: string; // UUID
  title: string;
  type: string;
  location: string;
  year: string | number;
  image: string;
  description?: { en?: string; mn?: string };
  // jsonb — category, gallery, lang-ийг энд хадгалж болно (schema өөрчлөхгүй)
  detail?: {
    client?: string;
    area?: string;
    status?: string;
    services?: string[];
    category?: string;
    gallery?: string[];
    lang?: "en" | "mn";
  };
  sortOrder?: number;
  publishedAt?: string | null;
};

export type Lang = "EN" | "MN";

// ---------- Server fetchers ----------

export async function getProjects(): Promise<ApiProject[]> {
  try {
    const res = await fetch(`${API}/api/projects`, { next: { revalidate: 60 } });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function getProject(id: string): Promise<ApiProject | null> {
  const res = await fetch(`${API}/api/projects/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404 || res.status === 400 || res.status === 500) return null;
  if (!res.ok) throw new Error(`Project fetch failed: ${res.status}`);
  return res.json();
}

// ---------- Хэл ----------

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Төсөл аль хэл дээр харагдах вэ.
 * 1) detail.lang байвал түүгээр (admin хадгалдаг болбол хамгийн найдвартай)
 * 2) Үгүй бол аль хэлний тайлбар бөглөгдсөнөөр
 * 3) Тайлбар огт байхгүй бол хоёр хэл дээр хоёуланд харуулна
 */
export function projectHasLang(p: ApiProject, lang: Lang): boolean {
  const want = lang === "MN" ? "mn" : "en";
  const fixed = p.detail?.lang;
  if (fixed === "en" || fixed === "mn") return fixed === want;

  const en = Boolean(stripHtml(p.description?.en));
  const mn = Boolean(stripHtml(p.description?.mn));
  if (!en && !mn) return true;
  return want === "mn" ? mn : en;
}

/** Сонгосон хэлний тайлбар (HTML) — нөгөө хэл рүү fallback хийхгүй */
export function projectDescriptionHtml(p: ApiProject, lang: Lang): string {
  return (lang === "MN" ? p.description?.mn : p.description?.en) ?? "";
}

// ---------- API → frontend Project (одоогийн дизайн өөрчлөгдөхгүй) ----------

const truncate = (s: string, max = 160) =>
  s.length > max ? `${s.slice(0, max).replace(/\s+\S*$/, "")}…` : s;

export function toProject(p: ApiProject, lang: Lang): Project {
  const d = p.detail ?? {};
  // Tiptap HTML → энгийн текст (ProjectModal текстээр харуулдаг тул)
  const text = stripHtml(projectDescriptionHtml(p, lang));

  return {
    id: p.id,
    title: p.title,
    type: p.type,
    category: d.category ?? "",
    location: p.location,
    year: String(p.year),
    image: p.image,
    gallery: Array.isArray(d.gallery) ? d.gallery : [],
    description: truncate(text),
    longDescription: text,
    detail: {
      client: d.client || "—",
      area: d.area || "—",
      status: d.status || "—",
      services: Array.isArray(d.services) ? d.services : [],
    },
  };
}