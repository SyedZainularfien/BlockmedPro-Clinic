import Image from 'next/image';
import React from 'react';

import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { StatsCardProps } from '@/types';

const StatsCard: React.FC<StatsCardProps> = ({
  icon = 'carbon:hospital-bed',
  title,
  isSvg,
  value,
  styling,
  iconColor,
  iconBgColor,
  negative,
  percentage,
  valueFontSize = 'h4',
}) => {
  return (
    <div className={`py-5 px-6 sm:py-[20px] sm:px-[22px] flex justify-between gap-4 items-center w-full ${styling}`}>
      <div className="w-full flex flex-col justify-center items-start">
        <Typography size="md" className="text-black font-semibold text-wrap">
          {title}
        </Typography>
        <div className="w-full flex justify-between items-center">
          <Typography size={valueFontSize ? valueFontSize : 'h4'} className="text-black font-bold leading-none">
            {value}
          </Typography>
          <div
            className="flex justify-center items-center w-[60px] h-[60px] rounded-[12px]"
            style={{ backgroundColor: iconBgColor }}
          >
            {isSvg ? (
              <Image src={icon} alt={title} width={32} height={32} />
            ) : (
              <Iconify icon={icon} color={iconColor} width="32" height="32" />
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <Iconify
              height="25"
              width="25"
              icon={negative ? 'uil:arrow-down' : 'uil:arrow-up'}
              className={`${negative ? 'text-red' : 'text-light-green'}`}
            />
          </div>
          <div className="flex items-center gap-1">
            <div className={`${negative ? 'text-red' : 'text-light-green'} text-sm font-semibold`}>{percentage}</div>
            <div className="font-normal text-gray whitespace-nowrap text-sm">since last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
