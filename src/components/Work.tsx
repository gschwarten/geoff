
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      title: 'Scaling a Learning Business from Scratch',
      description: 'As the first marketing hire, I helped IDEO U grow from an idea into a thriving learning business with over 100K+ customers. I built and optimized growth channels—paid search, SEO, lifecycle marketing, and CRO—while leading a team to scale efforts. Experimentation and data-driven insights were key to identifying and unlocking the repeatable growth formula.',
      tags: ['Growth Strategy', 'Performance Marketing', 'SEO', 'CRO', 'Lifecycle Marketing', 'Demand Generation'],
      imageUrl: '/lovable-uploads/IDEO_U.jpg',
      link: 'https://www.ideou.com/',
    },
    {
      title: 'Customer Acquisition for In-Person + Mobile Personal Training',
      description: 'Mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.',
      tags: ['React Native', 'Firebase', 'Machine Learning'],
      imageUrl: '/lovable-uploads/gain-trainer.jpg',
      link: '#',
    },
    {
      title: 'Ecommerce: Reinventing a Social Enterprise',
      description: 'First marketing hire for fast growing for-profit social enterprise built a team and led marketing initiatives including a corporate re-branding, e-commerce web site launch, email lifecycle marketing, paid search, SEO, social media, content marketing, partnerships and PR. Grew business unit customer base 10x to over 200k customers in two years, attracting Series A investment.',
      tags: ['Marketing Strategy', 'Branding', 'Paid Search', 'Lifecycle Marketing', 'SEO', 'PR', 'Event Marketing', 'Partnerships'],
      imageUrl: '/lovable-uploads/better-world-books-screeshot2.jpg',
      link: 'http://www.betterworldbooks.com',
    },
    {
      title: 'Building a Brand, Content, and Lead Gen Engine',
      description: 'Launched and scaled a content marketing and lead generation engine, driving a peak of 75K qualified leads and 1M podcast downloads annually. The webcast and podcast program "leads with learning" helping grow an appetite for personal growth and learning. In addition to lead generation, the program drives seven figure revenue and acts as a engine for SEO, lifecycle, and social media content.',
      tags: ['Content Strategy', 'Podcast Marketing', 'Webinars', 'Growth Marketing', 'Audience Expansion'],
      imageUrl: '/lovable-uploads/Creative-Confidence-Podcast.jpg',
      link: 'https://www.ideou.com/pages/creative-confidence-podcast',
    },
  ];

  return (
    <section id="work" className="bg-[#e8f3ff] py-8 md:py-12">
      <div className="section-container">
        <div className="text-center mb-6 reveal">
          <div className="flex justify-center mb-3">
            <img 
              src="/lovable-uploads/0d5a25a5-621d-4195-af4b-7fa09af2f7a8.png" 
              alt="Swiss Army Knife" 
              className="w-16 h-16"
              style={{ filter: 'invert(6%) sepia(81%) saturate(6356%) hue-rotate(238deg) brightness(92%) contrast(144%)' }}
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Work Examples</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            This part is under construction 🚧. Check back here in a couple days for more of the projects I've worked on.
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
                      <p>Visit project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
