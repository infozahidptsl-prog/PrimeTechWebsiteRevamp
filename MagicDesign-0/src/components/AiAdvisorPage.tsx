import React, { useState } from 'react';
import { ArrowRightIcon, ArrowUpRightIcon, CheckCircle2, ChevronRightIcon } from 'lucide-react';

const steps = [
  { id: 1, title: 'Your industry' },
  { id: 2, title: 'Processes to improve' },
  { id: 3, title: 'Business objectives' },
  { id: 4, title: 'Operational challenges' },
  { id: 5, title: 'Your results' }
];

const industriesList = [
  'Financial services & Banking',
  'Healthcare & Life Sciences',
  'Insurance',
  'Retail & E-commerce',
  'Logistics & Supply Chain',
  'Energy & Utilities',
  'Manufacturing & High-Tech',
  'Media & Entertainment'
];

const processesList = [
  'Customer Support & Engagement',
  'Data Analytics & Business Intelligence',
  'Workflow & Document Automation',
  'Fraud Detection & Security',
  'Software Development & QA',
  'Supply Chain & Operations'
];

const objectivesList = [
  'Accelerate operational efficiency & reduce costs',
  'Improve customer satisfaction & retention',
  'Launch AI-driven digital products faster',
  'Modernize legacy systems with automation',
  'Ensure regulatory compliance & data governance'
];

const challengesList = [
  'Data silos and unstandardized information',
  'Lack of internal AI/ML technical expertise',
  'High security, compliance, or regulatory hurdles',
  'Integration friction with legacy tech stacks',
  'Unclear ROI and prioritization of AI initiatives'
];

