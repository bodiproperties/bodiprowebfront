"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Search, Calendar, ArrowRight, Sparkles } from "lucide-react";
import NewsHero from "@/components/molecules/NewsHero";

const posts = [
  {
    id: "light-architecture",
    title: "The Role of Light in Modern Architecture",
    date: "Mar 2026",
    category: "Insights",
    featured: true,
    excerpt:
      "Exploring how architecture shapes emotion through space, proportion, material and natural light.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=1000&fit=crop",
  },
  {
    id: "minimalism-design",
    title: "Minimalism and Human-Centered Design",
    date: "Feb 2026",
    category: "Essay",
    featured: false,
    excerpt:
      "Exploring how architecture shapes emotion through space, proportion, material and natural light.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&h=1000&fit=crop",
  },
  {
    id: "material-honesty",
    title: "Material Honesty in Contemporary Spaces",
    date: "Jan 2026",
    category: "Research",
    featured: false,
    excerpt:
      "Exploring how architecture shapes emotion through space, proportion, material and natural light.",
    image: "/images/10.jpg",
  },
];

const CATEGORIES = ["All", "Insights", "Essay", "Research"];

export default function NewsPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCat === "All" || post.category === selectedCat;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <main className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <NewsHero />

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-4 gap-10 text-center">
        {[
          ["120+", "Articles"],
          ["8", "Categories"],
          ["50K+", "Readers"],
          ["2026", "Latest Edition"],
        ].map(([num, label], i) => (
          <Reveal key={i} direction="up" delay={i * 120}>
            <h2 className="text-5xl font-extralight">{num}</h2>
            <p className="mt-3 text-xs tracking-[0.3em] uppercase text-neutral-500">
              {label}
            </p>
          </Reveal>
        ))}
      </section>

      {/* HEADER + SEARCH */}
      <section className="max-w-6xl mx-auto px-8 mb-12">
        <Reveal direction="left">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#F58220]" />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#F58220]">
              Latest Articles
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl md:text-6xl font-extralight text-neutral-900">
                Мэдээ &amp; мэдээлэл
              </h2>
              <p className="mt-3 max-w-xl font-light text-neutral-500">
                Exploring architecture, material, light and human experience.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm transition focus:border-[#F58220] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Filter Tabs */}
      <Reveal direction="up" delay={100}>
        <div className="max-w-6xl mx-auto px-8 mb-16 flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`cursor-pointer px-5 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                selectedCat === cat
                  ? "bg-neutral-900 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* ARTICLES */}
      <div className="max-w-6xl mx-auto px-8 space-y-8">
        {filteredPosts.length === 0 ? (
          <div className="border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-base text-neutral-500">
              No articles found matching your filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCat("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-semibold uppercase text-[#F58220] underline"
            >
              Clear search filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <Reveal
                key={post.id}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 80}
              >
                <Link
                  href={`/news/${post.id}`}
                  className="group grid items-center gap-0 border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-400 hover:shadow-md md:grid-cols-2"
                >
                  {/* IMAGE */}
                  <div
                    className={`relative aspect-[16/10] overflow-hidden ${
                      imageLeft ? "" : "md:order-2"
                    }`}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
                  </div>

                  {/* CONTENT */}
                  <div className={`p-8 md:p-10 ${imageLeft ? "" : "md:order-1"}`}>
                    <div className="flex items-center gap-3">
                      <span className="bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="flex items-center gap-1 bg-[#F58220]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#F58220]">
                          <Sparkles className="h-3 w-3" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-2xl font-light leading-tight tracking-tight text-neutral-900 transition group-hover:tracking-wide md:text-3xl">
                      {post.title}
                    </h2>

                    <div className="mt-3 flex items-center gap-1.5 text-sm font-light text-neutral-500">
                      <Calendar className="h-4 w-4 text-[#F58220]" />
                      {post.date}
                    </div>

                    <p className="mt-4 max-w-md leading-relaxed text-neutral-500">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-900 transition group-hover:text-[#F58220]">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })
        )}
      </div>

      {/* QUOTE */}
      <section className="max-w-5xl mx-auto px-8 py-36 text-center">
        <Reveal direction="up">
          <h2 className="text-4xl md:text-5xl font-extralight leading-tight">
            &quot;Architecture is the learned game, correct and magnificent, of
            forms assembled in light.&quot;
          </h2>
          <p className="mt-8 text-sm tracking-[0.3em] uppercase text-neutral-500">
            Le Corbusier
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-8 py-24 flex flex-col md:flex-row justify-between items-center gap-8">
          <Reveal direction="left">
            <h2 className="text-3xl md:text-5xl font-extralight">
              Stay informed.
            </h2>
            <p className="mt-4 text-neutral-500">
              Discover our latest articles, ideas and studio updates.
            </p>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <button className="px-10 py-4 border border-black hover:bg-black hover:text-white transition text-sm tracking-[0.2em] cursor-pointer">
              SUBSCRIBE
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}