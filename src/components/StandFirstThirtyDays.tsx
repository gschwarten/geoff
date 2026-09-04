import React from 'react';

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
    <section id="first-30-days" className="section-container">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">First 30 days</h2>
      <p className="text-lg text-gray-700 mb-10">
        How I would get to the brand, segmentation, and broker plan.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="bg-white rounded-lg shadow-sm p-6">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ACCAE5] text-sm font-bold text-[#040949] mb-4">
              {index + 1}
            </span>
            <h3 className="text-xl font-bold mb-3 tracking-tight text-[#040949]">{step.title}</h3>
            <p className="text-gray-600">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StandFirstThirtyDays;
