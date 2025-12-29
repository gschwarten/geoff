import React, { useEffect, useRef, useState } from 'react';

interface SwissArmyKnifeProps {
  className?: string;
}

const SwissArmyKnife: React.FC<SwissArmyKnifeProps> = ({ className = '' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position in viewport
      // Start animating when element enters viewport, complete when it's centered
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Progress from 0 (element at bottom of viewport) to 1 (element at center or above)
      const distanceFromCenter = elementCenter - viewportCenter;
      const maxDistance = windowHeight / 2;
      
      let progress = 1 - (distanceFromCenter / maxDistance);
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation values based on scroll progress
  const mainBladeRotation = -45 * scrollProgress; // Opens upward
  const smallBladeRotation = 30 * scrollProgress; // Opens downward-right
  const corkscrewRotation = 45 * scrollProgress; // Opens downward

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ color: 'currentColor' }}
      >
        {/* Handle (base) */}
        <g>
          {/* Main handle body */}
          <rect
            x="25"
            y="45"
            width="50"
            height="12"
            rx="6"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          {/* Handle details */}
          <circle cx="35" cy="51" r="1.5" fill="currentColor" />
          <circle cx="65" cy="51" r="1.5" fill="currentColor" />
        </g>

        {/* Main blade - pivots from left side of handle */}
        <g
          style={{
            transform: `rotate(${mainBladeRotation}deg)`,
            transformOrigin: '30px 51px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <path
            d="M30 51 L30 48 L72 25 L75 28 L35 49 L35 53 L75 74 L72 77 L30 54 Z"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
          />
          {/* Blade slot */}
          <rect
            x="50"
            y="38"
            width="8"
            height="3"
            rx="1"
            transform="rotate(-35 54 39.5)"
            fill="currentColor"
          />
        </g>

        {/* Small blade - pivots from right side */}
        <g
          style={{
            transform: `rotate(${smallBladeRotation}deg)`,
            transformOrigin: '70px 51px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <path
            d="M70 48 L85 55 L85 58 L70 54 Z"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinejoin="round"
          />
        </g>

        {/* Corkscrew - pivots from bottom center */}
        <g
          style={{
            transform: `rotate(${corkscrewRotation}deg)`,
            transformOrigin: '50px 57px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <path
            d="M50 57 
               Q52 62 48 65 
               Q54 67 50 72 
               Q46 74 52 78 
               Q48 80 50 85"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default SwissArmyKnife;
