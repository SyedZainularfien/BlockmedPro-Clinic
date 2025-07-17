import Image from 'next/image';
import React, { FC } from 'react';

import { Typography } from '@/components/shared/typography';
import { content } from '@/data';

const ChooseCard: FC<any> = ({ data, onChange, isDefault }) => {
  const cardConfig = content?.cardDetails?.cardCheckoutData?.find((card) => card?.type === data?.brand);

  return (
    <div
      onClick={() => onChange(data)}
      className={`flex items-center justify-between w-full cursor-pointer rounded-[12px] px-3 md:px-6 border py-8 ${
        isDefault === data?.id ? 'bg-background-gray border-transparent' : 'border-light-gray'
      }`}
    >
      <div className="flex items-center gap-1 md:gap-3">
        <div>
          <label className="cursor-pointer gradient-checkbox">
            <input type="checkbox" className="checkbox" checked={isDefault === data?.id} onChange={onChange} />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="flex items-center w-full gap-2 md:gap-3">
          <div className="w-full">
            <Image src={cardConfig?.svg || '/default.png'} alt="Card" width={20} height={20} />
          </div>
          <div className="flex flex-col w-full gap-1">
            <Typography as="p" size="md" className="text-dark-gray capitalize">
              {data?.brand}
            </Typography>
            <Typography as="p" size="md" className="text-primary-text font-semibold whitespace-nowrap">
              {data?.last4} | {data?.exp_month}/{data?.exp_year}
            </Typography>
          </div>
        </div>
      </div>
      {isDefault === data?.id && (
        <div>
          <Typography as="p" size="md" className="text-dark-gray font-semibold">
            Default
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ChooseCard;
