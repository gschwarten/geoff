
import React from 'react';
import { Separator } from '@/components/ui/separator';

const About: React.FC = () => {
  return (
    <section id="about" className="section-container">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="reveal">
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Profile Image</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black rounded-full"></div>
          </div>
        </div>
        
        <div className="reveal">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Hello 👋 from Geoff.</h2>
          <p className="text-lg text-gray-600 mb-6">
            I'm Geoff Schwarten, a passionate software engineer and product designer with over 8 years of experience creating elegant solutions to complex problems.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            My approach combines technical expertise with user-centered design, ensuring that the products I build are not only functional but also intuitive and enjoyable to use.
          </p>
          <p className="text-lg text-gray-600">
            When I'm not coding, you'll find me hiking in the mountains, experimenting with new recipes, or contributing to open-source projects.
          </p>
          
          <Separator className="my-8" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-600">San Francisco, CA</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <p className="text-gray-600">8+ Years</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">hello@geoffschwarten.com</p>
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
