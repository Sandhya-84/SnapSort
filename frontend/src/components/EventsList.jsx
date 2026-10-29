
import { useCallback, useEffect, useState } from 'react'
import API from './api'

function EventsList({ refreshSignal }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadEvents = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await API.get('/api/events')
      setEvents(response.data.events)
    } catch (error) {
      console.error('Failed to fetch events:', error.message)
      setError('Could not load your collections. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEvents()
  }, [loadEvents, refreshSignal])

  return (
    <section className="mt-6">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
            The collection
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#30251F] sm:text-4xl">
            Your event archive
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-[#746257]">
            {events.length} {events.length === 1 ? 'collection' : 'collections'}
          </p>

          <button
            type="button"
            onClick={loadEvents}
            disabled={loading}
            className="border border-[#A9472E] px-4 py-2 text-sm font-semibold text-[#A9472E] transition hover:bg-[#A9472E] hover:text-[#FFF8ED] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Loading...' : '↻ Refresh'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="border border-[#D8C8B5] bg-[#F8F1E6] p-8 text-[#746257]">
          Preparing your archive...
        </div>
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
        <div className="border border-dashed border-[#C9B5A0] bg-[#F8F1E6] px-6 py-12 text-center">
          <p className="font-serif text-2xl italic text-[#746257]">
            Your archive begins here.
          </p>
          <p className="mt-3 text-sm text-[#8A7769]">
            Create your first event to start collecting memories.
          </p>
          <a
            href="#create-event"
            className="mt-5 inline-block border border-[#A9472E] px-5 py-3 text-sm font-semibold text-[#A9472E] transition hover:bg-[#A9472E] hover:text-[#FFF8ED]"
          >
            Create your first event ↗
          </a>
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
                <h3 className="font-serif text-2xl text-[#30251F] transition group-hover:text-[#A9472E]">
                  {event.name}
                </h3>

                <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-[#746257]">
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
                  <span className="text-xs uppercase tracking-[0.15em] text-[#8A7769]">
                    SnapSort collection
                  </span>
                  <span className="text-xl text-[#A9472E] transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default EventsList
