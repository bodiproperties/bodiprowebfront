import { BackButton } from '@/components/molecules/BackButton'
import Image from 'next/image'

type Props = {
  params: {
    id: string
  }
}

export default function NewsDetail({ params }: Props) {
  const slug = params.id ?? 'news-article'
  const title = slug.replaceAll('-', ' ')

  return (
    <main className="bg-white text-neutral-900">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] flex items-end overflow-hidden">
        
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=2000"
          alt={title}
          fill
          priority
          className="object-cover"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* TITLE */}
        <div className="relative max-w-5xl mx-auto px-8 pb-16 text-white">
          
          <p className="text-xs tracking-[0.35em] uppercase text-white/70">
            News / Article
          </p>

          <h1 className="mt-6 text-4xl md:text-6xl font-extralight leading-tight">
            {title}
          </h1>

          <p className="mt-6 text-white/70 text-sm tracking-widest">
            Published March 2026 • 6 min read
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-[240px_1fr] gap-16">
        
        {/* SIDEBAR */}
        <aside className="hidden md:block">
          <div className="sticky top-24 space-y-10 text-sm text-neutral-500">
            
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
                Category
              </p>
              <p className="mt-2 text-neutral-700">Insights</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
                Author
              </p>
              <p className="mt-2 text-neutral-700">Studio Team</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
                Reading Time
              </p>
              <p className="mt-2 text-neutral-700">6 min</p>
            </div>

            <div className="pt-6 border-t border-neutral-200 space-y-2">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
                Share
              </p>
              <p className="hover:text-black cursor-pointer">Twitter</p>
              <p className="hover:text-black cursor-pointer">LinkedIn</p>
              <p className="hover:text-black cursor-pointer">Copy link</p>
            </div>

          </div>
        </aside>

        {/* ARTICLE */}
        <article className="space-y-10 leading-relaxed text-neutral-700">
          
          <p className="text-xl font-light text-neutral-900 leading-relaxed">
            Architecture is not just about constructing space, but about shaping perception through light, material, and silence.
          </p>

          <p>
            In contemporary practice, minimalism has evolved beyond aesthetic reduction. It now represents clarity of intention, where every element has purpose and presence.
          </p>

          {/* IMAGE */}
          <div className="relative w-full aspect-[16/9] my-14 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=1600"
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-2xl font-extralight text-neutral-900">
            Light as Material
          </h2>

          <p>
            Light becomes a material in itself — shaping volume, defining edges, and influencing emotional response within space.
          </p>

          <p>
            Architects increasingly design not just objects, but experiences that unfold over time as light changes throughout the day.
          </p>

          {/* QUOTE */}
          <blockquote className="border-l-2 border-black pl-6 py-2 text-xl font-extralight text-neutral-900">
            “Space is not defined by walls, but by the way light moves through it.”
          </blockquote>

          <p>
            This philosophy reinforces the idea that architecture is a temporal experience rather than a static object.
          </p>

          {/* FINAL IMAGE */}
          <div className="relative w-full aspect-[4/3] my-14 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1600"
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          <p>
            Ultimately, modern architecture seeks balance between precision and emotion, structure and atmosphere, silence and presence.
          </p>

        </article>
      </section>

      {/* NEXT ARTICLE */}
      <section className="max-w-6xl mx-auto px-8 pb-32">
        <div className="border-t border-neutral-200 pt-10 flex justify-between items-center">
          <p className="text-sm text-neutral-500">Next article</p>

          <button className="text-sm border-b border-black pb-1 hover:opacity-50 transition">
            Minimalism and Human-Centered Design →
          </button>
        </div>
      </section>
      <BackButton href="/news" label="All Articles" />
    </main>
  )
}