'use client'

export default function DownloadPptButton() {
  return (
    <a
      href="https://www.koenig-solutions.com/assets/media/ppt/Koenig-Corp-Presentation.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center gap-2 font-bold text-white px-6 py-3 rounded-xl transition-all duration-300 mt-3 mb-0 overflow-hidden hover:-translate-y-0.5"
      style={{ background: 'linear-gradient(135deg, #0694D1, #076D9D)', boxShadow: '0 4px 20px rgba(6,148,209,0.45)' }}
    >
      {/* shimmer sweep — always animating */}
      <span
        className="pointer-events-none absolute inset-0 animate-shimmer-slide"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
      />

      {/* ping ring */}
      <span className="relative flex h-4 w-4 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30" />
        <span className="relative inline-flex items-center justify-center w-4 h-4">
          <svg
            width="15" height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-slow"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </span>
      </span>

      Download Presentation
    </a>
  )
}
