import { useState } from "react";
import { Reveal } from "@/components/molecules/Reveal";
import { JOB_POSITIONS } from "@/data/careersData";
import { JobPosition, Language } from "@/types";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface OpenPositionsSectionProps {
  lang: Language;
  onSelectPosition: (position: JobPosition) => void;
}

export function OpenPositionsSection({
  lang,
  onSelectPosition,
}: OpenPositionsSectionProps) {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPosId, setExpandedPosId] = useState<string | null>(null);

  const departments = [
    { id: "All", label: lang === "mn" ? "Бүх Хэлтэс" : "All Departments" },
    {
      id: "Architecture",
      label: lang === "mn" ? "Архитектур" : "Architecture",
    },
    { id: "Interior", label: lang === "mn" ? "Интерьер" : "Interior" },
    { id: "Engineering", label: lang === "mn" ? "Инженерчлэл" : "Engineering" },
    { id: "Management", label: lang === "mn" ? "Менежмент" : "Management" },
  ];

  const filteredPositions = JOB_POSITIONS.filter((pos) => {
    const matchesDept =
      selectedDept === "All" || pos.department === selectedDept;
    const titleText = pos.title[lang].toLowerCase();
    const summaryText = pos.summary[lang].toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q || titleText.includes(q) || summaryText.includes(q);
    return matchesDept && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedPosId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="positions"
      className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32"
    >
      <Reveal direction="left">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#F58220]"></span>
          <p className="uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold text-[#F58220]">
            {lang === "mn" ? "Нээлттэй Ажлын Байр" : "Open Positions"}
          </p>
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-neutral-900">
              {lang === "mn"
                ? "Одоо Зарагдсан Ажлын Байрууд"
                : "Current Opportunities"}
            </h2>
            <p className="mt-3 text-neutral-500 font-light text-base">
              {lang === "mn"
                ? "Мэргэжлийн болон хувь хүний түвшинд хамтдаа өсөн дэвших шинэлэг багт нэгдээрэй."
                : "Join an innovative team committed to architectural excellence and personal growth."}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "mn" ? "Ажлын байр хайх..." : "Search positions..."
              }
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-[#F58220] focus:bg-white transition"
            />
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs */}
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

      {/* Positions List */}
      <div className="space-y-6">
        {filteredPositions.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 border border-dashed border-neutral-300">
            <p className="text-neutral-500 text-base">
              {lang === "mn"
                ? "Хайлтад тохирох ажлын байр одоогоор олдсонгүй."
                : "No positions found matching your filter criteria."}
            </p>
            <button
              onClick={() => {
                setSelectedDept("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs uppercase font-semibold text-[#F58220] underline"
            >
              {lang === "mn"
                ? "Бүх ажлын байрыг харах"
                : "Clear search filters"}
            </button>
          </div>
        ) : (
          filteredPositions.map((job, i) => {
            const isExpanded = expandedPosId === job.id;
            return (
              <Reveal
                key={job.id}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 80}
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
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-neutral-100 text-neutral-700  text-[11px] font-semibold uppercase tracking-wider">
                          {job.department}
                        </span>
                        {job.featured && (
                          <span className="flex items-center gap-1 px-3 py-1 bg-[#F58220]/10 text-[#F58220]  text-[11px] font-semibold uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" />
                            {lang === "mn" ? "Шилдэг" : "Featured"}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl text-neutral-900 font-light tracking-tight">
                        {job.title[lang]}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 font-light">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#F58220]" />
                          {job.location[lang]}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-[#F58220]" />
                          {job.type[lang]}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#F58220]" />
                          {job.experience[lang]}
                        </span>
                        {job.salaryRange && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-neutral-800">
                              {job.salaryRange}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 self-start sm:self-center">
                      <button
                        onClick={() => toggleExpand(job.id)}
                        className="px-4 py-2.5 border border-neutral-300 text-neutral-700 text-xs font-medium uppercase tracking-wider hover:bg-neutral-100 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {isExpanded
                            ? lang === "mn"
                              ? "Хаах"
                              : "Less"
                            : lang === "mn"
                              ? "Дэлгэрэнгүй"
                              : "Details"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => onSelectPosition(job)}
                        className="border border-neutral-900 bg-neutral-900 text-white px-7 py-2.5 hover:bg-[#F58220] hover:border-[#F58220] transition text-xs uppercase tracking-widest font-medium cursor-pointer shadow-sm active:scale-95 flex items-center gap-2"
                      >
                        <span>
                          {lang === "mn" ? "Анкет Бөглөх" : "Apply Now"}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail Drawer */}
                  {isExpanded && (
                    <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-neutral-100 bg-neutral-50/50 space-y-6 animate-in fade-in duration-300">
                      <p className="text-neutral-700 text-base font-light leading-relaxed">
                        {job.summary[lang]}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Responsibilities */}
                        <div className="bg-white p-5 border border-neutral-200 space-y-3">
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F58220]">
                            {lang === "mn"
                              ? "Үндсэн Үүрэг Хариуцлага:"
                              : "Key Responsibilities:"}
                          </h4>
                          <ul className="space-y-2 text-sm text-neutral-600">
                            {job.responsibilities[lang].map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#F58220] font-bold mt-0.5">
                                  •
                                </span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white p-5 border border-neutral-200 space-y-3">
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F58220]">
                            {lang === "mn"
                              ? "Тавигдах Шаардлага:"
                              : "Requirements:"}
                          </h4>
                          <ul className="space-y-2 text-sm text-neutral-600">
                            {job.requirements[lang].map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#F58220] font-bold mt-0.5">
                                  •
                                </span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom action row */}
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => onSelectPosition(job)}
                          className="bg-[#F58220] text-white px-8 py-3 hover:bg-neutral-900 transition text-xs uppercase tracking-widest font-medium cursor-pointer shadow-md flex items-center gap-2"
                        >
                          <span>
                            {lang === "mn"
                              ? "Энэ ажлын байранд өргөдөл гаргах"
                              : "Submit Application for this Role"}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })
        )}
      </div>
    </section>
  );
}
