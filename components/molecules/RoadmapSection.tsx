import { useState } from "react";
import { Reveal } from "./Reveal";
import { Language } from "@/types";
import {
  Building2,
  Globe,
  Leaf,
  Sparkles,
  CheckCircle,
  Clock,
  Rocket,
} from "lucide-react";

interface RoadmapSectionProps {
  lang: Language;
}

interface Milestone {
  year: string;
  status: "completed" | "current" | "upcoming";
  icon: typeof Building2;
  title: { mn: string; en: string };
  desc: { mn: string; en: string };
  highlights: { mn: string[]; en: string[] };
}

export function RoadmapSection({ lang }: RoadmapSectionProps) {
  const [activeYear, setActiveYear] = useState<string>("2026");

  const roadmapData: Milestone[] = [
    {
      year: "2024",
      status: "completed",
      icon: Building2,
      title: {
        mn: "Студийн Үндэслэл & Анхны Орон Сууцны Төслүүд",
        en: "Studio Foundation & First Signature Residences",
      },
      desc: {
        mn: "Боди Пропертиз бие даасан архитектор, инженерчлэлийн студийг үүсгэн байгуулж, Улаанбаатар хотод анхны премиум ангиллын орон сууцны концепцуудыг баталгаажуулсан.",
        en: "Established the dedicated architecture & development studio, launching flagship residential concepts in Ulaanbaatar.",
      },
      highlights: {
        mn: [
          "Төслийн баг 25+ салбарын мэргэжилтэнтэй бүрэлдсэн",
          "Анхны 2 премиум орон сууцны зөвшөөрөл",
        ],
        en: [
          "Assembled core team of 25+ experts",
          "Permitted initial 2 luxury developments",
        ],
      },
    },
    {
      year: "2025",
      status: "completed",
      icon: Globe,
      title: {
        mn: "Олон Улсын Архитектурын Зах Зээлд Гарах Тэлэлт",
        en: "Expansion into International Architecture Markets",
      },
      desc: {
        mn: "Гадаадын шилдэг архитектурын товчоодтой партнершип үүсгэн, BIM дижитал загварчлалын 100% стандартыг бүх барилгын төслүүдэд нэвтрүүлсэн.",
        en: "Forged partnerships with international architectural firms and standardized 100% BIM workflows across all engineering projects.",
      },
      highlights: {
        mn: [
          "Олон улсын ISO 9001 сертификатжуулалт",
          "BIM 3D загварчлалыг иж бүрэн нэвтрүүлсэн",
        ],
        en: [
          "Achieved international ISO 9001 certification",
          "Full adoption of 3D BIM coordination",
        ],
      },
    },
    {
      year: "2026",
      status: "current",
      icon: Leaf,
      title: {
        mn: "Тогтвортой Ногоон Барилга & Ухаалаг Дивизион",
        en: "Launch of Sustainable Smart Architecture Division",
      },
      desc: {
        mn: "Байгаль орчинд ээлтэй, эрчим хүчний хэмнэлттэй ухаалаг барилгын технологи болон ногоон архитектурын стандартуудыг хэрэгжүүлж байна.",
        en: "Pioneering eco-friendly green building technologies, energy-efficient HVAC, and smart automation systems for modern urban living.",
      },
      highlights: {
        mn: [
          "LEED / BREEAM ногоон барилгын стандарт хэрэгжүүлэх",
          "Төслийн багийг 150+ мэргэжилтэн болгон өргөжүүлэх",
        ],
        en: [
          "Implementing LEED / BREEAM sustainability standards",
          "Scaling workforce to 150+ active specialists",
        ],
      },
    },
    {
      year: "2027",
      status: "upcoming",
      icon: Rocket,
      title: {
        mn: "Глобал Хамтын Ажиллагаа & Хотын Мега Төслүүд",
        en: "Global Collaborations & City Landmark Projects",
      },
      desc: {
        mn: "Олон улсын хөрөнгө оруулалттай цогцолбор хот төлөвлөлтийн төслүүдийг эхлүүлж, бүс нутагтаа архитектурын жишиг байгууллага болох зорилт.",
        en: "Initiating large-scale mixed-use urban master plans, aiming to establish regional benchmarks for innovative architecture.",
      },
      highlights: {
        mn: [
          "Хот төлөвлөлтийн 120,000м² мега төсөл",
          "Олон улсын архитектурын наадмын оролцоо",
        ],
        en: [
          "120,000m² master-planned urban complex",
          "Participation in global architecture biennales",
        ],
      },
    },
  ];

  return (
    <section
      id="roadmap"
      className="max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28"
    >
      <Reveal direction="left">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#F58220]"></span>
          <p className="uppercase tracking-[0.35em] text-xs sm:text-sm font-semibold text-[#F58220]">
            {lang === "mn" ? "Бидний Замнал" : "Strategic Roadmap"}
          </p>
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-neutral-900">
              {lang === "mn" ? "Хөгжлийн Төлөвлөгөө" : "Company Roadmap"}
            </h2>
            <p className="mt-3 text-neutral-500 font-light text-base max-w-xl">
              {lang === "mn"
                ? "Бидний өнгөрсөн амжилт, одоогийн ололт ба ирээдүйн стратегийн зорилтууд."
                : "Our past milestones, present innovations, and future strategic trajectory."}
            </p>
          </div>

          {/* Interactive Year Selector Pills */}
          <div className="flex items-center gap-2 p-1.5 bg-neutral-100 self-start md:self-auto border border-neutral-200">
            {roadmapData.map((item) => (
              <button
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={`px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeYear === item.year
                    ? "bg-[#F58220] text-white shadow-md scale-105"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Modern Vertical Timeline with Glass Cards */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-neutral-200 space-y-12 ml-3 sm:ml-4">
        {roadmapData.map((item, i) => {
          const IconComponent = item.icon;
          const isSelected = activeYear === item.year;

          return (
            <Reveal
              key={item.year}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 100}
            >
              <div
                onClick={() => setActiveYear(item.year)}
                className={`group relative p-6 sm:p-8 transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? "bg-neutral-900 text-white border-neutral-800 shadow-2xl scale-[1.01] ring-1 ring-[#F58220]"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-[#F58220]/40 hover:shadow-lg"
                }`}
              >
                {/* Timeline Connector Circle Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-8 w-6 h-6 border-4 transition-all duration-300 flex items-center justify-center ${
                    isSelected
                      ? "bg-[#F58220] border-white shadow-lg ring-4 ring-[#F58220]/30 scale-125"
                      : item.status === "completed"
                        ? "bg-neutral-900 border-white"
                        : "bg-white border-neutral-300"
                  }`}
                >
                  {item.status === "completed" && !isSelected && (
                    <div className="w-1.5 h-1.5 bg-white" />
                  )}
                </div>

                {/* Card Content Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-100 group-hover:border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#F58220] text-white"
                          : "bg-neutral-100 text-neutral-700 group-hover:bg-[#F58220] group-hover:text-white"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-2xl font-mono font-light tracking-tight text-[#F58220]">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono ${
                      isSelected ? "text-neutral-400" : "text-neutral-400"
                    }`}
                  >
                    Phase 0{i + 1}
                  </span>
                </div>

                {/* Main Description */}
                <h3
                  className={`text-xl sm:text-2xl font-light mb-3 ${
                    isSelected ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {item.title[lang]}
                </h3>

                <p
                  className={`text-sm sm:text-base font-light leading-relaxed mb-6 ${
                    isSelected ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {item.desc[lang]}
                </p>

                {/* Key Bullet Highlights */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {item.highlights[lang].map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className={`flex items-center gap-2.5 p-3 text-xs font-medium ${
                        isSelected
                          ? "bg-white/5 border border-white/10 text-neutral-200"
                          : "bg-neutral-50 border border-neutral-150 text-neutral-700"
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? "text-[#F58220]" : "text-[#F58220]"
                        }`}
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
