import Link from 'next/link'

const LINKS = [
  { label: 'Home',   href: '/' },
  { label: 'Career', href: '/career-compass' },
]

export default function CareerCompassNavbar() {
  return (
    <div className="bg-[#06111E] border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 lg:px-[50px]">
        <div className="flex items-center gap-6 py-2">
          <Link href="/career-compass" className="flex shrink-0 items-center gap-2.5">
            <span className="flex items-center justify-center rounded-lg font-bold text-white" style={{ width: 28, height: 28, background: '#0694D1', fontSize: 13 }}>K</span>
            <span className="text-[15px] whitespace-nowrap">
              <span className="font-bold text-white">Koenig</span>{' '}
              <span className="font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>AI Academy</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {LINKS.map(n => {
              const isActive = n.label === 'Home'
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    color:      isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    background: isActive ? '#0694D1' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {n.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
