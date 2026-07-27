'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ShieldCheck, Lock, Scale, CreditCard, Globe2, Wallet } from 'lucide-react'
import Navbar from '@/components/Navbar'
import SiteFooter from '@/components/SiteFooter'

type Tab = 'tos' | 'payment'

const HERO_CONTENT = {
  tos: {
    heading: 'Terms of Service',
    intro: 'By enrolling in a course, using our website, or engaging in our services, you acknowledge that you have read, understood, and agreed to the following Terms and Conditions.',
    highlights: [
      { Icon: ShieldCheck, title: '100% Refund Policy', desc: 'Claimable if feedback is shared before the course end date' },
      { Icon: Lock, title: 'Data Privacy Protected', desc: 'Your information is handled with care and security' },
      { Icon: Scale, title: 'Governed by Indian Law', desc: 'Disputes fall under New Delhi jurisdiction' },
    ],
  },
  payment: {
    heading: 'Payment Methods',
    intro: 'Explore the payment options available for enrolling in a course, using our website, or engaging in our services — including purchase orders, credit cards, bank wire transfers, and training credits.',
    highlights: [
      { Icon: CreditCard, title: 'Multiple Payment Options', desc: 'Purchase Order, Credit Card, and Bank Wire Transfer' },
      { Icon: Globe2, title: '13 Countries Supported', desc: 'Bank wire transfer details for major regions worldwide' },
      { Icon: Wallet, title: 'Koenig Learning Credits', desc: 'Flexible KLC bookings with monthly balance statements' },
    ],
  },
}

