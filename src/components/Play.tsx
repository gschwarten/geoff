
import React, { useState, useEffect, useRef } from 'react';
import '@fontsource/press-start-2p';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SideProject {
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
  tags: string[];
}

const TerminalText: React.FC<{ text: string }> = ({ text }) => {
  const [charIndex, setCharIndex] = useState(0);
  const [blinkCount, setBlinkCount] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (charIndex < text.length) {
      const timer = setTimeout(() => setCharIndex(i => i + 1), 45);
      return () => clearTimeout(timer);
    } else if (blinkCount < 6) {
      const timer = setTimeout(() => {
        setTextVisible(v => !v);
        setBlinkCount(c => c + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDone(true);
    }
  }, [charIndex, started, text, blinkCount]);

  const showCursor = started && (charIndex < text.length || !done);

  return (
    <span ref={ref} className="inline">
      <span style={{ opacity: textVisible ? 1 : 0 }}>{text.slice(0, charIndex)}</span>
      <span
        className="inline-block w-[0.6em] h-[1em] align-middle ml-[1px]"
        style={{
          backgroundColor: '#accae5',
          opacity: showCursor ? 1 : 0,
          animation: charIndex >= text.length && !done ? 'none' : 'cursor-blink 0.6s step-end infinite',
        }}
      />
    </span>
  );
};

const Play: React.FC = () => {
  const sideProjects: SideProject[] = [
    {
      title: 'BookRun — Library Book Finder',
      description: 'I kept showing up to the library with 50 books on my Goodreads list and zero clue which ones were actually on the shelf. So I built BookRun — paste your Goodreads list, pick your library, and instantly see what\'s available before you go.',
      imageUrl: '/lovable-uploads/bookrun-og.png',
      link: '/bookrun',
      tags: ['React', 'API Integration', 'Side Project'],
    },
    {
      title: 'Colleague Jackpot — Team Connection Game',
      description: 'A slot machine-style icebreaker I built for Wonderschool\'s SF office. Pull the lever to get randomly paired with a colleague, an adventure, and a conversation topic — sparking real connections beyond Slack.',
      imageUrl: '/lovable-uploads/wonderschool.png',
      link: 'https://wonderschool-connections.lovable.app/',
      tags: ['React', 'Lovable', 'Team Culture'],
    },
  ];

  return (
    <section id="play" className="bg-[#040949] py-8 md:py-12">
      <div className="section-container">
        <div className="flex justify-center mb-6 reveal">
          <div className="w-[30%] md:w-[20%]">
            <img
              src="/lovable-uploads/play-icon.png"
              alt="Play section icon"
              className="w-full h-full object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(175deg) brightness(105%) contrast(90%) drop-shadow(0.25px 0 0 #accae5) drop-shadow(-0.25px 0 0 #accae5) drop-shadow(0 0.25px 0 #accae5) drop-shadow(0 -0.25px 0 #accae5)' }}
            />
          </div>
        </div>
        <div className="text-center mb-6 reveal">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#accae5' }}>
            Play
          </h2>
          <p className="text-sm md:text-base max-w-3xl mx-auto mt-4" style={{ color: '#accae5cc', fontFamily: "'Press Start 2P', cursive" }}>
            <TerminalText text="Shall we play a game?" />
          </p>
        </div>

        <div className="flex flex-col gap-8 reveal mt-4">
          {sideProjects.map((project, index) => (
            <div key={index} className="flex flex-col md:flex-row overflow-hidden rounded-lg border border-[#accae5]/20 bg-[#0a1a3a] transition-all hover:border-[#accae5]/40">
              <div className="md:w-[240px] shrink-0 bg-[#0d1f42]">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[160px] flex items-center justify-center">
                    <span className="text-[#accae5]/40 text-lg">Project Image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold font-mono" style={{ color: '#accae5' }}>
                    <span className="text-[#accae5]/60">&gt;</span> {project.title}
                  </h3>
                  <a
                    href={project.link}
                    className="ml-3 mt-1 text-[#accae5]/60 hover:text-[#accae5] transition-colors"
                    aria-label={`View ${project.title}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm mb-4" style={{ color: '#accae5cc' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-mono px-3 py-1 rounded border border-[#accae5]/30"
                      style={{ color: '#accae5' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Play;
