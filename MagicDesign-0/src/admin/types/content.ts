export type SlideKind = 'awards' | 'links' | 'logos';
export type LogoStyle = 'heavy' | 'serif' | 'round' | 'script';
export type IndustryIconKey =
'fintech' | 'pharma' | 'energy' | 'healthcare' | 'insurance' | 'biotech' | 'government' |
'logistics' | 'hospitality' | 'automotive' | 'retail' | 'agriculture' | 'media';

export type NavItem = {id: string;label: string;href: string;menu: '' | 'services' | 'industries';};

export type HeroSlide = {
  id: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  subLabel: string;
  kind: SlideKind;
  items: string[];
  image: string;
  video: string;
  tint: string;
};

export type ServiceGroup = {id: string;title: string;links: string[];};
export type HelpArea = {id: string;title: string;body: string;image: string;video: string;outcomes: string[];};
export type TrustPoint = {id: string;title: string;body: string;};
export type CaseStudy = {id: string;client: string;logoStyle: LogoStyle;title: string;desc: string;image: string;videoUrl: string;};
export type Stat = {id: string;value: string;label: string;};
export type Industry = {id: string;icon: IndustryIconKey;name: string;benefits: string[];image: string;};
export type Insight = {id: string;type: string;date: string;title: string;read: string;image: string;};
export type FooterColumn = {id: string;title: string;links: string[];};

export type SiteSettings = {
  brandName: string;
  contactEmail: string;
  contactPhone: string;
  consultTitle: string;
  consultImage: string;
  servicesMenuTitle: string;
  servicesMenuText: string;
  servicesMenuImage: string;
  industriesMenuTitle: string;
  industriesMenuText: string;
  industriesMenuImage: string;
  aiGuideEnabled: boolean;
};

export type SectionTexts = {
  helpHeading: string;
  helpOutcomesLabel: string;
  trustHeading: string;
  casesLabel: string;
  casesHeading: string;
  partnershipHeading: string;
  sectorsHeading: string;
  insightsHeading: string;
  contactHeading: string;
};

export type SiteContent = {
  settings: SiteSettings;
  sections: SectionTexts;
  navItems: NavItem[];
  heroSlides: HeroSlide[];
  serviceGroups: ServiceGroup[];
  helpAreas: HelpArea[];
  trustPoints: TrustPoint[];
  caseStudies: CaseStudy[];
  partnershipStats: Stat[];
  industries: Industry[];
  insights: Insight[];
  footerColumns: FooterColumn[];
  countries: string[];
};

export type CollectionKey =
'navItems' | 'heroSlides' | 'serviceGroups' | 'helpAreas' | 'trustPoints' | 'caseStudies' |
'partnershipStats' | 'industries' | 'insights' | 'footerColumns';

export type Submission = {
  id: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  createdAt: number;
  read: boolean;
};

export type MediaAsset = {
  id: string;
  name: string;
  kind: 'image' | 'video';
  src: string;
  size: number;
  createdAt: number;
};