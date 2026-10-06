"use client";

import { useLang } from "@/lib/language-context";
import { translations } from "./i18n";

/** API контентод зориулсан хэл — context ямар хэлбэрээр хадгалсан ч "EN" | "MN" буцаана */
export function useContentLang(): "EN" | "MN" {
  const ctx = useLang() as { t: unknown; lang?: string };
  if (ctx.lang) return String(ctx.lang).toUpperCase() === "MN" ? "MN" : "EN";
  return ctx.t === translations.MN ? "MN" : "EN";
}