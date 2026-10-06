"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/language-context";
import { LanguageToggle } from "@/components/atoms/LanguageToggle";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "news", href: "/news" },
  { key: "careers", href: "/careers" },
] as const;

export function Navbar() {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // /projects/abc, /news/slug зэрэг дэд хуудсанд ч эх цэс идэвхтэй харагдана
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Mobile menu нээлттэй үед хуудас ард нь гүйхгүй
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed w-full top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled
          ? "border-b border-neutral-200 shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="max-w-350 mx-auto px-5 py-5 sm:px-8 sm:py-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* LOGO — vргэлж хар хувилбар (цагаан дэвсгэрт зориулав) */}
        <Link
          href="/"
          aria-label={t.nav.brand}
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="relative block h-10 w-40 sm:h-12 sm:w-[240px] shrink-0 transition-opacity hover:opacity-70"
        >
          <Image
            src="/images/Bodi-properties-english2.png"
            alt={t.nav.brand}
            fill
            sizes="(min-width: 640px) 240px, 160px"
            priority
            className="object-contain object-left"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map(({ key, href }) => {
            const active = isActive(href);

            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative text-xs tracking-[0.15em] transition-colors ${
                  active
                    ? "text-[#F58220]"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {t.nav[key]}

                {/* UNDERLINE */}
                <span
                  className={`absolute left-0 -bottom-2 h-px bg-[#F58220] transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 sm:gap-6">
          <LanguageToggle scrolled={true} />

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden relative h-6 w-6 cursor-pointer"
          >
            <span
              className={`absolute left-0 block h-px w-6 bg-neutral-900 transition-all duration-300 ${
                open ? "top-3 rotate-45" : "top-2"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-neutral-900 transition-all duration-300 ${
                open ? "top-3 -rotate-45" : "top-[14px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-8 py-6">
          <div className="flex flex-col gap-5">
            {NAV_ITEMS.map(({ key, href }) => {
              const active = isActive(href);

              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm tracking-[0.15em] transition-colors ${
                    active ? "text-[#F58220] font-medium" : "text-neutral-500"
                  }`}
                >
                  {t.nav[key]}
                  {active && <div className="mt-1 h-px w-10 bg-[#F58220]" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}