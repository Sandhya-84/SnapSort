
import { Link, useParams } from 'react-router-dom'

function People() {
  const { eventId } = useParams()

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#30251F]">
      <main className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
        <Link
          to="/events"
          className="text-sm font-semibold text-[#A9472E] underline underline-offset-4"
        >
          ← Back to events
        </Link>

        <section className="mt-8 border-b border-[#D8C8B5] pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
            Intelligent photo discovery
          </p>

          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            People, in frames.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#746257]">
            SnapSort is designed to group photographs featuring the same
            person, helping you discover every moment in which they appear.
          </p>

          {eventId && (
            <p className="mt-4 text-sm text-[#746257]">
              Event ID:{' '}
              <span className="font-semibold text-[#A9472E]">
                {eventId}
              </span>
            </p>
          )}
        </section>

        <section className="py-12">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-[#D8C8B5] bg-[#F8F1E6] p-6">
              <span className="font-serif text-3xl italic text-[#B64D32]">
                01
              </span>
              <h2 className="mt-5 font-serif text-2xl">
                Detect faces
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#746257]">
                Locate visible faces in uploaded event photographs.
              </p>
            </article>

            <article className="border border-[#D8C8B5] bg-[#F8F1E6] p-6">
              <span className="font-serif text-3xl italic text-[#B64D32]">
                02
              </span>
              <h2 className="mt-5 font-serif text-2xl">
                Group appearances
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#746257]">
                Compare face representations to build tentative groups
                of appearances belonging to the same person.
              </p>
            </article>

            <article className="border border-[#D8C8B5] bg-[#F8F1E6] p-6">
              <span className="font-serif text-3xl italic text-[#B64D32]">
                03
              </span>
              <h2 className="mt-5 font-serif text-2xl">
                Review groups
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#746257]">
                Let organizers review, correct, or separate uncertain
                groups before sharing galleries.
              </p>
            </article>
          </div>

          <div className="mt-8 border border-dashed border-[#C9B5A0] bg-[#F8F1E6] px-6 py-12 text-center sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#D8C8B5] font-serif text-3xl italic text-[#A9472E]">
              ✳
            </div>

            <h2 className="mt-6 font-serif text-3xl">
              Your people gallery is taking shape.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#746257]">
              Face detection, matching, and grouping have not been
              implemented yet. Once the AI processing pipeline is
              connected, reviewed person groups will appear here.
            </p>

            <Link
              to={
                eventId
                  ? `/events/${eventId}/upload`
                  : '/media-upload'
              }
              className="mt-6 inline-block bg-[#A9472E] px-5 py-3 text-sm font-semibold text-[#FFF8ED] transition hover:bg-[#853A28]"
            >
              Go to media upload ↗
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default People
