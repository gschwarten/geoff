
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(true);
  
  // We'll use a direct background color instead of trying to load an external image
  return (
    <section className="min-h-screen pt-20 relative"> {/* Keep the pt-20 to push content below navbar */}
      {/* Solid color background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 md:py-32 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight reveal text-white drop-shadow-md">
          <span className="relative inline-block">
            GEOFF SCHWARTEN
            <span className="absolute bottom-2 left-0 w-full h-1 bg-white rounded-full transform -rotate-1"></span>
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-12 reveal uppercase drop-shadow-md">
          SOFTWARE ENGINEER & PRODUCT DESIGNER
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
          <Button className="px-8 py-6 text-lg uppercase bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white" onClick={() => window.location.href = '#work'}>
            VIEW MY WORK
          </Button>
          <Button variant="outline" className="px-8 py-6 text-lg uppercase bg-transparent border-white text-white hover:bg-white/20" onClick={() => window.location.href = '#contact'}>
            GET IN TOUCH
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <a href="#about" aria-label="Scroll Down">
          <ArrowDown className="h-8 w-8 text-white" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
