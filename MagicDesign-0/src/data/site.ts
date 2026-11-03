export const brandName = 'eleks';

export const navItems = [
  { label: 'Services', href: '#services', menu: 'services' },
  { label: 'Industries', href: '#industries', menu: 'industries' },
  { label: 'Clients', href: '#clients', menu: 'clients' },
  { label: 'About us', href: '#about', menu: 'about' },
  { label: 'Insights', href: '#insights', menu: 'insights' },
  { label: 'AI solutions advisor', href: '#advisor', menu: null }
];

export const languages = ['EN', 'DE', 'AR', 'JA', 'UA'];

export const images = {
  overview: '/eleks/card-engineering-enterprise.jpg',
  data: '/eleks/card-data-ai-img.jpg',
  insurance: '/eleks/card-insurance-img.jpg',
  fintech: '/eleks/card-finance-img.jpg',
  healthcare: '/eleks/card-healthcare-img.jpg',
  energy: '/eleks/card-energy-img.jpg',
  consult: '/eleks/cta-video-poster-small.jpg',
  menu: '/eleks/menu-industry-default-image.jpg',
  caseExec: '/eleks/home-page-grtgaz.jpg',
  caseWoman: '/eleks/home-page-tait.jpg'
};

export type SlideKind = 'awards' | 'links' | 'logos';

export type HeroLogoItem = {
  name: string;
  src: string;
  width: number;
  height: number;
};

export type HeroSlide = {
  id: string;
  label: string;
  title: string;
  body: string;
  cta?: string;
  ctaHref?: string;
  subLabel: string;
  kind: SlideKind;
  items: string[];
  logoItems?: HeroLogoItem[];
  image: string;
  tint: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'overview',
    label: 'ELEKS overview',
    title: 'Engineering the enterprise of the 21st century',
    body: 'Markets move faster than many enterprises can adapt. We close that gap by modernising your data, automating workflows and accelerating digital product delivery. We bring AI into everyday operations to create value for your customers and your business.',
    subLabel: 'Awards',
    kind: 'awards',
    items: ['IAOP Global 100', '2025 Gold Stevie®', 'Webby Award'],
    logoItems: [
      { name: 'IAOP Global 100', src: '/eleks/iaop-home-logo-white.svg', width: 55, height: 80 },
      { name: '2025 Gold Stevie®', src: '/eleks/stevie-winner-2025.svg', width: 62, height: 80 },
      { name: 'Webby', src: '/eleks/webby-home-logo-white.svg', width: 64, height: 80 }
    ],
    image: '/eleks/card-engineering-enterprise.jpg',
    tint: '#0b1424'
  },
  {
    id: 'data',
    label: 'Data&AI',
    title: 'Harness the full potential of your data',
    body: "Maximize your business potential by delving deeper into your data and gaining invaluable insights into your customers' needs.",
    cta: 'View service',
    ctaHref: '#services',
    subLabel: 'Services',
    kind: 'links',
    items: [
      'Business intelligence',
      'Artificial intelligence',
      'Machine learning',
      'Data strategy',
      'Intelligent automation',
      'MLOps'
    ],
    image: '/eleks/card-data-ai-img.jpg',
    tint: '#0c2236'
  },
  {
    id: 'fintech',
    label: 'Fintech',
    title: 'Deliver industry-leading financial services',
    body: 'Strategically address risks while unlocking the full potential of Big Data for the financial services sector with our custom fintech solutions.',
    cta: 'Explore industry solutions',
    ctaHref: '#industries',
    subLabel: 'Clients',
    kind: 'logos',
    items: ['EAGLE', 'CIVEX', 'Nucleus195', 'Maple Life'],
    logoItems: [
      { name: 'Eagle', src: '/eleks/eagle-logo-white.svg', width: 140, height: 80 },
      { name: 'Civex', src: '/eleks/civex-logo-white.svg', width: 88, height: 80 },
      { name: 'Nucleus195', src: '/eleks/nucleus195-logo-white-1.svg', width: 125, height: 80 },
      { name: 'Maple Life', src: '/eleks/maple-life-logo-white.svg', width: 104, height: 80 }
    ],
    image: '/eleks/card-finance-img.jpg',
    tint: '#3a3a40'
  },
  {
    id: 'energy',
    label: 'Energy',
    title: 'Enable streamlined energy management',
    body: 'Maximize productivity, increase accessibility, ensure safety, and promote sustainability throughout your energy ecosystem.',
    cta: 'Explore industry solutions',
    ctaHref: '#industries',
    subLabel: 'Clients',
    kind: 'logos',
    items: ['NaTran', 'TechnipFMC', 'Wasteer', 'NRI'],
    logoItems: [
      { name: 'NaTran', src: '/eleks/natran-logo-white.svg', width: 90, height: 80 },
      { name: 'Technip', src: '/eleks/technip-logo-white.svg', width: 120, height: 80 },
      { name: 'Wasteer', src: '/eleks/wasteer-logo-white.svg', width: 169, height: 80 },
      { name: 'NRI', src: '/eleks/nri-logo-white-1.svg', width: 52, height: 80 }
    ],
    image: '/eleks/card-energy-img.jpg',
    tint: '#2a241b'
  }
];

