import Link from 'next/link'

const vendors = ['Microsoft', 'AWS', 'Cisco', 'VMware', 'Oracle', 'CompTIA']
const company = ['About Koenig', 'Locations', 'Corporate Training', 'Blog', 'Careers', 'Contact Us']
const support = ['Learning Options', 'Schedule & Fees', 'Refund Policy', 'Privacy Policy', 'Terms of Service']

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="font-black text-xl text-white">KOENIG</span>
              <span className="text-[10px] text-blue-400 font-semibold tracking-widest uppercase">step forward</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Global IT training leader since 1993. Delivering 5,000+ courses across 13+ countries with 50+ technology vendor partnerships.
            </p>
          </div>

          {/* Popular Vendors */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Popular Vendors</h4>
            <ul className="space-y-3">
              {vendors.map(v => (
                <li key={v}>
                  <Link href="#" className="text-white/50 text-sm hover:text-white transition-colors">{v}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Company</h4>
            <ul className="space-y-3">
              {company.map(v => (
                <li key={v}>
                  <Link href="#" className="text-white/50 text-sm hover:text-white transition-colors">{v}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Support</h4>
            <ul className="space-y-3 mb-6">
              {support.map(v => (
                <li key={v}>
                  <Link href="#" className="text-white/50 text-sm hover:text-white transition-colors">{v}</Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-white/40 text-xs">info@koenig-solutions.com</p>
              <p className="text-white/40 text-xs mt-1">+91-984-072-2417</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-white/30 text-sm">© 2026 Koenig Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
