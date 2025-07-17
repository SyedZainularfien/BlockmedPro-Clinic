'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { IBackButtonProps } from '@/types';
import Iconify from '../iconify';
import { Typography } from '../typography';

const BackButton: React.FC<IBackButtonProps> = ({ route, label = 'Back' }) => {
  const router = useRouter();

  const handleClick = () => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex justify-start items-center gap-2.5">
      <button
        className="w-6 h-6 bg-primary-light cursor-pointer flex justify-center items-center rounded-sm"
        onClick={handleClick}
      >
        <Iconify icon="eva:arrow-ios-back-fill" height="24px" width="24px" className="text-white" />
      </button>
      <Typography size="h4" className="text-primary-light font-bold">
        {label}
      </Typography>
    </div>
  );
};

export default BackButton;
