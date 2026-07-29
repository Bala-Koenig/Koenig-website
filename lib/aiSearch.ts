// aiSearch.ts
// Smart local search — no API key needed
// Shared multi-vendor knowledge base (Azure, Cisco, AWS, VMware, Security, PM, ...)
// used to power AI-style search panels (e.g. homepage hero search).

// ─── Natural-language query matching ──────────────────────
// Breaks a free-text query (e.g. "I want to learn azure") into meaningful keywords
// so matching doesn't require the whole sentence to appear verbatim.
const QUERY_STOPWORDS = new Set(['i', 'want', 'to', 'learn', 'the', 'a', 'an', 'for', 'in', 'on', 'and', 'with', 'of', 'my', 'is', 'are', 'me', 'about', 'looking', 'need', 'how', 'do', 'can', 'you', 'teach', 'get', 'into', 'course', 'courses', 'training'])

export function queryTokens(q: string): string[] {
  return q.toLowerCase().split(/[^a-z0-9+.#]+/).filter(w => w.length > 1 && !QUERY_STOPWORDS.has(w))
}

export function matchesText(haystack: string, query: string, tokens: string[]): boolean {
  if (!query.trim()) return true
  const h = haystack.toLowerCase()
  if (h.includes(query)) return true
  return tokens.some(t => h.includes(t))
}

// ─── Types ────────────────────────────────────────────────
export interface AISearchResult {
  answer: string        // 2-line answer to show in cf-ai-panel
  learnMore: string     // detailed explanation
  technology: string    // detected tech (Azure, Cisco, AWS etc.)
  examCodes: string[]   // course codes to highlight/filter
  keywords: string[]    // matched keywords
}

// ─── Course Knowledge Base ────────────────────────────────
// Extracted from both .md files — no API needed
const knowledgeBase = [

  // ── MICROSOFT / AZURE ──────────────────────────────────
  {
    keywords: ['azure', 'az-900', 'azure fundamentals', 'cloud basics', 'microsoft cloud'],
    technology: 'Azure',
    examCodes: ['AZ-900'],
    answer: 'Azure Fundamentals (AZ-900) is Microsoft\'s entry-level cloud certification. It covers core cloud concepts, Azure services, pricing and support.',
    learnMore: 'AZ-900 is a 3-day / 24-hour Fundamentals course. No prerequisites required. Ideal for beginners moving into cloud. Exam score: 700/1000. Cost: $165 USD. Koenig price: ₹33,000.'
  },
  {
    keywords: ['azure administrator', 'az-104', 'azure admin', 'virtual machines', 'azure vm', 'azure storage', 'azure networking'],
    technology: 'Azure',
    examCodes: ['AZ-104'],
    answer: 'Azure Administrator (AZ-104) teaches you to manage Azure subscriptions, storage, VMs, networking and identity. It\'s the most popular Azure Associate certification.',
    learnMore: 'AZ-104 Fast Track = 1 day / 8 hrs. Full course = 5 days / 40 hrs. Associate level. Prerequisite: AZ-900 recommended. 4,200+ enrolled. Rating: 4.9★. Koenig price: ₹33,000.'
  },
  {
    keywords: ['azure architect', 'az-305', 'solutions architect', 'azure infrastructure', 'azure design'],
    technology: 'Azure',
    examCodes: ['AZ-305'],
    answer: 'Azure Solutions Architect Expert (AZ-305) validates skills in designing cloud solutions on Azure. Requires AZ-104 as prerequisite.',
    learnMore: 'AZ-305 is Expert level — 5 days / 40 hrs. Prerequisite: AZ-104 (Associate). Covers identity, governance, data storage, business continuity, infrastructure. Koenig price: ₹33,000.'
  },
  {
    keywords: ['azure devops', 'az-400', 'devops engineer', 'ci/cd', 'pipelines', 'github actions'],
    technology: 'Azure',
    examCodes: ['AZ-400'],
    answer: 'Azure DevOps Engineer Expert (AZ-400) covers CI/CD pipelines, source control, testing and monitoring on Azure. Expert level certification.',
    learnMore: 'AZ-400 is Expert level — 5 days / 40 hrs. Requires AZ-104 or AZ-204 as prerequisite. Covers Azure Pipelines, GitHub Actions, artifact management and release strategies.'
  },
  {
    keywords: ['azure security', 'az-500', 'azure security engineer', 'cloud security', 'azure firewall', 'azure sentinel'],
    technology: 'Azure',
    examCodes: ['AZ-500'],
    answer: 'Azure Security Technologies (AZ-500) validates skills in implementing security controls, managing identity, and protecting cloud workloads on Azure.',
    learnMore: 'AZ-500 is Associate level — 4 days / 32 hrs. Covers Azure AD, Key Vault, Security Center, Defender, Sentinel and network security. Koenig is an authorized Microsoft training partner.'
  },

  // ── AI & COPILOT ───────────────────────────────────────
  {
    keywords: ['ai fundamentals', 'ai-900', 'artificial intelligence basics', 'machine learning basics', 'intro to ai'],
    technology: 'AI & Copilot',
    examCodes: ['AI-900'],
    answer: 'AI Fundamentals (AI-900) introduces core AI and ML concepts on Azure. No programming experience required. Ideal first step into AI certifications.',
    learnMore: 'AI-900 is Fundamentals level — 1 day / 8 hrs. Covers ML, computer vision, NLP and conversational AI on Azure. 3,500+ enrolled. Rating: 4.7★. Koenig price: ₹33,000.'
  },
  {
    keywords: ['azure ai engineer', 'ai-102', 'ai solutions', 'cognitive services', 'openai azure', 'chatgpt azure'],
    technology: 'AI & Copilot',
    examCodes: ['AI-102'],
    answer: 'Azure AI Engineer Associate (AI-102) covers building AI solutions using Azure Cognitive Services, Azure OpenAI, and applied AI services.',
    learnMore: 'AI-102 is Associate level. Covers Language, Vision, Speech and Decision services on Azure. Also includes Azure OpenAI integration. Prerequisite: AI-900 recommended.'
  },
  {
    keywords: ['copilot', 'microsoft copilot', 'ms-4023', 'microsoft 365 copilot', 'copilot chat'],
    technology: 'AI & Copilot',
    examCodes: ['MS-4023'],
    answer: 'Microsoft 365 Copilot (MS-4023) teaches you to use and manage AI-powered Copilot features across Microsoft 365 apps like Teams, Word, and Excel.',
    learnMore: 'MS-4023 covers Copilot Chat, prompt engineering, and responsible AI use in Microsoft 365. Part of the 102-course AI & Copilot track at Koenig. 735+ AI batches delivered in 3 months.'
  },

  // ── SECURITY ───────────────────────────────────────────
  {
    keywords: ['security fundamentals', 'sc-900', 'microsoft security', 'compliance', 'identity'],
    technology: 'Security',
    examCodes: ['SC-900'],
    answer: 'Security, Compliance & Identity Fundamentals (SC-900) covers core security, compliance and identity concepts across Microsoft cloud services.',
    learnMore: 'SC-900 is Fundamentals level — 1 day / 8 hrs. No prerequisites. Entry point into Microsoft security certifications. Covers Azure AD, compliance center, and Microsoft Defender.'
  },
  {
    keywords: ['security operations', 'sc-200', 'soc analyst', 'threat detection', 'defender', 'sentinel'],
    technology: 'Security',
    examCodes: ['SC-200'],
    answer: 'Microsoft Security Operations Analyst (SC-200) trains you to detect, investigate and respond to threats using Microsoft Defender and Sentinel.',
    learnMore: 'SC-200 is Associate level — 4 days / 32 hrs. Covers Microsoft 365 Defender, Azure Defender, and Microsoft Sentinel. Ideal for SOC analysts and security engineers.'
  },
  {
    keywords: ['identity access', 'sc-300', 'azure ad', 'active directory', 'sso', 'conditional access', 'identity management'],
    technology: 'Security',
    examCodes: ['SC-300'],
    answer: 'Microsoft Identity & Access Administrator (SC-300) covers implementing identity solutions using Azure Active Directory and hybrid identity.',
    learnMore: 'SC-300 is Associate level — 4 days / 32 hrs. Covers Azure AD, MFA, conditional access, privileged identity management and B2B/B2C identity.'
  },
  {
    keywords: ['comptia security', 'security+', 'sy0-701', 'network security', 'cybersecurity basics'],
    technology: 'Security',
    examCodes: ['SY0-701'],
    answer: 'CompTIA Security+ (SY0-701) is the most popular entry-level cybersecurity certification. Covers threats, vulnerabilities, cryptography and network security.',
    learnMore: 'Security+ is vendor-neutral — 5 days / 40 hrs. Koenig is a CompTIA Platinum Partner. 6 seats available in next batch (Mar 10, 2026). DoD-approved certification.'
  },
  {
    keywords: ['ethical hacking', 'ceh', 'penetration testing', 'pentest', 'hacking', 'cyber attack'],
    technology: 'Security',
    examCodes: ['CEH'],
    answer: 'Certified Ethical Hacker (CEH v13) teaches offensive security techniques — scanning, enumeration, exploitation and countermeasures used by real attackers.',
    learnMore: 'CEH v13 is 5 days / 40 hrs. Koenig is an EC-Council ATC Partner and winner of ATC of the Year Award (2024). Next batch: Mar 19, 2026 · London Classroom.'
  },
  {
    keywords: ['cissp', 'isc2', 'information security', 'ciso', 'security management'],
    technology: 'Security',
    examCodes: ['CISSP'],
    answer: 'CISSP (Certified Information Systems Security Professional) is the gold standard for senior security professionals. Covers 8 security domains.',
    learnMore: 'CISSP requires 5 years of work experience in 2+ security domains. Vendor-neutral. Ideal for security managers, CISOs and architects. Koenig is an ISC2 authorized training partner.'
  },

  // ── POWER PLATFORM / POWER BI ──────────────────────────
  {
    keywords: ['power bi', 'pl-300', 'data analyst', 'business intelligence', 'bi reports', 'dashboards', 'data visualization'],
    technology: 'Power Platform',
    examCodes: ['PL-300'],
    answer: 'Power BI Data Analyst (PL-300) teaches you to connect, model and visualize data to deliver actionable business intelligence using Microsoft Power BI.',
    learnMore: 'PL-300 is Associate level — 1 day Fast Track or 3-day full course. 2,200+ enrolled. Rating: 4.8★. Koenig price: ₹33,000. Covers Power Query, DAX, reports and dashboards.'
  },
  {
    keywords: ['power platform', 'pl-900', 'power apps', 'power automate', 'low code'],
    technology: 'Power Platform',
    examCodes: ['PL-900'],
    answer: 'Power Platform Fundamentals (PL-900) covers Power BI, Power Apps, Power Automate and Power Virtual Agents — Microsoft\'s low-code platform.',
    learnMore: 'PL-900 is Fundamentals level — 1 day / 8 hrs. No prerequisites. 141 Power Platform courses available at Koenig. Ideal for business users wanting to automate and analyse.'
  },

  // ── MICROSOFT 365 ──────────────────────────────────────
  {
    keywords: ['microsoft teams', 'ms-700', 'teams admin', 'teams management', 'collaboration'],
    technology: 'Microsoft 365',
    examCodes: ['MS-700'],
    answer: 'Managing Microsoft Teams (MS-700) covers deploying, configuring and managing Microsoft Teams — the core collaboration platform in Microsoft 365.',
    learnMore: 'MS-700 is Associate level — 1 day / 8 hrs. Covers Teams policies, meetings, calling, security and compliance. 310 Microsoft 365 courses available at Koenig.'
  },
  {
    keywords: ['microsoft 365 fundamentals', 'ms-900', 'office 365', 'microsoft 365 basics'],
    technology: 'Microsoft 365',
    examCodes: ['MS-900'],
    answer: 'Microsoft 365 Fundamentals (MS-900) introduces cloud services, Microsoft 365 apps, security, compliance and Teams fundamentals.',
    learnMore: 'MS-900 is Fundamentals level — 1 day / 8 hrs. No prerequisites. Entry point for Microsoft 365 certifications. Covers SaaS concepts, productivity apps and security basics.'
  },

  // ── DATA & ANALYTICS ───────────────────────────────────
  {
    keywords: ['data engineer', 'dp-203', 'azure data', 'data pipeline', 'data lake', 'synapse'],
    technology: 'Data & Analytics',
    examCodes: ['DP-203'],
    answer: 'Azure Data Engineer Associate (DP-203) covers designing and implementing data storage, processing and security solutions on Azure.',
    learnMore: 'DP-203 is Associate level — 1 day / 8 hrs Fast Track. Covers Azure Synapse, Data Lake, Databricks, Stream Analytics and Data Factory. 118 Data & Analytics courses at Koenig.'
  },
  {
    keywords: ['microsoft fabric', 'dp-600', 'fabric analytics', 'data lakehouse'],
    technology: 'Data & Analytics',
    examCodes: ['DP-600'],
    answer: 'Microsoft Fabric Analytics Engineer (DP-600) covers the new unified analytics platform Microsoft Fabric — lakehouses, pipelines and semantic models.',
    learnMore: 'DP-600 is Associate level. Microsoft Fabric is the latest data platform combining Power BI, Synapse and Data Factory into one SaaS solution. Growing demand in 2025–26.'
  },

  // ── NETWORKING (CISCO) ─────────────────────────────────
  {
    keywords: ['cisco', 'ccna', 'router', 'switch', 'routing', 'switching', 'network', 'networking', 'install cisco', 'configure router', 'cisco router', 'cisco switch', 'ospf', 'bgp', 'vlan', '200-301'],
    technology: 'Networking',
    examCodes: ['CCNA'],
    answer: 'Cisco routers are configured using Cisco IOS via CLI. Key steps include setting hostname, IP addresses, routing protocols (OSPF/BGP) and security. CCNA 200-301 is the certification to master this.',
    learnMore: 'CCNA 200-301 is the industry-standard networking certification — 5 days / 40 hrs. 9,800+ enrolled at Koenig. Koenig is a Cisco Premier Partner. Covers routing, switching, wireless, security and automation. Next batch: available monthly.'
  },
  {
    keywords: ['ccnp', 'cisco professional', 'encor', '350-401', 'enterprise networking', 'cisco advanced'],
    technology: 'Networking',
    examCodes: ['CCNP'],
    answer: 'CCNP Enterprise (350-401 ENCOR) is the professional-level Cisco certification covering advanced enterprise networking — dual-stack, automation and SD-WAN.',
    learnMore: 'CCNP Enterprise is Professional level — 5 days / 40 hrs. Prerequisite: CCNA recommended. Next batch: Mar 12, 2026 · Dubai Classroom · 3 seats left. Koenig is Cisco Premier Partner.'
  },
  {
    keywords: ['ccie', 'cisco expert', 'cisco lab', 'cisco highest certification'],
    technology: 'Networking',
    examCodes: ['CCIE'],
    answer: 'CCIE (Cisco Certified Internetwork Expert) is the most prestigious networking certification globally, requiring both written and hands-on lab exams.',
    learnMore: 'CCIE is Expert level — requires passing a 2-part exam: written + 8-hour hands-on lab. Considered the PhD of networking. Koenig has expert CCIE-certified trainers.'
  },

  // ── AWS ────────────────────────────────────────────────
  {
    keywords: ['aws', 'amazon web services', 'aws cloud', 'aws architect', 'aws solutions architect', 'saa-c03'],
    technology: 'AWS',
    examCodes: ['SAA-C03'],
    answer: 'AWS Solutions Architect – Associate (SAA-C03) validates your ability to design secure, resilient, high-performing cloud architectures on AWS.',
    learnMore: 'SAA-C03 is Associate level — 4 days / 32 hrs. 5,747 enrolled at Koenig. Koenig is an AWS Advanced Training Partner. Next batch: Mar 5, 2026 · Delhi Classroom · 4 seats left.'
  },
  {
    keywords: ['aws practitioner', 'cloud practitioner', 'clf-c02', 'aws basics', 'aws fundamentals'],
    technology: 'AWS',
    examCodes: ['CLF-C02'],
    answer: 'AWS Cloud Practitioner (CLF-C02) is Amazon\'s entry-level cloud certification covering AWS services, pricing, security and cloud concepts.',
    learnMore: 'CLF-C02 is Fundamentals level — 1–2 days. No prerequisites. Ideal first step into AWS certifications. Koenig is an AWS Authorized Training Partner.'
  },

  // ── PROJECT MANAGEMENT ─────────────────────────────────
  {
    keywords: ['pmp', 'project management', 'project manager', 'pmi', 'project planning', 'agile', 'scrum'],
    technology: 'Project Management',
    examCodes: ['PMP'],
    answer: 'PMP (Project Management Professional) is the world\'s leading project management certification by PMI, covering predictive, agile and hybrid approaches.',
    learnMore: 'PMP is 3 days / 24 hrs at Koenig. Requires 36 months project management experience. 8 seats in next batch (Mar 17, 2026 · Live Online). Koenig is a PMI Premier Partner with 140+ PM courses.'
  },
  {
    keywords: ['itil', 'it service management', 'itsm', 'service desk', 'incident management'],
    technology: 'Project Management',
    examCodes: ['ITIL4'],
    answer: 'ITIL 4 Foundation is the entry-level IT service management certification, teaching the ITIL framework for delivering IT services efficiently.',
    learnMore: 'ITIL 4 Foundation — 3 days. Koenig is a PeopleCert ATO Partner. 90+ ITIL courses available. No prerequisites. Widely adopted by IT service teams globally.'
  },

  // ── VMWARE ─────────────────────────────────────────────
  {
    keywords: ['vmware', 'vsphere', 'virtualization', 'vcenter', 'esxi', 'virtual machines vmware'],
    technology: 'VMware',
    examCodes: ['VCP'],
    answer: 'VMware vSphere certification (VCP-DCV) validates skills in installing, configuring and managing vSphere environments — the leading virtualization platform.',
    learnMore: 'Koenig is a VMware Principal Partner with 35+ VMware courses including vSphere, NSX-T, Carbon Black and Horizon. VCP-DCV requires attending official VMware training.'
  },

  // ── GENERAL KOENIG ─────────────────────────────────────
  {
    keywords: ['koenig', 'about koenig', 'koenig solutions', 'training company', 'it training'],
    technology: 'General',
    examCodes: [],
    answer: 'Koenig Solutions is a global IT training company founded in 1993, offering 5,000+ courses across cloud, security, networking, AI/ML and more.',
    learnMore: 'Koenig trains 30,000+ students monthly across 50+ countries. 95% first-attempt pass rate. 100% money-back guarantee. Authorized by 50+ vendors including Microsoft, Cisco, AWS. Winner — Microsoft Training Services Partner of the Year 2025.'
  },
  {
    keywords: ['money back', 'refund', 'guarantee', 'satisfaction'],
    technology: 'General',
    examCodes: [],
    answer: 'Koenig offers a 100% money-back satisfaction guarantee on every course — no questions asked, no conditions.',
    learnMore: 'If you are not satisfied with your training experience, Koenig will issue a full refund. This applies to all formats: Live Online, Classroom, Flexi and 1-on-1.'
  },
  {
    keywords: ['1 on 1', 'one on one', 'private training', 'dedicated trainer', 'personal trainer'],
    technology: 'General',
    examCodes: [],
    answer: 'Koenig\'s 1-on-1 training pairs you with a dedicated certified instructor exclusively — 2x faster learning, fully flexible schedule.',
    learnMore: '1-on-1 is the fastest path to certification. You set the pace, choose focus areas, and get immediate feedback. Available for any course, any day. 95% pass rate.'
  },
  {
    keywords: ['flexi', 'self paced', 'self-paced', 'recorded', 'video lectures', 'learn anytime'],
    technology: 'General',
    examCodes: [],
    answer: 'Koenig Flexi is a self-paced format with edited video lectures, hands-on labs, courseware and optional doubt-clearing sessions.',
    learnMore: 'Flexi lets you start any day and learn at your own schedule. Includes lab access, class recordings and revision sessions. Ideal for busy professionals.'
  },
  {
    keywords: ['fly me a trainer', 'fmat', 'trainer at office', 'on-site training', 'corporate trainer'],
    technology: 'General',
    examCodes: [],
    answer: 'FMAT (Fly-Me-A-Trainer) sends a Koenig expert trainer directly to your location anywhere in the world — ideal for teams.',
    learnMore: 'FMAT transforms your office into a training environment. Fully customised to your team\'s needs. Available worldwide. All formats use official vendor courseware.'
  },
]

// ─── Main Search Function ─────────────────────────────────
export function searchKnowledge(query: string): AISearchResult {
  if (!query || query.trim().length < 2) {
    return {
      answer: '',
      learnMore: '',
      technology: '',
      examCodes: [],
      keywords: []
    }
  }

  const q = query.toLowerCase().trim()
  const queryWords = q.split(/\s+/)

  // Score each knowledge entry
  const scored = knowledgeBase.map(entry => {
    let score = 0
    const matchedKeywords: string[] = []

    entry.keywords.forEach(keyword => {
      const kw = keyword.toLowerCase()
      // Exact phrase match — highest score
      if (q.includes(kw)) {
        score += kw.split(' ').length * 3  // longer phrase = higher score
        matchedKeywords.push(keyword)
      } else {
        // Partial word match
        queryWords.forEach(word => {
          if (word.length > 2 && kw.includes(word)) {
            score += 1
            if (!matchedKeywords.includes(keyword)) {
              matchedKeywords.push(keyword)
            }
          }
        })
      }
    })

    return { entry, score, matchedKeywords }
  })

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)

  // Get best match
  const best = scored[0]

  // No match found
  if (best.score === 0) {
    return {
      answer: `We couldn't find an exact match for "${query}". Try searching for a technology like Azure, Cisco, AWS, or a course code like AZ-104.`,
      learnMore: 'Koenig offers 5,000+ courses across cloud, security, networking, AI/ML and more. Contact us at info@koenig-solutions.com for personalised guidance.',
      technology: 'General',
      examCodes: [],
      keywords: []
    }
  }

  return {
    answer: best.entry.answer,
    learnMore: best.entry.learnMore,
    technology: best.entry.technology,
    examCodes: best.entry.examCodes,
    keywords: best.matchedKeywords
  }
}

// ─── Technology to filter sidebar key mapping ─────────────
export const techFilterMap: Record<string, string> = {
  'Azure': 'Azure',
  'AI & Copilot': 'AI & Copilot',
  'Security': 'Security',
  'Power Platform': 'Power Platform',
  'Microsoft 365': 'Microsoft 365',
  'Data & Analytics': 'Data & Analytics',
  'Networking': 'Networking',
  'AWS': 'AWS',
  'Project Management': 'Project Management',
  'VMware': 'VMware',
  'General': ''
}

// ─── Rich AI classifier — advice + expandable "learn more" + recommended courses ──
// Same shape/behaviour as the microsoft-v2 AI search box, ported for shared (multi-vendor) use.
export interface AiClassifyCourse {
  name: string
  code: string
  dur: string
  level: 'fund' | 'assoc' | 'expert' | string
  url: string
}
export interface AiClassifyResult {
  advice: string
  learnMore: {
    title: string
    overview: string
    careers: string[]
    skills: string[]
    whyNow: string
    points: string[]
  } | null
  courses: AiClassifyCourse[]
}

export function classifyAiQuery(q: string): AiClassifyResult {
  const t = q.toLowerCase();
  const isAdvancing = /advance|career|next.?level|grow|senior|promot|already|specialist|experienced/i.test(t);

  /* ── Career-advancement branches ── */
  if (/power.?bi/i.test(t) && isAdvancing) return {
    advice: "As a Power BI expert ready to advance, your next move is Microsoft Fabric (DP-600) — it unifies Power BI, Azure Synapse, and Data Factory into one enterprise platform. Pair it with DP-203 to cross into senior data engineering and unlock roles that pay 30–40% more than BI-only positions.",
    learnMore: { title: "Power BI → Senior Data Career", overview: "Power BI experts who add Microsoft Fabric and Azure data engineering skills are among the most in-demand data professionals globally. The convergence of BI, engineering, and AI on a single platform has created a talent gap that certified professionals can command a significant premium to fill.", careers: ["Senior BI Developer", "Data Engineer", "Analytics Engineer", "Microsoft Fabric Architect", "Data Platform Consultant"], skills: ["Microsoft Fabric lakehouses & OneLake architecture", "Power BI semantic models & advanced DAX patterns", "Azure Data Factory & Synapse Pipelines", "Real-time analytics with Eventstream", "Data governance with Microsoft Purview"], whyNow: "Microsoft Fabric is the fastest-adopted new Microsoft product in a decade. Organisations are urgently hiring professionals who bridge Power BI expertise with the Fabric platform — the DP-600 certification is the credential that proves exactly that.", points: ["DP-600 is the natural next cert for any Power BI pro", "Fabric skills command 25–35% salary premium over BI-only roles", "Microsoft Fabric adoption doubled in the last 12 months", "DP-203 + DP-600 = complete senior data engineer profile"] },
    courses: [
      { name: "Power BI Data Analyst Associate", code: "PL-300", dur: "3 days", level: "assoc", url: "/courses/pl-300" },
      { name: "Azure Data Engineer Associate", code: "DP-203", dur: "4 days", level: "assoc", url: "/courses/dp-203" },
      { name: "Fabric Analytics Engineer Associate", code: "DP-600", dur: "4 days", level: "expert", url: "/courses/dp-600" },
    ],
  };
  if (/security|cyber|soc|sentinel|defender/i.test(t) && isAdvancing) return {
    advice: "To advance your security career, AZ-500 and SC-100 are the expert-level certs that hiring managers at banks, government, and enterprise look for. They validate your ability to architect and govern a full Zero Trust environment — not just operate tools.",
    learnMore: { title: "Senior Security Career Path", overview: "Senior cybersecurity roles are the highest-compensated positions in all of IT. Microsoft's expert-level security certifications — AZ-500 and SC-100 — validate the architect-level skills that distinguish senior practitioners from junior analysts.", careers: ["Cloud Security Architect", "Cybersecurity Architect", "Senior SOC Lead", "Zero Trust Architect", "Identity & Access Architect"], skills: ["Microsoft Sentinel SIEM/SOAR architecture", "Zero Trust design & implementation", "Azure security posture management (CSPM)", "Entra ID identity governance & privileged access", "Threat modelling & incident response at scale"], whyNow: "Senior security architects are among the hardest roles to fill globally. SC-100 validates you can design security across an entire enterprise — a skill set organisations are paying a significant premium for right now.", points: ["SC-100 is one of Microsoft's hardest certs — stands out immediately", "Security architect avg. salary 40–50% above analyst level", "AZ-500 required by government & regulated-industry employers", "Labs on live Sentinel, Defender & Purview environments"] },
    courses: [
      { name: "Microsoft Azure Security Technologies", code: "AZ-500", dur: "4 days", level: "assoc", url: "/courses/az-500" },
      { name: "Microsoft Security Operations Analyst", code: "SC-200", dur: "4 days", level: "assoc", url: "/courses/sc-200" },
      { name: "Microsoft Cybersecurity Architect", code: "SC-100", dur: "4 days", level: "expert", url: "/courses/sc-100" },
    ],
  };
  if (/devops|pipeline|ci.?cd|github|terraform/i.test(t) && isAdvancing) return {
    advice: "If you're already in DevOps and want to advance, AZ-400 is the expert-level certification that sets you apart. It covers the full engineering lifecycle — from pipelines and IaC to security scanning and Kubernetes — and is a recognised signal for senior and lead roles.",
    learnMore: { title: "Senior DevOps Career Path", overview: "AZ-400 is one of the few Microsoft expert certifications — and one of the most respected in the industry. It validates end-to-end ownership of the DevOps lifecycle, from source control strategy to production monitoring and governance.", careers: ["Senior DevOps Engineer", "Platform Engineer", "Site Reliability Engineer (SRE)", "DevSecOps Architect", "Cloud Infrastructure Lead"], skills: ["Advanced Azure Pipelines & multi-stage deployments", "Infrastructure as Code with Terraform & Bicep", "DevSecOps: security scanning in CI/CD", "Container strategies with AKS & Helm", "Observability, SLOs, and incident management"], whyNow: "Platform engineering and SRE roles are the fastest-growing category in cloud hiring. AZ-400 holders consistently command senior salaries and are prioritised for principal and staff-level engineering tracks.", points: ["AZ-400: expert-level — one of the hardest Microsoft certs", "Pre-req: AZ-104 or equivalent real-world experience", "Labs run against live Azure DevOps organisations", "Average salary jump of 25–35% post-AZ-400 certification"] },
    courses: [
      { name: "Azure Solutions Architect Expert", code: "AZ-305", dur: "4 days", level: "expert", url: "/courses/az-305" },
      { name: "Designing and Implementing Microsoft DevOps Solutions", code: "AZ-400", dur: "5 days", level: "expert", url: "/courses/az-400" },
      { name: "Azure Data Engineer Associate", code: "DP-203", dur: "4 days", level: "assoc", url: "/courses/dp-203" },
    ],
  };

  if (/beginner|start|intro|fundamental|az-900|basic|new to azure/i.test(t)) return {
    advice: "Great starting point. Azure Fundamentals (AZ-900) builds the cloud vocabulary every professional needs, regardless of role. From there, branch into administration, development, or architecture based on your direction.",
    learnMore: { title: "Azure for Beginners", overview: "Microsoft Azure is the world's second-largest cloud platform, used by 95% of Fortune 500 companies. Getting started with Azure is the single highest-ROI step an IT professional can take — it opens doors across administration, security, development, and architecture.", careers: ["Cloud Administrator", "Azure Solutions Architect", "Cloud Support Engineer", "IT Infrastructure Manager", "DevOps Engineer"], skills: ["Cloud concepts & deployment models", "Core Azure services (compute, storage, networking)", "Azure pricing, SLAs, and support plans", "Identity & access management basics", "Azure management tools & governance"], whyNow: "Cloud skills are now baseline requirements across IT. Azure-certified professionals earn 26% more on average than non-certified peers, and demand continues to outpace supply globally.", points: ["AZ-900 exam: 45 min, ~40 questions, $165", "No prior cloud experience required", "95% first-attempt pass rate at Koenig", "Guaranteed batch — your schedule won't be cancelled"] },
    courses: [
      { name: "Microsoft Azure Fundamentals", code: "AZ-900", dur: "2 days", level: "fund", url: "/courses/az-900" },
      { name: "Microsoft Azure Administrator", code: "AZ-104", dur: "4 days", level: "assoc", url: "/courses/az-104" },
      { name: "Azure Solutions Architect Expert", code: "AZ-305", dur: "4 days", level: "expert", url: "/courses/az-305" },
    ],
  };
  if (/ai|machine learning|ml|artificial intelligence|cognitive|openai/i.test(t)) return {
    advice: "Azure's AI & ML stack is one of the most in-demand skill sets globally right now. Start with AI-900 for the conceptual foundation, then specialise into Data Science (DP-100) or AI Engineering (AI-102) depending on your focus.",
    learnMore: { title: "Azure AI & Machine Learning", overview: "AI is the #1 most requested skill in global tech hiring. Azure's AI ecosystem — Azure OpenAI Service, Azure Machine Learning, Cognitive Services, and AI Studio — is the enterprise standard for building intelligent applications at scale.", careers: ["AI Engineer", "Machine Learning Engineer", "Data Scientist", "Applied AI Developer", "Cognitive Services Architect"], skills: ["Azure OpenAI Service & prompt engineering", "Machine learning model training & deployment", "Azure Cognitive Services & Computer Vision", "Responsible AI principles & governance", "MLOps and model lifecycle management"], whyNow: "Generative AI adoption is accelerating faster than any previous tech wave. Professionals with Azure AI certifications are commanding 30–40% salary premiums, and roles are going unfilled due to the talent shortage.", points: ["AI-900: entry-level, no coding required", "DP-100 & AI-102 among fastest-growing certs globally", "Hands-on labs with live Azure OpenAI instances", "95% first-attempt pass rate at Koenig"] },
    courses: [
      { name: "Azure AI Fundamentals", code: "AI-900", dur: "1 day", level: "fund", url: "/courses/ai-900" },
      { name: "Designing and Implementing a Data Science Solution on Azure", code: "DP-100", dur: "3 days", level: "assoc", url: "/courses/dp-100" },
      { name: "Designing and Implementing an Azure AI Solution", code: "AI-102", dur: "4 days", level: "expert", url: "/courses/ai-102" },
    ],
  };
  if (/devops|pipeline|ci.?cd|continuous|deployment|github|terraform/i.test(t)) return {
    advice: "Azure DevOps skills are essential for any modern engineering team. AZ-400 is the gold standard — it covers pipelines, infrastructure as code, monitoring, and security practices end-to-end.",
    learnMore: { title: "Azure DevOps", overview: "DevOps has become the standard engineering methodology across every industry. Azure DevOps and GitHub Actions together form the world's most widely adopted CI/CD platform — used by millions of developers and thousands of enterprises.", careers: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer", "Release Manager", "Cloud Infrastructure Engineer"], skills: ["Azure Pipelines & GitHub Actions", "Infrastructure as Code (Terraform, Bicep)", "Source control strategies with Azure Repos", "Continuous testing, security scanning, and monitoring", "Container orchestration with Kubernetes (AKS)"], whyNow: "Every software team is hiring DevOps engineers. AZ-400 is one of the few expert-level Microsoft certifications — it immediately differentiates you from associate-certified peers and commands significantly higher salaries.", points: ["AZ-400: expert-level, stands out on any CV", "5-day course covering the full DevOps lifecycle", "Pre-requisite: AZ-104 or equivalent experience", "Labs run against live Azure DevOps organisations"] },
    courses: [
      { name: "Microsoft Azure Administrator", code: "AZ-104", dur: "4 days", level: "assoc", url: "/courses/az-104" },
      { name: "Azure Solutions Architect Expert", code: "AZ-305", dur: "4 days", level: "expert", url: "/courses/az-305" },
      { name: "Designing and Implementing Microsoft DevOps Solutions", code: "AZ-400", dur: "5 days", level: "expert", url: "/courses/az-400" },
    ],
  };
  if (/microsoft.?365|m365|office.?365|teams|sharepoint|exchange|intune/i.test(t)) return {
    advice: "Microsoft 365 certifications validate your ability to deploy and manage productivity tools used by hundreds of millions worldwide. MS-900 is the logical entry point, with role-specific paths for administrators and security specialists.",
    learnMore: { title: "Microsoft 365", overview: "Microsoft 365 is deployed in over 1 million organisations worldwide and is the backbone of enterprise productivity. M365 admin skills are required in the vast majority of enterprise IT roles — making this one of the most universally applicable certification paths.", careers: ["M365 Administrator", "Teams Administrator", "Exchange Online Administrator", "Identity & Access Administrator", "Modern Desktop Administrator"], skills: ["Microsoft Teams deployment & governance", "Exchange Online & mail flow management", "SharePoint & OneDrive administration", "Intune endpoint management & compliance", "Entra ID (Azure AD) identity & access"], whyNow: "With remote work now permanent across most organisations, M365 administration skills are in higher demand than ever. The MS-102 Expert certification is increasingly listed as a requirement — not just a preference — in senior IT job descriptions.", points: ["MS-900: 1-day course, ideal entry point", "MS-102 Expert is the gold standard for enterprise IT", "Covers Teams, Exchange, SharePoint, Intune & Entra ID", "Labs on live Microsoft 365 tenants"] },
    courses: [
      { name: "Microsoft 365 Fundamentals", code: "MS-900", dur: "1 day", level: "fund", url: "/courses/ms-900" },
      { name: "Microsoft Teams Administrator Associate", code: "MS-700", dur: "4 days", level: "assoc", url: "/courses/ms-700" },
      { name: "Microsoft 365 Administrator Expert", code: "MS-102", dur: "5 days", level: "expert", url: "/courses/ms-102" },
    ],
  };
  if (/security|cyber|soc|sentinel|defender|compliance|zero trust/i.test(t)) return {
    advice: "Microsoft's security portfolio spans identity, endpoints, cloud workloads, and data. These certifications are in extremely high demand as organisations accelerate Zero Trust adoption across their infrastructure.",
    learnMore: { title: "Microsoft Security", overview: "Cybersecurity is the fastest-growing and highest-paying category in all of IT. Microsoft's security platform — Sentinel, Defender, Entra ID, and Purview — is the most widely deployed enterprise security stack in the world, creating massive demand for certified practitioners.", careers: ["Security Operations Analyst (SOC)", "Cloud Security Engineer", "Identity & Access Administrator", "Compliance Administrator", "Cybersecurity Architect"], skills: ["Microsoft Sentinel (SIEM/SOAR) operations", "Microsoft Defender for Endpoint & Cloud", "Zero Trust architecture & implementation", "Entra ID identity protection & governance", "Azure security posture & threat management"], whyNow: "Cyber attacks increased 38% in the last year. Boards are mandating Zero Trust adoption. Security roles now command the highest salaries in IT — and Microsoft-certified security professionals are among the most sought-after talent globally.", points: ["SC-200 maps directly to SOC Analyst job descriptions", "AZ-500 required by government & finance employers", "Security roles: avg. salary 35% above general IT", "Labs on live Sentinel workspaces & Defender environments"] },
    courses: [
      { name: "Microsoft Security Fundamentals", code: "SC-900", dur: "1 day", level: "fund", url: "/courses/sc-900" },
      { name: "Microsoft Security Operations Analyst", code: "SC-200", dur: "4 days", level: "assoc", url: "/courses/sc-200" },
      { name: "Microsoft Azure Security Technologies", code: "AZ-500", dur: "4 days", level: "expert", url: "/courses/az-500" },
    ],
  };
  if (/data|database|sql|synapse|analytics|fabric|power.?bi/i.test(t)) return {
    advice: "The modern data estate runs on Azure. From real-time analytics to enterprise data warehousing, these courses cover the full data engineering and analytics lifecycle on Microsoft's platform.",
    learnMore: { title: "Azure Data & Analytics", overview: "Data engineering and analytics are among the most in-demand and best-compensated skills across every industry. Azure's data platform — Synapse Analytics, Data Factory, Microsoft Fabric, and Azure SQL — powers the data estate of thousands of enterprises worldwide.", careers: ["Data Engineer", "Data Analyst", "Analytics Engineer", "Database Administrator", "BI Developer / Power BI Specialist"], skills: ["Azure Data Factory pipeline design & orchestration", "Azure Synapse Analytics & SQL pools", "Microsoft Fabric lakehouses & dataflows", "Power BI semantic models & reporting", "Azure SQL, Cosmos DB, and NoSQL patterns"], whyNow: "Data Engineer is consistently ranked in the top 5 highest-paying cloud roles. Microsoft Fabric is the fastest-growing new Azure service, and organisations urgently need professionals who can work across the full data lifecycle.", points: ["DP-203 maps directly to Data Engineer job descriptions", "Microsoft Fabric is the #1 new Azure skill employers want", "Data Engineer avg. salary: $120k–$160k globally", "Labs use real Azure data services with live datasets"] },
    courses: [
      { name: "Azure Data Fundamentals", code: "DP-900", dur: "1 day", level: "fund", url: "/courses/dp-900" },
      { name: "Azure Data Engineer Associate", code: "DP-203", dur: "4 days", level: "assoc", url: "/courses/dp-203" },
      { name: "Fabric Analytics Engineer Associate", code: "DP-600", dur: "4 days", level: "expert", url: "/courses/dp-600" },
    ],
  };
  if (/cisco|ccna|ccnp|ccie|router|switch(ing)?|routing|vlan|ospf|bgp/i.test(t)) return {
    advice: "Cisco powers most enterprise network infrastructure worldwide. To install and manage routers and switches professionally, CCNA (200-301) is the industry-standard starting certification — it covers routing, switching, and core networking fundamentals hands-on.",
    learnMore: { title: "Cisco Networking & CCNA", overview: "Whether you're installing routers, configuring switches, or managing an enterprise network, Cisco certifications validate the exact skills employers look for. CCNA is the most widely recognised entry point into networking careers globally, while CCNP and CCIE open senior and expert-level paths.", careers: ["Network Administrator", "Network Engineer", "Systems Administrator", "IT Support Engineer", "Network Security Specialist"], skills: ["Router & switch configuration (Cisco IOS)", "Routing protocols — OSPF, BGP, EIGRP", "VLANs, switching & spanning tree", "Network security fundamentals", "Network troubleshooting & automation"], whyNow: "Every organisation with on-prem or hybrid infrastructure needs Cisco-certified staff to install, configure and maintain routers and switches. CCNA remains one of the most in-demand entry-level IT certifications globally.", points: ["CCNA 200-301 covers routing, switching, security & automation", "No strict prerequisites — ideal starting point for networking", "Koenig is a Cisco Learning Partner", "Hands-on labs on real Cisco routers & switches"] },
    courses: [
      { name: "Cisco Certified Network Associate (CCNA)", code: "CCNA 200-301", dur: "5 days", level: "assoc", url: "https://www.koenig-solutions.com/cisco-training-certification-courses" },
      { name: "Cisco Certified Network Professional (CCNP)", code: "CCNP", dur: "5 days", level: "expert", url: "https://www.koenig-solutions.com/cisco-training-certification-courses" },
      { name: "Cisco Certified Internetwork Expert (CCIE)", code: "CCIE", dur: "5 days", level: "expert", url: "https://www.koenig-solutions.com/cisco-training-certification-courses" },
    ],
  };
  return {
    advice: "Following course might meet your requirement.",
    learnMore: { title: "Microsoft Certifications", overview: "Microsoft certifications are among the most recognised and respected credentials in global IT. They validate real-world skills across cloud, security, data, AI, and productivity — and are trusted by hiring managers at enterprises worldwide.", careers: ["Cloud Engineer", "Solutions Architect", "Security Analyst", "Data Engineer", "IT Administrator"], skills: ["Microsoft Azure cloud platform", "Microsoft 365 productivity & collaboration", "Security, identity, and compliance", "Data engineering & analytics", "AI and machine learning on Azure"], whyNow: "Microsoft certifications consistently rank among the highest-ROI IT investments. Azure-certified professionals earn on average 26% more than non-certified peers, and the demand for Microsoft skills continues to grow globally across all industries.", points: ["380+ Microsoft courses across all technology areas", "95% first-attempt certification pass rate", "Microsoft Gold Learning Partner — vendor-authorised", "Guaranteed batch schedules — no cancellations"] },
    courses: [
      { name: "Microsoft Azure Fundamentals", code: "AZ-900", dur: "2 days", level: "fund", url: "/courses/az-900" },
      { name: "Microsoft Azure Administrator", code: "AZ-104", dur: "4 days", level: "Intermediate", url: "/courses/az-104" },
      { name: "Azure Solutions Architect Expert", code: "AZ-305", dur: "4 days", level: "expert", url: "/courses/az-305" },
    ],
  };
}

export function getContextChips(q: string): string[] {
  const t = q.toLowerCase().trim();
  const isAdvancing = /advance|career|next.?level|grow|senior|promot|already|specialist|experienced/i.test(t);

  /* Career-advancement chips — skill-specific */
  if (/power.?bi/i.test(t) && isAdvancing)
    return ["Microsoft Fabric (DP-600)", "Data Engineering Path", "PL-300 Advanced", "Azure Synapse"];
  if (/security|cyber|soc|sentinel|defender/i.test(t) && isAdvancing)
    return ["SC-100 Architect", "AZ-500 Expert", "Zero Trust Senior", "DevSecOps Path"];
  if (/devops|pipeline|github|terraform/i.test(t) && isAdvancing)
    return ["AZ-400 Expert", "Platform Engineer Path", "SRE Track", "DevSecOps"];
  if (/azure|cloud/i.test(t) && isAdvancing)
    return ["Solutions Architect", "AZ-305 Expert", "Azure DevOps", "Cloud Security"];

  /* Standard topic chips */
  if (/security|cyber|soc|sentinel|defender|compliance|zero trust/i.test(t))
    return ["Azure Security", "Zero Trust", "Compliance & Identity", "Microsoft Defender"];
  if (/\bai\b|machine.?learn|ml|artificial|cognitive|openai/i.test(t))
    return ["Azure AI", "Machine Learning", "Data Science", "OpenAI on Azure"];
  if (/devops|pipeline|ci.?cd|continuous|deployment|github|terraform/i.test(t))
    return ["Azure DevOps", "GitHub Actions", "Infrastructure as Code", "CI/CD Pipelines"];
  if (/365|m365|office|teams|sharepoint|exchange|intune/i.test(t))
    return ["Microsoft Teams", "SharePoint Admin", "Exchange Online", "Intune & Endpoint"];
  if (/beginner|start|intro|fundamental|basic/i.test(t))
    return ["Azure Fundamentals", "Cloud Concepts", "AZ-900", "Azure Administration"];
  if (/data|database|sql|synapse|analytics|fabric|power.?bi/i.test(t))
    return ["Azure Data Engineering", "Power BI", "Microsoft Fabric", "Azure SQL"];
  if (/cisco|ccna|ccnp|ccie|router|switch(ing)?|routing|vlan|ospf|bgp/i.test(t))
    return ["Cisco Networking", "CCNA Certification", "Routing & Switching", "Network Security"];
  if (/network|vpn|firewall|dns|express/i.test(t))
    return ["Azure Networking", "Virtual Networks", "Azure Firewall", "ExpressRoute"];
  if (/dev|app|code|function|api|develop/i.test(t))
    return ["Azure Developer", "Azure Functions", "API Management", "App Service"];
  if (/azure/i.test(t))
    return ["Azure for beginners", "Azure DevOps", "Azure Security", "Azure AI"];
  if (/microsoft|ms\b/i.test(t))
    return ["Microsoft 365", "Microsoft Security", "Microsoft Azure", "Microsoft DevOps"];
  if (/cloud/i.test(t))
    return ["Azure Fundamentals", "Cloud Architecture", "Azure Administration", "Cloud Security"];
  return [];
}
