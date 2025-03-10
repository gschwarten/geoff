
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold">Geoff Schwarten</a>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1">
            <span className={`block h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a href="#about" className="hover:text-gray-600 transition-colors">About</a>
          <a href="#skills" className="hover:text-gray-600 transition-colors">Skills</a>
          <a href="#work" className="hover:text-gray-600 transition-colors">Work</a>
          <a href="#contact" className="hover:text-gray-600 transition-colors">Contact</a>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
        <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
          <a href="#about" className="py-2 hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#skills" className="py-2 hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#work" className="py-2 hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Work</a>
          <a href="#contact" className="py-2 hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
