import { useState } from "react";
import { Reveal } from "./Reveal";
import { HIRING_STEPS } from "@/data/careersData";
import { Language } from "@/types";
import { Clock, Lightbulb, CheckCircle2 } from "lucide-react";

interface HiringProcessSectionProps {
  lang: Language;
}

export function HiringProcessSection({ lang }: HiringProcessSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      id="process"
      className="bg-neutral-900 text-white py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden"
    >
      {/* Background architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal direction="left">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#F58220]"></span>
            <p className="uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold text-[#F58220]">
              {lang === "mn" ? "Шалгаруулалтын Мөчлөг" : "Roadmap to Join Us"}
            </p>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl mb-6">
            {lang === "mn"
              ? "Сонгон Шалгаруулалтын Үе Шатууд"
              : "Hiring Process"}
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg mb-16">
            {lang === "mn"
              ? "Бид бүх апликантуудад тэгш боломж, нээлттэй харилцаа болон шуурхай хариу санал тавихыг чухалчилдаг."
              : "Our hiring process is transparent, efficient, and designed to understand your unique strengths."}
          </p>
        </Reveal>

        {/* 4 Steps Grid from user layout with interactive highlights */}
        <div className="grid md:grid-cols-4 gap-8">
          {HIRING_STEPS.map((step, i) => {
            const isSelected = activeStep === i;
            return (
              <Reveal key={i} direction="up" delay={i * 120}>
                <div
                  onClick={() => setActiveStep(i)}
                  className={`p-8 border transition-all duration-300 cursor-pointer h-full flex flex-col justify-between ${
                    isSelected
                      ? "bg-neutral-800/90 border-[#F58220] shadow-2xl scale-105 ring-1 ring-[#F58220]/50"
                      : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/40"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span
                        className={`text-5xl transition-colors ${isSelected ? "text-[#F58220]" : "text-white/20"}`}
                      >
                        {step.number}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#F58220]" />
                      )}
                    </div>

                    <h3 className="text-xl text-white mb-2">
                      {step.title[lang]}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#F58220] mb-4">
                      {step.subtitle[lang]}
                    </p>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                      {step.description[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F58220]" />
                      {step.duration[lang]}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#F58220]">
                      {isSelected ? "Active" : "Click info"}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Selected Step Insider Tips Box */}
        <div className="mt-12 bg-neutral-800/80 p-6 sm:p-8 border border-neutral-700/60 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-12 h-12 bg-[#F58220]/20 text-[#F58220] flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm uppercase tracking-wider text-white">
              {lang === "mn"
                ? `Шаталбар ${HIRING_STEPS[activeStep].number} Зөвлөгөө:`
                : `Step ${HIRING_STEPS[activeStep].number} Candidate Tip:`}
            </h4>
            <p className="mt-1 text-sm text-neutral-300 font-light">
              {HIRING_STEPS[activeStep].tips[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
