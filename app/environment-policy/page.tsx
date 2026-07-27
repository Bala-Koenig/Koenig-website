import type { Metadata } from 'next'
import { Globe, TreePine, Sprout } from 'lucide-react'
import Navbar from '@/components/Navbar'
import SiteFooter from '@/components/SiteFooter'
import TreesPlantedChart from '@/components/TreesPlantedChart'

export const metadata: Metadata = {
  title: 'Environment Policy - Koenig Solutions',
  description: "Koenig is carbon neutral for travel of its staff and customers. We plant trees to offset the carbon footprint of flights, and our Permanent Work From Home policy saves an estimated hundred tonnes of carbon emission per month.",
}

const GALLERY_IMAGES = [
  'koenig-plantation.webp',
  'koenig-plantation2.webp',
  'koenig-plantation3.webp',
  'koenig-plantation4.webp',
  'koenig-plantation5.webp',
  'koenig-plantation6.webp',
]

export default function EnvironmentPolicyPage() {
  return (
    <div>
      <Navbar />

      {/* ── HERO + BANNER ────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px]" style={{ background: 'radial-gradient(ellipse at 50% 30%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)' }}>
        <div className="mx-auto max-w-7xl py-[35px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-extrabold leading-tight" style={{ fontSize: '35px', color: '#fff' }}>
                Environment Policy
              </h1>
              <p className="mt-3 text-sm sm:text-base" style={{ color: '#9fc3d8' }}>
                Our commitment to a greener planet, one flight offset and one tree at a time.
              </p>
            </div>
            <div className="mx-auto lg:ml-auto lg:mr-0 w-full max-w-md rounded-2xl p-6 sm:p-8 space-y-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}>
              {[
                { Icon: Globe, title: 'Carbon Neutral Travel', desc: 'for staff & customers' },
                { Icon: TreePine, title: '100+ Tonnes CO2/month', desc: 'saved via WFH policy' },
                { Icon: Sprout, title: 'Trees Planted', desc: 'in Koenig Forest, Haryana' },
              ].map(stat => (
                <div key={stat.title} className="flex items-start gap-4">
                  <stat.Icon className="w-6 h-6 shrink-0" style={{ color: '#5fb8e0' }} aria-hidden="true" />
                  <div>
                    <p className="font-bold text-sm sm:text-base" style={{ color: '#fff' }}>{stat.title}</p>
                    <p className="text-xs sm:text-sm" style={{ color: '#9fc3d8' }}>{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TREES PLANTED (gallery) ──────────────────────────────── */}
      <section className="px-4 lg:px-[50px] mb-[35px]" style={{ background: '#f0f9ff' }}>
        <div className="mx-auto max-w-7xl py-[35px]">
          <div className="text-center mb-10">
            <h2 className="font-extrabold text-[26px] sm:text-[36px] leading-tight mb-3" style={{ color: '#0d1b2a' }}>
              Trees Planted by <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Koenig</span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: '#5b7690' }}>
              Koenig Forest is situated in Haryana, India
            </p>
          </div>
          <div className="overflow-hidden">
            <div className="flex w-max gap-4 sm:gap-6 animate-scroll-x">
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${img}-${i}`}
                  src={`/images/environment-policy/${img}`}
                  alt="Koenig tree plantation"
                  className="h-40 sm:h-56 w-40 sm:w-56 shrink-0 rounded-2xl object-cover"
                  style={{ border: '1px solid #dbeefa' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── POLICY TEXT ──────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px] mb-[35px]" style={{ background: '#fff' }}>
        <div className="mx-auto max-w-6xl py-[35px]">
          <div className="rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-8 md:gap-10" style={{ background: '#f0f9ff', border: '1px solid #bfe3f5' }}>
            <h2 className="font-extrabold text-[26px] sm:text-[32px] leading-tight uppercase self-center" style={{ color: '#0694d1' }}>
              Koenig&apos;s Environment Policy
            </h2>
            <div className="hidden md:block w-px" style={{ background: '#bfe3f5' }} />
            <div className="self-center">
              <p className="text-sm sm:text-base mb-5" style={{ color: '#33475b', lineHeight: 1.8 }}>
                Koenig is sensitive to the dangers of Climate Change and wants to pro-actively help. As a first step, Koenig is carbon neutral for travel of its staff and customers. We plant trees to offset the carbon footprint of flights incurred by us. Certificates from a government approved agency are provided to all students who fly for a training at Koenig.
              </p>
              <p className="text-sm sm:text-base" style={{ color: '#33475b', lineHeight: 1.8 }}>
                Koenig&apos;s Permanent Work From Home policy is environment friendly. It is estimated that 10-15% of all green house emissions are related to Work From Office. As a result of the Work-From-Home policy Koenig is saving an estimated one hundred tonnes of carbon emission per month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TREES PLANTED (data) ─────────────────────────────────── */}
      <section className="px-4 lg:px-[50px]" style={{ background: '#f0f9ff' }}>
        <div className="mx-auto max-w-5xl py-[35px]">
          <div className="text-center mb-10">
            <h2 className="font-extrabold text-[26px] sm:text-[36px] leading-tight" style={{ color: '#0d1b2a' }}>
              Trees Planted by <span className="bg-gradient-to-r from-koenig-blue to-cyan-400 bg-clip-text text-transparent">Koenig</span>
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #dbeefa' }}>
            <TreesPlantedChart />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
