
import React, { useState, useEffect } from 'react';

const frames = [
  "/lovable-uploads/Formula-Gif.gif",
  "/lovable-uploads/Formula-Gif2.gif",
  "/lovable-uploads/Formula-Gif3.gif",
  "/lovable-uploads/Formula-Gif4.gif",
];

const CroppedGif: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 2000); // Change frame every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#ACCAE5] relative overflow-hidden">
      {frames.map((src, index) => (
        <img 
          key={src}
          src={src} 
          alt={`Formula frame ${index + 1}`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentFrame ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default CroppedGif;
