// components/shared/payment-option-card.tsx
'use client';

import Image from 'next/image';
import React from 'react';

import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { IPaymentOptionCardProps } from '@/types';

const PaymentOptionCard: React.FC<IPaymentOptionCardProps> = ({
  value,
  selectedValue,
  onSelect,
  icon,
  label,
  imgSrc,
  isImage,
  // iconBgClass = 'bg-light-gray',
}) => {
  const isSelected = value === selectedValue;

  return (
    <div
      className={`relative w-full p-4 rounded-[16px] cursor-pointer border-2 flex flex-col items-center justify-center space-y-6 ${
        isSelected ? 'bg-blue-50 border-primary-light' : 'border-light-gray hover:border-primary-light'
      }`}
      onClick={() => onSelect(value)}
    >
      <div
        className={`absolute top-2 right-2 w-5 h-5 rounded-full border ${
          isSelected ? 'border-primary-light bg-white' : 'border-dark-gray'
        }`}
      >
        {isSelected && (
          <div className="w-4 h-4 bg-primary-light rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2.5">
        <div
          className={`w-14 h-14 ${isSelected ? 'bg-primary-light' : 'bg-light-gray'} rounded-full flex items-center justify-center`}
        >
          {isImage ? (
            <Image src={imgSrc ?? ''} alt="payment-method" height={28} width={28} />
          ) : (
            <Iconify
              width={30}
              height={30}
              icon={icon}
              className={`${isSelected ? 'text-white' : 'text-primary-light'}`}
            />
          )}
        </div>
        <Typography size="md" className="text-center font-semibold text-black md:text-nowrap">
          {label}
        </Typography>
      </div>
    </div>
  );
};

export default PaymentOptionCard;
