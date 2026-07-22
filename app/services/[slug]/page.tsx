'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ServiceModal() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">

      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => router.push('/services')}
      />

      {/* CLOSE BUTTON */}
      <button
        onClick={() => router.push('/services')}
        className="fixed top-6 right-6 z-[60] w-11 h-11 rounded-full
        bg-white/90 hover:bg-white shadow-lg flex items-center justify-center
        text-black text-lg transition hover:scale-105"
      >
        ✕
      </button>

      {/* MODAL CONTAINER */}
      <div className="relative z-50 flex justify-center py-20 px-6">

        <div className="w-full max-w-5xl bg-white shadow-2xl overflow-hidden">

          {/* HERO IMAGE */}
          <div className="relative w-full h-[65vh]">
            <Image
              src="/images/3.jpg"
              alt=""
              fill
              className="object-cover scale-105"
              priority
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* TITLE */}
            <div className="absolute bottom-10 left-10 text-white max-w-xl">
              <p className="text-xs tracking-[0.3em] uppercase opacity-70">
                Architecture Service
              </p>
              <h1 className="text-4xl md:text-6xl font-extralight leading-tight mt-4">
                Spatial Design for Modern Living
              </h1>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-10 md:px-16 py-14 space-y-16">

            {/* INTRO */}
            <p className="text-lg text-neutral-700 leading-relaxed">
              We design architecture that connects light, material, and human emotion into one seamless experience.
            </p>

            {/* IMAGE + TEXT GRID */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/4.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-light mb-4">Design Philosophy</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Every project begins with context — light, proportion, and material define how space is experienced.
                </p>
              </div>
            </div>

            {/* FULL WIDTH IMAGE */}
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/images/6.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* DETAIL GRID */}
            <div className="grid md:grid-cols-3 gap-10">

              <div>
                <h3 className="text-sm tracking-[0.2em] uppercase text-neutral-400">
                  Focus
                </h3>
                <p className="mt-3 text-neutral-700">
                  Minimal spatial design
                </p>
              </div>

              <div>
                <h3 className="text-sm tracking-[0.2em] uppercase text-neutral-400">
                  Approach
                </h3>
                <p className="mt-3 text-neutral-700">
                  Human-centered architecture
                </p>
              </div>

              <div>
                <h3 className="text-sm tracking-[0.2em] uppercase text-neutral-400">
                  Result
                </h3>
                <p className="mt-3 text-neutral-700">
                  Timeless environments
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}