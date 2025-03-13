
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  link: string;
  isGif?: boolean;
}

const Work: React.FC = () => {
  const projects: Project[] = [{
    title: 'Scaling a Learning Business from Scratch',
    description: 'As the first marketing hire, I helped IDEO U grow from an idea into a thriving learning business with over 100K+ customers. I built and optimized growth channels—paid search, SEO, lifecycle marketing, and CRO—while leading a team to scale efforts. Experimentation and data-driven insights were key to identifying and unlocking the repeatable growth formula.',
    tags: ['Growth Strategy', 'Performance Marketing', 'SEO', 'CRO', 'Lifecycle Marketing', 'Demand Generation', 'Ecommerce Product Management', 'Product Growth'],
    imageUrl: '/lovable-uploads/IDEO_U.jpg',
    link: 'https://www.ideou.com/'
  }, {
    title: 'Customer Acquisition for In-Person + Mobile Personal Training',
    description: 'Led customer acquisition and growth efforts for a two-sided marketplace that made personal training more affordable and accessible by combining in-person sessions with app-assigned workouts. Helped 5x the customer base through new channel expansion, paid search, event marketing, and strategic partnerships.',
    tags: ['Customer Acquisition', 'Growth Marketing', 'Two-Sided Marketplace', 'Paid Search', 'Event Marketing', 'Partnerships', 'Health', 'Fitness Tech', 'Product Growth'],
    imageUrl: '/lovable-uploads/gain-trainer.jpg',
    link: '#'
  }, {
    title: 'Ecommerce: Reinventing a Social Enterprise',
    description: 'First marketing hire for fast growing for-profit social enterprise built a team and led marketing initiatives including a corporate re-branding, e-commerce web site launch, email lifecycle marketing, paid search, SEO, social media, content marketing, partnerships and PR. Grew business unit customer base 10x to over 200k customers in two years, attracting Series A investment.',
    tags: ['Marketing Strategy', 'Branding', 'Paid Search', 'Lifecycle Marketing', 'SEO', 'PR', 'Event Marketing', 'Partnerships', 'Ecommerce Product Management', 'Product Growth'],
    imageUrl: '/lovable-uploads/better-world-books-screeshot2.jpg',
    link: 'http://www.betterworldbooks.com'
  }, {
    title: 'Building a Brand, Content, and Lead Gen Engine',
    description: 'Launched and scaled a content marketing and lead generation engine, driving a peak of 75K qualified leads and 1M podcast downloads annually. The webcast and podcast program "leads with learning" helping grow an appetite for personal growth and learning. In addition to lead generation, the program drives seven figure revenue and acts as a engine for SEO, lifecycle, and social media content.',
    tags: ['Content Strategy', 'Podcast Marketing', 'Webinars', 'Growth Marketing', 'Audience Expansion'],
    imageUrl: '/lovable-uploads/Creative-Confidence-Podcast.jpg',
    link: 'https://www.ideou.com/pages/creative-confidence-podcast'
  }, {
    title: 'Launching a New Offer Aligned with Market Demand',
    description: 'Leveraging high-intent search queries and emerging trends in online learning, I designed and launched an experimental certificate program that combined multiple courses. The experiment—powered by an Unbound landing page, lifecycle marketing, paid search, and social media—delivered outsized results, doubling AOV and retention overnight. I led iterations of the experiment to develop an ongoing product offering with a scalable marketing playbook and drove growth efforts until it reached 40% of business unit revenue.',
    tags: ['Product Growth', 'Lifecycle Marketing', 'Analytics', 'Experimentation', 'GTM Strategy'],
    imageUrl: '/lovable-uploads/cert3.png',
    link: 'https://www.rapidmentalhealth.com/',
    isGif: false
  }, {
    title: 'Removing Barriers to Healthy Meal Access for Seniors',
    description: 'I worked with Healthrageous to identify and eliminate conversion friction in the sign-up process for healthy meal programs targeting seniors. By analyzing drop-off points in the user journey, I uncovered key insights that led to improved messaging, streamlined onboarding, and a smoother experience for older adults, ultimately increasing engagement and access.',
    tags: ['Conversion Rate Optimization', 'UX', 'Analytics', 'Growth Strategy', 'Data Analysis', 'Health', 'Health Tech', 'Healthplan Member Marketing', 'Direct Mail', 'Product Growth'],
    imageUrl: '/lovable-uploads/healthrageous.png',
    link: 'https://madeeasymeals.com/',
    isGif: false
  }];

  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isOpen, setIsOpen] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    setAllTags(Array.from(tags).sort());
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => selectedTags.some(tag => project.tags.includes(tag)));
      setFilteredProjects(filtered);
    }
  }, [selectedTags]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  const getDisplayedTags = () => {
    if (showAllTags) return allTags;
    return allTags.slice(0, 8);
  };

  return <section id="work" className="bg-[#e8f3ff] py-8 md:py-12">
      <div className="section-container">
        <div className="text-center mb-6 reveal">
          <div className="flex justify-center mb-3">
            <img src="/lovable-uploads/0d5a25a5-621d-4195-af4b-7fa09af2f7a8.png" alt="Swiss Army Knife" className="w-24 h-24" style={{
            filter: 'invert(6%) sepia(81%) saturate(6356%) hue-rotate(238deg) brightness(92%) contrast(144%)'
          }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Work Examples</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">A selection of projects that showcase unique challenges and highlight different aspects of my skill set.</p>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-8 reveal space-y-2">
          <div className="flex items-center justify-between">
            <CollapsibleTrigger className="flex items-center hover:text-blue-600">
              <Filter className="h-5 w-5 mr-2" />
              <span className="text-lg font-medium text-gray-500">Filter by skills & expertise</span>
              {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </CollapsibleTrigger>
            {selectedTags.length > 0 && <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <X className="h-4 w-4 mr-1" /> Clear filters
              </button>}
          </div>

          <CollapsibleContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {getDisplayedTags().map(tag => <Badge key={tag} variant={selectedTags.includes(tag) ? "default" : "secondary"} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleTagClick(tag)}>
                  {tag}
                </Badge>)}
            </div>
            {allTags.length > 8 && <button onClick={() => setShowAllTags(!showAllTags)} className="text-sm text-blue-600 hover:text-blue-800">
                {showAllTags ? 'Show less' : `Show ${allTags.length - 8} more tags`}
              </button>}
          </CollapsibleContent>
        </Collapsible>

        <div className="grid md:grid-cols-2 gap-8 reveal">
          {filteredProjects.length > 0 ? filteredProjects.map((project, index) => <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video bg-gray-100 relative">
                  {project.imageUrl ? <div className="w-full h-full">
                      {project.isGif ? <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" /> : <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />}
                    </div> : <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">Project Image</span>
                    </div>}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href={project.link} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors" aria-label={`View ${project.title}`}>
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
                    {project.tags.map((tag, tagIndex) => <Badge key={tagIndex} variant={selectedTags.includes(tag) ? "default" : "secondary"} className={selectedTags.includes(tag) ? "cursor-pointer" : "cursor-pointer"} onClick={() => handleTagClick(tag)}>
                        {tag}
                      </Badge>)}
                  </div>
                </CardContent>
              </Card>) : <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">No projects match your selected filters.</p>
              <button onClick={clearFilters} className="mt-2 text-blue-600 hover:text-blue-800">
                Clear filters
              </button>
            </div>}
        </div>
      </div>
    </section>;
};

export default Work;
