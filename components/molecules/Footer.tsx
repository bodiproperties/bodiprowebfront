"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/language-context";

const NAV_HREFS = ["#projects", "#studio", "#approach", "#journal", "#contact"];

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="py-16 px-8 bg-white border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Link href="/" className="mb-6 block">
              <div className="relative h-10 w-40">
                <Image
                  src="/images/logo.png"
                  alt={t.nav.brand}
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs text-neutral-400 tracking-[0.2em] mb-6">
              {t.footer.navigation}
            </p>
            <div className="flex flex-col gap-3">
              {t.footer.navLinks.map((label: string, i: number) => (
                <Link
                  key={i}
                  href={NAV_HREFS[i]}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-neutral-400 tracking-[0.2em] mb-6">
              {t.footer.social}
            </p>
            <div className="flex flex-col gap-3">
              {t.footer.socialLinks.map((item: string) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-200">
          <p className="text-xs text-neutral-400">{t.footer.rights}</p>
          <p className="text-xs text-neutral-400">{t.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
