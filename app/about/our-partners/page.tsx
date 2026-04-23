'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AboutSubNav from '@/components/AboutSubNav'

const BASE = 'https://rms.koenig-solutions.com/Sync_Data/Forms/CRM/Files/Freelancer/'

const PARTNERS = [
  { name: 'Microsoft',                    img: 'microsoft-cloud-t.png',                                    tier: 'Gold Partner',        courses: '380+', verify: BASE + 'MicrosoftSolutionspartnerletterMay15th2025.pdf' },
  { name: 'Cisco',                        img: 'Cisco.png',                                                tier: 'Premier Partner',     courses: '210+', verify: BASE + 'CiscoLearningpartnervalidtill28thJul2026.pdf' },
  { name: 'AWS',                          img: 'amazon-authorized.png',                                    tier: 'Training Partner',    courses: '290+', verify: BASE + '2023828349KoenigSolutionsPrivateLimitedAPNConfirmationLetterAWSmerged.pdf' },
  { name: 'VMware',                       img: 'VMware-Broadcom.png',                                      tier: 'Principal Partner',   courses: '120+', verify: BASE + 'VCFEDPConfirmationletter2025.pdf' },
  { name: 'Oracle',                       img: 'o-prtnr-clr-rgb (1).png',                                  tier: 'Gold Partner',        courses: '160+', verify: BASE + 'OraclePartnerCertificatetill9thFeb2027.pdf' },
  { name: 'PECB',                         img: 'Authorized PECB Certification Courses Training badge.png', tier: 'Titanium Partner',    courses: '80+',  verify: BASE + 'PECBTitaniumPartnercertificatetill31stdec2026.pdf' },
  { name: 'PeopleCert',                   img: 'PeopleCert.png',                                           tier: 'ATO Partner',         courses: '90+',  verify: BASE + 'PeoplecertATOcertificate2026ITIL5ITIL4PRINCE2DEVOPSIASSC.pdf' },
  { name: 'SAP',                          img: 'SAP.jpg',                                                  tier: 'Gold Partner',        courses: '140+', verify: BASE + 'SAPAEPletterMay2025.pdf' },
  { name: 'ISACA',                        img: null,                                                        tier: 'Elite Partner',       courses: '60+',  verify: BASE + 'ISACAElitecertificate2026.pdf' },
  { name: 'CompTIA',                      img: 'comptia.png',                                              tier: 'Platinum Partner',    courses: '180+', verify: BASE + 'CompTIAPartnerletter2026.pdf' },
  { name: 'ISC2',                         img: 'OTP-Preferred-Badge.png',                                  tier: 'Official Partner',    courses: '50+',  verify: BASE + 'KoenigPartnerPreferredCertificatetillDec2026.pdf' },
  { name: 'PMI',                          img: 'PMI1115-ATP-Badge-2024-rgb.png',                           tier: 'Premier Partner',     courses: '140+', verify: BASE + 'PMICertificationofMembershiptillApril2027.pdf' },
  { name: 'EC-Council',                   img: 'EC-Council-logo.png',                                      tier: 'ATC Partner',         courses: '120+', verify: BASE + 'ATCCertificate.pdf' },
  { name: 'Red Hat',                      img: 'Redvendorlogo.png',                                        tier: 'Advanced Partner',    courses: '110+', verify: BASE + 'RedHatTraininglocationsandfacilities.pdf' },
  { name: 'The Open Group',               img: 'Vendor-OG-logo.png',                                       tier: 'Authorized Partner',  courses: '45+',  verify: BASE + 'KoenigtogafEAFoundatccertmerged.pdf' },
  { name: 'ISTQB',                        img: 'ISTQB.png',                                                tier: 'Authorized Partner',  courses: '40+',  verify: BASE + 'KoenigCTFLVer.4.016May202530June2026.pdf' },
  { name: 'Check Point',                  img: 'Checkpoint ATC 2026 PLATINUM Badge.png',                   tier: 'Platinum Partner',    courses: '55+',  verify: BASE + 'CheckpointATCCertificate2026.pdf' },
  { name: 'Python Institute',             img: 'Python-logo.png',                                          tier: 'Authorized Partner',  courses: '35+',  verify: BASE + 'OpenEDGEducationpartnerCertificatetillApril2027.pdf' },
  { name: 'Omnissa',                      img: 'Omnissa.png',                                              tier: 'Partner',             courses: '30+',  verify: null },
  { name: 'Broadcom',                     img: 'Broadcom.png',                                             tier: 'Partner',             courses: '70+',  verify: BASE + 'BroadcomEducationDeliveryCertificateKoenigSolutions.pdf' },
  { name: 'Linux Foundation',             img: 'Linux-Foundation.png',                                     tier: 'Training Partner',    courses: '60+',  verify: BASE + 'Linuxfoundationletterofauthorizationtill16thJul2026.pdf' },
  { name: 'Autodesk',                     img: 'AutodeskCertification.png',                                tier: 'Authorized Partner',  courses: '45+',  verify: BASE + 'AutodeskATCSiteauthorizationvalidtill1stfeb2027.pdf' },
  { name: 'DevOps Institute',             img: 'Linux-Foundation.png',                                     tier: 'Authorized Partner',  courses: '30+',  verify: BASE + '2025320429PeopleCertDevOpsvalidtillApril2026.pdf' },
  { name: 'IIBA',                         img: null,                                                        tier: 'Authorized Partner',  courses: '20+',  verify: BASE + 'IIBA.pdf' },
  { name: 'JS Institute',                 img: null,                                                        tier: 'Authorized Partner',  courses: '15+',  verify: BASE + 'OpenEDGEducationpartnerCertificatetillApril2027.pdf' },
  { name: 'ServiceNow',                   img: 'ServiceNow.png',                                           tier: 'Training Partner',    courses: '40+',  verify: BASE + 'KoenigSolutionsATDstatusconfirmation270624.pdf' },
  { name: 'BCS',                          img: 'BCS partner logo (1).png',                                 tier: 'ATO Partner',         courses: '35+',  verify: BASE + 'BCSATPCertificatevalidtillSept2026.pdf' },
  { name: 'CertNexus',                    img: 'cnxatpweb-small.png',                                      tier: 'Authorized Partner',  courses: '30+',  verify: BASE + 'CertNexuscertificate2023.pdf' },
  { name: 'Android ATC',                  img: 'Android ATC Authorized Training Center.jpg',               tier: 'Authorized Partner',  courses: '30+',  verify: BASE + 'AndroidATCKoenigSolutionsCertificatevalidtill13thOct2026.pdf' },
  { name: 'TÜV SÜD',                     img: 'Web-TS_Cobranding_Cooperation_partner_RGB_TS_Blue.png',    tier: 'Authorized Partner',  courses: '35+',  verify: BASE + 'KoeningSolutionsConditionalCertificateREP16092025.pdf' },
  { name: 'AI CERTs',                     img: 'AICerts (1).png',                                          tier: 'Authorized Partner',  courses: '30+',  verify: BASE + 'CertificationAI33948AiCertATP3April2026.pdf' },
  { name: 'GSDC',                         img: 'ATP badge.png',                                            tier: 'Authorized Partner',  courses: '20+',  verify: BASE + 'ATPCertificateKoenigSolutions.pdf' },
  { name: 'Dell EMC',                     img: 'emc.png',                                                  tier: 'Training Partner',    courses: '50+',  verify: BASE + 'DELLEMC2023824391DTLetterhead2020KonMRSigned1.pdf' },
  { name: 'SCRUMstudy',                   img: 'scrumstudy.png',                                           tier: 'Authorized Partner',  courses: '25+',  verify: BASE + 'SCRUMStudymerged.pdf' },
  { name: 'CWNP',                         img: 'alc-standard-Basic-Logo.jpg',                              tier: 'Authorized Partner',  courses: '25+',  verify: BASE + 'CWNPALCCertificateKoenigvalidtill30thJun2026.pdf' },
  { name: 'SUSE',                         img: 'suse.jpg',                                                 tier: 'Training Partner',    courses: '20+',  verify: BASE + 'SUSEEmeraldcertificate2026.pdf' },
  { name: 'EXIN',                         img: 'EXIN.png',                                                 tier: 'Authorized Partner',  courses: '40+',  verify: BASE + 'CertificateAEOAccreditationEXINProofofAccreditationAEOLightCertificatev2.1.pdf' },
  { name: 'Arcitura',                     img: null,                                                        tier: 'Authorized Partner',  courses: '15+',  verify: BASE + '57881KoenigSolutionsPvtLtdAuthorizedTrainingPartnerCertificate20262027.pdf' },
  { name: 'Cloud Security Alliance',      img: 'cloud-security-alliance.png',                              tier: 'Authorized Partner',  courses: '25+',  verify: BASE + 'CSA2020520816LetterofauthorizationonappointmentbyCSAKoenigSolutions.pdf' },
  { name: 'Mirantis',                     img: null,                                                        tier: 'Training Partner',    courses: '15+',  verify: BASE + 'MirantisATPlettertillDec2027.pdf' },
  { name: 'Cloudera',                     img: 'cloudera (1).png',                                         tier: 'Training Partner',    courses: '30+',  verify: BASE + 'FindaClouderapartner.pdf' },
  { name: 'OffSec Training',              img: 'OffSecLearningPartnerDarkPNG (1).png',                     tier: 'Learning Partner',    courses: '20+',  verify: BASE + 'OffSecFindaPartner.pdf' },
  { name: 'DevOps Agile Skills (DASA)',   img: null,                                                        tier: 'Authorized Partner',  courses: '15+',  verify: BASE + 'DASAATPcertificatevalidtill31stDec2026.pdf' },
  { name: 'Cloud Credential Council',     img: 'CCC_Logo.png',                                             tier: 'Authorized Partner',  courses: '20+',  verify: BASE + 'CCCTrainingPartnerCertificateissuedate30thDec2025.pdf' },
  { name: 'C++ Institute',               img: 'c-plus-2-logo.png',                                        tier: 'Authorized Partner',  courses: '10+',  verify: BASE + 'OpenEDGEducationpartnerCertificatetillApril2027.pdf' },
  { name: 'LPI',                          img: 'Linux.png',                                                tier: 'Authorized Partner',  courses: '15+',  verify: BASE + 'LPIPartnerCertKoenigSolutionsPvt.Ltdsince2025.pdf' },
  { name: 'Symantec',                     img: null,                                                        tier: 'Training Partner',    courses: '20+',  verify: null },
  { name: 'Global Assoc. for Quality Mgmt', img: null,                                                     tier: 'Authorized Partner',  courses: '10+',  verify: BASE + 'GAQMAuthorizedTrainingCentresinceJan2026.pdf' },
]

