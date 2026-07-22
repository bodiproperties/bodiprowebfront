import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const posts = [
  {
    id: "light-architecture",
    title: "The Role of Light in Modern Architecture",
    date: "Mar 2026",
    category: "Insights",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=1000&fit=crop",
  },
  {
    id: "minimalism-design",
    title: "Minimalism and Human-Centered Design",
    date: "Feb 2026",
    category: "Essay",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&h=1000&fit=crop",
  },
  {
    id: "material-honesty",
    title: "Material Honesty in Contemporary Spaces",
    date: "Jan 2026",
    category: "Research",
    image: "/images/10.jpg",
  },
];

export default function NewsPage() {
  return (
    <main className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <Image
          src="/images/9.jpg"
          alt=""
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-6xl mx-auto w-full px-8 pb-20 text-white">
          <p className="text-xs tracking-[0.35em] uppercase text-[#F58220]">
            Journal
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-extralight leading-tight max-w-4xl">
            Insights, ideas and stories from our studio.
          </h1>
          <p className="mt-8 text-white/70 max-w-xl leading-relaxed">
            Exploring architecture, material, light and human experience through
            essays and research.
          </p>
        </div>
      </section>

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

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-8 mb-16">
        <Reveal direction="left">
          <p className="text-xs tracking-[0.35em] text-[#F58220] uppercase">
            Latest Articles
          </p>
          <h2 className="mt-5 text-4xl md:text-6xl font-extralight">
            News &amp; Journal
          </h2>
        </Reveal>
      </section>

      {/* ARTICLES */}
      <div className="max-w-6xl mx-auto px-8 space-y-20">
        {posts.map((post, i) => {
          const imageLeft = i % 2 === 0;
          return (
            <Link
              key={post.id}
              href={`/news/${post.id}`}
              className="group grid md:grid-cols-2 gap-12 items-center"
            >
              {/* IMAGE */}
              <Reveal
                direction={imageLeft ? "left" : "right"}
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
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              </Reveal>

              {/* CONTENT */}
              <Reveal
                direction={imageLeft ? "right" : "left"}
                delay={150}
                className={imageLeft ? "" : "md:order-1"}
              >
                <div className="flex gap-4 text-xs tracking-[0.3em] uppercase text-neutral-400">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="mt-5 text-3xl md:text-4xl font-extralight leading-tight group-hover:tracking-wide transition">
                  {post.title}
                </h2>
                <p className="mt-6 text-neutral-500 leading-relaxed max-w-md">
                  Exploring how architecture shapes emotion through space,
                  proportion, material and natural light.
                </p>
                <div className="mt-8 h-px w-0 bg-black group-hover:w-32 transition-all duration-500" />
              </Reveal>
            </Link>
          );
        })}
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
            <button className="px-10 py-4 border border-black hover:bg-black hover:text-white transition text-sm tracking-[0.2em]">
              SUBSCRIBE
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
