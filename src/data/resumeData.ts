// ─── Personal Info ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: 'Muhammed Ashiq',
  initials: 'MA',
  currentTitle: 'Software Development Manager III',
  currentCompany: 'Docusign',
  tagline: 'Engineering Leader · Platform Architect · Talent Builder',
  headline: 'Building world-class engineering orgs and AI-native platforms at scale',
  subHeadline:
    '16+ years designing distributed systems and scaling high-performance teams across Docusign, Amazon, and Oracle. IIM Kozhikode MBA + CTO Programme.',
  location: 'Bengaluru, Karnataka, India',
  email: 'muhdashiq@gmail.com',
  phone: '+91 999 555 7080',
  linkedin: 'https://www.linkedin.com/in/muhdashiq/',
  github: 'https://github.com/muhdashiq',
  resumePdf: '/resume.pdf',
}

// ─── Metrics ──────────────────────────────────────────────────────────────────

export interface Metric {
  id: string
  value: number
  suffix: string
  label: string
  sublabel: string
  icon: string
  accentColor: 'indigo' | 'cyan'
}

export const metrics: Metric[] = [
  {
    id: 'team-scale',
    value: 22,
    suffix: '+',
    label: 'Engineers Scaled',
    sublabel: 'Built India integration team from 2 to 22',
    icon: 'Users',
    accentColor: 'indigo',
  },
  {
    id: 'years-exp',
    value: 16,
    suffix: '+',
    label: 'Years of Experience',
    sublabel: 'Engineering leadership across enterprise & startups',
    icon: 'Award',
    accentColor: 'cyan',
  },
  {
    id: 'ai-products',
    value: 4,
    suffix: '+',
    label: 'AI / Platform Products',
    sublabel: 'Federated RAG, NLP workflows, AppStore, CDSS platform',
    icon: 'Cpu',
    accentColor: 'indigo',
  },
  {
    id: 'amazon-tenure',
    value: 6,
    suffix: ' yrs',
    label: 'Amazon Tenure',
    sublabel: 'AppStore platform & Amazon Academy early-team member',
    icon: 'Building2',
    accentColor: 'cyan',
  },
  {
    id: 'companies',
    value: 3,
    suffix: '',
    label: 'Industry Leaders',
    sublabel: 'Docusign · Amazon · Oracle',
    icon: 'Globe',
    accentColor: 'indigo',
  },
  {
    id: 'education',
    value: 2,
    suffix: '',
    label: 'IIM Kozhikode Degrees',
    sublabel: 'MBA + CTO Management Development Programme',
    icon: 'GraduationCap',
    accentColor: 'cyan',
  },
]

// ─── Experience ───────────────────────────────────────────────────────────────

export interface Highlight {
  text: string
  isMetric?: boolean
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  duration: string
  location: string
  teamSize?: string
  type: 'current' | 'leadership' | 'ic' | 'founder'
  summary: string
  highlights: Highlight[]
  techTags: string[]
}

