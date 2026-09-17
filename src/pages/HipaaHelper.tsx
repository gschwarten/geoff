import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FileCheck2, MousePointerClick, Scale, Radio, UploadCloud, ToggleRight,
  Handshake, Ban, Tag, Gavel, ClipboardList, HeartPulse, AlertTriangle,
} from 'lucide-react';

type Principle = {
  headline: string;
  line: string;
  evidence: string;
  practice: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

const PRINCIPLES: Principle[] = [
  {
    headline: "Don't violate your privacy policy.",
    line: 'Every claim about privacy or cost has to match what the site actually does.',
    evidence: 'GoodRx said "never share." Monument said "100% confidential." Hims said "Pay $0 today." In each case the tags or the billing did the opposite, and that gap was the charge. The pixel was evidence; the promise was the violation.',
    practice: 'List every promise on the site, in ads, and in the privacy policy. Check each against the actual network requests and the billing flow. Fix the flow or delete the promise.',
    Icon: FileCheck2,
  },
  {
    headline: 'Page visits are health data.',
    line: 'Visiting a condition page or tapping "call" counts as health data.',
    evidence: 'A visit to a Suboxone page plus a call tap tells a platform that this person is seeking addiction treatment. Regulators treated that inference as health data in every case. No diagnosis code was needed.',
    practice: 'Treat condition pages, intake, scheduling, and the act of calling or texting as health data, whatever the company\'s HIPAA status.',
    Icon: MousePointerClick,
  },
  {
    headline: 'HIPAA is not the only law.',
    line: 'Being outside HIPAA does not protect you. FTC and state laws apply anyway.',
    evidence: 'GoodRx, Flo, and Premom were not HIPAA covered entities and were hit hardest. AHA v. Becerra narrowed what HHS can enforce on public pages and changed nothing for the FTC Act, the Health Breach Notification Rule, California\'s CMIA and CIPA, Washington\'s My Health My Data Act, or 42 CFR Part 2.',
    practice: '"We are not a covered entity" and "those pages are public" are where the analysis begins, not where it ends.',
    Icon: Scale,
  },
  {
    headline: 'Every event is a disclosure.',
    line: 'Every event sent to an ad platform discloses that person\'s health interest.',
    evidence: 'What reaches the vendor is the event name, the page URL, the IP address, and the vendor\'s own cookie, together. A neutral event name does not help when the URL says /suboxone. Monument\'s "Paid Skip Trial" event and Hims\'s "Events" were the disclosures.',
    practice: 'List every event and parameter per vendor and assume the vendor can read all of it.',
    Icon: Radio,
  },
  {
    headline: "Don't upload patient lists.",
    line: 'Sending patient lists or server-side conversions is worse than a pixel, not safer.',
    evidence: 'GoodRx and Hims both uploaded customer lists labeled by condition. Hims also used Meta\'s Conversions API. A confirmed patient record is a bigger disclosure than a browser hit, hashed or not.',
    practice: 'No per-person uploads of health-derived data to ad platforms, by any route.',
    Icon: UploadCloud,
  },
  {
    headline: "Get real consent or don't collect.",
    line: 'Consent only counts as a separate, explicit opt-in before any data moves.',
    evidence: 'Privacy-policy language saying users "may choose" to limit sharing failed at Hims. A cookie banner is not health-data consent under Washington\'s law.',
    practice: 'If consent is the basis, it names the recipient and the purpose, defaults to off, and happens first. Otherwise do not collect.',
    Icon: ToggleRight,
  },
  {
    headline: "Vendors won't take the blame.",
    line: 'Meta and Google will not share your liability. You own every third-party script.',
    evidence: 'Neither platform signs a business associate agreement, their terms put responsibility on the advertiser, and Meta\'s health restrictions apply automatically. Session replay and chat widgets are now the favorite targets of wiretap suits.',
    practice: 'Every third-party script is a data recipient until proven otherwise. No BAA means no health data.',
    Icon: Handshake,
  },
  {
    headline: 'The ban is the penalty.',
    line: 'The punishment that hurts is a permanent ban on health data in ads, not the fine.',
    evidence: 'Fines ran from $200K to $7.8M. Every FTC order also barred the company from using health data for advertising for good, required deletion, and imposed a twenty-year compliance program. That ends retargeting, lookalikes, and conversion-optimized bidding permanently.',
    practice: 'Build growth that never depended on them: search intent, contextual placement, geography, first-party call and text attribution, aggregate measurement.',
    Icon: Ban,
  },
  {
    headline: '"Free" has to mean free.',
    line: '"Free" offers with a charge behind them get prosecuted alongside the privacy violations.',
    evidence: 'Cerebral and Hims both paired pixel counts with subscription counts under ROSCA: free consultations that led to a charge, auto-enrollment when a prescription was written, refills billed early, cancellation friction.',
    practice: '"Free" only when nothing in that flow is charged. Disclose a recurring charge before it happens. Make cancelling as easy as signing up.',
    Icon: Tag,
  },
  {
    headline: 'Plaintiffs hit harder than regulators.',
    line: 'Private lawsuits under old wiretap laws are the larger financial threat.',
    evidence: 'California\'s CIPA carries $5,000 per violation, which is why Meta faces billions over Flo. CMIA allows $1,000 per person with no proof of harm. Breach notification letters seed the class actions. Courts are split on public pages but consistent on portals, forms, and intake.',
    practice: 'Highest scrutiny on anything behind a login or that captures a form field, then on condition pages.',
    Icon: Gavel,
  },
  {
    headline: 'Keep the tracking inventory current.',
    line: 'Keep a written inventory of every tag, event, and approval before anyone asks.',
    evidence: 'After an incident counsel asks for every tag and its live dates, every event and parameter, the identifiers on each channel\'s links, the advanced matching state, the vendor list, consent state, every form and where it posts, retention, creatives, complaints, and archives.',
    practice: 'Keep a one-page tracking inventory, dated, with written approvals attached, updated on every change. Answering in a day is the difference between a routine file and a problem.',
    Icon: ClipboardList,
  },
  {
    headline: 'No pixels on sensitive care sites.',
    line: 'For substance use, mental health, and reproductive care, run no ad pixels at all.',
    evidence: 'Monument, Cerebral, Flo, and Premom were all in these categories, and 42 CFR Part 2 is stricter than HIPAA for substance use.',
    practice: 'No ad platform tags on the site. No testimonials without written authorization. No brand-name drug claims beyond the label. LegitScript certification where the platforms require it.',
    Icon: HeartPulse,
  },
];

const CASES: { name: string; when: string; note: string }[] = [
  { name: 'GoodRx', when: 'Feb 2023', note: 'FTC. $1.5M. First Health Breach Notification Rule case. Permanent ban on health data in ads.' },
  { name: 'BetterHelp', when: 'Mar 2023', note: 'FTC. $7.8M in refunds. Intake answers sent to Meta, Snap, Criteo, Pinterest. Permanent ban.' },
  { name: 'Premom', when: 'May 2023', note: 'FTC. $200K. Fertility app SDKs sent data to AppsFlyer, Google, and two Chinese analytics firms.' },
  { name: 'Cerebral', when: 'Apr 2024', note: 'FTC. $7M. Pixels exposed 3.2M consumers; cancellation obstruction under ROSCA.' },
  { name: 'Monument', when: 'Apr 2024', note: 'FTC. Alcohol treatment telehealth sent custom events to Meta and Google for 84K users. Ban plus deletion.' },
  { name: 'Flo Health v. Meta', when: 'Aug 2025', note: 'Jury found Meta liable under California\'s CIPA. Flo settled for $59.5M. Meta faces $5,000 per class member.' },
  { name: 'Hospital pixel suits', when: '2022 to 2026', note: 'Advocate Aurora $12.2M, Novant $6.6M, Eisenhower $875K. Some dismissed where visits alone did not reveal health information.' },
  { name: 'AHA v. Becerra', when: 'Jun 2024', note: 'Court vacated the HHS rule treating IP plus a condition page as PHI on public pages. FTC and state law untouched.' },
  { name: 'Hims & Hers', when: 'Jul 2026, pending', note: 'FTC, Utah, and Los Angeles County. Pixels, Conversions API, condition-labeled customer lists, "Pay $0 today" billing.' },
];

const LINES = {
  clear: [
    'Search ads on intent keywords, with no conversion tags on the site',
    'Geographic and zip-level targeting',
    'Contextual placements chosen by page, not by person',
    'A unique phone number and text line per channel, matched in the phone system',
    'First-party analytics under a BAA, or self-hosted with no link to an ad platform',
    'Reporting that compares spend to calls, intakes, and enrollments in aggregate',
  ],
  judgment: [
    'Google Analytics on public condition pages: narrowed under HIPAA, still exposed under FTC and state law, no BAA available',
    'Google auto-tagging alone, with no conversion tags: a click ID lands on the site but nothing is sent back',
    'Session replay on non-health pages with input masking configured',
    'A server-side customer data platform that signs a BAA and strips identifiers before anything reaches an ad platform',
    'Campaign or ad set names in URL parameters that name the condition',
  ],
  stop: [
    'Meta, Google, TikTok, or any ad platform pixel on condition, intake, portal, scheduling, or form pages',
    'Standard or custom events (Lead, Purchase, Contact) fired on health actions',
    'Conversions API or offline uploads of patient or lead records',
    'Custom audiences or lookalikes built from condition-labeled lists',
    'Advanced matching or any hashed identifier sent with events',
    'Session replay on forms without masking',
    '"Confidential" or "never share" copy alongside any of the above',
    '"Free" or "$0" anywhere a charge follows in the same flow',
  ],
};

const CHECKLIST = [
  'Written inventory of every third-party script, what it sends, and to whom',
  'Every promise about privacy or cost on the site and in ads checked against the inventory',
  'No ad platform tag on any page where a visit implies a condition',
  'No event that fires on a health action reaches an ad platform',
  'No per-person data leaves the company for an ad platform by any route',
  'Consent, where relied on, is a separate opt-in that names recipient and purpose',
  'Session replay and chat tools either absent, or masked and reviewed',
  'Any recurring charge disclosed before the first charge, with same-effort cancellation',
  'Written approval from the client\'s legal or compliance owner, on file, dated',
  'The inventory and approvals kept where they can be produced in a day',
];

const Disclaimer: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <div className={`flex gap-3 items-start rounded-lg border border-[#040949]/20 bg-white/60 ${compact ? 'p-4' : 'p-5'}`}>
    <AlertTriangle size={20} className="shrink-0 mt-0.5 text-[#040949]" />
    <p className={`${compact ? 'text-sm' : 'text-base'} text-[#040949]/80 m-0`}>
      This is a rule-of-thumb tool built from public enforcement actions and lawsuits. It is not legal advice and not a substitute for guidance from your own counsel. Confirm anything you rely on with a lawyer who knows your situation.
    </p>
  </div>
);

