import React, { FC } from 'react';

import Container from '@/components/shared/container';

const BillingDetailsCardSkeleton: FC = () => {
  return (
    <Container styling="!bg-off-white rounded-[8px] flex flex-col gap-3 p-6 relative !shadow-none">
      {/* Action Buttons Skeleton */}
      <div className="absolute flex gap-3 top-1.5 right-2.5">
        <div className="flex items-center gap-1.5">
          <div className="w-[16px] h-[16px] bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-[50px] h-[14px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-[16px] h-[16px] bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-[50px] h-[14px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Address Skeleton */}
      <div className="flex gap-3 pt-3">
        <div className="w-[20%]">
          <div className="w-[60px] h-[20px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        <div className="flex-1">
          <div className="xl:w-[50%] h-[20px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Country Skeleton */}
      <div className="flex gap-3">
        <div className="w-[20%]">
          <div className="w-[60px] h-[20px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        <div className="flex-1">
          <div className="xl:w-[50%] h-[20px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Postal Code Skeleton */}
      <div className="flex gap-3">
        <div className="w-[20%]">
          <div className="w-[60px] h-[20px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        <div className="flex-1">
          <div className="xl:w-[50%] h-[20px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </Container>
  );
};

export default BillingDetailsCardSkeleton;
