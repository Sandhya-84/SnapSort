
import { Link, useParams } from 'react-router-dom'
import MediaUpload from '../components/MediaUpload'

function MediaUploadPage() {
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

        <section className="mt-8 border-b border-[#D8C8B5] pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
            The media studio
          </p>

          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
            Add your moments.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#746257]">
            Choose an event, select photographs and videos, and prepare
            your collection for SnapSort.
          </p>

          {eventId && (
            <p className="mt-4 text-sm text-[#746257]">
              Opened from event ID:{' '}
              <span className="font-semibold text-[#A9472E]">
                {eventId}
              </span>
            </p>
          )}
        </section>

        <section className="mt-8">
          <MediaUpload />
        </section>

        <div className="mt-8 border-t border-[#D8C8B5] pt-6">
          <Link
            to="/events"
            className="text-sm font-semibold text-[#A9472E] underline underline-offset-4"
          >
            View all events ↗
          </Link>
        </div>
      </main>
    </div>
  )
}

export default MediaUploadPage
