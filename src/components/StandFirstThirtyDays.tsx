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
    <section id="first-30-days" className="section-container" style={{ borderTop: '1px solid rgba(4,9,73,0.15)' }}>
      <p className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2 text-[#040949]">
        <StandGrowthArrow />
        FIRST 30 DAYS
      </p>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#040949] mb-10">
        How I would get to the brand, segmentation, and broker plan.
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step) => (
          <div key={step.title}>
            <h3 className="text-lg font-semibold text-[#040949] mb-3">{step.title}</h3>
            <p className="text-lg text-gray-600">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StandFirstThirtyDays;
