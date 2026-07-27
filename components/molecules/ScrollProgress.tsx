"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center lg:flex">
      {/* Дээд зураас — тогтмол */}
      <span className="h-32 w-px bg-neutral-300" />

      {/* Тоо */}
      <span className="my-3 text-[11px] font-light tabular-nums tracking-wide text-neutral-500">
        {progress}%
      </span>

      {/* Доод зураас — прогресстой (дvvрч явна) */}
      <div className="relative h-32 w-px bg-neutral-200">
        <div
          className="absolute left-0 top-0 w-px bg-neutral-900 transition-all duration-150 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  );
}