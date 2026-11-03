import type { SiteContent } from '../types/content';

export const languages = ['EN', 'DE', 'UK', 'JA'];

export const images = {
  overview: "/f0c395b8-d0fd-4dd0-91d5-c5b0ce732aec.jpg",
  data: "/77d2bcdb-f868-4f54-b335-8f874c3a346d.jpg",
  insurance: "/128c27ef-b504-425c-ac4c-ec30a839d0b4.jpg",
  fintech: "/2b2dd085-d4c6-449b-a742-df7c2cd1f5c3.jpg",
  healthcare: "/d84ba2a1-832d-4b0f-8db7-b174110e589f.jpg",
  energy: "/02fc8f85-9a1d-47a2-a1ed-8e6ee1f2775b.jpg",
  consult: "/9b0e5fa1-7dc2-470b-84a3-8987d5c73c1c.jpg",
  menu: "/ceb098cc-dcf2-4852-92d8-7fa1b8ba3f53.jpg",
  caseExec: "/c5627a01-1c35-4a4d-aa17-4d0af30edbc7.jpg",
  caseWoman: "/bcf81afe-9415-42cb-842e-65371c1f2f15.jpg"
};

export const defaultContent: SiteContent = {
  settings: {
    brandName: 'novium',
    contactEmail: 'hello@novium.example',
    contactPhone: '+1 800 555 0123',
    consultTitle: 'Receive a complimentary consultation',
    consultImage: images.consult,
    servicesMenuTitle: 'Full-cycle software services',
    servicesMenuText: 'From first strategy workshop to long-term support, one team owns delivery.',
    servicesMenuImage: images.data,
    industriesMenuTitle: 'Innovative solutions across industries',
    industriesMenuText: 'Software expertise shaped around the specific needs of each sector we serve.',
    industriesMenuImage: images.menu,
    aiGuideEnabled: true
  },
  sections: {
    helpHeading: 'How we move your\nbusiness forward',
    helpOutcomesLabel: 'What you get',
    trustHeading: 'Why teams choose Novium for their next project',
    casesLabel: 'Clients',
    casesHeading: "Our clients' success stories",
    partnershipHeading: 'Partnerships that last for years, not projects',
    sectorsHeading: 'Solutions shaped for every sector',
    insightsHeading: 'Insights',
    contactHeading: 'Talk to our experts about your software vision'
  },
  navItems: [
  { id: 'n1', label: 'Services', href: '#services', menu: 'services' },
  { id: 'n2', label: 'Industries', href: '#industries', menu: 'industries' },
  { id: 'n3', label: 'Clients', href: '#clients', menu: '' },
  { id: 'n4', label: 'About us', href: '#about', menu: '' },
  { id: 'n5', label: 'Insights', href: '#insights', menu: '' },
  { id: 'n6', label: 'AI solutions advisor', href: '#advisor', menu: '' }],

  heroSlides: [
  {
    id: 'overview',
    label: 'Novium overview',
    title: 'Building the engineered enterprise of tomorrow',
    body: 'Businesses change faster than their systems allow. We help close that distance with renewed data foundations, automated workflows and faster product releases — and AI that works inside everyday operations.',
    cta: '',
    subLabel: 'Recognition',
    kind: 'awards',
    items: ['Top 100 Outsourcing', 'Gold Business Award', 'Innovation Seal'],
    image: images.overview,
    video: '',
    tint: '#0b1424'
  },
  {
    id: 'data',
    label: 'Data&AI',
    title: 'Put every byte of your data to work',
    body: 'Find growth by reading your data more closely and turning it into a clear picture of what customers actually want.',
    cta: 'View service',
    subLabel: 'Services',
    kind: 'links',
    items: ['Business intelligence', 'Artificial intelligence', 'Machine learning', 'Data strategy', 'Intelligent automation', 'MLOps'],
    image: images.data,
    video: '',
    tint: '#0c2236'
  },
  {
    id: 'insurance',
    label: 'Insurance',
    title: 'Settle claims faster with tailored software',
    body: 'Sharpen underwriting, make better-informed decisions and lower exposure with systems designed around how insurers work.',
    cta: 'Explore industry solutions',
    subLabel: 'Clients',
    kind: 'logos',
    items: ['Arvenna', 'SHIELDCO', 'kestrel/re', 'Brightmoor'],
    image: images.insurance,
    video: '',
    tint: '#2a2a22'
  },
  {
    id: 'fintech',
    label: 'Fintech',
    title: 'Lead the market in financial services',
    body: 'Manage risk with confidence and put large-scale data to work across banking, payments and wealth with purpose-built fintech products.',
    cta: 'Explore industry solutions',
    subLabel: 'Clients',
    kind: 'logos',
    items: ['Halden Bank', 'COVIRA', 'orbit/45', 'Pinecrest'],
    image: images.fintech,
    video: '',
    tint: '#3a3a40'
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    title: 'Reimagine how care gets delivered',
    body: 'Improve outcomes and keep care affordable with software shaped around the way your clinicians and patients work.',
    cta: 'Explore industry solutions',
    subLabel: 'Clients',
    kind: 'logos',
    items: ['Meridia Health', 'CAREPOINT', 'vitalis', 'Northgate Clinics'],
    image: images.healthcare,
    video: '',
    tint: '#0d2a44'
  }],

  serviceGroups: [
  { id: 'g1', title: 'Consulting', links: ['Technology consulting', 'Digital strategy', 'Product discovery', 'Due diligence'] },
  { id: 'g2', title: 'Data & AI', links: ['Artificial intelligence', 'Machine learning', 'Business intelligence', 'MLOps'] },
  { id: 'g3', title: 'Engineering', links: ['Custom software', 'Legacy modernisation', 'Mobile development', 'Quality assurance'] },
  { id: 'g4', title: 'Cloud & Ops', links: ['Cloud migration', 'DevOps', 'Cybersecurity', 'Managed services'] }],

  helpAreas: [
  {
    id: 'ai',
    title: 'AI-first operations',
    body: 'We find the places where agents, automation and robotics genuinely pay off, then roll them into daily work — trimming manual effort and cost while your people stay in charge of every decision.',
    image: images.data,
    video: '',
    outcomes: [
    'Clean, governed data that AI can rely on',
    'Agents that complete multi-step tasks without hand-offs',
    'Intelligence built into every customer interaction',
    'A staged route from first pilot to an AI-led operating model']

  },
  {
    id: 'product',
    title: 'Product engineering',
    body: 'Strategy, experience design, architecture and secure delivery in one team. AI is used across the whole lifecycle, so products reach customers sooner and keep earning after launch.',
    image: images.consult,
    video: '',
    outcomes: [
    'A tested vision with roadmap and measurable goals',
    'From MVP to full product — shipped and tracked',
    'Legacy systems rebuilt properly, not just repackaged',
    'Stable production with ongoing run and support']

  }],

  trustPoints: [
  { id: 't1', title: 'Single point of accountability', body: 'One team owns the work from first workshop to long-term support, backed by commercial guarantees and open reporting on progress and risk.' },
  { id: 't2', title: 'AI inside our delivery', body: 'AI-assisted engineering shortens delivery cycles by up to a third, always with senior review and strict quality gates.' },
  { id: 't3', title: 'Owned by our people', body: 'Our employees own the company, so every engineer has a real stake in the outcome of your project.' },
  { id: 't4', title: 'We build products too', body: 'Running our own products gives us first-hand knowledge of what it takes to launch, grow and operate software.' }],

  caseStudies: [
  { id: 'c1', client: 'TARVO', logoStyle: 'heavy', title: '70+ data feeds unified for faster decisions', desc: 'A single analytics layer across a national radio network', image: images.caseExec, videoUrl: '' },
  { id: 'c2', client: 'parcelo', logoStyle: 'round', title: 'Long-term migration powering a million deliveries a day', desc: 'Moving the full IT estate of a parcel carrier to the cloud', image: images.caseExec, videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  { id: 'c3', client: 'lumora', logoStyle: 'round', title: '3x quicker release cycle for a patient app', desc: 'Rebuilding a digital health product on a modern stack', image: images.caseWoman, videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  { id: 'c4', client: 'Ashford Clubs', logoStyle: 'script', title: 'One membership app across 100+ health clubs', desc: 'A unified digital experience for members and staff', image: images.fintech, videoUrl: '' }],

  partnershipStats: [
  { id: 's1', value: '1,200+', label: 'projects delivered' },
  { id: 's2', value: '140+', label: 'active clients, many in the Fortune 500' },
  { id: 's3', value: '30+', label: 'years in software engineering' },
  { id: 's4', value: '20', label: 'offices and delivery centres worldwide' }],

  industries: [
  { id: 'fintech', icon: 'fintech', name: 'Fintech', benefits: ['Stay ahead of financial risk', 'Faster transactions at lower cost'], image: images.fintech },
  { id: 'energy', icon: 'energy', name: 'Energy', benefits: ['Automate operations end to end', 'Shrink your carbon footprint'], image: images.energy },
  { id: 'government', icon: 'government', name: 'Government', benefits: ['Bring public services online', 'Protect citizens from cyber threats'], image: images.consult },
  { id: 'healthcare', icon: 'healthcare', name: 'Healthcare', benefits: ['Raise the standard of patient care', 'Cut admin work and operating cost'], image: images.healthcare },
  { id: 'pharma', icon: 'pharma', name: 'Pharma', benefits: ['Link research with clinical trials', 'Simplify manufacturing and supply'], image: images.menu },
  { id: 'biotech', icon: 'biotech', name: 'Biotech', benefits: ['Connect lab systems, drop manual steps', 'Adopt AI with compliance designed in'], image: images.data },
  { id: 'insurance', icon: 'insurance', name: 'Insurance', benefits: ['Underwrite with automation', 'Resolve claims quickly and fairly'], image: images.insurance },
  { id: 'hospitality', icon: 'hospitality', name: 'Hospitality', benefits: ['Tailor every guest experience', 'Grow direct bookings and loyalty'], image: images.caseWoman },
  { id: 'retail', icon: 'retail', name: 'Retail', benefits: ['Lift engagement and conversion', 'Move to dynamic pricing'], image: images.fintech },
  { id: 'logistics', icon: 'logistics', name: 'Logistics', benefits: ['Speed up the whole supply chain', 'Get more from every warehouse'], image: images.overview },
  { id: 'automotive', icon: 'automotive', name: 'Automotive', benefits: ['Delight drivers, grow sales', 'Build smarter driver-assist features'], image: images.energy },
  { id: 'agriculture', icon: 'agriculture', name: 'Agriculture', benefits: ['Increase yield and revenue', 'Run the farm from one connected view'], image: images.insurance },
  { id: 'media', icon: 'media', name: 'Media & Entertainment', benefits: ['Create immersive audience experiences', 'Personalise content with analytics and AI'], image: images.caseExec }],

  insights: [
  { id: 'i1', type: 'Article', date: 'Oct 14, 2026', title: 'Securing ageing medical devices: a practical checklist for healthcare leaders', read: '8 min read', image: images.healthcare },
  { id: 'i2', type: 'Report', date: 'Sep 30, 2026', title: 'Why most AI pilots stall — and the operating model that fixes it', read: '12 min read', image: images.data },
  { id: 'i3', type: 'Article', date: 'Sep 18, 2026', title: 'Data contracts: a working guide for platform teams', read: '6 min read', image: images.overview }],

  footerColumns: [
  { id: 'f1', title: 'Services', links: ['Strategy & consulting', 'Data & AI', 'Software engineering', 'Cloud & DevOps', 'Product design'] },
  { id: 'f2', title: 'Industries', links: ['Fintech', 'Insurance', 'Healthcare', 'Retail', 'Logistics'] },
  { id: 'f3', title: 'Company', links: ['About us', 'Careers', 'Clients', 'Newsroom', 'Contacts'] }],

  countries: ['United States', 'United Kingdom', 'Germany', 'Ukraine', 'Japan', 'Canada', 'Netherlands', 'Poland', 'Other']
};

export const aiGuideAnswers = [
{ keywords: ['ai', 'data', 'ml', 'machine'], answer: 'Our Data & AI practice covers data platforms, generative AI and MLOps. A typical engagement starts with a 2-week discovery to identify the highest-value use case.' },
{ keywords: ['cloud', 'devops', 'migration', 'aws', 'azure'], answer: 'We plan and run cloud migrations end to end, then operate workloads with DevOps and SRE teams.' },
{ keywords: ['price', 'cost', 'budget', 'rate', 'pricing'], answer: 'Pricing depends on team shape and duration. Share a few details in the contact form and a consultant will come back with an estimate within two business days.' },
{ keywords: ['legacy', 'modern', 'old'], answer: 'We modernise legacy systems incrementally — API layers and phased data migration — so the business keeps running throughout.' },
{ keywords: ['career', 'job', 'hire'], answer: 'We are always hiring engineers, analysts and designers. Visit the Careers link in the footer to see open roles.' }];