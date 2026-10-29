
import { Routes, Route, Link } from 'react-router-dom'

import Layout from './components/Layout'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import EventGallery from './pages/EventGallery'
import MediaUploadPage from './pages/MediaUploadPage'
import People from './pages/People'
import FindMyPhotos from './pages/FindMyPhotos'

function NotFound() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B64D32]">
        Page not found
      </p>

      <h1 className="mt-4 font-serif text-5xl">
        Lost in the archive?
      </h1>

      <p className="mt-5 text-sm leading-7 text-[#746257]">
        This page does not exist. Return home to find your way.
      </p>

      <Link
        to="/"
        className="mt-7 inline-block bg-[#A9472E] px-6 py-3 text-sm font-semibold text-[#FFF8ED] transition hover:bg-[#853A28]"
      >
        Return home ↗
      </Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/events" element={<Events />} />

        <Route
          path="/events/:eventId/gallery"
          element={<EventGallery />}
        />

        <Route
          path="/media-upload"
          element={<MediaUploadPage />}
        />

        <Route
          path="/events/:eventId/upload"
          element={<MediaUploadPage />}
        />

        <Route
          path="/people"
          element={<People />}
        />

        <Route
          path="/events/:eventId/people"
          element={<People />}
        />

        <Route
          path="/find-my-photos"
          element={<FindMyPhotos />}
        />

        <Route
          path="/events/:eventId/find-my-photos"
          element={<FindMyPhotos />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
