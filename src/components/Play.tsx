
import React from 'react';
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

const Play: React.FC = () => {
  const sideProjects: SideProject[] = [
    {
      title: 'BookRun — Library Book Finder',
      description: 'I kept showing up to the library with 50 books on my Goodreads list and zero clue which ones were actually on the shelf. So I built BookRun — paste your Goodreads list, pick your library, and instantly see what\'s available before you go.',
      imageUrl: '/lovable-uploads/bookrun-og.png',
      link: '/bookrun',
      tags: ['React', 'API Integration', 'Side Project'],
    },
  ];

  return (
    <section id="play" className="bg-[#accae5] py-8 md:py-12">
      <div className="section-container">
        <div className="flex justify-center mb-6 reveal">
          <div className="w-[30%] md:w-[20%]">
            <img
              src="/lovable-uploads/play-icon.png"
              alt="Play section icon"
              className="w-full h-full object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(7%) sepia(80%) saturate(4500%) hue-rotate(225deg) brightness(70%) contrast(115%)' }}
            />
          </div>
        </div>
        <div className="text-center mb-6 reveal">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#040949' }}>
            Play
          </h2>
          <p className="text-lg max-w-3xl mx-auto mt-4" style={{ color: '#040949cc' }}>
            Things I've built for fun, curiosity, or because I needed them to exist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 reveal">
          {sideProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-video bg-gray-100 relative">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Project Image</span>
                  </div>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={project.link}
                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        aria-label={`View ${project.title}`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Try it out</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: '#040949', color: '#ffffff' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Play;
