
import React from 'react';
import { Separator } from '@/components/ui/separator';
import CroppedGif from './CroppedGif';

interface AboutProps {
  showWonderSchoolLogo?: boolean;
}

const About: React.FC<AboutProps> = ({ showWonderSchoolLogo = false }) => {
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
        I would love the opportunity to speak with you about how I could identify, prioritize and execute new growth opportunities. Whether it be it channels, features or offerings, that serve to grow childcare providers or customers I am confident that I could find the formula for growth.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        Please enjoy this site and reach out to book a call.
      </p>
    </>
  );

  const defaultContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
      <p className="text-lg text-gray-600 mb-6">
        I help impact-oriented businesses "find the formula."
      </p>
      <p className="text-lg text-gray-600 mb-6">
        What does it mean to find the formula? It means to find a repeatable, scalable approach to growth.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        I bring a methodical, creative approach to experimenting and identifying channels, then scale them up and build teams around the ones that work. My expertise spans performance marketing, lifecycle marketing, SEO, content strategy, branding, and conversion optimization.
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
          
          {showWonderSchoolLogo ? wonderSchoolContent : defaultContent}
          
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
