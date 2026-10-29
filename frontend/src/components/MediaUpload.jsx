
import { useEffect, useRef, useState } from 'react'
import API from '../api'

function MediaUpload({ eventId }) {
  const fileInputRef = useRef(null)

  const [events, setEvents] = useState([])
  const [selectedEventId, setSelectedEventId] = useState('')
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState('')
  const [loadingEvents, setLoadingEvents] = useState(true)

  useEffect(() => {
    let isActive = true

    const fetchEvents = async () => {
      setLoadingEvents(true)
      setMessage('')

      try {
        const response = await API.get('/api/events')
        const fetchedEvents = response.data.events || []

        if (!isActive) return

        setEvents(fetchedEvents)

        if (eventId) {
          const matchingEvent = fetchedEvents.find(
            (event) => String(event.id) === String(eventId)
          )

          if (matchingEvent) {
            setSelectedEventId(String(matchingEvent.id))
          } else {
            setSelectedEventId('')
            setMessage('The requested event could not be found.')
          }
        } else if (fetchedEvents.length > 0) {
          setSelectedEventId(String(fetchedEvents[0].id))
        } else {
          setSelectedEventId('')
          setMessage('No events found. Create an event first.')
        }
      } catch (error) {
        if (isActive) {
          console.error('Failed to fetch events:', error.message)
          setMessage('Could not load events. Please check the backend.')
        }
      } finally {
        if (isActive) {
          setLoadingEvents(false)
        }
      }
    }

    fetchEvents()

    return () => {
      isActive = false
    }
  }, [eventId])

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || [])
    const validFiles = selectedFiles.filter(
      (file) =>
        (file.type.startsWith('image/') ||
          file.type.startsWith('video/')) &&
        file.size > 0
    )

    if (validFiles.length !== selectedFiles.length) {
      setMessage('Some files were skipped. Select valid photos or videos.')
    } else {
      setMessage('')
    }

    setFiles((previousFiles) => [...previousFiles, ...validFiles])
    event.target.value = ''
  }

  const removeFile = (indexToRemove) => {
    setFiles((previousFiles) =>
      previousFiles.filter((_, index) => index !== indexToRemove)
    )
  }

  const formatFileSize = (size) => {
    return size < 1024 * 1024
      ? `${(size / 1024).toFixed(1)} KB`
      : `${(size / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <section className="border-t border-[#D8C8B5] py-16">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
          The media library
        </p>

        <h2 className="mt-3 font-serif text-4xl text-[#30251F] sm:text-5xl">
          Bring your moments together.
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#746257]">
          Choose an event and select the photographs and videos you want
          to organize in SnapSort.
        </p>
      </div>

      <div className="mb-6 max-w-xl">
        <label
          htmlFor="upload-event"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#746257]"
        >
          Choose your event *
        </label>

        <select
          id="upload-event"
          value={selectedEventId}
          onChange={(event) => setSelectedEventId(event.target.value)}
          disabled={loadingEvents || events.length === 0 || Boolean(eventId)}
          className="w-full border border-[#D8C8B5] bg-[#F8F1E6] px-4 py-3 text-[#30251F] outline-none focus:border-[#A9472E] disabled:opacity-60"
        >
          <option value="">
            {loadingEvents ? 'Loading events...' : 'Select an event'}
          </option>

          {events.map((event) => (
            <option key={event.id} value={String(event.id)}>
              {event.name}
            </option>
          ))}
        </select>

        {!loadingEvents && events.length === 0 && (
          <p className="mt-2 text-sm text-[#A9472E]">
            No events found. Create an event first.
          </p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFiles}
        className="hidden"
        aria-label="Choose event photos and videos"
      />

      <button
        type="button"
        disabled={!selectedEventId || loadingEvents}
        onClick={() => fileInputRef.current?.click()}
        className="w-full border border-dashed border-[#A9472E] bg-[#F8F1E6] px-6 py-12 text-center transition hover:bg-[#EDE0CF] disabled:cursor-not-allowed disabled:opacity-50 sm:py-16"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center border border-[#D8C8B5] font-serif text-3xl text-[#A9472E]">
          +
        </span>

        <span className="mt-5 block font-serif text-2xl text-[#30251F]">
          Select your photographs
        </span>

        <span className="mt-2 block text-sm text-[#746257]">
          Photos and videos · Multiple files supported
        </span>

        <span className="mt-5 inline-block bg-[#A9472E] px-5 py-3 text-sm font-semibold text-[#FFF8ED]">
          Browse files ↗
        </span>
      </button>

      {message && (
        <p role="status" className="mt-4 text-sm text-[#A9472E]">
          {message}
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-serif text-2xl text-[#30251F]">
              Selected media
            </h3>

            <span className="text-sm text-[#746257]">
              {files.length} {files.length === 1 ? 'file' : 'files'}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file, index) => (
              <article
                key={`${file.name}-${file.lastModified}-${index}`}
                className="border border-[#D8C8B5] bg-[#F8F1E6] p-4"
              >
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-[#7C5544] font-serif text-3xl italic text-[#FFF3E3]">
                    Video
                  </div>
                )}

                <p className="mt-3 truncate text-sm font-semibold text-[#30251F]">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-[#746257]">
                  {formatFileSize(file.size)}
                </p>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="mt-3 text-sm text-[#A9472E] underline underline-offset-4"
                >
                  Remove file
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-xs leading-6 text-[#8A7769]">
        Files are currently selected and previewed in your browser.
        Uploading them to the backend and storing them in the database
        has not been implemented yet.
      </p>
    </section>
  )
}

export default MediaUpload
