
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Work from '@/components/Work';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const WonderSchool = () => {
  useEffect(() => {
    document.title = 'GEOFF SCHWARTEN | Marketing and Growth Leader';
    
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-8"> {/* Added padding to top to accommodate navbar */}
        <ScrollReveal>
          <About showWonderSchoolLogo={true} />
        </ScrollReveal>
      </div>
      <ScrollReveal>
        <Work />
      </ScrollReveal>
      <Footer />
    </div>
  );
};

export default WonderSchool;
