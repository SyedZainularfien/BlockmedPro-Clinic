import React from 'react';

import { Typography } from '../typography';

type FilterButtonsProps = {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const FilterButtons: React.FC<FilterButtonsProps> = ({ filters, activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-6 py-2 rounded-lg cursor-pointer font-semibold ${
            activeFilter === filter
              ? 'border border-primary-light text-primary-light'
              : 'border border-light-gray text-gray'
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          <Typography size={'md'} as={'p'}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Typography>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
