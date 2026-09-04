import React, { useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';

/**
 * Static, pixel-font rendering of the "Generative AI + Human-Centered Insights = Growth"
 * formula, with a scroll-linked chart icon that rotates clockwise and drifts up/right.
 */
const StandFormula: React.FC = () => {
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let frame = 0;

    const apply = () => {
      frame = 0;
      const raw = Math.min(Math.max(window.scrollY, 0) / 600, 1);
      // ease-out
      const progress = 1 - Math.pow(1 - raw, 3);
      const rotate = progress * 25;
      const x = progress * 24;
      const y = progress * -24;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#ACCAE5] flex items-center justify-center px-6">
      <div
        className="text-center leading-relaxed text-[#040949]"
        style={{ fontFamily: '"Press Start 2P", "Silkscreen", monospace' }}
      >
        <p className="text-[11px] sm:text-sm md:text-base mb-5">Generative AI</p>
        <p className="text-[11px] sm:text-sm md:text-base mb-5">+</p>
        <p className="text-[11px] sm:text-sm md:text-base mb-5 leading-loose">
          Human-Centered Insights
        </p>
        <p className="text-[11px] sm:text-sm md:text-base mb-5">=</p>
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm sm:text-lg md:text-xl text-[#22c55e]">Growth</span>
          <span
            ref={iconRef}
            aria-hidden="true"
            className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#bbf7d0] will-change-transform"
            style={{ transition: 'transform 120ms linear' }}
          >
            <TrendingUp size={30} className="text-[#15803d]" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StandFormula;