const Hipaa Helper: React.FC = () => {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.title = 'HIPAA Helper | Geoff Schwarten';

    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);

    const style = document.createElement('style');
    style.textContent = `
      body { background-color: #accae5; }
      .hh-reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
      .hh-reveal.hh-active { opacity: 1; transform: translateY(0); }
      @media (prefers-reduced-motion: reduce) { .hh-reveal { opacity: 1; transform: none; transition: none; } }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(robots);
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) {
            entry.target.classList.add('hh-active');
            if (!Number.isNaN(idx) && entry.intersectionRatio >= 0.5) setActive(idx);
          }
        });
      },
      { threshold: [0.2, 0.5] }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen text-[#040949]">
      <Navbar />

      {/* Header */}
      <header className="pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#040949]/60 mb-4">HIPAA Helper</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6">Twelve rules for running ads in healthcare without ending up in a complaint.</h1>
          <p className="text-lg md:text-xl text-[#040949]/80 mb-8 max-w-2xl">Drawn from nine FTC actions and lawsuits, 2023 to 2026: GoodRx, BetterHelp, Premom, Cerebral, Monument, Flo v. Meta, the hospital pixel suits, AHA v. Becerra, and Hims & Hers. Scroll through, one rule at a time.</p>
          <Disclaimer />
        </div>
      </header>

      {/* Principles with progress rail */}
      <div className="relative">
        <nav aria-label="Principles" className="hidden lg:flex flex-col gap-3 fixed left-6 top-1/2 -translate-y-1/2 z-40">
          {PRINCIPLES.map((p, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to rule ${i + 1}: ${p.headline}`}
              className={`w-3 h-3 rounded-full border border-[#040949] transition-all duration-300 ${active === i ? 'bg-[#040949] scale-125' : 'bg-transparent hover:bg-[#040949]/40'}`}
            />
          ))}
        </nav>

        {PRINCIPLES.map((p, i) => {
          const { Icon } = p;
          return (
            <section
              key={i}
              data-index={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              className="hh-reveal min-h-[80vh] flex items-center border-t border-[#040949]/15 scroll-mt-24"
            >
              <div className="max-w-5xl mx-auto px-6 py-16 w-full grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 items-start">
                <div className="flex md:flex-col items-center md:items-start gap-5">
                  <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-white/70 border border-[#040949]/20 flex items-center justify-center shrink-0">
                    <Icon size={56} strokeWidth={1.5} className="text-[#040949] md:hidden" />
                    <Icon size={84} strokeWidth={1.25} className="text-[#040949] hidden md:block" />
                  </div>
                  <span className="text-sm font-semibold tracking-[0.18em] uppercase text-[#040949]/60">Rule {String(i + 1).padStart(2, '0')} of 12</span>
                </div>
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] mb-3">{p.headline}</h2>
                  <p className="text-lg md:text-2xl font-medium text-[#040949]/85 mb-6">{p.line}</p>
                  <p className="text-base md:text-lg text-[#040949]/75 mb-6">{p.evidence}</p>
                  <div className="border-l-4 border-[#040949] pl-4">
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#040949]/60 mb-1">In practice</p>
                    <p className="text-base md:text-lg font-medium m-0">{p.practice}</p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Lines */}
      <section className="border-t border-[#040949]/15">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Where the lines sit today</h2>
          <p className="text-[#040949]/75 mb-10 max-w-2xl">A quick sort of common tactics. The middle column is where the judgment happens and where counsel earns their fee.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg bg-white/70 border border-[#040949]/20 p-6">
              <p className="inline-block text-xs font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 mb-4">Clear</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-[#040949]/80">{LINES.clear.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="rounded-lg bg-white/70 border border-[#040949]/20 p-6">
              <p className="inline-block text-xs font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-900 mb-4">Judgment call</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-[#040949]/80">{LINES.judgment.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="rounded-lg bg-white/70 border border-[#040949]/20 p-6">
              <p className="inline-block text-xs font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full bg-rose-100 text-rose-900 mb-4">Do not</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-[#040949]/80">{LINES.stop.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="border-t border-[#040949]/15">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Pre-launch checklist</h2>
          <ol className="space-y-3">
            {CHECKLIST.map((t, i) => (
              <li key={t} className="flex gap-4 items-start rounded-lg bg-white/70 border border-[#040949]/20 p-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#040949] text-white text-sm font-semibold flex items-center justify-center">{i + 1}</span>
                <span className="text-[#040949]/85">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cases */}
      <section className="border-t border-[#040949]/15">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The cases behind the rules</h2>
          <ul className="divide-y divide-[#040949]/15">
            {CASES.map((c) => (
              <li key={c.name} className="py-4 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-6">
                <div>
                  <p className="font-bold m-0">{c.name}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#040949]/60 m-0">{c.when}</p>
                </div>
                <p className="text-sm text-[#040949]/80 m-0">{c.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Disclaimer compact />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hipaa Helper;
