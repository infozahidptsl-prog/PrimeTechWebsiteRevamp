import React, { useState } from 'react';
import { ArrowUpRightIcon, ChevronDownIcon, CheckCircle2, ShieldCheckIcon, TrendingUpIcon, CpuIcon, LockIcon } from 'lucide-react';

type IndustryDetailPageProps = {
  industryId: string;
  onContact: () => void;
};

const industryDataMap: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  heroImg: string;
  benefitsTitle: string;
  benefitsDesc: string;
  benefits: { num: string; title: string; text: string }[];
  servicesTitle: string;
  services: { title: string; desc: string; icon: string }[];
  faqs: { q: string; a: string }[];
}> = {
  fintech: {
    title: 'Financial Software Development',
    subtitle: 'Fintech Solutions',
    description: 'We help the financial services sector manage risk and unlock Big Data’s potential – with advanced analytics, Machine Learning and robust regulatory compliance.',
    heroImg: '/eleks/financial-software-development-head.jpg',
    benefitsTitle: 'What you get with ELEKS’ financial software development',
    benefitsDesc: 'ELEKS is a reliable software development partner trusted by global financial enterprises and world-renowned banks. Our financial software development services empower financial institutions to deliver industry-leading services with enhanced operational efficiency, reduced transaction costs, and streamlined risk management.',
    benefits: [
      { num: '01', title: 'Data security & regulatory compliance', text: 'End-to-end protection compliant with PCI DSS, GDPR, ISO 27001, SOC 2, and open banking standards.' },
      { num: '02', title: 'AI & intelligent automation', text: 'Automated fraud detection, risk scoring models, and algorithmic trading pipelines.' },
      { num: '03', title: 'Modernized core banking & payment rails', text: 'Seamless migration of legacy transactional backends into resilient, cloud-native microservices.' },
      { num: '04', title: 'Hyper-personalized customer experiences', text: 'Omnichannel web & mobile digital banking portals designed for intuitive wealth management.' }
    ],
    servicesTitle: 'What’s included in our fintech software development services',
    services: [
      { title: 'Digital Banking Solutions', desc: 'Secure retail & commercial internet and mobile banking platforms with biometrics and instant settlements.', icon: '🏦' },
      { title: 'Payment Gateways & Wallets', desc: 'Real-time multi-currency processing, POS integrations, and international cross-border payment rails.', icon: '💳' },
      { title: 'WealthTech & Robo-Advisors', desc: 'Automated portfolio balancing, predictive investment forecasting, and quantitative analytics.', icon: '📈' },
      { title: 'InsurTech & Underwriting Engines', desc: 'Automated claims intake, parametric policy engines, and ML-assisted risk assessment.', icon: '🛡️' },
      { title: 'RegTech & Compliance Monitoring', desc: 'KYC/AML verification workflows, real-time transaction surveillance, and regulatory audit reporting.', icon: '⚖️' },
      { title: 'Blockchain & Smart Contracts', desc: 'Decentralized ledger technology, tokenized asset accounting, and transparent settlement protocols.', icon: '🔗' }
    ],
    faqs: [
      { q: 'What compliance certifications does ELEKS uphold for financial software?', a: 'ELEKS complies with ISO 27001, ISO 9001, SOC 2 Type II, and implements controls for PCI DSS and regional banking regulations (GDPR, CCPA, PSD2).' },
      { q: 'How does ELEKS approach migrating legacy financial systems?', a: 'We use incremental domain-driven modernization (Strangler Fig pattern), ensuring zero downtime for mission-critical core banking and accounting pipelines.' },
      { q: 'Can you integrate custom AI models into existing banking platforms?', a: 'Yes, our Data & AI team designs secure on-premise or private-cloud ML pipelines for fraud mitigation, conversational banking assistants, and credit scoring.' }
    ]
  },
  energy: {
    title: 'Energy & Utilities Software Solutions',
    subtitle: 'Energy',
    description: 'Transforming energy generation, smart grid management, and sustainability tracking through IoT telemetry, predictive maintenance, and cloud computing.',
    heroImg: '/eleks/industry-energy-big.jpg',
    benefitsTitle: 'What you get with ELEKS’ energy software engineering',
    benefitsDesc: 'We partner with utility providers, renewable operators, and grid administrators to optimize asset performance, minimize carbon footprint, and ensure energy grid reliability.',
    benefits: [
      { num: '01', title: 'Smart Grid Telemetry & SCADA', text: 'Sub-second real-time sensor processing and distributed energy resource management.' },
      { num: '02', title: 'Predictive Maintenance & Asset Health', text: 'AI-driven failure prediction reducing downtime across turbines, pipelines, and substations.' },
      { num: '03', title: 'Renewable Forecasting & Trading', text: 'Weather-integrated ML algorithms forecasting solar and wind yield for spot-market trading.' },
      { num: '04', title: 'Decarbonization & ESG Reporting', text: 'Automated audit trails tracking greenhouse emissions across corporate supply chains.' }
    ],
    servicesTitle: 'Energy sector software capabilities',
    services: [
      { title: 'Smart Metering & AMI Systems', desc: 'Advanced metering infrastructure with high-volume real-time ingestion.', icon: '⚡' },
      { title: 'Pipeline & Asset Monitoring', desc: 'Digital twins for pipelines, plants, and high-voltage transmission lines.', icon: '🏭' },
      { title: 'Energy Trading Platforms', desc: 'Low-latency trading desks and hedging management platforms.', icon: '📊' },
      { title: 'EV Fleet & Charging Networks', desc: 'Load balancing, charger reservation, and vehicle-to-grid (V2G) systems.', icon: '🔋' }
    ],
    faqs: [
      { q: 'How do you handle cybersecurity for critical infrastructure?', a: 'We implement IEC 62443 and NERC CIP compliance, air-gapped network segmentation, and hardware-secured IoT data pipelines.' }
    ]
  },
  insurance: {
    title: 'InsurTech Software Solutions',
    subtitle: 'Insurance',
    description: 'Modernizing insurance lifecycle operations with automated underwriting, computer-vision claims inspection, and policy administration platforms.',
    heroImg: '/eleks/industry-insurance-big.jpg',
    benefitsTitle: 'What you get with ELEKS’ InsurTech software development',
    benefitsDesc: 'Empowering tier-1 insurers and fast-scaling InsurTechs to accelerate policy issuance, minimize claim handling costs, and prevent fraudulent payouts.',
    benefits: [
      { num: '01', title: 'Automated First Notice of Loss (FNOL)', text: 'Instant multichannel claims reporting with AI damage verification.' },
      { num: '02', title: 'Telematics & Usage-Based Insurance', text: 'Connected car and IoT tracking for dynamic risk-adjusted premiums.' },
      { num: '03', title: 'Legacy PAS Modernization', text: 'Decoupling archaic mainframe policy admin systems into agile cloud services.' },
      { num: '04', title: 'Fraud Detection Algorithms', text: 'Graph neural networks surfacing hidden fraud syndicates.' }
    ],
    servicesTitle: 'Insurance software development services',
    services: [
      { title: 'Policy Administration Systems (PAS)', desc: 'Full lifecycle quote, bind, issue, endorse, and renewal workflows.', icon: '📄' },
      { title: 'Claims Management Automation', desc: 'Straight-through claims processing reducing settlement from weeks to minutes.', icon: '⚡' },
      { title: 'Actuarial & Risk Analytics', desc: 'High-throughput statistical simulation models for catastrophe underwriting.', icon: '🎯' },
      { title: 'Customer Self-Service Portals', desc: 'Native mobile apps and web portals for policyholders and independent agents.', icon: '📱' }
    ],
    faqs: [
      { q: 'Can you integrate with Guidewire or Duck Creek?', a: 'Yes, our engineers frequently develop custom integrations, middleware, and extensions around Guidewire and Duck Creek ecosystems.' }
    ]
  }
};

