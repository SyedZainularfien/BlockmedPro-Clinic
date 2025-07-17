'use client';

import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import useClickOutside from '@/hooks/outside-click/useOutsideClick';
import { DateRangeProps } from '@/types';
import { Button } from '../button';
import { Typography } from '../typography';

const DateRange: React.FC<DateRangeProps> = ({ data, filterKey, position, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => setIsOpen((prev) => !prev);

  const parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  const filterDataByDateRange = () => {
    if (!fromDate || !toDate) {
      if (onFilter) {
        onFilter(data);
      }
      return;
    }

    const startDate = new Date(fromDate.setHours(0, 0, 0, 0));
    const endDate = new Date(toDate.setHours(23, 59, 59, 999));

    const filteredData = data.filter((item) => {
      const itemDate = parseDate(item[filterKey]);
      return itemDate >= startDate && itemDate <= endDate;
    });

    if (onFilter) {
      onFilter(filteredData);
    }
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setFromDate(null);
    setToDate(null);
    if (onFilter) {
      onFilter(data);
    }
  };

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const formattedRange = fromDate && toDate ? `${formatDate(fromDate)} - ${formatDate(toDate)}` : 'Date Range';

  return (
    <div ref={dropdownRef} className="relative text-nowrap">
      <div
        onClick={handleToggleDropdown}
        className="w-full cursor-pointer md:min-w-[180px] px-4 py-3.5 text-gray bg-white border border-light-gray rounded-xl focus:outline-none flex items-center justify-between gap-1"
      >
        <Typography size="md" className="font-md truncate">
          {formattedRange}
        </Typography>
        <Icon icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={20} height={20} className="text-gray" />
      </div>

      {isOpen && (
        <div className={`absolute right-0 bg-white rounded-lg shadow-lg md:w-[250px] z-10 mt-2 ${position}`}>
          <div className="p-4">
            <div className="mb-2">
              <Typography size="md" className="font-normal text-gray">
                Date Range
              </Typography>
            </div>
            <div className="space-y-4">
              <div>
                <Typography size="sm" className="font-normal text-gray mb-1">
                  From
                </Typography>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  dateFormat="dd/MM/yy"
                  placeholderText="DD/MM/YY"
                  className="w-full focus:outline-none text-md px-4 py-2 border border-light-gray rounded-lg"
                  popperPlacement="bottom-end"
                />
              </div>
              <div>
                <Typography size="sm" className="font-normal text-gray mb-1">
                  To
                </Typography>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  dateFormat="dd/MM/yy"
                  placeholderText="DD/MM/YY"
                  className="w-full focus:outline-none text-md px-4 py-2 border border-light-gray rounded-lg"
                  popperPlacement="bottom-end"
                />
              </div>
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
                onClick={filterDataByDateRange}
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

export default DateRange;
