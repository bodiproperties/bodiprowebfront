"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/molecules/Reveal";
import { Language } from "@/types";
import type { CareerJob, CareersResponse } from "@/lib/hrJobs";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  CalendarDays,
  RotateCw,
} from "lucide-react";

interface OpenPositionsSectionProps {
  lang: Language;
}

type LoadStatus = "loading" | "ready" | "error";

const ALL = "__all__";

const formatDate = (iso: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}.${mm}.${dd}`;
};

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

// Tiptap HTML-д зориулсан Tailwind v4 arbitrary variant-ууд
const RICH_TEXT_CLASS =
  "text-sm text-neutral-600 leading-relaxed " +
  "[&_p]:mb-2 [&_p:last-child]:mb-0 " +
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 " +
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 " +
  "[&_li_p]:inline [&_li_p]:m-0 " +
  "[&_strong]:font-semibold [&_strong]:text-neutral-800 " +
  "[&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h2]:mt-3 [&_h2]:mb-1 " +
  "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-neutral-900 [&_h3]:mt-3 [&_h3]:mb-1 " +
  "[&_h4]:font-semibold [&_h4]:text-neutral-900 [&_h4]:mt-2 [&_h4]:mb-1 " +
  "[&_a]:text-[#F58220] [&_a]:underline";

export function OpenPositionsSection({ lang }: OpenPositionsSectionProps) {
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedDept, setSelectedDept] = useState<string>(ALL);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPosId, setExpandedPosId] = useState<string | null>(null);

  const isMn = lang === "mn";

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    (async () => {
      try {
        const res = await fetch("/api/careers", { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: CareersResponse = await res.json();
        setJobs(data.jobs ?? []);
        setStatus("ready");
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        console.error("Careers load error:", error);
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [reloadKey]);

  // Чиглэлийн tab-уудыг бодит зарын өгөгдлөөс автоматаар үүсгэнэ
  const departments = useMemo(() => {
    const unique = Array.from(
      new Set(jobs.map((job) => job.direction).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b, "mn"));
    return [
      { id: ALL, label: isMn ? "Бүх чиглэл" : "All Departments" },
      ...unique.map((name) => ({ id: name, label: name })),
    ];
  }, [jobs, isMn]);

  const filteredPositions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesDept = selectedDept === ALL || job.direction === selectedDept;
      if (!matchesDept) return false;
      if (!q) return true;
      const haystack = [
        job.title,
        job.direction,
        job.profession,
        job.location,
        stripHtml(job.responsibilitiesHtml),
        stripHtml(job.requirementsHtml),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [jobs, selectedDept, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedPosId((prev) => (prev === id ? null : id));
  };

  const clearFilters = () => {
    setSelectedDept(ALL);
    setSearchQuery("");
  };

  const applyLabel = isMn ? "Анкет бөглөх" : "Apply Now";
  const opensOnHr = isMn
    ? "hr.bodigroup.mn дээр шинэ цонхонд нээгдэнэ"
    : "Opens on hr.bodigroup.mn in a new tab";

  return (
    <section
      id="positions"
      className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32"
    >
      <Reveal direction="left">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#F58220]"></span>
          <p className="uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold text-[#F58220]">
            {isMn ? "Нээлттэй Ажлын Байр" : "Open Positions"}
          </p>
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-neutral-900">
              {isMn ? "Одоо зарлагдсан ажлын байрууд" : "Current Opportunities"}
            </h2>
            <p className="mt-3 text-neutral-500 font-light text-base">
              {isMn
                ? "Мэргэжлийн болон хувь хүний түвшинд хамтдаа өсөн дэвших шинэлэг багт нэгдээрэй."
                : "Join an innovative team committed to architectural excellence and personal growth."}
            </p>
            {!isMn && jobs.length > 0 && (
              <p className="mt-2 text-xs text-neutral-400 italic">
                Position details are currently available in Mongolian only.
              </p>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMn ? "Ажлын байр хайх..." : "Search positions..."}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-[#F58220] focus:bg-white transition"
            />
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs — 1-ээс олон чиглэл байвал л харуулна */}
      {status === "ready" && departments.length > 2 && (
        <Reveal direction="up" delay={100}>
          <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-neutral-200">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-5 py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                  selectedDept === dept.id
                    ? "bg-neutral-900 text-white shadow-md"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      {/* Positions List */}
      <div className="space-y-6">
        {status === "loading" &&
          [0, 1, 2].map((i) => (
            <div
              key={i}
              className="border border-neutral-200 bg-white p-6 sm:p-8 animate-pulse"
            >
              <div className="h-4 w-24 bg-neutral-200 mb-4" />
              <div className="h-7 w-2/3 bg-neutral-200 mb-4" />
              <div className="h-4 w-1/2 bg-neutral-100" />
            </div>
          ))}

        {status === "error" && (
          <div className="text-center py-16 bg-neutral-50 border border-dashed border-neutral-300">
            <p className="text-neutral-500 text-base">
              {isMn
                ? "Ажлын байрны мэдээллийг ачаалж чадсангүй."
                : "We couldn't load open positions right now."}
            </p>
            <button
              onClick={() => setReloadKey((k) => k + 1)}
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase font-semibold text-[#F58220] underline cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              {isMn ? "Дахин оролдох" : "Try again"}
            </button>
          </div>
        )}

        {status === "ready" && jobs.length === 0 && (
          <div className="text-center py-16 bg-neutral-50 border border-dashed border-neutral-300">
            <p className="text-neutral-500 text-base">
              {isMn
                ? "Одоогоор нээлттэй ажлын байр зарлагдаагүй байна."
                : "There are no open positions at the moment."}
            </p>
          </div>
        )}

        {status === "ready" &&
          jobs.length > 0 &&
          filteredPositions.length === 0 && (
            <div className="text-center py-16 bg-neutral-50 border border-dashed border-neutral-300">
              <p className="text-neutral-500 text-base">
                {isMn
                  ? "Хайлтад тохирох ажлын байр одоогоор олдсонгүй."
                  : "No positions found matching your filter criteria."}
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-xs uppercase font-semibold text-[#F58220] underline cursor-pointer"
              >
                {isMn ? "Бүх ажлын байрыг харах" : "Clear search filters"}
              </button>
            </div>
          )}

        {status === "ready" &&
          filteredPositions.map((job, i) => {
            const isExpanded = expandedPosId === job.id;
            const deadline = formatDate(job.deadline);

            return (
              <Reveal
                key={job.id}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={Math.min(i, 6) * 80}
              >
                <div
                  className={`border transition-all duration-300 bg-white ${
                    isExpanded
                      ? "border-[#F58220] shadow-xl ring-1 ring-[#F58220]/20"
                      : "border-neutral-200 hover:border-neutral-400 hover:shadow-md"
                  }`}
                >
                  {/* Job Header Row */}
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                    <div className="space-y-2 flex-1 min-w-0">
                      {job.direction && (
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-[11px] font-semibold uppercase tracking-wider">
                            {job.direction}
                          </span>
                        </div>
                      )}

                      <h3 className="text-2xl text-neutral-900 font-light tracking-tight">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 font-light">
                        {job.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#F58220]" />
                            {job.location}
                          </span>
                        )}
                        {job.schedule && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#F58220]" />
                            {job.schedule}
                          </span>
                        )}
                        {job.profession && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4 text-[#F58220]" />
                            {job.profession}
                          </span>
                        )}
                        {deadline && (
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="w-4 h-4 text-[#F58220]" />
                            {isMn ? `Дуусах: ${deadline}` : `Deadline: ${deadline}`}
                          </span>
                        )}
                        {job.salary && (
                          <span className="font-medium text-neutral-800">
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                      <button
                        onClick={() => toggleExpand(job.id)}
                        aria-expanded={isExpanded}
                        className="px-4 py-2.5 border border-neutral-300 text-neutral-700 text-xs font-medium uppercase tracking-wider hover:bg-neutral-100 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {isExpanded
                            ? isMn
                              ? "Хаах"
                              : "Less"
                            : isMn
                              ? "Дэлгэрэнгүй"
                              : "Details"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${applyLabel}: ${job.title} — ${opensOnHr}`}
                        title={opensOnHr}
                        className="border border-neutral-900 bg-neutral-900 text-white px-7 py-2.5 hover:bg-[#F58220] hover:border-[#F58220] transition text-xs uppercase tracking-widest font-medium shadow-sm active:scale-95 flex items-center gap-2"
                      >
                        <span>{applyLabel}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Expanded Detail Drawer */}
                  {isExpanded && (
                    <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-neutral-100 bg-neutral-50/50 space-y-6 animate-in fade-in duration-300">
                      <div className="grid md:grid-cols-2 gap-6">
                        {job.responsibilitiesHtml && (
                          <div className="bg-white p-5 border border-neutral-200 space-y-3">
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F58220]">
                              {isMn ? "Үндсэн Үүрэг Хариуцлага:" : "Key Responsibilities:"}
                            </h4>
                            <div
                              className={RICH_TEXT_CLASS}
                              dangerouslySetInnerHTML={{
                                __html: job.responsibilitiesHtml,
                              }}
                            />
                          </div>
                        )}

                        {job.requirementsHtml && (
                          <div className="bg-white p-5 border border-neutral-200 space-y-3">
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F58220]">
                              {isMn ? "Тавигдах Шаардлага:" : "Requirements:"}
                            </h4>
                            <div
                              className={RICH_TEXT_CLASS}
                              dangerouslySetInnerHTML={{
                                __html: job.requirementsHtml,
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {job.additionalInfoHtml && (
                        <div className="bg-white p-5 border border-neutral-200 space-y-3">
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F58220]">
                            {isMn ? "Нэмэлт Мэдээлэл:" : "Additional Information:"}
                          </h4>
                          <div
                            className={RICH_TEXT_CLASS}
                            dangerouslySetInnerHTML={{
                              __html: job.additionalInfoHtml,
                            }}
                          />
                        </div>
                      )}

                      {/* Bottom action row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-2">
                        <span className="text-xs text-neutral-400">
                          {opensOnHr}
                        </span>
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#F58220] text-white px-8 py-3 hover:bg-neutral-900 transition text-xs uppercase tracking-widest font-medium shadow-md flex items-center justify-center gap-2"
                        >
                          <span>
                            {isMn
                              ? "Энэ ажлын байранд өргөдөл гаргах"
                              : "Submit Application for this Role"}
                          </span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
      </div>
    </section>
  );
}