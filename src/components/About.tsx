import React from 'react';
import { Separator } from '@/components/ui/separator';
import CroppedGif from './CroppedGif';
interface AboutProps {
  showWonderSchoolLogo?: boolean;
}
const About: React.FC<AboutProps> = ({
  showWonderSchoolLogo = false
}) => {
  return <section id="about" className="section-container">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="reveal">
          <div className="relative">
            <div className="aspect-square bg-[#ACCAE5] rounded-lg overflow-hidden">
              <CroppedGif />
            </div>
          </div>
        </div>
        
        <div className="reveal">
          {showWonderSchoolLogo && <div className="mb-12">
              <img src="/lovable-uploads/wonderschool.png" alt="WonderSchool Logo" className="max-w-[200px]" />
            </div>}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
          <p className="text-lg text-gray-600 mb-6">
            I help impact-oriented businesses "find the formula."
          </p>
          
          
          
          
          
          
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
    </section>;
};
export default About;