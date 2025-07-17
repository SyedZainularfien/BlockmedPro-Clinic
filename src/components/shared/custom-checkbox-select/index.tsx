'use client';

import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useState } from 'react';

import useClickOutside from '@/hooks/outside-click/useOutsideClick';
import { ICustomCheckboxDropdownProps } from '@/types';
import StarRating from '../../ui/star-rating';
import { Button } from '../button';
import { Typography } from '../typography';

const CustomCheckboxSelect: React.FC<ICustomCheckboxDropdownProps> = ({
  title,
  options,
  onApply,
  selectedFilters,
  position,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedFilters);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelectedOptions(selectedFilters);
  }, [selectedFilters]);

  const handleOptionChange = (value: string) => {
    setSelectedOptions((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
  };

  const handleApply = () => {
    if (onApply) {
      onApply(selectedOptions);
    }
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  return (
    <div ref={dropdownRef} className="relative text-nowrap">
      <div
        onClick={handleToggleDropdown}
        className="w-full cursor-pointer md:min-w-[130px] sm:max-w-[256px] px-4 py-3.5 text-gray bg-white border border-light-gray rounded-xl focus:outline-none flex items-center justify-between gap-1"
      >
        <Typography size="md" className="font-md">
          {title}
        </Typography>
        <Icon icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={20} height={20} className="text-gray" />
      </div>

      {isOpen && (
        <div className={`absolute right-0 bg-white rounded-lg shadow-lg md:w-[250px] z-10 mt-2 ${position}`}>
          <div className="p-4">
            <div className="mb-2">
              <Typography size="md" className="font-normal text-gray">
                {title}
              </Typography>
            </div>
            <div className="space-y-2">
              {options?.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedOptions?.includes(option.value)}
                    onChange={() => handleOptionChange(option.value)}
                    className="form-checkbox h-4 w-4"
                  />
                  <Typography size="md" className="font-normal text-gray text-wrap">
                    {option.label}
                  </Typography>
                  {title === 'Ratings' && (
                    <div className="ml-0.5">
                      <StarRating maxRating={5} defaultRating={Number(option.value)} size={16} readOnly />
                    </div>
                  )}
                </label>
              ))}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2.5">
              <Button
                variant="outlined"
                size="medium"
                onClick={handleClearAll}
                className="w-full sm:w-[120px] text-center flex justify-center"
              >
                <Typography size="md" className="font-semibold whitespace-nowrap">
                  Clear all
                </Typography>
              </Button>
              <Button
                variant="primary"
                size="medium"
                type="submit"
                onClick={handleApply}
                className="w-full sm:w-[120px] text-center flex justify-center"
              >
                <Typography size="md" className="font-semibold">
                  Apply
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCheckboxSelect;
