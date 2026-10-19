import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import type { CareerJob, CareersResponse } from "@/lib/hrJobs";

// ============================================
// ТОХИРГОО — Vercel env-ээс уншина
// ============================================
const HR_PUBLIC_JOBS_URL = process.env.HR_PUBLIC_JOBS_URL;
const HR_WEB_URL = (process.env.HR_WEB_URL || "https://hr.bodigroup.mn").replace(
  /\/+$/,
  "",
);
const HR_COMPANY_NAME = process.env.HR_COMPANY_NAME || "БОДЬ ПРОПЕРТИЙЗ ХХК";
const REVALIDATE_SECONDS = 300;
const APPLY_SOURCE = "bodiproperties";
const TIME_ZONE = "Asia/Ulaanbaatar";

interface HrJobRow {
  id: string | number;
  company_name: string | null;
  position_name: string | null;
  location: string | null;
  direction_name: string | null;
  profession_name: string | null;
  salary_range: string | null;
  work_schedule: string | null;
  main_responsibilities: string | null;
  requirements: string | null;
  additional_info: string | null;
  deadline: string | null;
  created_at: string;
}

// HR admin дээр компанийн нэрийг гараар бичдэг тул том/жижиг үсэг,
// илүү зайнаас болж таарахгүй байх эрсдэлтэй — normalize хийж харьцуулна
const normalize = (value: string | null | undefined) =>
  (value ?? "").trim().toUpperCase().replace(/\s+/g, " ");

// Монголын цагаар өнөөдрийн огноо "YYYY-MM-DD" хэлбэрээр
const todayInMongolia = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

// ✅ BodiHR-ийн дүрэм: зар идэвхтэй эсэхийг зөвхөн status шийднэ
// (backend аль хэдийн status = 'active'-ээр шүүсэн). Deadline өнгөрсөн
// ч HR зарыг нээлттэй үлдээж болно — тэр тохиолдолд хуучирсан огноог
// зочинд харуулахгүйн тулд deadline-ийг null болгоно.
const visibleDeadline = (deadline: string | null, today: string) => {
  if (!deadline) return null;
  return deadline.slice(0, 10) >= today ? deadline : null;
};

// BodiHR location нь JSON string ({ name, parent }) эсвэл энгийн текст байж болно
function parseLocation(raw: string | null): string {
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.name) {
      return parsed.parent && parsed.parent !== parsed.name
        ? `${parsed.name}, ${parsed.parent}`
        : parsed.name;
    }
    return raw;
  } catch {
    return raw;
  }
}

// Tiptap-аас ирсэн HTML-ийг аюулгүй tag-уудаар хязгаарлана.
// Admin account алдагдсан тохиолдолд script/iframe/onclick орж ирэхээс хамгаална.
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "strong", "b", "em", "i", "u", "s",
    "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "a",
  ],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    h1: "h3",
    a: sanitizeHtml.simpleTransform("a", {
      target: "_blank",
      rel: "noopener noreferrer",
    }),
  },
};

function cleanHtml(html: string | null): string {
  if (!html) return "";
  const cleaned = sanitizeHtml(html, SANITIZE_OPTIONS)
    // Tiptap-ийн төгсгөлийн хоосон <p></p>, <p>&nbsp;</p>-ийг арилгана
    .replace(/<p>(\s|&nbsp;)*<\/p>/g, "")
    .trim();
  const textOnly = cleaned
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return textOnly.length > 0 ? cleaned : "";
}

function toCareerJob(row: HrJobRow, today: string): CareerJob {
  const id = String(row.id);
  return {
    id,
    title: row.position_name?.trim() || row.profession_name || "",
    company: row.company_name ?? "",
    location: parseLocation(row.location),
    direction: row.direction_name ?? "",
    profession: row.profession_name ?? "",
    salary: row.salary_range ?? "",
    schedule: row.work_schedule ?? "",
    deadline: visibleDeadline(row.deadline, today),
    createdAt: row.created_at,
    responsibilitiesHtml: cleanHtml(row.main_responsibilities),
    requirementsHtml: cleanHtml(row.requirements),
    additionalInfoHtml: cleanHtml(row.additional_info),
    applyUrl: `${HR_WEB_URL}/jobs/${encodeURIComponent(id)}?apply=1&source=${APPLY_SOURCE}`,
  };
}

export async function GET() {
  if (!HR_PUBLIC_JOBS_URL) {
    console.error("❌ HR_PUBLIC_JOBS_URL env тохируулаагүй байна");
    return NextResponse.json<CareersResponse>(
      { jobs: [], error: "not_configured" },
      { status: 500 },
    );
  }

  try {
    const url = new URL(HR_PUBLIC_JOBS_URL);
    // Бүх компанийн идэвхтэй зарыг аваад энд normalize хийж шүүнэ
    // (backend-ийн company filter нь яг тэнцүү харьцуулалт хийдэг тул)
    url.searchParams.set("limit", "200");

    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`HR API ${res.status}`);
    }

    const data = await res.json();
    const rows: HrJobRow[] = Array.isArray(data) ? data : data?.jobs ?? [];
    const target = normalize(HR_COMPANY_NAME);
    const today = todayInMongolia();

    const jobs = rows
      .filter((row) => normalize(row.company_name) === target)
      .map((row) => toCareerJob(row, today));

    return NextResponse.json<CareersResponse>(
      { jobs },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=600`,
        },
      },
    );
  } catch (error) {
    console.error("❌ Careers fetch error:", error);
    return NextResponse.json<CareersResponse>(
      { jobs: [], error: "upstream_failed" },
      { status: 502 },
    );
  }
}