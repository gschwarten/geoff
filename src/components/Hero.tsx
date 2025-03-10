
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 py-16 md:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight reveal">
          <span className="relative inline-block">
            GEOFF SCHWARTEN
            <span className="absolute bottom-2 left-0 w-full h-1 bg-black rounded-full transform -rotate-1"></span>
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 reveal uppercase">
          SOFTWARE ENGINEER & PRODUCT DESIGNER
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
          <Button className="px-8 py-6 text-lg uppercase" onClick={() => window.location.href = '#work'}>
            VIEW MY WORK
          </Button>
          <Button variant="outline" className="px-8 py-6 text-lg uppercase" onClick={() => window.location.href = '#contact'}>
            GET IN TOUCH
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll Down">
          <ArrowDown className="h-8 w-8 text-gray-400" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