export const serviceGroups = [
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'End-to-end engineering services for seamless software delivery.',
    items: [
      {
        title: 'Application development',
        description: 'Bring your software vision to life with a tailored solution and deliver an industry-leading user experience.',
        icon: '/eleks/application-development-icon-blue.svg'
      },
      {
        title: 'PoC development',
        description: 'Safely explore business-boosting concepts with robust testing and expert road mapping.',
        icon: '/eleks/poc-development-icon-blue.svg'
      },
      {
        title: 'Cloud computing',
        description: 'Cloud migration',
        icon: '/eleks/cloud-computing-services-icon-blue.svg',
        sublinks: ['Cloud migration']
      },
      {
        title: 'Enterprise applications',
        description: 'ERP consulting, CRM consulting',
        icon: '/eleks/enterprise-applications-icon-blue.svg',
        sublinks: ['ERP consulting', 'CRM consulting']
      },
      {
        title: 'Legacy software modernization',
        description: 'Transform your core legacy systems to elevate performance, agility, scalability, and UX.',
        icon: '/eleks/application-re-engineering-icon-blue.svg'
      }
    ],
    links: ['Application development', 'PoC development', 'Cloud computing', 'Enterprise applications', 'Legacy software modernization']
  },
  {
    id: 'advisory',
    title: 'Advisory',
    description: 'Strategic guidance for top-notch products and services.',
    items: [
      {
        title: 'Product and service design',
        description: 'Validate niche ideas and create innovative products and services that scale as your business does.',
        icon: '/eleks/product-service-design-icon-blue.svg'
      },
      {
        title: 'Cyber security',
        description: 'Proactively identify threats to your digital infrastructure to futureproof your IT ecosystem.',
        icon: '/eleks/cyber-security-icon-blue.svg'
      },
      {
        title: 'Technical feasibility study',
        description: 'Explore new technologies and their potential for your business before making an investment.',
        icon: '/eleks/technical-feasibility-study-icon-blue.svg'
      },
      {
        title: 'Sustainability consulting',
        description: 'Reach your net-zero goals and seize new, sustainable business growth opportunities.',
        icon: '/eleks/sustainability-consulting-icon-blue.svg'
      },
      {
        title: 'Agile transformation',
        description: 'Transform your organization to achieve agility, resilience, and sustainable business growth.',
        icon: '/eleks/agile-transformation-icon-blue.svg'
      },
      {
        title: 'AI consulting',
        description: 'Get strategic guidance on implementing AI solutions for scalable business growth.',
        icon: '/eleks/ai-consulting-blue-icon.svg'
      }
    ],
    links: ['Product and service design', 'Cyber security', 'Technical feasibility study', 'Sustainability consulting', 'Agile transformation', 'AI consulting']
  },
  {
    id: 'data-ai',
    title: 'Data & AI',
    description: 'Custom solutions to maximize the value of your data.',
    items: [
      {
        title: 'AI solutions advisor',
        description: 'Discover tailored AI use cases for your business.',
        icon: '/eleks/ai-solution-advisor-icon-blue.svg'
      },
      {
        title: 'Artificial intelligence',
        description: 'Get expert support and guidance at every stage of your AI journey.',
        icon: '/eleks/artificial-intelligence-icon-blue.svg',
        sublinks: ['Generative AI', 'Machine learning', 'Conversational AI', 'Agentic AI', 'Data anonymization']
      },
      {
        title: 'Data science',
        description: 'Boost your business performance and achieve optimization through tailored data-driven solutions.',
        icon: '/eleks/data-science-icon-blue.svg'
      },
      {
        title: 'MLOps',
        description: 'Achieve seamless integration and maximum ROI for your machine learning models.',
        icon: '/eleks/mlops-icon-blue.svg'
      },
      {
        title: 'Data engineering',
        description: 'Data strategy, Data platforms, Business intelligence',
        icon: '/eleks/data-strategy-icon-blue.svg',
        sublinks: ['Data strategy', 'Data platforms', 'Business intelligence']
      },
      {
        title: 'Intelligent automation',
        description: 'Intelligent document processing',
        icon: '/eleks/intelligent-automation-icon-blue.svg',
        sublinks: ['Intelligent document processing']
      },
      {
        title: 'LLMOps',
        description: 'Streamline deployment, optimize performance, and maximize ROI for your large language models.',
        icon: '/eleks/llmops-icon-blue.svg'
      }
    ],
    links: ['AI solutions advisor', 'Artificial intelligence', 'Data science', 'MLOps', 'Data engineering', 'Intelligent automation', 'LLMOps']
  },
  {
    id: 'optimisation',
    title: 'Optimisation',
    description: 'Expert help for flawless performance of your products and services.',
    items: [
      {
        title: 'Software audit',
        description: 'Assess your software products and processes to mitigate risks and minimize revenue loss.',
        icon: '/eleks/software-audit-icon-blue.svg'
      },
      {
        title: 'Quality assurance',
        description: 'Deliver flawless products and seamless user experiences with our expert QA services.',
        icon: '/eleks/quality-assurance-icon-blue.svg'
      },
      {
        title: 'Support',
        description: 'Efficiently handle technical issues and system changes with our IT support services.',
        icon: '/eleks/support-icon-blue.svg'
      },
      {
        title: 'FinOps',
        description: 'Get expert guidance to maximise your cloud infrastructure value, optimise costs, and boost ROI.',
        icon: '/eleks/finops-blue-icon.svg'
      }
    ],
    links: ['Software audit', 'Quality assurance', 'Support', 'FinOps']
  },
  {
    id: 'expertise',
    title: 'Expertise',
    description: 'Latest technologies and innovative approaches to drive your business growth forward.',
    items: [
      {
        title: 'DevOps',
        description: 'Full-cycle DevOps solutions to optimise your SDLC for greater agility and cost-efficiency.',
        icon: '/eleks/devops-icon-blue.svg'
      },
      {
        title: 'VR/AR/MR',
        description: 'Utilize virtual reality technologies to deliver brand-defining, immersive user experiences.',
        icon: '/eleks/vr-ar-mr-icon-blue.svg'
      },
      {
        title: 'Internet of Things',
        description: 'Embrace the potential of IoT for better efficiency, smoother collaboration and powerful data insights.',
        icon: '/eleks/iot-icon-blue-1.svg'
      },
      {
        title: 'Market research',
        description: 'Evaluate your business landscape to capitalise on promising niches and get ahead of the competition.',
        icon: '/eleks/market-research-icon-blue.svg'
      },
      {
        title: 'Customer experience',
        description: 'Refine every customer interaction to enhance satisfaction and drive sustainable revenue growth.',
        icon: '/eleks/customer-experience-cunsulting-icon-blue.svg'
      },
      {
        title: 'Digital enterprise',
        description: 'Introduce digital transformation to your enterprise to drive efficiency, productivity, and revenue.',
        icon: '/eleks/digital-enterprise-icon-blue.svg'
      },
      {
        title: 'UX consulting',
        description: 'Launch successful products and deliver services that your customers will truly want to use.',
        icon: '/eleks/ux-consulting-icon-blue.svg'
      },
      {
        title: 'Nearshore development',
        description: 'Partner with a trusted nearshore software development company to deliver your software project.',
        icon: '/eleks/nearshore-blue-icon.svg'
      }
    ],
    links: ['DevOps', 'VR/AR/MR', 'Internet of Things', 'Market research', 'Customer experience', 'Digital enterprise', 'UX consulting', 'Nearshore development']
  }
];

