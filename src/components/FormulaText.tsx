import React from 'react';
import { TrendingUp } from 'lucide-react';

interface FormulaTextProps {
  line1: string;
  line2: string;
  result: string;
}

const FormulaText: React.FC<FormulaTextProps> = ({ line1, line2, result }) => {
  return (
    <div
      className="w-full h-full bg-[#ACCAE5] flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ fontFamily: '"Press Start 2P", monospace' }}
    >
      <p className="text-[#040949] text-xs md:text-sm leading-relaxed break-words">{line1}</p>
      <p className="text-[#040949] text-base md:text-lg">+</p>
      <p className="text-[#040949] text-xs md:text-sm leading-relaxed break-words">{line2}</p>
      <p className="text-[#040949] text-base md:text-lg">=</p>
      <div className="flex items-center gap-3 justify-center">
        <p className="text-[#22c55e] text-xs md:text-sm leading-relaxed break-words">{result}</p>
        <div className="w-14 h-14 rounded-lg bg-[#bbf7d0] flex items-center justify-center shrink-0">
          <TrendingUp className="h-8 w-8 text-[#15803d]" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default FormulaText;
