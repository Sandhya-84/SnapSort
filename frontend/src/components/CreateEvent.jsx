
import { useState } from 'react'
import API from '../api'

function CreateEvent({ onEventCreated }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setIsError(false)
    setLoading(true)

    try {
      const response = await API.post('/api/events', {
        name,
        description,
        date: date || null,
        location,
        created_by: 1,
      })

      setMessage(response.data.message)
      onEventCreated?.()

      setName('')
      setDescription('')
      setDate('')
      setLocation('')
    } catch (error) {
      setIsError(true)
      setMessage(
        error.response?.data?.message ||
          'Could not create event. Check the backend and database.'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full border border-[#D8C8B5] bg-[#FBF7F0] px-4 py-3 text-[#30251F] outline-none transition placeholder:text-[#A49485] focus:border-[#A9472E] focus:ring-2 focus:ring-[#A9472E]/10'

  const labelClass =
    'mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#746257]'

  return (
    <div className="grid gap-10 border border-[#D8C8B5] bg-[#F8F1E6] p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
            The beginning
          </p>

          <h3 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Every great
            <br />
            story starts
            <br />
            <span className="italic text-[#A9472E]">somewhere.</span>
          </h3>

          <p className="mt-5 max-w-sm text-sm leading-7 text-[#746257]">
            Set up your event and create a home for all its photographs,
            videos, and unforgettable moments.
          </p>
        </div>

        <div className="mt-8 border-t border-[#D8C8B5] pt-5">
          <p className="font-serif text-xl italic text-[#8A7769]">
            Your memories. Your collection.
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8A7769]">
            SnapSort · Event archive
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-[#D8C8B5] pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
      >
        <div className="mb-7">
          <p className="text-xs uppercase tracking-[0.2em] text-[#A9472E]">
            Event details
          </p>
          <h3 className="mt-2 font-serif text-3xl">Create a new event</h3>
          <p className="mt-2 text-sm text-[#746257]">
            Fields marked * are required.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="event-name" className={labelClass}>
              Event name *
            </label>
            <input
              id="event-name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. College Cultural Fest"
              required
              maxLength={200}
            />
          </div>

          <div>
            <label htmlFor="event-description" className={labelClass}>
              The story behind it
            </label>
            <textarea
              id="event-description"
              className={`${inputClass} resize-y`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A few words about your event..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="event-date" className={labelClass}>
                Event date
              </label>
              <input
                id="event-date"
                type="date"
                className={inputClass}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="event-location" className={labelClass}>
                Location
              </label>
              <input
                id="event-location"
                className={inputClass}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Visakhapatnam"
                maxLength={255}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-7 flex w-full items-center justify-between bg-[#A9472E] px-5 py-4 text-sm font-semibold text-[#FFF8ED] transition hover:bg-[#853A28] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{loading ? 'Creating your event...' : 'Create your event'}</span>
          <span className="text-lg">↗</span>
        </button>

        {message && (
          <p
            role="status"
            className={`mt-4 border p-4 text-sm ${
              isError
                ? 'border-red-300 bg-red-50 text-red-800'
                : 'border-[#A7B39A] bg-[#EDF0E6] text-[#40543A]'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

export default CreateEvent