export const aboutGroups = [
  { title: 'Company', links: ['About us', 'How we work', 'Awards and partners', 'Leadership team'] },
  { title: 'Trust & Products', links: ['ELEKS’ Trust Centre', 'Our products', 'CSR', 'Careers', 'Press kit'] }
];

export const helpAreas = [
  {
    id: 'ai',
    title: 'AI-native enterprise',
    body: 'Improve operational efficiency with agentic AI, robotics, and automation across your enterprise. We identify opportunities where AI adds value and scale these solutions into your daily operations, reducing manual effort and costs while ensuring your team remains in control.',
    subtitle: 'What we help you achieve',
    cta: 'Explore our agentic AI services',
    href: '#contact',
    icon: '/eleks/ai-native-enterprise-icon-blue-big.svg',
    image: '/eleks/ai-native-enterprise-image.jpg',
    outcomes: [
      'Governed data your AI can trust',
      'Agents that run multi-step work end to end',
      'AI embedded at every customer touchpoint',
      'A clear path from strategy to a scaled, AI-first operating model'
    ]
  },
  {
    id: 'product',
    title: 'Digital product engineering',
    body: 'Develop digital products that drive customer value and support revenue growth. We combine business strategy, user experience, architecture, and secure engineering, applying AI throughout the development lifecycle to accelerate time to market.',
    subtitle: 'What we help you achieve',
    cta: 'Explore digital product engineering',
    href: '#contact',
    icon: '/eleks/digital-product-engineering-icon-blue-big.svg',
    image: '/eleks/digital-product-engineering-image.jpg',
    outcomes: [
      'Validated product vision, roadmap, and success metrics',
      'MVP to full scope, released and measured',
      'Legacy applications re-engineered, not re-wrapped',
      'Production stability, run and support'
    ]
  }
];