export function AiAdvisorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const toggleSelect = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleStart = () => {
    const target = document.getElementById('assessment');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#16181f] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[580px] overflow-hidden px-5 pb-16 pt-12 md:px-14 lg:min-h-[640px] lg:pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/eleks/ai-solutions-advisor-bg.jpg"
            alt="AI solutions advisor"
            className="h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#16181f]/95 via-[#16181f]/70 to-transparent" />
        </div>

        <div className="relative z-10 flex min-h-[500px] flex-col justify-between max-w-[1280px]">
          <div>
            <h1 className="font-serif text-[42px] font-light leading-[1.1] md:text-[64px] xl:text-[76px]">
              AI solutions advisor
            </h1>
            <p className="mt-6 max-w-[620px] text-[16px] leading-[1.6] text-white/90 md:text-[18px]">
              Answer 4 quick questions and let our AI-powered advisor generate a personalized recommendation tailored to your industry and business objectives.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-bold text-ink transition-transform hover:scale-105 hover:bg-soft"
              >
                <span>Start the assessment</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* What you'll get horizontal highlights */}
          <div className="mt-16 border-t border-white/20 pt-8">
            <h3 className="text-[14px] font-bold uppercase tracking-wider text-white/60">What you'll get</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <div className="border-l border-white/20 pl-4 text-[14px] leading-relaxed text-white/80">
                A customized AI solution aligned with your specific needs
              </div>
              <div className="border-l border-white/20 pl-4 text-[14px] leading-relaxed text-white/80">
                Expected ROI based on industry benchmarks
              </div>
              <div className="border-l border-white/20 pl-4 text-[14px] leading-relaxed text-white/80">
                Insights into potential challenges
              </div>
              <div className="border-l border-white/20 pl-4 text-[14px] leading-relaxed text-white/80">
                Clear implementation requirements and roadmap
              </div>
              <div className="border-l border-white/20 pl-4 text-[14px] leading-relaxed text-white/80">
                Practical steps to get started
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 5-Step Assessment Section */}
      <section id="assessment" className="bg-[#f8f9fc] py-16 text-ink md:py-24">
        <div className="mx-auto max-w-[1140px] px-5 md:px-10">
          <div className="overflow-hidden rounded-[16px] bg-white shadow-xl">
            {/* Step Header Indicator */}
            <div className="grid grid-cols-5 border-b border-[#e9edf3] bg-[#fdfdfe]">
              {steps.map((s) => {
                const isCurrent = s.id === currentStep;
                const isPast = s.id < currentStep;
                return (
                  <div
                    key={s.id}
                    className={`flex flex-col border-r border-[#e9edf3] p-4 last:border-r-0 transition-colors ${
                      isCurrent
                        ? 'border-b-2 border-b-brand bg-white text-brand'
                        : isPast
                        ? 'text-ink/80'
                        : 'text-muted'
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Step {s.id} {isPast && '✓'}
                    </span>
                    <span className="mt-1 text-[13px] font-semibold sm:text-[14px]">{s.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Assessment Content */}
            <div className="p-8 md:p-14">
              {currentStep === 1 && (
                <div>
                  <h2 className="font-serif text-[28px] font-light text-ink md:text-[34px]">
                    Which industry does your organization operate in?
                  </h2>
                  <p className="mt-2 text-[14px] text-muted">Select the primary sector for your AI initiative.</p>
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {industriesList.map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => setSelectedIndustry(ind)}
                        className={`flex items-center justify-between rounded-[8px] border p-4 text-left font-medium transition-all ${
                          selectedIndustry === ind
                            ? 'border-brand bg-[#edf2fe] text-brand ring-1 ring-brand'
                            : 'border-[#dce1ec] hover:border-ink hover:bg-[#fafafc]'
                        }`}
                      >
                        <span>{ind}</span>
                        {selectedIndustry === ind && <CheckCircle2 className="h-5 w-5 text-brand" />}
                      </button>
                    ))}
                  </div>
                  <div className="mt-10 flex justify-end">
                    <button
                      type="button"
                      disabled={!selectedIndustry}
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-7 text-[14px] font-bold text-white transition-opacity disabled:opacity-40"
                    >
                      Next step <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="font-serif text-[28px] font-light text-ink md:text-[34px]">
                    What processes are you looking to enhance with AI?
                  </h2>
                  <p className="mt-2 text-[14px] text-muted">Select all relevant functional domains (multi-select).</p>
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {processesList.map((proc) => {
                      const sel = selectedProcesses.includes(proc);
                      return (
                        <button
                          key={proc}
                          type="button"
                          onClick={() => toggleSelect(selectedProcesses, setSelectedProcesses, proc)}
                          className={`flex items-center justify-between rounded-[8px] border p-4 text-left font-medium transition-all ${
                            sel
                              ? 'border-brand bg-[#edf2fe] text-brand ring-1 ring-brand'
                              : 'border-[#dce1ec] hover:border-ink hover:bg-[#fafafc]'
                          }`}
                        >
                          <span>{proc}</span>
                          {sel && <CheckCircle2 className="h-5 w-5 text-brand" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-6 text-[14px] font-bold text-ink hover:bg-soft"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={selectedProcesses.length === 0}
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-7 text-[14px] font-bold text-white transition-opacity disabled:opacity-40"
                    >
                      Next step <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="font-serif text-[28px] font-light text-ink md:text-[34px]">
                    What are your key business objectives?
                  </h2>
                  <p className="mt-2 text-[14px] text-muted">Choose the primary outcomes you expect from an AI solution.</p>
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {objectivesList.map((obj) => {
                      const sel = selectedObjectives.includes(obj);
                      return (
                        <button
                          key={obj}
                          type="button"
                          onClick={() => toggleSelect(selectedObjectives, setSelectedObjectives, obj)}
                          className={`flex items-center justify-between rounded-[8px] border p-4 text-left font-medium transition-all ${
                            sel
                              ? 'border-brand bg-[#edf2fe] text-brand ring-1 ring-brand'
                              : 'border-[#dce1ec] hover:border-ink hover:bg-[#fafafc]'
                          }`}
                        >
                          <span>{obj}</span>
                          {sel && <CheckCircle2 className="h-5 w-5 text-brand" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-6 text-[14px] font-bold text-ink hover:bg-soft"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={selectedObjectives.length === 0}
                      onClick={() => setCurrentStep(4)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-7 text-[14px] font-bold text-white transition-opacity disabled:opacity-40"
                    >
                      Next step <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h2 className="font-serif text-[28px] font-light text-ink md:text-[34px]">
                    What operational challenges are slowing you down?
                  </h2>
                  <p className="mt-2 text-[14px] text-muted">Identify existing barriers across your technology & data landscape.</p>
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {challengesList.map((ch) => {
                      const sel = selectedChallenges.includes(ch);
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => toggleSelect(selectedChallenges, setSelectedChallenges, ch)}
                          className={`flex items-center justify-between rounded-[8px] border p-4 text-left font-medium transition-all ${
                            sel
                              ? 'border-brand bg-[#edf2fe] text-brand ring-1 ring-brand'
                              : 'border-[#dce1ec] hover:border-ink hover:bg-[#fafafc]'
                          }`}
                        >
                          <span>{ch}</span>
                          {sel && <CheckCircle2 className="h-5 w-5 text-brand" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-6 text-[14px] font-bold text-ink hover:bg-soft"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={selectedChallenges.length === 0}
                      onClick={() => setCurrentStep(5)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-7 text-[14px] font-bold text-white shadow-md hover:bg-brand-hover"
                    >
                      Generate My Recommendation <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-8">
                  <div>
                    <span className="inline-block rounded-full bg-[#edf2fe] px-3.5 py-1 text-[12px] font-bold tracking-wide text-brand">
                      Custom Recommendation Generated
                    </span>
                    <h2 className="mt-3 font-serif text-[32px] font-light text-ink md:text-[40px]">
                      Your Tailored Enterprise AI Blueprint
                    </h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
                      Based on your selection for <strong className="text-ink">{selectedIndustry}</strong>, here is our targeted AI deployment roadmap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-[10px] bg-[#f8f9fc] p-6 border border-[#e9edf3]">
                      <h4 className="text-[14px] font-bold uppercase tracking-wider text-muted">Recommended AI Architecture</h4>
                      <p className="mt-3 text-[18px] font-semibold text-ink">Agentic Workflow & Multi-Model RAG Pipeline</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        Automates end-to-end task routing while grounding LLM reasoning with your proprietary enterprise knowledge base.
                      </p>
                    </div>

                    <div className="rounded-[10px] bg-[#f8f9fc] p-6 border border-[#e9edf3]">
                      <h4 className="text-[14px] font-bold uppercase tracking-wider text-muted">Expected Impact</h4>
                      <p className="mt-3 text-[18px] font-semibold text-brand">35% - 50% Efficiency Uplift</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        Measurable reduction in manual cycle times and significant acceleration in operational decision throughput.
                      </p>
                    </div>

                    <div className="rounded-[10px] bg-[#f8f9fc] p-6 border border-[#e9edf3]">
                      <h4 className="text-[14px] font-bold uppercase tracking-wider text-muted">Next Recommended Step</h4>
                      <p className="mt-3 text-[18px] font-semibold text-ink">PoC & Feasibility Sprint (2–4 weeks)</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        De-risk the technical stack and benchmark accuracy on a targeted subset of your organizational data.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e9edf3] pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        setSelectedIndustry('');
                        setSelectedProcesses([]);
                        setSelectedObjectives([]);
                        setSelectedChallenges([]);
                      }}
                      className="text-[14px] font-semibold text-muted underline hover:text-ink"
                    >
                      Reset and retake assessment
                    </button>
                    <a
                      href="#contact"
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-8 text-[15px] font-bold text-white shadow-md transition-all hover:bg-brand-hover hover:scale-105"
                    >
                      Book Free AI Architecture Session <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

