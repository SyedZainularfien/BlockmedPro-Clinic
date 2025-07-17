import React, { FC } from 'react';

const CardFormSkeleton: FC = () => {
  return (
    <div className="w-full h-max bg-white shadow-lg rounded-[22px] flex flex-col p-5 xl:p-10 animate-pulse">
      {/* Placeholder for Card Image */}
      <div className={`w-full h-32 bg-gray-200 rounded-lg mb-4`}></div>

      <div className="w-full">
        <hr className="w-full text-light-gray" />
      </div>

      <div className="grid w-full grid-cols-2 gap-6 mt-4">
        <div className="flex flex-col w-full col-span-2 gap-2">
          <div className="w-full h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="flex w-full col-span-2 gap-3">
          <div className="flex flex-col w-full col-span-1 gap-2">
            <div className="w-full h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-col w-full col-span-1 gap-2">
            <div className="w-full h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="col-span-2 mt-6">
        <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
        <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
      </div>

      <div className="w-full mt-6">
        <div className="w-full h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default CardFormSkeleton;