export const trustPoints = [
  {
    n: '01',
    title: 'One partner, accountable for delivery',
    body: 'We take responsibility from strategy to ongoing support, with financial guarantees and clear visibility into project progress, quality and risks.'
  },
  {
    n: '02',
    title: 'AI built into how we deliver',
    body: 'Our development lifecycle integrates AI to reduce delivery time by up to 30%, supported by engineering oversight and quality controls.'
  },
  {
    n: '03',
    title: 'Employee-owned, personally invested',
    body: 'As employee owners, we have a direct stake in your project’s success and the long-term strength of our partnership.'
  },
  {
    n: '04',
    title: 'Proven product experience',
    body: 'We build and run our own products, bringing practical experience of customer needs, product development and ongoing operations to yours.'
  }
];

export type LogoStyle = 'heavy' | 'serif' | 'round' | 'script';

export const caseStudies = [
  {
    id: 'tait',
    client: 'TAIT',
    logoStyle: 'heavy' as LogoStyle,
    logoSrc: '/eleks/tait-logo-color.svg',
    logoWidth: 76,
    logoHeight: 80,
    title: '7 continents hosted performances powered by Navigator',
    desc: 'Developing custom motion control software and hardware solutions for TAIT',
    image: '/eleks/home-page-tait.jpg',
    videoUrl: 'https://www.youtube.com/embed/7NVDdthKsko',
    caseUrl: '#contact',
    hasCaseLink: true,
    video: true
  },
  {
    id: 'dpd',
    client: 'dpd',
    logoStyle: 'round' as LogoStyle,
    logoSrc: '/eleks/dpd-logo-color.svg',
    logoWidth: 80,
    logoHeight: 80,
    title: 'Six-year migration program to enable 1m daily domestic deliveries',
    desc: 'Re-engineering the entire IT infrastructure of a logistics enterprise in the cloud',
    image: '/eleks/home-page-dpd.jpg',
    videoUrl: 'https://www.youtube.com/embed/rnAFYG9A11Q',
    caseUrl: '#contact',
    hasCaseLink: false,
    video: true
  },
  {
    id: 'natran',
    client: 'NATRAN',
    logoStyle: 'heavy' as LogoStyle,
    logoSrc: '/eleks/natran-logo-color.svg',
    logoWidth: 90,
    logoHeight: 80,
    title: '60+ data sources integrated for smart decision making',
    desc: 'Consolidating near real-time European gas market data in the cloud',
    image: '/eleks/home-page-grtgaz.jpg',
    videoUrl: 'https://www.youtube.com/embed/iOL5MBcv1Vk',
    caseUrl: '#contact',
    hasCaseLink: true,
    video: true
  },
  {
    id: 'david-lloyd',
    client: 'David Lloyd',
    logoStyle: 'script' as LogoStyle,
    logoSrc: '/eleks/david-lloyd-logo-color.svg',
    logoWidth: 93,
    logoHeight: 80,
    title: "Transforming Member Experience for Europe's Largest Leisure Club Chain",
    desc: 'Digital transformation of club services with 2 million app users',
    image: '/eleks/david-lloyd-poster.jpg',
    videoUrl: 'https://www.youtube.com/embed/T51d1ix4eIc',
    caseUrl: '#contact',
    hasCaseLink: true,
    video: true
  },
  {
    id: 'fleming',
    client: 'Fleming',
    logoStyle: 'serif' as LogoStyle,
    logoSrc: '/eleks/fleming-logo-color.svg',
    logoWidth: 97,
    logoHeight: 80,
    title: '4x faster development of healthcare app',
    desc: 'Evolving and enhancing a portfolio of healthcare software products',
    image: '/eleks/home-page-fleming.jpg',
    videoUrl: 'https://www.youtube.com/embed/CjJovgmoOSE',
    caseUrl: '#contact',
    hasCaseLink: true,
    video: true
  }
];

