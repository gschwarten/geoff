
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-6">
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-xl font-bold">GEOFF SCHWARTEN</a>
          </div>
          
          <nav className="flex gap-8 mb-4 md:mb-0">
            <a href="#about" className="text-sm text-gray-600 hover:text-black transition-colors">About</a>
            <a href="#work" className="text-sm text-gray-600 hover:text-black transition-colors">Work</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact</a>
          </nav>
          
          <div className="text-sm text-gray-600">
            © {currentYear} GEOFF SCHWARTEN. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
