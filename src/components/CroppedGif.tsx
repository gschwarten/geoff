
import React from 'react';

const CroppedGif: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#ACCAE5] relative overflow-hidden">
      <img 
        src="/lovable-uploads/Formula-Gif3.gif" 
        alt="Formula GIF" 
        className="absolute w-full h-[300%] object-cover"
        style={{ top: '-100%' }} // This crops out the top 1/3 and bottom 1/3
      />
    </div>
  );
};

export default CroppedGif;
