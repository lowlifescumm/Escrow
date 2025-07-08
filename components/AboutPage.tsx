import React from 'react';
import { ConcordTitleLogoIcon } from './icons';

const teamMembers = [
    { name: 'Nick Harris', title: 'Attorney' },
    { name: 'Tracey Boshears', title: 'Office Manager/ Closing Agent' },
    { name: 'Rusty Thompson', title: 'Closing Agent' },
    { name: 'Brad Krivensky', title: 'Escrow Officer' },
    { name: 'Josh Sublett', title: 'Post Closing' },
    { name: 'Lauryn Young', title: 'Processor' },
    { name: 'Sydney Waters', title: 'Escrow Officer' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Meet the Team
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Our dedicated professionals are the foundation of our success.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="w-48 h-48 mb-6">
                <ConcordTitleLogoIcon className="text-gray-800 dark:text-white" />
              </div>
              <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm font-semibold leading-6 text-primary-600 dark:text-primary-400">
                {member.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
