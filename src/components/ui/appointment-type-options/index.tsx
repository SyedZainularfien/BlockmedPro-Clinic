'use client';

import React from 'react';

import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';

type AppointmentOptionProps = {
  value: 'face-to-face' | 'remote';
  selected: string;
  onSelect: ((type: 'face-to-face' | 'remote') => void) | undefined;
  icon: string;
  title: string;
  iconBg?: string;
};

const AppointmentTypeOption: React.FC<AppointmentOptionProps> = ({
  value,
  selected,
  onSelect,
  icon,
  title,
  iconBg = 'bg-gray-200',
}) => {
  const isSelected = selected === value;

  return (
    <div
      className={`relative w-full xl:w-[196px] p-4 rounded-2xl cursor-pointer border-2 flex flex-col items-center justify-center space-y-6 ${
        isSelected ? 'bg-blue-50 border-primary-dark' : 'border-gray-200 hover:border-primary-dark'
      }`}
      onClick={() => onSelect && onSelect(value)}
    >
      {/* Radio Circle */}
      <div
        className={`absolute top-3 left-3 w-5 h-5 rounded-full border ${
          isSelected ? 'border-primary-dark bg-white' : 'border-gray-300'
        }`}
      >
        {isSelected && (
          <div className="w-3.5 h-3.5 bg-primary-dark rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>

      {/* Icon */}
      <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center`}>
        <Iconify icon={icon} className={'text-white'} width={30} height={30} />
      </div>

      {/* Title */}
      <Typography size="md" className="text-center font-semibold text-black text-nowrap">
        {title}
      </Typography>
    </div>
  );
};

export default AppointmentTypeOption;
