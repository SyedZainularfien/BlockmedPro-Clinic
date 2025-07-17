// TODO: Figure out types later...

'use client';

import Image from 'next/image';
import React, { FC } from 'react';

import { Typography } from '@/components/shared/typography';
import { content } from '@/data';

const Card: FC<any> = ({ cardData, onChange, isDefault }) => {
  const cardConfig = content?.cardDetails?.cardType?.find((card) => card?.type === cardData?.card?.brand);

  return (
    <div
      className={`w-[312px] min-w-[312px] ${
        cardConfig?.bgColor || 'bg-dark-blue-gradient'
      } flex flex-col gap-6 rounded-[18px] p-5 relative`}
    >
      <div className="absolute flex items-center gap-2 top-3 right-4">
        <label className="card-checkbox">
          <input checked={isDefault} onChange={onChange} type="checkbox" id="defaultCard" className="checkbox" />
          <span className="checkmark"></span>
          <Typography as="p" size="sm" className="text-white">
            Default
          </Typography>
        </label>
      </div>
      <div className="min-w-[37px] min-h-[26px] max-w-[37px] max-h-[26px] flex items-center">
        <Image src={cardConfig?.svg || '/assets/svg/mastercard-card.svg'} alt="mastercard" width={37} height={26} />
      </div>
      <div className="flex flex-col gap-1">
        <div>
          <Typography as="p" size="sm" className="text-white">
            Card number
          </Typography>
        </div>
        <div>
          <Typography as="h5" size="h5" className="text-white">
            XXXX XXXX XXXX {cardData?.card?.last4}
          </Typography>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-1">
          <div>
            <Typography as="p" size="sm" className="text-white">
              Card number
            </Typography>
          </div>
          <div>
            <Typography as="p" size="md" className="text-white !font-semibold">
              {cardData?.billing_details?.name || 'John Doe Doe'}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <Typography as="p" size="sm" className="text-white">
              Expiry
            </Typography>
          </div>
          <div>
            {' '}
            <Typography as="p" size="md" className="text-white !font-semibold">
              {cardData?.card?.exp_month}/{cardData?.card?.exp_year}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