export const partnershipStats = [
  { value: '1000+', label: 'projects delivered' },
  { value: '120+', label: 'active clients, including Fortune 500 companies' },
  { value: '35+', label: 'years on the market' },
  { value: '21', label: 'offices and delivery centres globally' }
];

export const companyAwards = [
  { name: 'Horizon Interactive Awards', src: '/eleks/horizon-home-award.svg' },
  { name: 'IAOP Global Outsourcing 100', src: '/eleks/iaop-home-award.svg' },
  { name: 'Webby Awards', src: '/eleks/webby-home-award.svg' },
  { name: 'Stevie Gold 2025', src: '/eleks/stevie-gold-2025-logo-gray.svg' },
  { name: 'Clutch Top 1000', src: '/eleks/clutch-home-award.svg' },
  { name: 'London Design Awards', src: '/eleks/london-design-home-award.svg' },
  { name: 'Outsourcing Verband', src: '/eleks/outsourcing-verband-home-award.svg' },
  { name: 'AI Excellence Award', src: '/eleks/ai-home-award.svg' },
  { name: 'Cyber Security Excellence', src: '/eleks/cyber-security-home-award.svg' }
];

export type IndustryIconKey =
  | 'fintech'
  | 'pharma'
  | 'energy'
  | 'healthcare'
  | 'insurance'
  | 'biotech'
  | 'government'
  | 'logistics'
  | 'hospitality'
  | 'automotive'
  | 'retail'
  | 'agriculture'
  | 'media';

