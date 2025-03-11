
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
        <div className="text-center mb-12 reveal">
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
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Project Image</span>
                </div>
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
