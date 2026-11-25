import { Link } from 'react-router-dom';
import { useNoIndex } from '@/hooks/use-noindex';

type Reaction = { emoji: string; count: number };

type Message = {
  initials: string;
  avatarClass: string;
  name: string;
  role: string;
  time: string;
  body: React.ReactNode;
  reactions?: Reaction[];
};

const AVATARS = {
  geoff: { initials: 'GS', avatarClass: 'bg-[#040949] text-white' },
  dana: { initials: 'DR', avatarClass: 'bg-slate-500 text-white' },
  marcus: { initials: 'MT', avatarClass: 'bg-teal-700 text-white' },
  priya: { initials: 'PS', avatarClass: 'bg-amber-700 text-white' },
};

const KPIS = [
  { label: 'Cost per patient referral', value: '$412', was: 'was $468', delta: '-12%', tone: 'green' },
  { label: 'Contact to referral rate', value: '22%', was: 'was 19%', delta: '+3 pts', tone: 'green' },
  { label: 'Cost per contact', value: '$91', was: 'was $89', delta: '+2%', tone: 'gray' },
  { label: 'Patient referrals', value: '31', was: 'was 26', delta: '+19%', tone: 'green' },
] as const;

const EXPERIMENTS = [
  {
    name: 'Friday pause',
    change: "Turned paid search off on Fridays. Friday contacts cost ~2.3x Monday's and converted at 15% vs 20-23%.",
    result: '2 Fridays live. Mon-Thu volume held; weekly spend -14%; referrals flat.',
    call: 'Ship',
  },
  {
    name: 'Condition landing pages',
    change: 'Each ad group (fentanyl, withdrawal, buprenorphine, etc.) sent to its own page instead of one generic page.',
    result: 'Contact to referral 31% vs 21% on the generic page over 4 weeks, ~140 contacts per arm.',
    call: 'Win',
  },
  {
    name: 'Geo expansion, wave 3',
    change: 'Added 22 zip codes chosen from where current patients actually live.',
    result: 'Cost per contact $84 vs $97 baseline. Referrals lag ~10 days, not readable yet.',
    call: 'Too early',
  },
  {
    name: 'Mobile "Text us" button',
    change: 'Added a text-message CTA next to the call button on mobile.',
    result: 'Contacts +6%, not significant. Texts we could not reply to became missed callbacks.',
    call: 'Inconclusive',
  },
] as const;

const CALL_STYLES: Record<string, string> = {
  Ship: 'bg-green-100 text-green-800',
  Win: 'bg-green-100 text-green-800',
  'Too early': 'bg-amber-100 text-amber-800',
  Inconclusive: 'bg-gray-100 text-gray-600',
};

const NEXT_UP = [
  'Searchers asking about cost and side effects: own ad group + page (they convert, so we keep them, not block them).',
  'Evening hours test: only once intake is staffed past 5pm.',
  'Send referrals back to the ad platform as the conversion instead of phone calls. Blocked on a compliant tracking vendor.',
];

const DECISIONS = [
  'Clinical ops: 2 hours of Friday intake coverage (10-12) so we can test reopening Fridays.',
  'Legal: review of the compliant conversion-tracking vendor.',
];

const REPLIES: Message[] = [
  {
    ...AVATARS.dana,
    name: 'Dana R.',
    role: 'CEO',
    time: '9:31 AM',
    body: 'Nice. If cost per referral is dropping, why not double the budget now?',
  },
  {
    ...AVATARS.geoff,
    name: 'Geoff Schwarten',
    role: 'Growth lead',
    time: '9:48 AM',
    body: 'Two reasons. Intake is near capacity on Mon/Tue (operators ~85% busy), and the last time we raised budget fast, cost per contact jumped 40% in a week. Proposal: +20% a week with a guardrail. If cost per contact goes over $110 two days running, we pull back.',
    reactions: [{ emoji: '✅', count: 2 }],
  },
  {
    ...AVATARS.marcus,
    name: 'Marcus T.',
    role: 'VP, Clinical Operations',
    time: '10:05 AM',
    body: 'What happens to people who call on a Friday now?',
  },
  {
    ...AVATARS.geoff,
    name: 'Geoff Schwarten',
    role: 'Growth lead',
    time: '10:12 AM',
    body: 'Only paid search is paused. Branded and organic calls still come in and get answered, and missed calls get a callback Monday by 9am. With 2 hours of Friday coverage we can test reopening 10-12 and see if it pays back.',
  },
  {
    ...AVATARS.priya,
    name: 'Priya S.',
    role: 'Head of RevOps',
    time: '10:40 AM',
    body: '31% vs 21% on the landing pages. How confident are we?',
  },
  {
    ...AVATARS.geoff,
    name: 'Geoff Schwarten',
    role: 'Growth lead',
    time: '10:52 AM',
    body: "Directionally confident, not precise. ~140 contacts per arm; the lift is likely real but the range is wide (roughly +3 to +17 pts). Calling it a win because the downside is near zero, and I'm keeping the generic page live for 10% of traffic for 4 more weeks as a holdout. The 'Text us' test I'm calling inconclusive and parking until we can reply by SMS.",
    reactions: [{ emoji: '🙏', count: 1 }],
  },
  {
    ...AVATARS.marcus,
    name: 'Marcus T.',
    role: 'VP, Clinical Operations',
    time: '11:20 AM',
    body: 'We can cover Fri 10-12 starting the 26th.',
    reactions: [{ emoji: '🎉', count: 2 }],
  },
  {
    ...AVATARS.geoff,
    name: 'Geoff Schwarten',
    role: 'Growth lead',
    time: '11:24 AM',
    body: "Great, I'll set the schedule and report back in two weeks.",
  },
];

