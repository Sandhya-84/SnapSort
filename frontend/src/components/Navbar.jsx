
import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap text-sm transition ${
      isActive
        ? 'font-bold text-[#A9472E]'
        : 'text-[#746257] hover:text-[#A9472E]'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8C8B5] bg-[#F3EBDD]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center md:px-12">
        <Link
          to="/"
          className="w-fit shrink-0 font-serif text-3xl font-bold tracking-tight"
        >
          snapsort<span className="text-[#B64D32]">.</span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/events" className={navLinkClass}>
            Events
          </NavLink>

          <NavLink to="/media-upload" className={navLinkClass}>
            Upload
          </NavLink>

          <NavLink to="/people" className={navLinkClass}>
            People
          </NavLink>

          <NavLink to="/find-my-photos" className={navLinkClass}>
            Find my photos
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
