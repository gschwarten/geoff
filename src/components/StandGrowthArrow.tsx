import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const StandGrowthArrow: React.FC = () => {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduceMotion = mediaQuery.matches;
    setReducedMotion(reduceMotion);

    if (reduceMotion) {
      setIsOpen(true);
      return;
    }

    const handleScroll = () => {
      const section = arrowRef.current?.closest('section');
      if (!section) return;
      const newIsOpen = section.getBoundingClientRect().top < window.innerHeight * 0.5;
      setIsOpen(newIsOpen);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const open = reducedMotion || isOpen;

  return (
    <span
      ref={arrowRef}
      aria-hidden="true"
      className="inline-flex items-center transition-transform duration-[400ms] ease-out"
      style={{
        transform: open ? 'rotate(0deg)' : 'rotate(20deg)',
      }}
    >
      <TrendingUp
        size={18}
        strokeWidth={2.5}
        className={`transition-colors duration-[400ms] ease-out ${open ? 'text-[#15803d]' : 'text-[#86efac]'}`}
      />
    </span>
  );
};

export default StandGrowthArrow;