const FLAG_SVGS: Record<string, React.ReactNode> = {
  in: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#fff" />
      <rect width="24" height="5.33" fill="#FF9933" />
      <rect y="10.67" width="24" height="5.33" fill="#138808" />
      <circle cx="12" cy="8" r="1.8" fill="none" stroke="#000080" strokeWidth="0.4" />
    </svg>
  ),
  ae: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="5.33" fill="#00732F" />
      <rect y="5.33" width="24" height="5.33" fill="#fff" />
      <rect y="10.67" width="24" height="5.33" fill="#000" />
      <rect width="6" height="16" fill="#FF0000" />
    </svg>
  ),
  sa: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#006C35" />
      <rect y="11.5" width="24" height="1.4" fill="#fff" />
    </svg>
  ),
  za: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#fff" />
      <polygon points="0,0 24,0 24,5.5 9,8 24,10.5 24,16 0,16" fill="#DE3831" />
      <polygon points="0,0 24,0 24,3.2 12,8 24,12.8 24,16 0,16" fill="#002395" />
      <polygon points="0,0 12,8 0,16" fill="#000" />
      <polygon points="0,3 9,8 0,13" fill="#FFB612" />
      <polygon points="0,5 6,8 0,11" fill="#007A4D" />
    </svg>
  ),
  gb: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#00247D" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#CF142B" strokeWidth="1.2" />
      <path d="M12,0 V16 M0,8 H24" stroke="#fff" strokeWidth="5.4" />
      <path d="M12,0 V16 M0,8 H24" stroke="#CF142B" strokeWidth="2.6" />
    </svg>
  ),
  nl: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="5.33" fill="#AE1C28" />
      <rect y="5.33" width="24" height="5.33" fill="#fff" />
      <rect y="10.67" width="24" height="5.33" fill="#21468B" />
    </svg>
  ),
  de: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="5.33" fill="#000" />
      <rect y="5.33" width="24" height="5.33" fill="#DD0000" />
      <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
    </svg>
  ),
  us: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#B22234" />
      {[1,3,5,7,9,11].map(i => (
        <rect key={i} y={i * (16/13)} width="24" height={16/13} fill="#fff" />
      ))}
      <rect width="9.6" height="8.62" fill="#3C3B6E" />
    </svg>
  ),
  ca: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#fff" />
      <rect width="6" height="16" fill="#FF0000" />
      <rect x="18" width="6" height="16" fill="#FF0000" />
      <polygon points="12,4 13,7 16,6 14.5,9 17,10.5 14,11 14.5,13.5 12,12 9.5,13.5 10,11 7,10.5 9.5,9 8,6 11,7" fill="#FF0000" />
    </svg>
  ),
  au: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#00247D" />
      <g transform="scale(0.5)" strokeWidth="1">
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#CF142B" strokeWidth="1.2" />
        <path d="M12,0 V16 M0,8 H24" stroke="#fff" strokeWidth="5.4" />
        <path d="M12,0 V16 M0,8 H24" stroke="#CF142B" strokeWidth="2.6" />
      </g>
      <g fill="#fff">
        <circle cx="17" cy="4" r="0.9" />
        <circle cx="20" cy="8" r="0.9" />
        <circle cx="19" cy="12" r="0.9" />
        <circle cx="15" cy="10" r="0.6" />
        <circle cx="6" cy="12" r="0.7" />
      </g>
    </svg>
  ),
  nz: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#00247D" />
      <g transform="scale(0.5)" strokeWidth="1">
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#CF142B" strokeWidth="1.2" />
        <path d="M12,0 V16 M0,8 H24" stroke="#fff" strokeWidth="5.4" />
        <path d="M12,0 V16 M0,8 H24" stroke="#CF142B" strokeWidth="2.6" />
      </g>
      <g fill="#CF142B" stroke="#fff" strokeWidth="0.3">
        <circle cx="18" cy="3.5" r="1" />
        <circle cx="20.5" cy="7" r="1.2" />
        <circle cx="18.5" cy="11" r="1" />
        <circle cx="15.5" cy="9" r="0.8" />
      </g>
    </svg>
  ),
  sg: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="8" fill="#EF3340" />
      <rect y="8" width="24" height="8" fill="#fff" />
      <circle cx="6" cy="5" r="3" fill="#fff" />
      <circle cx="7.2" cy="5" r="2.6" fill="#EF3340" />
      <g fill="#fff">
        <circle cx="9" cy="2.3" r="0.5" />
        <circle cx="10.5" cy="3.6" r="0.5" />
        <circle cx="10.5" cy="5.6" r="0.5" />
        <circle cx="9" cy="7" r="0.5" />
        <circle cx="7.4" cy="5" r="0.5" />
      </g>
    </svg>
  ),
  my: (
    <svg viewBox="0 0 24 16" width="100%" height="100%">
      <rect width="24" height="16" fill="#fff" />
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} y={i * 16/7} width="24" height={16/14} fill="#CC0001" />
      ))}
      <rect width="10" height="8.9" fill="#010066" />
      <circle cx="4.2" cy="4.4" r="2.6" fill="#FFCC00" />
      <circle cx="5.2" cy="4.4" r="2.2" fill="#010066" />
      <polygon points="7.5,4.4 8.3,4.7 8.5,3.6 9.2,4.4 8.5,5.2 8.3,4.1" fill="#FFCC00" />
    </svg>
  ),
}

function FlagIcon({ code }: { code: string }) {
  return (
    <span className="inline-block w-9 h-6 rounded-sm overflow-hidden shrink-0" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
      {FLAG_SVGS[code]}
    </span>
  )
}

const REFUND_POINTS = [
  'In case a student is not satisfied with the training, the student can claim 100% refund, given they have provided feedback on or before the last date of the course.',
  'Koenig is not responsible for consequential losses.',
  'Refunds are claimable for up to one year of payment.',
]

const TRAINING_SECTIONS = [
  {
    title: '1-on-1 Training',
    points: [
      'Though the training schedule is as per the customer, Koenig may request merger of other students who want the same schedule. Customers will be informed prior to any such inclusion.',
    ],
  },
  {
    title: 'Classroom Training',
    points: [
      'Koenig is not responsible for an accident or injury. Participants are advised to have the necessary insurance in place.',
      'Koenig follows a Bring Your Own Laptop policy.',
      'Koenig is entitled to claim a cancellation fee of 50% of the total purchase amount if the training is cancelled or rescheduled 10 or fewer days before the start of the training.',
      'The same training cannot be re-scheduled more than once.',
    ],
  },
  {
    title: 'Class Recordings',
    points: [
      'Most classes are recorded for students and for commercial use as Flexi (as per OEM guidelines of classroom recordings).',
      'Participants can opt out of class recordings by making a written request in advance.',
      'We use read.ai in all Teams Meetings for appropriate actions on the discussion to enhance quality and customer experience. If you wish to opt out of it for any reason inform your Customer Success Manager.',
    ],
  },
]

