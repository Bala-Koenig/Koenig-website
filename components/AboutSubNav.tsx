'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Overview',            href: '/about' },
  { label: 'Our Story',           href: '/about/our-story' },
  { label: 'Leadership',          href: '/about/leadership' },
  { label: 'Our Clients',         href: '/about/our-clients' },
  { label: 'Our Partners',        href: '/about/our-partners' },
  { label: 'Awards',              href: '/about/awards' },
  { label: 'Happiness Guarantee', href: '/about/happiness-guarantee' },
  { label: 'Student Feedback',    href: '/about/student-feedback' },
  { label: 'Koenig Koshish',      href: '/about/koenig-koshish' },
]

export default function AboutSubNav() {
  const pathname = usePathname()

  return (
    <div className="bg-[#06111E] border-b border-white/10 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
        <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
          {LINKS.map(n => {
            const isActive = pathname === n.href
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
        </div>
      </div>
    </div>
  )
}
