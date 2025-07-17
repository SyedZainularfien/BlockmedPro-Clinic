import React from 'react';

import { ITabsProps } from '@/types';
import { Typography } from '../typography';

const Tabs: React.FC<ITabsProps> = ({ activeTab, setActiveTab, tabs, filled }) => {
  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 min-w-max">
          {tabs?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative cursor-pointer ${
                filled
                  ? activeTab === tab.id
                    ? 'bg-primary-dark text-white rounded-lg shadow-md hover:bg-primary-light transition-colors duration-50 py-3 px-2.5'
                    : 'text-gray hover:text-primary-light py-3 px-2.5'
                  : activeTab === tab.id
                    ? 'py-6 text-primary-light after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:h-[2px] after:w-[90%] after:bg-primary-light'
                    : 'text-gray hover:text-primary-light py-6'
              }`}
            >
              <div className="flex items-center">
                <Typography size="lg" className="font-semibold whitespace-nowrap">
                  {tab.title}
                </Typography>

                {tab.count !== undefined && tab.id !== 1 && (
                  <span className="ml-2 p-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-red text-white">
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