const LEGAL_SECTIONS = [
  {
    title: 'Website Use and Disclaimer',
    points: [
      "The content on Koenig's website is provided for general informational purposes.",
      'While Koenig endeavors to keep information accurate and up to date, completeness, reliability, or timeliness cannot be guaranteed.',
      "The use of any information or materials from this site is entirely at the user's discretion and risk.",
      'Koenig shall not be liable for any damages arising from reliance on website content or from the use or inability to use the site.',
    ],
  },
  {
    title: 'Accuracy of Information',
    points: [
      'Koenig endeavors to ensure all published materials, including course details and pricing, are accurate at the time of publication.',
      'However, inadvertent errors or typographical inaccuracies may occur.',
      'Koenig reserves the right to correct or update information at any time without prior notice.',
    ],
  },
  {
    title: 'Intellectual Property',
    points: [
      "All course materials, website content, videos, and resources remain the intellectual property of Koenig Solutions or its licensors.",
      'Materials are provided solely for personal educational purposes and must not be copied, reproduced, or distributed without written permission.',
      'Koenig takes relevant measures to protect its intellectual property and that of its partners.',
    ],
  },
  {
    title: 'Third-Party Links and Relationships',
    points: [
      "Koenig's website may include links to third-party websites or resources.",
      'While we collaborate with reputable partners, Koenig cannot control or guarantee the content, accuracy, or privacy practices of third-party sites.',
      'Users are encouraged to review the policies of such third parties before using their services.',
    ],
  },
  {
    title: 'Website Availability and Security',
    points: [
      'Koenig endeavors to maintain continuous and secure access to its website and services.',
      'However, uninterrupted or error-free operation cannot be guaranteed, and Koenig shall not be held liable for any downtime, service interruption, or unauthorized access.',
      'Users acknowledge that data transmission over the internet carries inherent risks and agree to use the website responsibly.',
    ],
  },
  {
    title: 'Privacy and Data Protection',
    points: [
      'Koenig values your privacy and handles personal information with care and responsibility.',
      'Personal data collected through registrations or communications is used solely for administrative, certification, and service-related purposes.',
      'Koenig endeavors to comply with applicable data protection laws and industry best practices.',
      'Information may be shared with trusted partners or service providers only to the extent necessary to deliver agreed services.',
      { text: 'For detailed information, please refer to our ', link: { label: 'Privacy Policy.', href: '#' } },
    ],
  },
  {
    title: 'Storage and Security of Personal Information',
    points: [
      'Koenig employs reasonable technical and organizational measures to safeguard personal data against misuse, loss, or unauthorized access.',
      'When data is no longer required, it is securely destroyed or permanently anonymized.',
      'While Koenig takes every precaution, users acknowledge that absolute security of information transmitted online cannot be guaranteed.',
    ],
  },
  {
    title: 'Severability',
    points: [
      'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue to be fully valid and enforceable permitted by law.',
    ],
  },
  {
    title: 'Limitation of Liability',
    points: [
      'Koenig takes all reasonable steps to provide quality training and a safe learning environment.',
      'However, Koenig shall not be liable for indirect, incidental, or consequential damages resulting from participation in any course or use of its services.',
      'For classroom programs, participants attend at their own risk and are advised to have appropriate insurance coverage.',
      "To the extent permitted by law, Koenig's total liability shall not exceed the total amount paid for the specific course concerned.",
    ],
  },
  {
    title: 'Force Majeure',
    points: [
      'Koenig shall not be held responsible for delays or failures caused by circumstances beyond its reasonable control, such as natural disasters, strikes, network outages, or government restrictions.',
      'Reasonable efforts will be made to resume normal operations as soon as practicable.',
    ],
  },
  {
    title: 'Governing Law and Jurisdiction',
    points: [
      'These Terms are governed by the laws of India.',
      'Any disputes shall fall under the exclusive jurisdiction of the courts of New Delhi, India.',
    ],
  },
  {
    title: 'Updates to Terms',
    points: [
      'Koenig may revise or update these Terms periodically to reflect operational, legal, or technological changes.',
      'Updated versions will be published on this page with the date of revision.',
      "Continued use of Koenig's services after updates constitutes acceptance of the revised Terms.",
    ],
  },
]