const WHY_POINTS = [
  {
    icon: '✅',
    title: 'Verified Curriculum',
    desc: 'Vendor-authorized training means our courseware is reviewed and approved by the technology vendors themselves — you learn the real thing, not a third-party interpretation.',
  },
  {
    icon: '🎓',
    title: 'Certified Instructors',
    desc: 'Our trainers hold active certifications in the subjects they teach. Vendor authorization requires ongoing trainer assessment, so you always get a current, qualified expert.',
  },
  {
    icon: '🏅',
    title: 'Recognized Credentials',
    desc: 'Completing an authorized course carries weight with employers. The certifications earned through vendor-authorized training are the gold standard across the industry.',
  },
]

export default function OurPartnersPage() {
  return (
    <div style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}>
      <Navbar />
      <AboutSubNav />

      {/* DARK HERO */}
      <section className="relative bg-[#06111E] overflow-hidden py-[50px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0694D1] opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <div className="kglass-banner py-10 px-8 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                  Our <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Partners</span>
                </h1>
                <p className="text-xl text-white/80 mb-4 leading-relaxed">
                  Koenig is an authorized training partner of the world's leading technology vendors. This isn't a badge we buy — it's an authorization we earn through rigorous assessment, certified instructors, and verified delivery.
                </p>
                <p className="text-lg text-white/60 leading-relaxed">
                  When you train with Koenig, you train with the source — the same curricula, the same standards, the same recognition that the vendor itself demands.
                </p>
              </div>
              <div className="kglass-dark rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/z_6FnQE7-LA"
                    title="Koenig Solutions — Your Trusted IT Training Partner"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHT SECTION – Partner cards */}
      <section className="bg-white py-[50px]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 text-center">
            Authorized by the World's <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Best</span>
          </h2>
          <p className="text-center text-[#475569] mb-12">{PARTNERS.length}+ vendor authorizations across cloud, security, networking, and beyond</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {PARTNERS.map(p => (
              <div
                key={p.name}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ border: '1px solid #CAEFFF', boxShadow: '0 2px 12px rgba(0,164,239,0.08)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(6,148,209,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = '#0694D1' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,164,239,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#CAEFFF' }}
              >
                {/* Top accent line */}
                <div className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, #0694D1, #38bdf8)' }} />

                {/* Logo area */}
                <div className="flex h-[88px] w-full items-center justify-center bg-white px-4 py-3">
                  {p.img ? (
                    <img
                      src={`/images/partners/${encodeURIComponent(p.img)}`}
                      alt={p.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ maxHeight: '72px' }}
                    />
                  ) : (
                    <span className="text-2xl font-black" style={{ color: '#076D9D' }}>
                      {p.name.slice(0, 2)}
                    </span>
                  )}
                </div>

                {/* Name + courses */}
                <div className="flex flex-col items-center gap-1 border-t border-[#EEF6FF] bg-[#F8FBFF] px-3 pt-2.5 pb-2">
                  <p className="truncate w-full text-center text-[11px] font-bold text-[#0b2545]">{p.name}</p>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold"
                    style={{ background: 'rgba(6,148,209,0.08)', color: '#0694D1' }}>
                    {p.courses} Courses
                  </span>
                </div>

                {/* Verify button */}
                <div className="px-3 pb-3 pt-1.5 bg-[#F8FBFF]">
                  {p.verify ? (
                    <a
                      href={p.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full rounded-lg border text-[10px] font-semibold py-1.5 text-center transition-all duration-200"
                      style={{ borderColor: '#0694D1', color: '#0694D1' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#0694D1,#38bdf8)'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#0694D1'; (e.currentTarget as HTMLElement).style.borderColor = '#0694D1' }}
                    >
                      Verify Authorisation
                    </a>
                  ) : (
                    <span className="block w-full rounded-lg border text-[10px] font-semibold py-1.5 text-center opacity-30 cursor-not-allowed"
                      style={{ borderColor: '#0694D1', color: '#0694D1' }}>
                      Verify Authorisation
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show more vendors */}
          <div className="mt-10 text-center">
            <p className="text-[#64748B] text-sm">
              Showing all <span className="font-semibold text-[#0694D1]">{PARTNERS.length}</span> authorized vendor partners ·{' '}
              <a href="mailto:sales@koenig-solutions.com" className="text-[#0694D1] font-semibold hover:underline">
                Don't see your vendor? Contact us →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* DARK SECTION – Why authorization matters */}
      <section className="relative bg-[#06111E] py-[50px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0694D1] opacity-[0.05] blur-[120px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-[50px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Why Authorization <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0694D1, #38bdf8)' }}>Matters</span></h2>
          <p className="text-center text-white/60 mb-12">The difference between authorized and unauthorized training is significant</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {WHY_POINTS.map(w => (
              <div key={w.title} className="kglass-dark rounded-2xl p-7 transition-all">
                <div className="text-3xl mb-4">{w.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{w.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="mailto:sales@koenig-solutions.com"
              className="inline-block bg-[#0694D1] hover:bg-[#0580bb] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              Enquire About a Course
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
