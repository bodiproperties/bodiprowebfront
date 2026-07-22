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
  const { p, t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkBase =
    scrolled || open
      ? "text-neutral-600 hover:text-neutral-900"
      : "text-neutral-300 hover:text-white";

  const isLight = scrolled || open;

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isLight ? "bg-white border-b border-neutral-200" : ""
      }`}
    >
      <nav
        className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ⭐ LOGO — 2 image layer-ээр fade transition */}
        <Link
          href="/"
          aria-label={t.nav.brand}
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="relative block h-12 w-[240px] shrink-0 hover:opacity-80 transition-opacity"
        >
          {/* White logo — header нь тунгалаг үед */}
          <Image
            src="/images/Bodi-properties-english-white2.png"
            alt={t.nav.brand}
            fill
            sizes="240px"
            priority
            className={`object-contain object-left transition-opacity duration-300 ${
              isLight ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Dark logo — header цайвар background-тэй болсон үед */}
          <Image
            src="/images/Bodi-properties-english2.png"
            alt=""
            fill
            sizes="240px"
            priority
            className={`object-contain object-left transition-opacity duration-300 ${
              isLight ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map(({ key, href }) => {
            const active = pathname === href;

            return (
              <Link
                key={key}
                href={href}
                className={`relative text-xs tracking-[0.15em] transition-colors ${
                  active ? "text-neutral-900" : linkBase
                }`}
              >
                {p.nav[key]}

                {/* UNDERLINE */}
                <span
                  className={`absolute left-0 -bottom-2 h-px bg-black transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          <LanguageToggle scrolled={isLight} />

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden flex flex-col gap-[5px]"
          >
            <span
              className={`block h-px w-6 transition-colors ${
                isLight ? "bg-neutral-900" : "bg-white"
              }`}
            />
            <span
              className={`block h-px w-6 transition-colors ${
                isLight ? "bg-neutral-900" : "bg-white"
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
              const active = pathname === href;

              return (
                <Link
                  key={key}
                  href={href}
                  className={`text-sm tracking-[0.15em] transition-colors ${
                    active ? "text-neutral-900 font-medium" : "text-neutral-500"
                  }`}
                >
                  {p.nav[key]}

                  {/* mobile underline */}
                  {active && <div className="mt-1 h-px w-10 bg-black" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