const BANK_ACCOUNTS = [
  {
    country: 'For India Remittance',
    flag: 'in',
    lines: [
      { label: 'Bank Name', value: 'Kotak Mahindra Bank Ltd' },
      { label: 'Account Name', value: 'Koenig Solutions Private Limited' },
      { label: 'Branch Address', value: 'Plot No. 1/11, East Patel Nagar, New Delhi-110008' },
      { label: 'A/C #', value: '0211560317' },
      { label: 'IFSC Code', value: 'KKBK0000220' },
      { label: 'Swift Code', value: 'KKBKINBB' },
    ],
  },
  {
    country: 'For UAE Remittance',
    flag: 'ae',
    lines: [
      { label: 'Bank Name', value: 'Emirates NBD Bank' },
      { label: 'Account Name', value: 'Koenig Solutions DMCC' },
      { label: 'Branch Address', value: 'Mazaya Business Avenue BB1, 1st Floor Office no #107 & 108 Plot No. 847 AL Thanyah Fifth JLT, Dubai - U.A.E.' },
      { label: 'A/C #', value: '1025830265802 (AED)' },
      { label: 'Swift Code', value: 'EBILAEADXXX' },
    ],
  },
  {
    country: 'For Saudi Arabia Remittance',
    flag: 'sa',
    lines: [
      { label: 'Bank Name', value: 'Riyad Bank' },
      { label: 'Account Name', value: 'Koenig Solutions Arabia Limited' },
      { label: 'Branch Address', value: 'Alnada, Riyadh' },
      { label: 'A/C #', value: '2500756969940' },
      { label: 'Swift Code', value: 'RIBLSARI' },
      { label: 'IBAN Code', value: 'SA8320000002500756969940' },
    ],
  },
  {
    country: 'For South Africa Remittance',
    flag: 'za',
    lines: [
      { label: 'Bank Name', value: 'First National Bank' },
      { label: 'Account Name', value: 'Koenig Solutions Pty Ltd' },
      { label: 'Branch Code', value: '250655' },
      { label: 'A/C #', value: '63112361653' },
      { label: 'Swift Code', value: 'FIRNZAJJ' },
    ],
  },
  {
    country: 'For United Kingdom Remittance',
    flag: 'gb',
    lines: [
      { label: 'Bank Name', value: 'ICICI Bank' },
      { label: 'Account Name', value: 'Koenig Solutions Limited' },
      { label: 'A/C #', value: '76305760' },
      { label: 'Swift Code', value: 'ICICGB2LXXX' },
      { label: 'IBAN Code', value: 'GB07ICIC30008176305760' },
    ],
  },
  {
    country: 'For Netherlands Remittance',
    flag: 'nl',
    lines: [
      { label: 'Bank Name', value: 'Transferwise.com, Netherlands' },
      { label: 'Account Name', value: 'Koenig Solutions' },
      { label: 'Branch Address', value: 'TransferWise Europe SA Avenue Louise 54, Room S52 Brussels 1050 Belgium' },
      { label: 'A/C #', value: '1946747' },
      { label: 'Swift Code', value: 'TRWIBEB1XXX' },
      { label: 'IBAN Code', value: 'BE28967194674720' },
    ],
  },
  {
    country: 'For Germany Remittance',
    flag: 'de',
    lines: [
      { label: 'Bank Name', value: 'ICICI Bank UK PLC, Germany Branch' },
      { label: 'Account Name', value: 'Koenig IT Training GmbH' },
      { label: 'Branch Address', value: 'Frankfurter Strasse 27, D - 65760 Eschborn, Germany' },
      { label: 'A/C #', value: '0000526498' },
      { label: 'Swift Code', value: 'ICICDEFFXXX' },
      { label: 'IBAN Code', value: 'DE53501201000000526498' },
    ],
  },
  {
    country: 'For USA Remittance',
    flag: 'us',
    lines: [
      { label: 'Bank Name', value: 'Citi Bank' },
      { label: 'Account Name', value: 'Koenig Solutions Limited' },
      { label: 'Branch Address', value: '395 W EL Camino Real, Sunnyvale, CA 94087' },
      { label: 'A/C #', value: '205769565' },
      { label: 'Swift Code', value: 'CITIUS33' },
    ],
  },
  {
    country: 'For Canada Remittance',
    flag: 'ca',
    lines: [
      { label: 'Bank Name', value: 'ROYAL BANK OF CANADA' },
      { label: 'Account Name', value: 'Koenig Solutions Ltd.' },
      { label: 'Branch Address', value: 'NEW WEST MAIN BRANCH 626 6TH AVE.' },
      { label: 'A/C #', value: '1042365' },
    ],
  },
  {
    country: 'For Australia Remittance',
    flag: 'au',
    lines: [
      { label: 'Bank Name', value: 'National Australia Bank Limited' },
      { label: 'Account Name', value: 'Koenig Solutions Pty. Limited' },
      { label: 'Branch Address', value: 'Ground Level 22-28 King William St., Sydney, NSW 2000' },
      { label: 'A/C #', value: '871773690' },
      { label: 'BSB No', value: '085-005' },
    ],
  },
  {
    country: 'For New Zealand Remittance',
    flag: 'nz',
    lines: [
      { label: 'Bank Name', value: 'ANZ Bank New Zealand Limited' },
      { label: 'Account Name', value: 'Koenig Solutions PTE LTD' },
      { label: 'Branch Address', value: 'C/O MOORE MARKHAMS WELLINGTON LIMITED, LEVEL 11, 34/42 MANNERS STREET, WELLINGTON 6011' },
      { label: 'A/C #', value: '06-0773-0878608-00' },
      { label: 'Swift Code', value: 'ANZBNZ22' },
    ],
  },
  {
    country: 'For Singapore Remittance',
    flag: 'sg',
    lines: [
      { label: 'Bank Name', value: 'OCBC Bank' },
      { label: 'Account Name', value: 'Koenig Solutions Pvt Ltd' },
      { label: 'Branch Address', value: '65 Chulia Street OCBC Centre SINGAPORE 049513' },
      { label: 'A/C #', value: '689320620001' },
      { label: 'Swift Code', value: 'OCBCSGSG' },
    ],
  },
  {
    country: 'For Malaysia Remittance',
    flag: 'my',
    lines: [
      { label: 'Bank Name', value: 'AFFIN BANK' },
      { label: 'Account Name', value: 'KOENIG SOLUTIONS SDN. BHD' },
      { label: 'Branch Address', value: '1ST FLOOR, NO 4 & 6, JLN TELAWI 3, BANGSAR, 59100 KUALA LUMPUR, WILAYAH PERSEKUTUAN KUALA LUMPUR' },
      { label: 'A/C #', value: '100400036804' },
      { label: 'Swift Code', value: 'PHBMMYKLXXX' },
    ],
  },
]

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#f6fbfe', border: '1px solid #d9edf7' }}>
      {children}
    </div>
  )
}

