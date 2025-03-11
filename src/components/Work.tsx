
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  link: string;
  isGif?: boolean;
}

const Work: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with integrated payment processing and inventory management.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
    },
    {
      title: 'Health & Fitness App',
      description: 'Mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.',
      tags: ['React Native', 'Firebase', 'Machine Learning'],
      link: '#',
    },
    {
      title: 'Finance Dashboard',
      description: 'Interactive dashboard for visualizing financial data with real-time analytics and reporting.',
      tags: ['TypeScript', 'D3.js', 'Express', 'PostgreSQL'],
      link: '#',
    },
    {
      title: 'Social Network',
      description: 'Community platform with content sharing, messaging, and user engagement features.',
      tags: ['Vue.js', 'GraphQL', 'AWS', 'Socket.io'],
      link: '#',
    },
  ];

  return (
    <section id="work" className="bg-[#e8f3ff] py-8 md:py-12">
      <div className="section-container">
        <div className="flex flex-col items-center justify-center mb-12 reveal">
          {/* Swiss Army Knife Icon */}
          <div className="mb-4">
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#0a2f91]"
            >
              {/* Base handle */}
              <rect x="12" y="22" width="40" height="20" rx="4" fill="currentColor" />
              
              {/* Knife blade (open) */}
              <path d="M52 25L62 15L58 32L52 25Z" fill="currentColor" stroke="white" strokeWidth="1" />
              
              {/* Scissors (open) */}
              <path d="M9 30C7 28 4 25 7 22C10 19 12 23 12 25" stroke="white" strokeWidth="2" fill="currentColor" />
              <path d="M9 34C7 36 4 39 7 42C10 45 12 41 12 39" stroke="white" strokeWidth="2" fill="currentColor" />
              <rect x="8" y="31" width="6" height="2" fill="white" />
              
              {/* Corkscrew (open) */}
              <path d="M14 10C14 10 16 10 16 12C16 14 14 14 14 16C14 18 16 18 16 20C16 22 14 22 14 22" stroke="white" strokeWidth="2" fill="none" />
              
              {/* Screwdriver (open) */}
              <rect x="40" y="12" width="3" height="10" fill="currentColor" />
              <rect x="38" y="10" width="7" height="3" fill="currentColor" />
              
              {/* Can opener (open) */}
              <path d="M30 15L28 10L26 15L30 15Z" fill="currentColor" stroke="white" strokeWidth="1" />
              <rect x="27" y="15" width="2" height="7" fill="currentColor" />
              
              {/* Rivets on handle */}
              <circle cx="17" cy="32" r="1.5" fill="white" />
              <circle cx="32" cy="32" r="1.5" fill="white" />
              <circle cx="47" cy="32" r="1.5" fill="white" />
            </svg>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Work Examples</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Here are some of the projects I've worked on. Each represents a unique challenge
            and demonstrates different aspects of my skillset.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 reveal">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-video bg-gray-100 relative">
                {project.imageUrl ? (
                  <div className="w-full h-full">
                    {project.isGif ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Project Image</span>
                  </div>
                )}
                <a 
                  href={project.link} 
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-label={`View ${project.title}`}
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">{tag}</Badge>
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

export default Work;