export function IndustryDetailPage({ industryId, onContact }: IndustryDetailPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Fallback to fintech if id not matched directly
  const data = industryDataMap[industryId] || {
    title: `${industryId.charAt(0).toUpperCase() + industryId.slice(1)} Software Development`,
    subtitle: industryId.charAt(0).toUpperCase() + industryId.slice(1),
    description: `Tailored digital engineering and innovation solutions for the ${industryId} sector.`,
    heroImg: `/eleks/industry-${industryId}-big.jpg`,
    benefitsTitle: `What you get with ELEKS’ ${industryId} solutions`,
    benefitsDesc: `We bring 30+ years of domain engineering expertise to help you innovate, scale, and outperform in the ${industryId} industry.`,
    benefits: industryDataMap.fintech.benefits,
    servicesTitle: `Software capabilities for ${industryId}`,
    services: industryDataMap.fintech.services,
    faqs: industryDataMap.fintech.faqs
  };

  return (
    <div className="w-full bg-white text-ink">
      {/* Hero Section */}
      <section className="relative bg-[#16181f] px-5 py-16 text-white md:px-14 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[620px]">
            <span className="text-[14px] font-bold uppercase tracking-wider text-white/60">
              Industries / {data.subtitle}
            </span>
            <h1 className="mt-4 font-serif text-[40px] font-light leading-[1.08] md:text-[56px] xl:text-[68px]">
              {data.title}
            </h1>
            <p className="mt-6 text-[16px] leading-[1.65] text-white/80 md:text-[18px]">
              {data.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onContact}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-[15px] font-bold text-ink transition-transform hover:scale-105 hover:bg-soft"
              >
                <span>Get expert advice</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="w-full lg:max-w-[560px]">
            <div className="overflow-hidden rounded-[12px] shadow-2xl">
              <img
                src={data.heroImg}
                alt={data.title}
                onError={(e) => {
                  // Fallback if specific file missing
                  (e.target as HTMLImageElement).src = '/eleks/financial-software-development-head.jpg';
                }}
                className="h-[360px] w-full object-cover md:h-[440px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#f8f9fc] px-5 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-[14px] font-bold uppercase tracking-wider text-muted">What We Offer</span>
              <h2 className="mt-4 font-serif text-[32px] font-light leading-[1.2] text-ink md:text-[42px]">
                {data.benefitsTitle}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[16px] leading-relaxed text-muted md:text-[18px]">
                {data.benefitsDesc}
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {data.benefits.map((b) => (
              <div key={b.num} className="rounded-[8px] bg-white p-7 shadow-sm border border-[#e9edf3]">
                <div className="font-serif text-[36px] font-light text-brand">{b.num}</div>
                <h3 className="mt-4 text-[18px] font-bold leading-snug text-ink">{b.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-5 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <span className="text-[14px] font-bold uppercase tracking-wider text-muted">Our Capabilities</span>
          <h2 className="mt-4 font-serif text-[32px] font-light text-ink md:text-[42px]">
            {data.servicesTitle}
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.services.map((s) => (
              <div key={s.title} className="rounded-[10px] border border-[#e9edf3] p-7 transition-all hover:border-brand hover:shadow-md">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="mt-5 text-[19px] font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f8f9fc] px-5 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[960px]">
          <span className="text-[14px] font-bold uppercase tracking-wider text-muted">Common Questions</span>
          <h2 className="mt-4 font-serif text-[32px] font-light text-ink md:text-[42px]">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 divide-y divide-[#e9edf3] rounded-[10px] bg-white p-6 shadow-sm border border-[#e9edf3]">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="py-5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left text-[17px] font-bold text-ink"
                  >
                    <span>{faq.q}</span>
                    <ChevronDownIcon className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onContact}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-8 text-[15px] font-bold text-white shadow-md transition-all hover:bg-brand"
            >
              <span>Discuss your {data.subtitle} project</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

