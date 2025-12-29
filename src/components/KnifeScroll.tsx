import React, { useEffect, useState, useRef } from 'react';

const KnifeScroll: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Switch to open knife when the element is in the upper half of viewport
      const triggerPoint = viewportHeight * 0.5;
      setIsOpen(rect.top < triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex justify-center items-center pt-2 pb-6"
    >
      <img
        src={isOpen ? "/lovable-uploads/0d5a25a5-621d-4195-af4b-7fa09af2f7a8.png" : "/lovable-uploads/closed-knife.png"}
        alt="Swiss Army Knife"
        className="w-36 h-auto transition-opacity duration-300"
        style={{
          filter: 'brightness(0) saturate(100%) invert(6%) sepia(81%) saturate(6356%) hue-rotate(238deg) brightness(92%) contrast(144%)'
        }}
      />
    </div>
  );
};

export default KnifeScroll;