export const industries: {
  id: IndustryIconKey;
  name: string;
  benefits: [string, string];
  menuDesc: string;
  icon: string;
  image: string;
  menuImage: string;
}[] = [
  {
    id: 'fintech',
    name: 'Fintech',
    benefits: ['Navigate financial risks with ease', 'Speed up transactions, reduce costs'],
    menuDesc: 'Effectively manage risks, protect your assets against fraud and maximize the potential of your data.',
    icon: '/eleks/fintech-icon-blue.svg',
    image: '/eleks/industry-fintech-big.jpg',
    menuImage: '/eleks/menu-industry-fintech.jpg'
  },
  {
    id: 'energy',
    name: 'Energy',
    benefits: ['Boost operational efficiency with automation', 'Reduce your direct carbon footprint'],
    menuDesc: 'Elevate your power system’s productivity, safety and sustainability with energy management software.',
    icon: '/eleks/gas-and-energy-blue-icon.svg',
    image: '/eleks/industry-energy-big.jpg',
    menuImage: '/eleks/menu-industry-energy.jpg'
  },
  {
    id: 'government',
    name: 'Government',
    benefits: ['Digitise your public services', 'Defend against cyber crime'],
    menuDesc: 'Digitise your public services to create a transparent, efficient, and data-centric government agency.',
    icon: '/eleks/government-icon-blue.svg',
    image: '/eleks/industry-government-big.jpg',
    menuImage: '/eleks/menu-industry-government.jpg'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    benefits: ['Deliver exceptional patient service', 'Automate administrative tasks, optimise costs'],
    menuDesc: 'Leverage new technologies to provide outstanding patient care focused on improving clinical results.',
    icon: '/eleks/healthcare-blue-icon.svg',
    image: '/eleks/industry-healthcare-big.jpg',
    menuImage: '/eleks/menu-industry-healthcare.jpg'
  },
  {
    id: 'pharma',
    name: 'Pharma',
    benefits: ['Connect discovery and clinical trials', 'Streamline manufacturing and supply chain'],
    menuDesc: 'We transform pharmaceutical operations across the entire value chain through custom development or seamless system integration.',
    icon: '/eleks/pharma-icon-blue.svg',
    image: '/eleks/industry-pharma-big.jpg',
    menuImage: '/eleks/menu-industry-pharma.jpg'
  },
  {
    id: 'biotech',
    name: 'Biotech',
    benefits: ['Replace manual lab work with connected systems', 'Implement AI capability with compliance built in'],
    menuDesc: 'Accelerate research, trials, and manufacturing with compliant, AI-ready software for life sciences.',
    icon: '/eleks/biopharma-icon-blue.svg',
    image: '/eleks/industry-biotech-big.jpg',
    menuImage: '/eleks/menu-industry-biotech.jpg'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    benefits: ['Automate underwriting processes', 'Handle claims quickly and effectively'],
    menuDesc: 'Adopt data-driven insurance software solutions boosting efficiency, profitability, and security in your sector.',
    icon: '/eleks/insurance-blue-icon.svg',
    image: '/eleks/industry-insurance-big.jpg',
    menuImage: '/eleks/menu-industry-insurance.jpg'
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    benefits: ['Personalise guest experiences, boost sales', 'Gain a competitive advantage'],
    menuDesc: 'Implement tailored hospitality solutions designed to maximize revenue and guest satisfaction.',
    icon: '/eleks/hospitality-icon-blue.svg',
    image: '/eleks/industry-hospitality-big.jpg',
    menuImage: '/eleks/menu-industry-hospitality.jpg'
  },
  {
    id: 'retail',
    name: 'Retail',
    benefits: ['Boost engagement and drive sales', 'Adopt flexible pricing models'],
    menuDesc: 'Transform customer journeys and engage shoppers in new ways, increasing sales and enhancing profitability.',
    icon: '/eleks/retail-blue-icon.svg',
    image: '/eleks/industry-retail-big.jpg',
    menuImage: '/eleks/menu-industry-retail.jpg'
  },
  {
    id: 'logistics',
    name: 'Logistics',
    benefits: ['Boost logistics chain efficiency', 'Maximize warehouse performance'],
    menuDesc: 'Streamline your supply chain, fleets, and warehousing for industry-leading logistics services.',
    icon: '/eleks/logistics-blue-icon-1.svg',
    image: '/eleks/industry-logistic-big.jpg',
    menuImage: '/eleks/menu-industry-logistic.jpg'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    benefits: ['Elevate driver satisfaction, boost sales', 'Innovate with smart driver assistance tech'],
    menuDesc: 'Introduce intelligent features and process optimizations to deliver a new level of driver experience.',
    icon: '/eleks/automotive-icon-blue.svg',
    image: '/eleks/industry-automotive-big.jpg',
    menuImage: '/eleks/menu-industry-automotive.jpg'
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    benefits: ['Optimise production, boost revenue', 'Unify your operations with smart farming'],
    menuDesc: 'Adopt data-driven innovations to balance supply and optimise production under increasing pressures.',
    icon: '/eleks/agriculture-icon-blue.svg',
    image: '/eleks/industry-agriculture-big.jpg',
    menuImage: '/eleks/menu-industry-agriculture.jpg'
  },
  {
    id: 'media',
    name: 'Media & Entertainment',
    benefits: ['Deliver immersive, engaging experiences', 'Personalise with advanced analytics and AI'],
    menuDesc: 'Reach wider audiences with unparalleled digital experiences crafted for maximum engagement.',
    icon: '/eleks/media-blue-icon.svg',
    image: '/eleks/media-and-entertainment-home-banner-min.jpg',
    menuImage: '/eleks/menu-industry-media-entertainment.jpg'
  }
];

