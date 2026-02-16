
import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface SideProject {
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
  tags: string[];
}

const TypingText: React.FC<{ text: string; delay?: number; onComplete?: () => void; className?: string }> = ({ text, delay = 0, onComplete, className = '' }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 40);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [displayed, started, text, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && <span className="animate-pulse">▌</span>}
    </span>
  );
};

const Play: React.FC = () => {
  const [headerDone, setHeaderDone] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const sideProjects: SideProject[] = [
    {
      title: 'BookRun — Library Book Finder',
      description: 'Paste your Goodreads list, pick your library, and instantly see what\'s available before you go.',
      imageUrl: '/lovable-uploads/bookrun-og.png',
      link: '/bookrun',
      tags: ['React', 'API Integration', 'Side Project'],
    },
  ];

  return (
    <section id="play" className="bg-[#0a0a1a] py-12 md:py-20 relative overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        }}
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <div className="section-container relative z-20">
        <div className="text-center mb-10 reveal">
          <div className="inline-block font-mono">
            <TypingText
              text="> SHALL WE PLAY A GAME?"
              className="text-2xl md:text-4xl font-bold tracking-wider text-[#4af]"
            />
          </div>
          {!headerDone && (
            <div className="mt-2 font-mono">
              <TypingText
                text="Things I've built for fun, curiosity, or because I needed them to exist."
                delay={1200}
                onComplete={() => {
                  setHeaderDone(true);
                  setTimeout(() => setShowProjects(true), 300);
                }}
                className="text-sm md:text-base opacity-70"
              />
            </div>
          )}
          {headerDone && (
            <p className="mt-2 font-mono text-sm md:text-base opacity-70" style={{ color: '#4af' }}>
              Things I've built for fun, curiosity, or because I needed them to exist.
            </p>
          )}
        </div>

        <div className={`transition-all duration-700 ${showProjects || headerDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-2xl mx-auto space-y-6 reveal">
            {sideProjects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                className="block group rounded-lg border border-[#4af]/30 bg-[#0d1117] hover:border-[#4af]/60 hover:shadow-[0_0_30px_rgba(68,170,255,0.15)] transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {project.imageUrl && (
                    <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-5 md:p-6 font-mono">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold" style={{ color: '#4af' }}>
                        <span className="opacity-50 mr-1">&gt;</span>
                        {project.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: '#4af' }} />
                    </div>
                    <p className="text-sm opacity-60 mb-3" style={{ color: '#8cb4d8' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-0.5 rounded border border-[#4af]/20 opacity-50"
                          style={{ color: '#4af' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 font-mono text-xs opacity-30" style={{ color: '#4af' }}>
          <span className="animate-pulse">▌</span>
        </div>
      </div>
    </section>
  );
};

export default Play;