function SectionBlock({ title, points }: { title: string; points: (string | { text: string; link: { label: string; href: string } })[] }) {
  return (
    <div>
      <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: '#0694d1' }}>{title}</h3>
      <ul className="space-y-1.5">
        {points.map((point, i) => (
          <li key={i} className="text-[15px] leading-relaxed flex gap-2" style={{ color: '#33475b' }}>
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: '#7a8c96' }} />
            <span>
              {typeof point === 'string' ? point : (
                <>
                  {point.text}
                  <a href={point.link.href} className="hover:underline" style={{ color: '#0694d1' }}>{point.link.label}</a>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TermsOfServiceContent() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>(searchParams.get('tab') === 'payment' ? 'payment' : 'tos')

  return (
    <div>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px]" style={{ background: 'radial-gradient(ellipse at 50% 30%, #0D3F5A 0%, #071B2E 45%, #040C18 100%)' }}>
        <div className="mx-auto max-w-7xl py-[35px] min-h-[340px] sm:min-h-[300px] lg:min-h-[280px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-extrabold leading-tight text-[28px] sm:text-[35px]" style={{ color: '#fff' }}>
              {HERO_CONTENT[tab].heading}
            </h1>
            <p className="mt-3 font-semibold text-[15px] sm:text-base" style={{ color: '#fff' }}>
              Welcome to Koenig Solutions Pvt. Ltd.
            </p>
            <p className="mt-2 text-[15px] sm:text-base max-w-2xl min-h-[76.5px] sm:min-h-[81.6px] line-clamp-3" style={{ color: '#9fc3d8', lineHeight: 1.7 }}>
              {HERO_CONTENT[tab].intro}
            </p>
          </div>
          <div className="mx-auto lg:ml-auto lg:mr-0 w-full max-w-md rounded-2xl p-6 sm:p-8 space-y-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}>
            {HERO_CONTENT[tab].highlights.map(stat => (
              <div key={stat.title} className="flex items-start gap-4">
                <stat.Icon className="w-6 h-6 shrink-0" style={{ color: '#5fb8e0' }} aria-hidden="true" />
                <div>
                  <p className="font-bold text-[15px] sm:text-base min-h-[20px] sm:min-h-[24px] line-clamp-1" style={{ color: '#fff' }}>{stat.title}</p>
                  <p className="text-[15px] leading-snug min-h-[41px] line-clamp-2" style={{ color: '#9fc3d8' }}>{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAB SWITCHER ──────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px] bg-white">
        <div className="mx-auto max-w-7xl py-8 flex justify-center">
          <div className="inline-flex items-center rounded-xl p-1.5 gap-1" style={{ border: '1px solid #dbeefa', background: '#f0f9ff' }}>
            <button
              onClick={() => setTab('tos')}
              className="rounded-lg px-6 py-2.5 text-[15px] font-bold transition-colors"
              style={tab === 'tos'
                ? { background: 'linear-gradient(135deg, #0694d1, #076d9d)', color: '#fff', boxShadow: '0 4px 12px rgba(6,148,209,0.35)' }
                : { color: '#33475b', background: 'transparent' }}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setTab('payment')}
              className="rounded-lg px-6 py-2.5 text-[15px] font-bold transition-colors"
              style={tab === 'payment'
                ? { background: 'linear-gradient(135deg, #0694d1, #076d9d)', color: '#fff', boxShadow: '0 4px 12px rgba(6,148,209,0.35)' }
                : { color: '#33475b', background: 'transparent' }}
            >
              Payment Methods
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────── */}
      <section className="px-4 lg:px-[50px] bg-white">
        <div className="mx-auto max-w-7xl pb-[35px] space-y-6">

          {tab === 'tos' && (
            <>
              <Card>
                <h3 className="font-bold text-base sm:text-lg mb-3" style={{ color: '#0694d1' }}>Refund Policy</h3>
                <ul className="space-y-2 mb-3">
                  {REFUND_POINTS.map((point, i) => (
                    <li key={i} className="text-[15px] leading-relaxed flex gap-2" style={{ color: '#33475b' }}>
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#0694d1' }} />
                      <span>{point}</span>
                    </li>
                  ))}
                  <li className="text-[15px] leading-relaxed flex gap-2" style={{ color: '#33475b' }}>
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#0694d1' }} />
                    <span>For learners who have taken PeopleCert training, in case of any dissatisfaction not resolved by Koenig Solutions, please refer to:</span>
                  </li>
                </ul>
                <a href="https://www.peoplecert.org/terms-of-service-and-privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[15px] hover:underline" style={{ color: '#0694d1' }}>
                  https://www.peoplecert.org/terms-of-service-and-privacy-policy
                </a>
              </Card>

              <Card>
                <div className="space-y-5">
                  {TRAINING_SECTIONS.map(sec => (
                    <SectionBlock key={sec.title} title={sec.title} points={sec.points} />
                  ))}
                </div>
              </Card>

              <Card>
                <div className="space-y-5">
                  {LEGAL_SECTIONS.map(sec => (
                    <SectionBlock key={sec.title} title={sec.title} points={sec.points} />
                  ))}
                </div>
              </Card>
            </>
          )}

          {tab === 'payment' && (
            <>
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 text-center">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: '#0694d1' }}>Purchase Order</h3>
                    <ul className="space-y-1">
                      <li className="text-[15px] leading-relaxed" style={{ color: '#33475b' }}>Koenig accepts Purchase Orders to book seats.</li>
                      <li className="text-[15px] leading-relaxed" style={{ color: '#33475b' }}>
                        Clients are requested to refer to the{' '}
                        <a href="/contact" className="hover:underline" style={{ color: '#0694d1' }}>Contact Us</a> page for guidance on addressing the PO.
                      </li>
                    </ul>
                  </div>
                  <div className="hidden md:block w-px" style={{ background: '#bfe3f5' }} />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: '#0694d1' }}>Credit Card</h3>
                    <ul className="space-y-1">
                      <li className="text-[15px] leading-relaxed" style={{ color: '#33475b' }}>
                        Payments can be made through Koenig&apos;s secure online payment gateway{' '}
                        <a href="https://rms.koenig-solutions.com/KoenigPaymentLink.aspx?currency=INR&Status=0" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#0694d1' }}>Pay Now</a>
                      </li>
                      <li className="text-[15px] leading-relaxed" style={{ color: '#33475b' }}>
                        Clients may also use available financing options (such as Buy-Now Pay-Later, where applicable).
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="font-bold text-base sm:text-lg mb-6 text-center" style={{ color: '#0694d1' }}>Bank Wire Transfer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BANK_ACCOUNTS.map(acc => (
                    <div
                      key={acc.country}
                      className={`relative rounded-xl p-4 text-center ${acc.country === 'For Malaysia Remittance' ? 'sm:col-span-2 sm:max-w-md sm:mx-auto' : ''}`}
                      style={{ background: '#fff', border: '1px solid #dbeefa' }}
                    >
                      <span className="absolute top-3 right-3" aria-hidden="true"><FlagIcon code={acc.flag} /></span>
                      <p className="font-bold text-[15px] mb-2 pr-6" style={{ color: '#0694d1' }}>{acc.country}</p>
                      <div className="mb-2 h-px" style={{ background: '#dbeefa' }} />
                      {acc.lines.map(line => (
                        <p key={line.label} className="text-[15px] leading-relaxed" style={{ color: '#33475b' }}>
                          <span className="font-semibold">{line.label}:</span> {line.value}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 text-center">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: '#0694d1' }}>Cisco CLC / Citrix CTP / VMware Training Credits</h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: '#33475b' }}>
                      Koenig accepts recognized vendor training credits such as Cisco CLC, Citrix CTP, and VMware credits as per vendor policies.
                    </p>
                  </div>
                  <div className="hidden md:block w-px" style={{ background: '#bfe3f5' }} />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: '#0694d1' }}>Koenig Learning Credits (KLC)</h3>
                    <ul className="space-y-1">
                      {[
                        'KLCs may be purchased through an upfront invoice (typically USD 50,000).',
                        'Upon purchase, clients receive a unique KLC number which can be quoted for all future course bookings.',
                        'Koenig maintains a record of all bookings made via KLC and issues monthly statements showing the current balance.',
                      ].map(point => (
                        <li key={point} className="text-[15px] leading-relaxed" style={{ color: '#33475b' }}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </>
          )}

        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default function TermsOfServicePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-koenig-blue/20 border-t-koenig-blue" />
      </div>
    }>
      <TermsOfServiceContent />
    </Suspense>
  )
}
