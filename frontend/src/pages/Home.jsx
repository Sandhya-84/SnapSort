import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#30251F]">
      <main className="mx-auto max-w-[1440px] px-6 md:px-12">
        <section className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#B64D32]">
              Your event. Every perspective.
            </p>

            <h1 className="font-serif text-6xl leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              Moments
              <br />
              worth
              <br />
              <span className="italic text-[#B64D32]">finding.</span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-7 text-[#746257]">
              Thousands of photographs. One unforgettable event.
              SnapSort brings every moment together and helps you find
              the faces, memories, and stories that matter.
            </p>

            
<div className="mt-8 flex flex-wrap gap-4">
  <Link
    to="/dashboard"
    className="bg-[#A9472E] px-6 py-4 text-sm font-semibold text-[#FFF8ED] transition hover:bg-[#853A28]"
  >
    Explore dashboard ↗
  </Link>

  <Link
    to="/events"
    className="border border-[#30251F] px-6 py-4 text-sm font-semibold transition hover:bg-[#30251F] hover:text-[#F3EBDD]"
  >
    View events
  </Link>
</div>


            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#8A7769]">
              Made for the moments you keep
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-2 -top-3 z-10 rotate-6 border border-[#A9472E] bg-[#F3EBDD] px-4 py-3 text-center sm:-right-5">
              <p className="font-serif text-xl italic text-[#A9472E]">
                Keep it.
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em]">
                Find it again.
              </p>
            </div>

            <div className="rotate-[-2deg] border border-[#D5C2AD] bg-[#E8DCCB] p-3 shadow-xl">
              <div className="flex aspect-[4/5] flex-col justify-between bg-[#7C5544] p-6 text-[#FFF3E3] sm:p-9">
                <div className="flex items-start justify-between">
                  <span className="text-xs uppercase tracking-[0.2em]">
                    The archive
                  </span>
                  <span className="font-serif text-2xl italic">01</span>
                </div>

                <div>
                  <div className="mb-5 h-px w-16 bg-[#E9C9A7]" />
                  <p className="font-serif text-5xl leading-tight sm:text-6xl">
                    Life,
                    <br />
                    in frames.
                  </p>
                  <p className="mt-5 max-w-xs text-sm leading-6 text-[#F0DACA]">
                    A thousand little moments. A lifetime of stories.
                  </p>
                </div>

                <div className="flex justify-between border-t border-[#C49C81] pt-4 text-[10px] uppercase tracking-[0.2em]">
                  <span>SnapSort Studio</span>
                  <span>Est. 2026</span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-right font-serif text-sm italic text-[#8A7769]">
              Every frame has a story.
            </p>
          </div>
        </section>

        <section className="border-t border-[#D8C8B5] py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
            A better kind of archive
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Memories, made searchable.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="border border-[#D8C8B5] p-7">
              <span className="font-serif text-3xl italic text-[#B64D32]">
                01
              </span>
              <h3 className="mt-8 font-serif text-2xl">
                One event, one home.
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#746257]">
                Bring event photos and videos together in one collection.
              </p>
            </article>

            <article className="border border-[#D8C8B5] p-7">
              <span className="font-serif text-3xl italic text-[#B64D32]">
                02
              </span>
              <h3 className="mt-8 font-serif text-2xl">
                Faces find faces.
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#746257]">
                Organize moments featuring the same person with AI-assisted
                face grouping.
              </p>
            </article>

            <article className="border border-[#D8C8B5] p-7">
              <span className="font-serif text-3xl italic text-[#B64D32]">
                03
              </span>
              <h3 className="mt-8 font-serif text-2xl">
                Find your moment.
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#746257]">
                Find event memories without manually browsing every file.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
