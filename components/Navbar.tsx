import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-[#0a1628] text-white sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-baseline gap-1.5 shrink-0">
          <span className="font-black text-xl tracking-tight text-white">KOENIG</span>
          <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-widest">step forward</span>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">All Courses</Link>
          <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Technologies</Link>
          <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Vendors</Link>
          <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">About</Link>
          <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden md:flex items-center bg-white/10 rounded-lg px-3 py-1.5 gap-2 border border-white/10">
            <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent text-sm text-white placeholder-white/40 outline-none w-36"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}
