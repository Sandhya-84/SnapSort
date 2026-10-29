
import { Link, useParams } from 'react-router-dom'
import { useRef, useState } from 'react'

function FindMyPhotos() {
  const { eventId } = useParams()
  const fileInputRef = useRef(null)

  const [selfie, setSelfie] = useState(null)
  const [message, setMessage] = useState('')

  const handleSelfieChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file.')
      setSelfie(null)
      event.target.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage('Please select an image smaller than 10 MB.')
      setSelfie(null)
      event.target.value = ''
      return
    }

    setSelfie(file)
    setMessage(
      'Selfie selected. Matching is not available yet; your image has not been uploaded.'
    )
    event.target.value = ''
  }

  const clearSelfie = () => {
    setSelfie(null)
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#30251F]">
      <main className="mx-auto max-w-[1000px] px-6 py-12 md:px-12 md:py-16">
        <Link
          to="/events"
          className="text-sm font-semibold text-[#A9472E] underline underline-offset-4"
        >
          ← Back to events
        </Link>

        <section className="mt-8 border-b border-[#D8C8B5] pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
            Your memories, discovered
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
            Find yourself<br />
            <span className="italic text-[#A9472E]">in every frame.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#746257]">
            Find photos from an event by submitting a selfie. SnapSort
            will eventually use face matching to find possible appearances
            across the event gallery.
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

        <section className="mt-10 border border-[#D8C8B5] bg-[#F8F1E6] p-6 sm:p-10">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B64D32]">
              Selfie search
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Start with a photograph.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#746257]">
              Choose a clear, well-lit photo of yourself with your face
              visible.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelfieChange}
            className="hidden"
            aria-label="Choose a selfie"
          />

          {!selfie ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-[#A9472E] px-6 py-12 text-center transition hover:bg-[#EDE0CF] sm:py-16"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center border border-[#D8C8B5] font-serif text-3xl text-[#A9472E]">
                +
              </span>

              <span className="mt-5 block font-serif text-2xl">
                Choose your selfie
              </span>

              <span className="mt-2 block text-sm text-[#746257]">
                Image files only · Maximum 10 MB
              </span>

              <span className="mt-5 inline-block bg-[#A9472E] px-5 py-3 text-sm font-semibold text-[#FFF8ED]">
                Browse photos ↗
              </span>
            </button>
          ) : (
            <div className="border border-[#D8C8B5] p-4">
              <img
                src={URL.createObjectURL(selfie)}
                alt="Selected selfie preview"
                className="mx-auto max-h-80 w-full object-contain"
              />

              <p className="mt-4 truncate text-sm font-semibold">
                {selfie.name}
              </p>

              <button
                type="button"
                onClick={clearSelfie}
                className="mt-3 text-sm text-[#A9472E] underline underline-offset-4"
              >
                Remove selfie
              </button>
            </div>
          )}

          {message && (
            <p
              role="status"
              className="mt-5 border border-[#D8C8B5] p-4 text-sm leading-6 text-[#746257]"
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-xs leading-6 text-[#8A7769]">
            Privacy note: your selected image stays in this browser in
            this prototype. No selfie is uploaded or matched yet. Before
            enabling face matching, SnapSort should explain how biometric
            data is used, obtain appropriate consent, and provide secure
            handling and deletion options.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-5">
          <Link
            to={
              eventId
                ? `/events/${eventId}/gallery`
                : '/events'
            }
            className="text-sm font-semibold text-[#A9472E] underline underline-offset-4"
          >
            Browse event gallery ↗
          </Link>

          <Link
            to="/dashboard"
            className="text-sm font-semibold text-[#A9472E] underline underline-offset-4"
          >
            Back to dashboard ↗
          </Link>
        </div>
      </main>
    </div>
  )
}

export default FindMyPhotos
