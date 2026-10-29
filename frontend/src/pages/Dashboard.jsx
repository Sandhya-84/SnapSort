
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api'

function Dashboard() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get('/api/events')
        setEvents(response.data.events || [])
      } catch (err) {
        console.error('Dashboard event error:', err.message)
        setError('Unable to load event information. Check your backend.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const statistics = [
    {
      number: loading ? '—' : events.length,
      label: 'Total events',
      note: 'Your event collections',
    },
    {
      number: '—',
      label: 'Media files',
      note: 'Upload integration pending',
    },
    {
      number: '—',
      label: 'People identified',
      note: 'AI processing pending',
    },
    {
      number: '—',
      label: 'Jobs processing',
      note: 'Processing queue pending',
    },
  ]

  const modules = [
    {
      number: '01',
      title: 'Event collections',
      description: 'Create events and manage your event archive.',
      link: '/events',
      action: 'Explore events',
    },
    {
      number: '02',
      title: 'Media upload',
      description: 'Choose an event and prepare its photos and videos.',
      link: '/media-upload',
      action: 'Open media upload',
    },
    {
      number: '03',
      title: 'People & face groups',
      description: 'Explore person groups after AI processing is implemented.',
      link: '/people',
      action: 'Explore people',
    },
    {
      number: '04',
      title: 'Find my photos',
      description: 'A dedicated place for attendee photo searches.',
      link: '/find-my-photos',
      action: 'Open photo search',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#30251F]">
      <main className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
              Your workspace
            </p>

            <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
              The dashboard.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#746257]">
              Every event, every collection, every moment — all from one
              place.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex w-fit items-center gap-3 bg-[#A9472E] px-5 py-4 text-sm font-semibold text-[#FFF8ED] transition hover:bg-[#853A28]"
          >
            Create an event <span>↗</span>
          </Link>
        </div>

        {/* Statistics */}
        <section className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((statistic) => (
            <article
              key={statistic.label}
              className="border border-[#D8C8B5] bg-[#F8F1E6] p-6"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#746257]">
                {statistic.label}
              </p>

              <p className="mt-5 font-serif text-5xl text-[#A9472E]">
                {statistic.number}
              </p>

              <p className="mt-3 text-sm text-[#8A7769]">
                {statistic.note}
              </p>
            </article>
          ))}
        </section>

        {/* Event overview */}
        <section className="mt-14 border-t border-[#D8C8B5] pt-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
                Your archive
              </p>

              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                Recent events
              </h2>
            </div>

            <Link
              to="/events"
              className="text-sm font-semibold text-[#A9472E] underline underline-offset-4"
            >
              View all events ↗
            </Link>
          </div>

          {loading && (
            <p className="mt-6 border border-[#D8C8B5] bg-[#F8F1E6] p-6 text-sm text-[#746257]">
              Loading your events...
            </p>
          )}

          {error && (
            <p
              role="alert"
              className="mt-6 border border-red-300 bg-red-50 p-5 text-sm text-red-800"
            >
              {error}
            </p>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="mt-6 border border-dashed border-[#C9B5A0] p-8">
              <p className="font-serif text-2xl italic">
                Your first collection awaits.
              </p>

              <p className="mt-3 text-sm text-[#746257]">
                Create an event to begin building your archive.
              </p>

              <Link
                to="/events"
                className="mt-5 inline-block bg-[#A9472E] px-5 py-3 text-sm font-semibold text-[#FFF8ED]"
              >
                Get started ↗
              </Link>
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {events.slice(0, 3).map((event, index) => (
                <article
                  key={event.id}
                  className="border border-[#D8C8B5] bg-[#F8F1E6] p-6"
                >
                  <div className="flex justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-[#B64D32]">
                      Event archive
                    </span>

                    <span className="font-serif text-2xl italic text-[#A9472E]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl">
                    {event.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#746257]">
                    {event.description ||
                      'A collection of moments waiting to be remembered.'}
                  </p>

                  <p className="mt-4 text-sm text-[#8A7769]">
                    {event.location || 'Location not specified'}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Module shortcuts */}
        <section className="mt-14 border-t border-[#D8C8B5] pt-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
            Navigate your workspace
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Everything in its place.
          </h2>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {modules.map((module) => (
              <Link
                key={module.number}
                to={module.link}
                className="group border border-[#D8C8B5] p-6 transition hover:border-[#A9472E] hover:bg-[#F8F1E6]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-serif text-3xl italic text-[#B64D32]">
                    {module.number}
                  </span>

                  <span className="text-xl text-[#A9472E] transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-2xl">
                  {module.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#746257]">
                  {module.description}
                </p>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-[#A9472E]">
                  {module.action}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-12 border-t border-[#D8C8B5] pt-5 text-xs leading-6 text-[#8A7769]">
          SnapSort · Editorial Film workspace
        </p>
      </main>
    </div>
  )
}

export default Dashboard