function ReactionPills({ reactions }: { reactions: Reaction[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {reactions.map((r) => (
        <span
          key={r.emoji}
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600"
        >
          <span aria-hidden="true">{r.emoji}</span> {r.count}
        </span>
      ))}
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="flex gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${message.avatarClass}`}
        aria-hidden="true"
      >
        {message.initials}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-bold text-[#040949]">{message.name}</span>
          <span className="text-sm text-gray-500">{message.role}</span>
          <span className="text-xs text-gray-400">{message.time}</span>
        </div>
        <div className="mt-1 text-[15px] leading-relaxed text-gray-700">{message.body}</div>
        {message.reactions && <ReactionPills reactions={message.reactions} />}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">{children}</p>
  );
}

const WeeklyReadout = () => {
  useNoIndex();

  return (
    <div className="min-h-screen bg-[#accae5] px-4 py-12 sm:py-16">
      {/* Header block */}
      <header className="mx-auto max-w-[760px]">
        <Link to="/" className="mb-3 inline-block text-sm text-gray-600 underline-offset-2 hover:underline">
          ← geoff.lovable.app
        </Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#040949]/60">Sample artifact</p>
        <h1 className="mt-2 font-['Montserrat'] text-3xl sm:text-4xl font-bold text-[#040949]">
          Weekly growth readout
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#040949]/80">
          An anonymized, hypothetical weekly update of the kind I posted in Slack or Teams, based on real growth work
          for a telehealth addiction-treatment program. Figures are amended for confidentiality.
        </p>
      </header>

      {/* Chat card */}
      <main className="mx-auto mt-8 max-w-[760px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Card top bar */}
        <div className="flex flex-wrap items-baseline gap-x-3 border-b border-gray-200 px-4 sm:px-6 py-3">
          <span className="font-bold text-[#040949]"># growth-recovery-line</span>
          <span className="text-sm text-gray-500">Weekly readout thread</span>
        </div>

        <div className="px-4 sm:px-6 py-6">
          {/* Parent post */}
          <ChatMessage
            message={{
              ...AVATARS.geoff,
              name: 'Geoff Schwarten',
              role: 'Growth lead',
              time: 'Mon 9:04 AM',
              reactions: [
                { emoji: '👀', count: 4 },
                { emoji: '✅', count: 2 },
              ],
              body: (
                <div>
                  <p className="font-bold text-[#040949]">
                    Weekly growth readout: week of Jun 15. Mixed week, trending the right way.
                  </p>
                  <p className="mt-2">
                    Cost per patient referral fell 12% as two experiments landed. Contact volume was flat, so most of
                    the gain came from conversion, not cheaper traffic.
                  </p>

                  <SectionLabel>KPIs (week over week)</SectionLabel>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {KPIS.map((kpi) => (
                      <div key={kpi.label} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">{kpi.label}</p>
                        <p className="mt-1 text-lg font-bold text-[#040949]">{kpi.value}</p>
                        <p className="text-xs text-gray-400">{kpi.was}</p>
                        <p
                          className={`mt-1 text-xs font-semibold ${
                            kpi.tone === 'green' ? 'text-green-700' : 'text-gray-500'
                          }`}
                        >
                          {kpi.delta}
                        </p>
                      </div>
                    ))}
                  </div>

                  <SectionLabel>Experiment results</SectionLabel>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                          <th className="px-3 py-2 font-semibold">Experiment</th>
                          <th className="px-3 py-2 font-semibold">What we changed</th>
                          <th className="px-3 py-2 font-semibold">Result</th>
                          <th className="px-3 py-2 font-semibold">Call</th>
                        </tr>
                      </thead>
                      <tbody>
                        {EXPERIMENTS.map((exp) => (
                          <tr key={exp.name} className="border-b border-gray-100 last:border-0 align-top">
                            <td className="px-3 py-2.5 font-semibold text-[#040949] whitespace-nowrap">{exp.name}</td>
                            <td className="px-3 py-2.5 text-gray-600">{exp.change}</td>
                            <td className="px-3 py-2.5 text-gray-600">{exp.result}</td>
                            <td className="px-3 py-2.5">
                              <span
                                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${CALL_STYLES[exp.call]}`}
                              >
                                {exp.call}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <SectionLabel>Next up</SectionLabel>
                  <ul className="list-disc space-y-1 pl-5 text-gray-700">
                    {NEXT_UP.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <SectionLabel>Decisions needed</SectionLabel>
                  <ul className="list-disc space-y-1 pl-5 text-gray-700">
                    {DECISIONS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ),
            }}
          />

          {/* Thread divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">8 replies</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Replies */}
          <div className="space-y-5 pl-2 sm:pl-6">
            {REPLIES.map((reply, i) => (
              <ChatMessage key={i} message={reply} />
            ))}
          </div>
        </div>
      </main>

      {/* Footnote */}
      <p className="mx-auto mt-6 max-w-[760px] text-sm text-gray-600">
        Company, names, figures, and replies are illustrative. The experiments and the weekly format are based on real
        work.
      </p>
    </div>
  );
};

export default WeeklyReadout;
