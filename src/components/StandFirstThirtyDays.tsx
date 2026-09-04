import React from 'react';
import StandGrowthArrow from './StandGrowthArrow';

const steps = [
  {
    title: 'Listen',
    body: 'Talk to five to ten trusted brokers about what they need to write more Stand policies. Pull together the customer listening that already exists, from call notes to quote drop-offs.',
  },
  {
    title: 'Segment',
    body: 'Boil that down to a few tangible insights. Sharpen the ICP with sales, build the segmentation framework, and set the message and the measurement for each segment.',
  },
  {
    title: 'Ship',
    body: 'Broker engagement plan and collateral come last, built on what brokers said, not before. Then run it as a weekly test-and-learn loop.',
  },
];

const StandFirstThirtyDays: React.FC = () => {
  return (
    <section id="first-30-days" className="bg-[#E8F5EC]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="order-2 md:order-1">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-[#040949] md:text-4xl">First 30 days</h2>
            <p className="text-lg text-gray-700">
              How I would get to the brand, segmentation, and broker plan.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <StandGrowthArrow />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-lg bg-white p-6 shadow-sm">
              <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ACCAE5] text-sm font-bold text-[#040949]">
                {index + 1}
              </span>
              <h3 className="mb-3 text-xl font-bold tracking-tight text-[#040949]">{step.title}</h3>
              <p className="text-gray-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StandFirstThirtyDays;
