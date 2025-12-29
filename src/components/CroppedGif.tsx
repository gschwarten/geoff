
import React from 'react';

const CroppedGif: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#ACCAE5] relative overflow-hidden">
      <img 
        src="/lovable-uploads/Formula-Gif4.gif" 
        alt="Formula GIF" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default CroppedGif;
