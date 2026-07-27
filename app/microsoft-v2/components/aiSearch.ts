// aiSearch.ts
// Smart local search — no API key needed
// Uses .md files from /public as knowledge base
// Place this file in: app/enterprise/components/aiSearch.ts

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
