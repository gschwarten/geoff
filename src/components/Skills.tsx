
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    { name: 'JavaScript', level: 90, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 80, category: 'Frontend' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'Python', level: 70, category: 'Backend' },
    { name: 'UI/UX Design', level: 85, category: 'Design' },
    { name: 'Figma', level: 80, category: 'Design' },
    { name: 'GraphQL', level: 65, category: 'Backend' },
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="section-container bg-gray-50">
      <div className="text-center mb-16 reveal">
        <h2 className="section-heading">My Skills</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          I've developed expertise in various technologies and methodologies throughout my career,
          with a focus on creating scalable and user-friendly applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 reveal">
        {categories.map((category, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="bg-black text-white p-4">
              <h3 className="text-xl font-semibold">{category}</h3>
            </div>
            <CardContent className="p-6">
              <div className="space-y-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;
