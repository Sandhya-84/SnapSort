
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api'
import CreateEvent from '../components/CreateEvent'

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshSignal, setRefreshSignal] = useState(0)

  const loadEvents = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await API.get('/api/events')
      setEvents(response.data.events || [])
    } catch (err) {
      console.error('Failed to load events:', err.message)
      setError('Could not load events. Check your backend connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEvents()
  }, [loadEvents, refreshSignal])

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#30251F]">
      <main className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
              The archive
            </p>

            <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
              Your events.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#746257]">
              Every celebration gets its own collection. Create an event
              and give your photographs and videos a home.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="w-fit border border-[#30251F] px-5 py-3 text-sm transition hover:bg-[#30251F] hover:text-[#F3EBDD]"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Create event */}
        <section className="mt-12 border-t border-[#D8C8B5] pt-10">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B64D32]">
              Start a new collection
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Give your moments a home.
            </h2>
          </div>

          <CreateEvent
            onEventCreated={() => setRefreshSignal((value) => value + 1)}
          />
        </section>

        {/* Existing events */}
        <section className="mt-14 border-t border-[#D8C8B5] pt-10">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B64D32]">
                Your collection
              </p>

              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                All events
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm text-[#746257]">
                {events.length} {events.length === 1 ? 'event' : 'events'}
              </p>

              <button
                type="button"
                onClick={loadEvents}
                disabled={loading}
                className="border border-[#A9472E] px-4 py-2 text-sm font-semibold text-[#A9472E] transition hover:bg-[#A9472E] hover:text-[#FFF8ED] disabled:opacity-50"
              >
                {loading ? 'Loading...' : '↻ Refresh'}
              </button>
            </div>
          </div>

          {loading && (
            <p className="border border-[#D8C8B5] bg-[#F8F1E6] p-6 text-sm text-[#746257]">
              Preparing your event archive...
            </p>
          )}

          {error && (
            <div
              role="alert"
              className="border border-red-300 bg-red-50 p-5 text-sm text-red-800"
            >
              <p>{error}</p>

              <button
                type="button"
                onClick={loadEvents}
                className="mt-3 underline"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="border border-dashed border-[#C9B5A0] px-6 py-12 text-center">
              <p className="font-serif text-2xl italic text-[#746257]">
                Your archive begins here.
              </p>

              <p className="mt-3 text-sm text-[#8A7769]">
                Create your first event using the form above.
              </p>
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event, index) => (
                <article
                  key={event.id}
                  className="group border border-[#D8C8B5] bg-[#F8F1E6] transition duration-300 hover:-translate-y-1 hover:border-[#A9472E] hover:shadow-lg"
                >
                  <div className="flex aspect-[16/7] items-start justify-between bg-[#7C5544] p-5 text-[#FFF3E3]">
                    <span className="text-xs uppercase tracking-[0.2em]">
                      Event archive
                    </span>

                    <span className="font-serif text-3xl italic">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-2xl transition group-hover:text-[#A9472E]">
                      {event.name}
                    </h3>

                    <p className="mt-3 min-h-[3rem] text-sm leading-6 text-[#746257]">
                      {event.description ||
                        'A collection of moments waiting to be remembered.'}
                    </p>

                    <div className="mt-5 space-y-2 border-t border-[#D8C8B5] pt-4 text-sm text-[#746257]">
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

                    <div className="mt-5 flex items-center justify-between border-t border-[#D8C8B5] pt-4">
                      <Link
                        to={`/events/${event.id}/gallery`}
                        className="text-sm font-semibold text-[#A9472E] underline underline-offset-4"
                      >
                        Open gallery
                      </Link>

                      <Link
                        to={`/events/${event.id}/upload`}
                        aria-label={`Upload media for ${event.name}`}
                        className="text-xl text-[#A9472E] transition group-hover:translate-x-1"
                      >
                        ↗
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Events
