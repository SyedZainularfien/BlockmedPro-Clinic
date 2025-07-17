import React, { FC } from 'react';

const ChooseCardSkeleton: FC<any> = () => {
  return (
    <div className={`flex items-center justify-between w-full cursor-pointer rounded-[12px] px-3 md:px-6 border py-8`}>
      <div className="flex items-center gap-1 md:gap-3">
        <div>
          <label className="cursor-pointer gradient-checkbox">
            <input type="checkbox" className="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="flex items-center w-full gap-2 md:gap-3">
          <div className="w-full">
            <div className="w-[20px] h-[20px] bg-gray-300 animate-pulse rounded-full"></div>
          </div>
          <div className="flex flex-col w-full gap-1">
            <div className="w-[100px] h-[16px] bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-[150px] h-[16px] bg-gray-300 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="w-[60px] h-[16px] bg-gray-300 animate-pulse rounded-full"></div>
    </div>
  );
};

export default ChooseCardSkeleton;
