import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Work from '@/components/Work';
import Play from '@/components/Play';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';


const Sequencing = () => {
  useEffect(() => {
    document.title = 'Geoff Schwarten for Sequencing';

    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #accae5;
      }

      .bg-grid-pattern {
        background-image:
          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        background-size: 20px 20px;
      }

      .bg-accae5 {
        background-color: #accae5;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const sequencingParagraph = (
    <p className="text-lg text-gray-600 mb-6">
      I read the Director of Growth role as a player-coach seat: scale the paid engine you already have while building the creator, affiliate, referral, and partner channels that come next. That is the job I have done three times as a first marketing hire, most recently for a recurring-revenue telehealth membership, and it is the job I want to do for the world's largest direct-to-consumer whole genome sequencing platform.
    </p>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-8">
        <ScrollReveal>
          <About
            showSequencingLogo={true}
            insertAfterOpener={sequencingParagraph}
          />
        </ScrollReveal>
      </div>
      <ScrollReveal>
        <Work
          pinProjects={[
            'Launching a Substance Use Disorder Help Line',
            'Scaling a Learning Business from Scratch',
            'Launching a New Offer Aligned with Market Demand',
          ]}
        />
      </ScrollReveal>
      <ScrollReveal>
        <Play />
      </ScrollReveal>
      <Footer />
    </div>
  );
};

export default Sequencing;
