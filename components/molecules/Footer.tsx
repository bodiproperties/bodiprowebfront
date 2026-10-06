"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/language-context";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "news", href: "/news" },
  { key: "careers", href: "/careers" },
] as const;

// Бодит URL-аа href дотор бөглөнө. Хоосон бол тухайн холбоос харагдахгүй.
const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Instagram", href: "" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bodi-properties-llc/?utm_source=chatgpt.com",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100093688147869",
  },
];

export function Footer() {
  const { t } = useLang();

  const social = SOCIAL_LINKS.filter((s) => s.href.trim() !== "");
  const hasSocial = social.length > 0;

  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div
          className={`mb-16 grid grid-cols-1 gap-12 ${
            hasSocial ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          <div>
            <Link
              href="/"
              aria-label={t.nav.brand}
              className="mb-6 block w-fit"
            >
              <div className="relative h-10 w-40">
                <Image
                  src="/images/Bodi-properties-english2.png"
                  alt={t.nav.brand}
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-500">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className="mb-6 text-xs tracking-[0.2em] text-neutral-400">
              {t.footer.navigation}
            </p>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="w-fit text-sm text-neutral-600 transition-colors hover:text-[#F58220]"
                >
                  {t.nav[key]}
                </Link>
              ))}
            </div>
          </div>

          {hasSocial && (
            <div>
              <p className="mb-6 text-xs tracking-[0.2em] text-neutral-400">
                {t.footer.social}
              </p>
              <div className="flex flex-col gap-3">
                {social.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-sm text-neutral-600 transition-colors hover:text-[#F58220]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-neutral-400">{t.footer.rights}</p>
          <p className="text-xs text-neutral-400 md:text-right">
            {t.footer.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
