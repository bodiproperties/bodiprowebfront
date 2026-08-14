import { useState } from "react";
import { Reveal } from "./Reveal";
import { TESTIMONIALS } from "@/data/careersData";
import { Language } from "@/types";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Building,
} from "lucide-react";

interface TestimonialsSectionProps {
  lang: Language;
}

export function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="bg-white py-24 sm:py-32 px-6 sm:px-8 border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal direction="left">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#F58220]"></span>
            <p className="uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold text-[#F58220]">
              {lang === "mn" ? "Манай Хамт Олон" : "Life at Bodi"}
            </p>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extralight text-neutral-900 mb-16">
            {lang === "mn" ? "Ажилтнуудын Сэтгэгдэл" : "Team Voices"}
          </h2>
        </Reveal>

        <Reveal direction="up">
          <div className="bg-neutral-50 p-8 sm:p-12 border border-neutral-200 relative overflow-hidden shadow-sm">
            <Quote className="w-20 h-20 text-[#F58220]/10 absolute -top-4 -left-4 pointer-events-none" />

            <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
              {/* Avatar column */}
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 overflow-hidden ring-4 ring-[#F58220]/20 shadow-xl mb-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-normal text-neutral-900">
                  {current.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#F58220] font-medium mt-1">
                  {current.role[lang]}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-neutral-200 text-xs font-mono text-neutral-600">
                  <Building className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>
                    {lang === "mn"
                      ? `${current.yearsAtCompany} жил ажиллаж байна`
                      : `${current.yearsAtCompany} years with Bodi`}
                  </span>
                </div>
              </div>

              {/* Quote column */}
              <div className="md:col-span-8 flex flex-col justify-between space-y-6">
                <blockquote className="text-xl sm:text-2xl font-light text-neutral-800 leading-relaxed italic">
                  "{current.quote[lang]}"
                </blockquote>

                {/* Slider Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                  <div className="flex gap-2">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentIndex
                            ? "w-8 bg-[#F58220]"
                            : "w-2 bg-neutral-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevTestimonial}
                      aria-label="Previous Testimonial"
                      className="w-10 h-10 border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      aria-label="Next Testimonial"
                      className="w-10 h-10 border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
