
import React, { useEffect, useRef } from 'react';

const AnimatedKnife = () => {
  const knifeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            knifeRef.current?.classList.add('rotate-open');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (knifeRef.current) {
      observer.observe(knifeRef.current);
    }

    return () => {
      if (knifeRef.current) {
        observer.unobserve(knifeRef.current);
      }
    };
  }, []);

  return (
    <img 
      ref={knifeRef}
      src="/lovable-uploads/0d5a25a5-621d-4195-af4b-7fa09af2f7a8.png" 
      alt="Swiss Army Knife" 
      className="w-24 h-24 transition-transform duration-1000 rotate-closed"
      style={{ 
        filter: 'invert(6%) sepia(81%) saturate(6356%) hue-rotate(238deg) brightness(92%) contrast(144%)',
        transformOrigin: 'center right'
      }}
    />
  );
};

export default AnimatedKnife;
