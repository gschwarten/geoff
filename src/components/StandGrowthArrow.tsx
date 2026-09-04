import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const StandGrowthArrow: React.FC = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
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

      if (newIsOpen && !wasOpenRef.current) {
        setShouldAnimate(true);
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => setShouldAnimate(false), 500);
      }

      wasOpenRef.current = newIsOpen;
      setIsOpen(newIsOpen);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const open = reducedMotion || isOpen;

  return (
    <div
      ref={arrowRef}
      aria-hidden="true"
      className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-[#bbf7d0] transition-transform duration-[400ms] ease-out ${
        open ? '-rotate-[8deg] scale-100' : 'rotate-[35deg] scale-90'
      } ${shouldAnimate && !reducedMotion ? 'animate-[scalePop_0.4s_ease-out]' : ''}`}
    >
      <TrendingUp
        size={40}
        strokeWidth={2.5}
        className={`transition-colors duration-[400ms] ${open ? 'text-[#15803d]' : 'text-[#86efac]'}`}
      />
    </div>
  );
};

export default StandGrowthArrow;