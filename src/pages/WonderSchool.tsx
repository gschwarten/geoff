
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const WonderSchool: React.FC = () => {
  useEffect(() => {
    document.title = 'WonderSchool | Geoff Schwarten';
    
    // Apply the same styling as the main page for consistency
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #f5f7fa;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Geoff Schwarten</h1>
          <p className="text-gray-600 mt-2">Strategy proposal for WonderSchool</p>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Executive Summary</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                Based on my analysis of WonderSchool's current position and growth goals, I'm proposing a comprehensive growth strategy focused on sustainable customer acquisition, improved retention metrics, and strengthening our position in the early childhood education market. This document outlines my approach to immediate challenges while building foundations for long-term success.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Strategic Pillars</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Acquisition Optimization</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Refine customer segmentation model</li>
                  <li>Develop channel-specific targeting</li>
                  <li>Implement multi-touch attribution</li>
                  <li>Optimize CAC across channels</li>
                </ul>
                <div className="mt-4">
                  <Badge>Growth Strategy</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Retention Enhancement</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Develop cohort-based retention analysis</li>
                  <li>Implement targeted re-engagement campaigns</li>
                  <li>Create provider success scorecard</li>
                  <li>Design churn prediction model</li>
                </ul>
                <div className="mt-4">
                  <Badge>Lifecycle Marketing</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Market Positioning</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Refine brand messaging frameworks</li>
                  <li>Develop competitive differentiation strategy</li>
                  <li>Create vertical-specific playbooks</li>
                  <li>Build thought leadership platform</li>
                </ul>
                <div className="mt-4">
                  <Badge>Brand Strategy</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Relevant Experience</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">IDEO U Growth Leadership</h3>
                    <a href="https://www.ideou.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                  <p className="text-gray-700 mt-2">
                    Built and scaled a learning platform from concept to 100K+ customers, developing the growth playbook and optimizing acquisition channels through continuous experimentation and data-driven insights.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">Better World Books E-commerce</h3>
                    <a href="http://www.betterworldbooks.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                  <p className="text-gray-700 mt-2">
                    Led marketing initiatives for a social enterprise, growing customer base 10x to over 200K in two years through strategic channel optimization, brand development, and customer lifecycle enhancements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                I'd welcome the opportunity to discuss this proposal in more detail and explore how my experience aligns with WonderSchool's vision. Please feel free to reach out to schedule a follow-up conversation.
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-blue-800 font-medium">Contact Information:</p>
                <p className="text-blue-700">
                  <a href="https://www.linkedin.com/in/geoffschwarten" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn: geoffschwarten</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <footer className="bg-gray-100 mt-16">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-gray-600 text-sm">
            Confidential proposal for WonderSchool. Not for distribution.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WonderSchool;
