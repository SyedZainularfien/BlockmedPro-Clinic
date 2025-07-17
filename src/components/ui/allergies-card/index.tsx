import React, { FC } from 'react';

import Container from '@/components/shared/container';
import { Typography } from '@/components/shared/typography';
import { IAllergiesCardProps } from '@/types';

const AlllergiesCard: FC<IAllergiesCardProps> = ({ data }) => {
  return (
    <Container hasBorders>
      <div className="px-5 py-6 flex flex-col gap-2.5">
        <Typography size={'lg'} className="text-black font-bold">
          Allergies
        </Typography>
        <hr className="text-light-gray w-full" />
        <div className="max-h-[745px] overflow-auto custom-scrollbar flex flex-col gap-2.5">
          {data?.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 border border-light-gray rounded-[12px] p-3.5">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                <Typography size="sm" as="p" className="text-black font-semibold min-w-[100px]">
                  Allergy:
                </Typography>
                <Typography size="sm" as="p" className="text-dark-gray font-normal">
                  {item.allergy}
                </Typography>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                <Typography size="sm" as="p" className="text-black font-semibold min-w-[100px]">
                  Specification:
                </Typography>
                <Typography size="sm" as="p" className="text-dark-gray font-normal">
                  {item.specification}
                </Typography>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                <Typography size="sm" as="p" className="text-black font-semibold min-w-[100px]">
                  Reaction:
                </Typography>
                <Typography size="sm" as="p" className="text-dark-gray font-normal">
                  {item.reaction}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AlllergiesCard;