export const experiences: Experience[] = [
  {
    id: 'docusign',
    company: 'Docusign',
    role: 'Software Development Manager III',
    period: 'Nov 2023 – Present',
    duration: '~3 years',
    location: 'Bengaluru, India',
    teamSize: '22+',
    type: 'current',
    summary:
      "Leading the India Integration Engineering organization — shipping AI-native workflow products and integration platforms that extend Docusign's agreement cloud across enterprise ecosystems.",
    highlights: [
      {
        text: 'Scaled India integration engineering org from 2 → 22 engineers, establishing full-cycle recruitment, structured onboarding, and performance frameworks.',
        isMetric: true,
      },
      {
        text: 'Launched Workflow Chaining feature enabling customers to extend Docusign agreement actions into existing business workflows; delivered Early Access Program (EAP) on time.',
      },
      {
        text: 'Architected and shipped Federated RAG system — detects systems of record in real-time, integrates Docusign with CRM ecosystems, and performs CRUD on third-party data sources, eliminating chronic stale-data issues at scale.',
        isMetric: true,
      },
      {
        text: 'Directed delivery of NLP-driven Dynamic Workflow Generator, reducing customer template setup effort and accelerating time-to-value.',
      },
      {
        text: 'Spearheaded developer-facing Integration Platform enabling seamless third-party connectivity with Docusign services.',
      },
      {
        text: 'Transitioned revenue-critical MS Word/Outlook plugins and Chrome extensions to India development center, preserving delivery velocity through structured knowledge transfer.',
      },
      {
        text: 'Introduced product dashboards for engineering metrics, improving team visibility and throughput.',
      },
    ],
    techTags: ['TypeScript', 'AWS', 'Microservices', 'RAG / LLMs', 'Platform Engineering', 'CI/CD', 'Kubernetes', 'Observability'],
  },
  {
    id: 'homorx',
    company: 'HomoRx (Stealth Startup)',
    role: 'Head of Engineering / Director of Technology',
    period: 'Apr 2022 – Nov 2023',
    duration: '1 yr 10 mos',
    location: 'Remote',
    teamSize: '10–15',
    type: 'leadership',
    summary:
      'Founding engineering executive at a healthtech startup. Designed architecture from greenfield, built the team, and delivered a clinical decision support system (CDSS) for home-based medication management.',
    highlights: [
      {
        text: 'Architected a highly scalable, modular, fault-tolerant platform from zero — microservices-first to minimize time-to-market for new features.',
      },
      {
        text: 'Integrated third-party drug databases and medical APIs for real-time clinical information access.',
      },
      {
        text: 'Established CI/CD pipelines and cloud infrastructure for high availability and zero-downtime deployments.',
        isMetric: true,
      },
      {
        text: 'Collaborated with cross-functional teams (clinical, product, design) to define roadmaps and align delivery priorities.',
      },
      {
        text: 'Recruited, mentored, and grew engineering team; established code review standards, testing frameworks, and performance benchmarks.',
      },
    ],
    techTags: ['Microservices', 'Cloud (AWS/GCP)', 'CI/CD', 'Healthcare APIs', 'Node.js', 'System Architecture'],
  },
  {
    id: 'amazon',
    company: 'Amazon',
    role: 'Software Development Engineer II',
    period: 'Apr 2016 – Apr 2022',
    duration: '6 yrs 1 mo',
    location: 'Hyderabad & Chennai, India',
    type: 'ic',
    summary:
      'Six-year tenure across two high-impact Amazon product lines — AppStore and Amazon Academy — contributing to platform infrastructure, developer tooling, and personalized learning at scale.',
    highlights: [
      {
        text: 'Amazon AppStore: Designed scalable platform features improving developer onboarding throughput; built secure app ingestion pipeline to automate compliance checks.',
        isMetric: true,
      },
      {
        text: 'Amazon Academy (early-team member): Delivered knowledge representation system normalizing content across education providers at scale.',
      },
      {
        text: 'Designed personalized learning experiences via cognitive ability mapping — a core product differentiator.',
      },
      {
        text: 'Developed high-performance mobile rendering engine, improving speed and reliability metrics measurably.',
      },
      {
        text: "Contributed reusable internal libraries adopted across Amazon's broader application ecosystem.",
      },
    ],
    techTags: ['Java', 'AWS', 'Distributed Systems', 'Android', 'EdTech Platforms', 'High-throughput Systems'],
  },
  {
    id: 'oracle',
    company: 'Oracle',
    role: 'Member Technical Staff',
    period: 'May 2015 – Apr 2016',
    duration: '1 year',
    location: 'Bengaluru, India',
    type: 'ic',
    summary:
      'Focused on performance optimization of enterprise middleware for high-throughput message processing environments.',
    highlights: [
      {
        text: 'Optimized middleware applications for high-performance message processing using multithreading and concurrency patterns.',
      },
    ],
    techTags: ['Java', 'Middleware', 'Multithreading', 'Performance Optimization'],
  },
  {
    id: 'tcs',
    company: 'Tata Consultancy Services',
    role: 'Assistant System Engineer',
    period: 'Jan 2014 – Apr 2015',
    duration: '1 yr 4 mos',
    location: 'India',
    type: 'ic',
    summary: 'Enterprise integration work across telecom CRM platforms and backend services.',
    highlights: [
      {
        text: 'Integrated telecom CRM systems with backend services, ensuring seamless data flow across modules.',
      },
    ],
    techTags: ['Java', 'CRM Integration', 'Telecom', 'Backend Services'],
  },
  {
    id: 'addin',
    company: 'Addin.in',
    role: 'Founder & Software Engineer',
    period: 'Apr 2010 – Dec 2013',
    duration: '3 yrs 9 mos',
    location: 'Kerala, India',
    type: 'founder',
    summary:
      'Founded an early-stage digital platform company to bring small-scale industries online. Evolved into startup mentoring, seed funding advisory, and tech community leadership.',
    highlights: [
      {
        text: 'Built web and mobile solutions digitizing small-scale industry presence — full-stack product ownership from day one.',
      },
      {
        text: 'Helped multiple startups secure seed funding by defining MVPs and demonstrating measurable value to investors.',
        isMetric: true,
      },
      {
        text: 'Delivered keynote sessions and workshops at community events inspiring professionals to pursue technology careers.',
      },
      {
        text: 'Active contributor to the startup ecosystem through mentoring programs, accelerators, and hackathons.',
      },
    ],
    techTags: ['Web Development', 'Mobile', 'Product Strategy', 'Startup Mentoring', 'Community Leadership'],
  },
]

