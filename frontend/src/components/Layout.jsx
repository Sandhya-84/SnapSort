
import { Outlet, Link } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#30251F]">
      <Navbar />

      <div>
        <Outlet />
      </div>

      <footer className="mt-12 border-t border-[#D8C8B5]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center md:px-12">
          <Link to="/" className="font-serif text-2xl font-bold">
            snapsort<span className="text-[#B64D32]">.</span>
          </Link>

          <p className="text-sm text-[#746257]">
            Every frame has a story.
          </p>

          <p className="text-xs uppercase tracking-[0.15em] text-[#8A7769]">
            © 2026 SnapSort
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
