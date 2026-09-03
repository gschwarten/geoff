
import React from 'react';
import { Separator } from '@/components/ui/separator';
import CroppedGif from './CroppedGif';
import ziplineLogo from '@/assets/zipline-logo.svg.asset.json';

interface AboutProps {
  showWonderSchoolLogo?: boolean;
  showThredUpLogo?: boolean;
  showGileadLogo?: boolean;
  showLovableLogo?: boolean;
  showZiplineLogo?: boolean;
  showYCLogo?: boolean;
}

const About: React.FC<AboutProps> = ({ showWonderSchoolLogo = false, showThredUpLogo = false, showGileadLogo = false, showLovableLogo = false, showZiplineLogo = false, showYCLogo = false }) => {
  const wonderSchoolContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
      <p className="text-lg text-gray-600 mb-6">
        A former colleague was immortalized in company lore for the saying, "never come to a meeting without a prototype."
      </p>
      <p className="text-lg text-gray-600 mb-6">
        It's in that spirit that I stood up this quick Lovable landing page to show, don't tell, how I might be able to support Wonderschool.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        I would love the opportunity to discuss how I can identify, prioritize, and execute new growth opportunities—whether through channels, features, or offerings—to grow childcare providers or customers. I'm confident I can find the formula for growth.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        Please enjoy this site and reach out to <a href="https://calendly.com/geoff-schwarten/30min" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">book a call</a>.
      </p>
    </>
  );

  const thredUpContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
      <p className="text-lg text-gray-600 mb-6">
        A former colleague was immortalized in company lore for the saying, "never come to a meeting without a prototype."
      </p>
      <p className="text-lg text-gray-600 mb-6">
        It's in that spirit that I stood up this quick Lovable landing page to show, don't tell, how I might be able to support thredUP.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        I would love the opportunity to discuss how I can identify, prioritize, and execute new growth opportunities—whether through channels, features, or offerings—to grow the circular fashion economy. I'm confident I can find the formula for growth.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        Please enjoy this site and reach out to <a href="https://calendly.com/geoff-schwarten/30min" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">book a call</a>.
      </p>
    </>
  );

  const gileadContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
      <p className="text-lg text-gray-600 mb-6">
        I help impact-oriented businesses "find the formula."
      </p>
      <p className="text-lg text-gray-600 mb-6">
        What does it mean to find the formula? It means to find a repeatable, scalable playbook for growth.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        I bring a methodical, creative approach to experimenting and identifying channels, then scale them up and build teams around the ones that work. My expertise spans performance marketing, lifecycle marketing, AEO/SEO, content strategy, branding, and conversion optimization.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        While I'm a generalist, I have deep experience in key channels, along with the leadership skills to know which tool is right for the job. I have a data-driven approach, blending creativity with insights to not just grow businesses, but to build sustainable, long-term success.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        You're either a brand or a commodity. I help build brands to learn and master the medium and the message, ensuring they resonate, inspire, convert, and drive key metrics like LTV, CPA, and ROAS.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        When I'm not on this joyful quest, I'm guiding and modeling the right behaviors for my two energetic young boys, and embracing a love for the ocean as an aspiring waterman.
      </p>
    </>
  );

  const lovableContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
      <p className="text-lg text-gray-600 mb-6">
        A former colleague at IDEO was immortalized in company lore for the saying, "Never come to a meeting without a prototype."
      </p>
      <p className="text-lg text-gray-600 mb-6">
        I built this Lovable landing page in that same spirit—not to explain how I think, but to show it.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        My strength as a marketer is helping companies find the formula: experimenting into repeatable, scalable growth. I focus on identifying the highest-leverage opportunities, testing quickly, and scaling what works—across channels, product features, and customer programs.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        I'd love the opportunity to discuss how I could apply that approach to help Lovable grow even faster.
      </p>
      <a 
        href="https://calendly.com/geoff-schwarten/30min" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors inline-flex items-center gap-1"
      >
        Book a call with Geoff <span aria-hidden="true">→</span>
      </a>
    </>
  );

  const ziplineContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
      <p className="text-lg text-gray-600 mb-6">
        A former colleague at IDEO was immortalized in company lore for the saying, "Never come to a meeting without a prototype."
      </p>
      <p className="text-lg text-gray-600 mb-6">
        In that spirit, I built this quick landing page to show—not tell—how I might help Zipline.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        My strength is helping mission-driven companies find the formula: experimenting into repeatable, scalable growth across channels, product, and customer programs. I'd love to help Zipline build that playbook for partner marketing, turning partner relationships into new drone delivery customers.
      </p>
      <a
        href="https://calendly.com/geoff-schwarten/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors inline-flex items-center gap-1"
      >
        Book a call with Geoff <span aria-hidden="true">→</span>
      </a>
    </>
  );

  const defaultContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
      <p className="text-lg text-gray-600 mb-6">
        I help impact-oriented businesses "find the formula."
      </p>
      <p className="text-lg text-gray-600 mb-6">
        What does it mean to find the formula? It means to find a repeatable, scalable playbook for growth.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        I bring a methodical, creative approach to experimenting and identifying channels, then scale them up and build teams around the ones that work. My expertise spans performance marketing, lifecycle marketing, AEO/SEO, content strategy, branding, and conversion optimization.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        While I'm a generalist, I have deep experience in key channels, along with the leadership skills to know which tool is right for the job. I have a data-driven approach, blending creativity with insights to not just grow businesses, but to build sustainable, long-term success.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        You're either a brand or a commodity. I help build brands to learn and master the medium and the message, ensuring they resonate, inspire, convert, and drive key metrics like LTV, CPA, and ROAS.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        When I'm not on this joyful quest, I'm guiding and modeling the right behaviors for my two energetic young boys, and embracing a love for the ocean as an aspiring waterman.
      </p>
    </>
  );

  return (
    <section id="about" className="section-container">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="reveal">
          <div className="relative">
            <div className="aspect-square bg-[#ACCAE5] rounded-lg overflow-hidden">
              <CroppedGif />
            </div>
          </div>
        </div>
        
        <div className="reveal">
          {showWonderSchoolLogo && (
            <div className="mb-12">
              <img 
                src="/lovable-uploads/wonderschool.png" 
                alt="WonderSchool Logo" 
                className="max-w-[200px]"
              />
            </div>
          )}
          
          {showThredUpLogo && (
            <div className="mb-12">
              <img 
                src="/lovable-uploads/thredUP_logo.png" 
                alt="thredUP Logo" 
                className="max-w-[200px]"
              />
            </div>
          )}
          
          {showGileadLogo && (
            <div className="mb-12">
              <img 
                src="/lovable-uploads/gilead_logo.png" 
                alt="Gilead Logo" 
                className="max-w-[200px]"
              />
            </div>
          )}
          
          {showLovableLogo && (
            <div className="mb-12">
              <img 
                src="/lovable-uploads/lovable-logo.png" 
                alt="Lovable Logo" 
                className="max-w-[150px]"
              />
            </div>
          )}

          {showZiplineLogo && (
            <div className="mb-6">
              <img
                src={ziplineLogo.url}
                alt="Zipline Logo"
                className="max-w-[200px]"
              />
            </div>
          )}

          {showYCLogo && (
            <div className="mb-6">
              <svg width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Y Combinator" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="6" ry="6" fill="#F26625" />
                <text x="32" y="32" textAnchor="middle" dominantBaseline="central" fontFamily="Helvetica, Arial, sans-serif" fontSize="40" fontWeight="700" fill="#ffffff">Y</text>
              </svg>
            </div>
          )}
          {showYCLogo && (
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#F26625' }}>
              FOR YC FOUNDERS
            </p>
          )}
          
          {showWonderSchoolLogo ? wonderSchoolContent : 
           showThredUpLogo ? thredUpContent :
           showGileadLogo ? gileadContent :
           showLovableLogo ? lovableContent :
           showZiplineLogo ? ziplineContent :
           showYCLogo ? defaultContent :
           defaultContent}
          
          <Separator className="my-8" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Personality Type</h3>
              <p className="text-gray-600">INTP</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Superpowers</h3>
              <p className="text-gray-600">Ingenuity, Experimentation</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Values</h3>
              <p className="text-gray-600">Health, Ownership, Resourcefulness</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Availability</h3>
              <p className="text-gray-600">Open to opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