export const insights = [
  {
    id: 'i1',
    type: 'R&D',
    hasAudio: true,
    title: 'Retrieval-Augmented Generation (RAG) Explained: Why Most Systems Fail and the 20 Components That Fix Them',
    author: 'Volodymyr Getmanskyi',
    position: 'Head of Artificial Intelligence Office',
    authorImage: '/eleks/volodymyr-getmanskyi-1.jpg',
    image: '/eleks/Blog-cover_1472x896_Retrieval-Augmented-Generation-RAG-Explained-and-the-20-Components-Behind-It-1.jpg',
    date: 'Oct 2026',
    read: '10 min read'
  },
  {
    id: 'i2',
    type: 'R&D',
    hasAudio: true,
    title: 'Is Your Team Truly AI-Assisted? Take the AI-SDLC Maturity Assessment to Find Out',
    author: 'Andrii Mudryk',
    position: 'Application Architect',
    authorImage: '/eleks/andrii-mudryk.jpg',
    image: '/eleks/Blog-cover_1472x896_AI-Native-Delivery-in-Practice_AI-SDLC-Maturity-Assessment.jpg',
    date: 'Oct 2026',
    read: '8 min read'
  },
  {
    id: 'i3',
    type: 'Article',
    hasAudio: true,
    title: 'Why Are Companies Reversing AI Layoffs?',
    author: 'Volodymyr Getmanskyi',
    position: 'Head of Artificial Intelligence Office',
    authorImage: '/eleks/volodymyr-getmanskyi-1.jpg',
    image: '/eleks/Blog-cover_1472x896_AI-rehiring-1.jpg',
    date: 'Sep 2026',
    read: '7 min read'
  },
  {
    id: 'i4',
    type: 'Article',
    hasAudio: true,
    title: 'Cybersecurity Risk in Legacy Medical Equipment: What Biotech and Healthcare Leaders Need to Do Now',
    author: 'Oleksandr Pluzhnikov',
    position: 'Head of Cyber Security Office',
    authorImage: '/eleks/oleksandr-pluzhnikov-1-150x150.jpg',
    image: '/eleks/Blog-cover_1472x896_Cybersecurity-Risk-in-Legacy-Medical-Equipment-1.jpg',
    date: 'Sep 2026',
    read: '9 min read'
  }
];

export const testimonials = [
  {
    id: 't1',
    quote:
      'The breadth of knowledge and understanding that ELEKS has within its walls allows us to leverage that expertise to make superior deliverables for our customers. When you work with ELEKS, you are working with the top 1% of the aptitude and engineering excellence of the whole country.',
    author: 'Sam Fleming',
    position: 'President, Fleming-AOD',
    photo: '/eleks/sam-fleming.jpg'
  },
  {
    id: 't2',
    quote:
      "Right from the start, we really liked ELEKS' commitment and engagement. They came to us with their best people to try to understand our context, our business idea, and developed the first prototype with us. They were very professional and very customer oriented. I think, without ELEKS it probably would not have been possible to have such a successful product in such a short period of time.",
    author: 'Caroline Aumeran',
    position: 'Head of Product Development, appygas',
    photo: '/eleks/caroline-aumeran-1.jpg'
  },
  {
    id: 't3',
    quote:
      "ELEKS has been involved in the development of a number of our consumer-facing websites and mobile applications that allow our customers to easily track their shipments, get the information they need as well as stay in touch with us. We've appreciated the level of ELEKS' expertise, responsiveness and attention to details.",
    author: 'Samer Awajan',
    position: 'CTO, Aramex',
    photo: '/eleks/samer-min.jpg'
  }
];

