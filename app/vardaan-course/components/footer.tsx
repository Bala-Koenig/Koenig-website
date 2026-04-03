export function Footer() {
  return (
    <footer className="bg-koenig-navy px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 text-xl font-bold">KOENIG</div>
            <p className="text-sm leading-relaxed text-white/60">
              Global IT training leader since 1993. Delivering 5,000+ courses
              across 13+ countries with 50+ technology vendor partnerships.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              Popular Vendors
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Microsoft</li>
              <li>AWS</li>
              <li>Cisco</li>
              <li>VMware</li>
              <li>Oracle</li>
              <li>CompTIA</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>About Koenig</li>
              <li>Locations</li>
              <li>Corporate Training</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Learning Options</li>
              <li>Schedule & Fees</li>
              <li>Refund Policy</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/40">
                info@koenig-solutions.com
              </p>
              <p className="text-xs text-white/40">
                +91-984-072-2417
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
          &copy; 2026 Koenig Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
