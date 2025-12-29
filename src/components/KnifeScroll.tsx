import React, { useEffect, useState, useRef } from 'react';

const KnifeScroll: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Switch to open knife when the element is in the upper half of viewport
      const triggerPoint = viewportHeight * 0.5;
      const newIsOpen = rect.top < triggerPoint;
      
      // Trigger animation only when transitioning from closed to open
      if (newIsOpen && !wasOpenRef.current) {
        setShouldAnimate(true);
        setTimeout(() => setShouldAnimate(false), 500);
      }
      
      wasOpenRef.current = newIsOpen;
      setIsOpen(newIsOpen);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex justify-center items-center -mt-4 pb-3"
    >
      <img
        src={isOpen ? "/lovable-uploads/0d5a25a5-621d-4195-af4b-7fa09af2f7a8.png" : "/lovable-uploads/closed-knife.png"}
        alt="Swiss Army Knife"
        className={`w-36 h-auto transition-all duration-300 ${shouldAnimate ? 'animate-[scalePop_0.4s_ease-out]' : ''}`}
        style={{
          filter: 'brightness(0) saturate(100%) invert(6%) sepia(81%) saturate(6356%) hue-rotate(238deg) brightness(92%) contrast(144%)'
        }}
      />
    </div>
  );
};

export default KnifeScroll;