export const countries = [
  'United States',
  'United Kingdom',
  'Germany',
  'Ukraine',
  'Japan',
  'Canada',
  'Netherlands',
  'Poland',
  'Saudi Arabia',
  'United Arab Emirates',
  'Switzerland',
  'Estonia',
  'Other'
];

export const footerColumns = [
  {
    title: 'Services',
    subgroups: [
      {
        subtitle: 'Engineering',
        links: ['PoC development', 'Application development', 'Enterprise applications', 'Legacy software modernization', 'Cloud computing']
      },
      {
        subtitle: 'Data & AI',
        links: [
          'Data science',
          'Data engineering',
          'Artificial intelligence',
          'Generative AI',
          'Machine learning',
          'Conversational AI',
          'Intelligent automation',
          'MLOps',
          'Business intelligence',
          'Data platforms'
        ]
      },
      {
        subtitle: 'Advisory',
        links: [
          'Product and service design',
          'Cyber security',
          'Technical feasibility study',
          'Sustainability consulting',
          'Agile transformation',
          'AI consulting'
        ]
      },
      {
        subtitle: 'Optimisation',
        links: ['FinOps', 'Software audit', 'Quality assurance', 'Support']
      }
    ],
    links: ['PoC development', 'Application development', 'Enterprise applications', 'Data science', 'Artificial intelligence', 'Cyber security']
  },
  {
    title: 'Expertise',
    links: [
      'DevOps',
      'VR/AR/MR',
      'Internet of Things',
      'Market research',
      'Customer experience',
      'Digital enterprise',
      'Nearshore development',
      'UX consulting',
      'Software development'
    ]
  },
  {
    title: 'Industries',
    links: [
      'Fintech',
      'Pharma',
      'Healthcare',
      'Biotech',
      'Energy',
      'Government',
      'Insurance',
      'Retail',
      'Logistics',
      'Automotive',
      'Agriculture',
      'Media & Entertainment'
    ]
  },
  {
    title: 'Company',
    links: [
      'About us',
      'Services',
      'How we work',
      'Awards and partners',
      'ELEKS’ Trust Centre',
      'Our clients',
      'Case studies',
      'Blog',
      'Careers',
      'Contact us'
    ]
  }
];

export const aiGuideAnswers = [
  {
    keywords: ['erp', 'ai', 'long', 'take', 'data', 'ml', 'machine', 'agent'],
    answer:
      'Our Data & AI practice covers data platforms, agentic AI, generative AI and MLOps. Adding AI capabilities to an existing ERP typically starts with a 2–4 week discovery & PoC phase to validate data readiness and integration architecture.'
  },
  {
    keywords: ['example', 'built', 'case', 'portfolio', 'before'],
    answer:
      'Yes! We have delivered over 1,000 end-to-end projects, including AI-powered predictive platforms for NaTran, motion control systems for TAIT across 7 continents, and digital club services for 2M+ users at David Lloyd.'
  },
  {
    keywords: ['security', 'certification', 'iso', 'soc', 'compliance'],
    answer:
      'ELEKS is ISO/IEC 27001, ISO 9001, and SOC 2 Type II certified, with deep compliance expertise in HIPAA, HITRUST, GDPR, and PCI DSS. You can review our full credentials in ELEKS’ Trust Centre.'
  },
  {
    keywords: ['cloud', 'devops', 'migration', 'aws', 'azure'],
    answer:
      'We plan and run cloud migrations end to end, then operate workloads with DevOps, FinOps and 24/7 SRE teams.'
  },
  {
    keywords: ['price', 'cost', 'budget', 'rate', 'pricing'],
    answer:
      'Pricing depends on team shape and delivery model (Dedicated Team, Fixed Price, or Time & Materials). Share a few details in the contact form and an ELEKS specialist will respond within one business day.'
  }
];