// ─── Competencies ─────────────────────────────────────────────────────────────

export interface CompetencyGroup {
  id: string
  category: string
  icon: string
  description: string
  items: string[]
}

export const competencies: CompetencyGroup[] = [
  {
    id: 'org-leadership',
    category: 'Organizational Leadership',
    icon: 'Users2',
    description: 'Building and scaling high-performance engineering cultures',
    items: [
      'Executive Leadership & C-Suite Communication',
      'OKRs & Engineering Metrics',
      'Headcount Planning & Org Design',
      'Performance Management',
      'Talent Acquisition & Retention',
      'Agile / SAFe Transformation',
      'Cross-functional Partnerships',
      'Remote & Multi-region Leadership',
      'Psychological Safety & Culture',
      'IC → Engineering Manager Coaching',
    ],
  },
  {
    id: 'architecture',
    category: 'Architecture & Technology',
    icon: 'Server',
    description: 'Designing systems that scale to global workloads',
    items: [
      'Distributed Systems & Microservices',
      'Platform & API Engineering',
      'AI / ML Productization (LLMs, RAG, NLP)',
      'Cloud: AWS · GCP · Azure',
      'Kubernetes & Container Orchestration',
      'Observability & SLO / SLA Governance',
      'Security & Data Privacy Governance',
      'High Availability & Fault Tolerance',
      'Federated Data Architectures',
      'Integration & Workflow Platforms',
    ],
  },
  {
    id: 'product-execution',
    category: 'Product & Execution',
    icon: 'Rocket',
    description: 'Translating strategy into shipped products at velocity',
    items: [
      'Product Roadmap Definition',
      'CI / CD & Developer Productivity',
      'Tech Debt Remediation',
      'Stakeholder Alignment',
      'Build vs. Buy Decision Frameworks',
      'Capital & Resource Allocation',
      'Early Access & Beta Programs',
      'Data-driven Decision Making',
      'Digital Transformation',
      'Go-to-Market Execution',
    ],
  },
]

// ─── Leadership Philosophy ─────────────────────────────────────────────────────

export interface Philosophy {
  id: string
  title: string
  icon: string
  tagline: string
  description: string
  accentColor: 'indigo' | 'cyan' | 'emerald' | 'violet'
}

export const philosophies: Philosophy[] = [
  {
    id: 'people-first',
    title: 'People-First Performance',
    icon: 'Heart',
    tagline: 'Great systems are built by great people.',
    description:
      'I invest disproportionately in individual growth — clear career ladders, psychological safety, and coaching engineers into engineering managers. The multiplier effect of a trusted, autonomous team always outpaces purely technical optimization.',
    accentColor: 'indigo',
  },
  {
    id: 'systems-thinking',
    title: 'Systems Thinking at Scale',
    icon: 'Network',
    tagline: 'Architecture is a leadership decision.',
    description:
      'I treat system design as a strategic lever, not a pure technical choice. Decisions around microservices, platform abstractions, or data architecture shape org structure, team autonomy, and long-term velocity. Conway\'s Law is real — I design around it.',
    accentColor: 'cyan',
  },
  {
    id: 'bias-for-delivery',
    title: 'Bias for Delivery',
    icon: 'Zap',
    tagline: 'Shipped beats perfect.',
    description:
      'I hold teams to a high bar on outcome velocity — ruthless prioritization, proactive risk surfacing, and feedback loops that enable fast learning. An Early Access Program launching on time beats a 12-month big-bang release every time.',
    accentColor: 'emerald',
  },
  {
    id: 'ai-native',
    title: 'AI-Native Mindset',
    icon: 'Brain',
    tagline: 'AI is infrastructure, not a feature.',
    description:
      'Having shipped Federated RAG and NLP-driven workflow generators, I treat AI as a foundational platform capability. I work with PMs and architects to embed AI at the workflow layer — reducing customer effort while expanding product surface area.',
    accentColor: 'violet',
  },
]

// ─── Education ────────────────────────────────────────────────────────────────

export const education = [
  {
    degree: 'CTO Management Development Programme',
    institution: 'Indian Institute of Management, Kozhikode (IIMK)',
    type: 'Executive Education',
  },
  {
    degree: 'Master of Business Administration (MBA)',
    institution: 'Indian Institute of Management, Kozhikode (IIMK)',
    type: 'Graduate Degree',
  },
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Cochin University of Science and Technology (CUSAT)',
    type: 'Undergraduate Degree',
  },
]
