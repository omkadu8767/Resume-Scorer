import React from 'react';
import { Scan, Award, Code, Clock, BarChart as ChartBar, Lightbulb } from 'lucide-react';

function Features() {
  const features = [
    {
      icon: Scan,
      title: 'Smart Resume Scanning',
      description: 'Our AI analyzes resumes to extract skills, experience, and qualifications that match your job requirements.'
    },
    {
      icon: Award,
      title: 'Candidate Scoring',
      description: 'Each resume receives a match score based on how well the candidates profile aligns with your requirements.'
    },
    {
      icon: Code,
      title: 'Technology Detection',
      description: 'Automatically identify technologies and skills mentioned in resumes to find candidates with the right tech stack.'
    },
    {
      icon: Clock,
      title: 'Experience Assessment',
      description: 'Determine if candidates are junior, mid-level, or senior based on their experience and accomplishments.'
    },
    {
      icon: ChartBar,
      title: 'Strengths & Weaknesses',
      description: 'Get insights into each candidates strengths and areas for improvement relative to your job requirements.'
    },
    {
      icon: Lightbulb,
      title: 'Key Highlights',
      description: 'Automatically extract and highlight the most relevant achievements and qualifications from each resume.'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to find the perfect candidate
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our comprehensive suite of AI-powered tools helps you make better hiring decisions.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="absolute h-12 w-12 flex items-center justify-center rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;