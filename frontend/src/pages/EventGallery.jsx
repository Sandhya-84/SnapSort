
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../api'

function EventGallery() {
  const { eventId } = useParams()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    const fetchEvent = async () => {
      setLoading(true)
      setError('')
      setEvent(null)

      try {
        const response = await API.get(`/api/events/${eventId}`)

        if (isActive) {
          setEvent(response.data.event)
        }
      } catch (err) {
        if (isActive) {
          setError(
            err.response?.status === 404
              ? 'This event could not be found.'
              : 'Unable to load this event. Check your backend connection.'
          )
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    fetchEvent()

    return () => {
      isActive = false
    }
  }, [eventId])

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#30251F]">
      <main className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
        <Link
          to="/events"
          className="text-sm font-semibold text-[#A9472E] underline underline-offset-4"
        >
          ← Back to events
        </Link>

        {loading && (
          <p className="mt-8 border border-[#D8C8B5] bg-[#F8F1E6] p-6 text-sm text-[#746257]">
            Opening your event archive...
          </p>
        )}

        {error && (
          <div
            role="alert"
            className="mt-8 border border-red-300 bg-red-50 p-6 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        {!loading && !error && event && (
          <>
            <section className="mt-8 border-b border-[#D8C8B5] pb-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
                The event archive
              </p>

              <h1 className="mt-4 break-words font-serif text-5xl sm:text-6xl">
                {event.name}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#746257]">
                {event.description ||
                  'Every photograph and video from this event will belong here.'}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#746257]">
                <p>
                  <span className="mr-2 text-[#A9472E]">✳</span>
                  {event.event_date
                    ? new Date(
                        `${String(event.event_date).slice(0, 10)}T00:00:00`
                      ).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Date not specified'}
                </p>

                <p>
                  <span className="mr-2 text-[#A9472E]">⌖</span>
                  {event.location || 'Location not specified'}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={`/events/${event.id}/upload`}
                  className="bg-[#A9472E] px-5 py-3 text-sm font-semibold text-[#FFF8ED] transition hover:bg-[#853A28]"
                >
                  Upload photos & videos ↗
                </Link>

                <Link
                  to={`/events/${event.id}/people`}
                  className="border border-[#30251F] px-5 py-3 text-sm transition hover:bg-[#30251F] hover:text-[#F3EBDD]"
                >
                  Explore people
                </Link>
              </div>
            </section>

            <section className="py-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
                  The collection
                </p>

                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Every frame, in one place.
                </h2>
              </div>

              <div className="mt-8 border border-dashed border-[#C9B5A0] bg-[#F8F1E6] px-6 py-12 text-center sm:py-16">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#D8C8B5] font-serif text-3xl italic text-[#A9472E]">
                  01
                </div>

                <h3 className="mt-6 font-serif text-2xl">
                  Your gallery is waiting.
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#746257]">
                  Once you upload this event's media, its photographs
                  and videos will be ready to browse here.
                </p>

                <Link
                  to={`/events/${event.id}/upload`}
                  className="mt-6 inline-block bg-[#A9472E] px-5 py-3 text-sm font-semibold text-[#FFF8ED] transition hover:bg-[#853A28]"
                >
                  Choose media ↗
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default EventGallery
