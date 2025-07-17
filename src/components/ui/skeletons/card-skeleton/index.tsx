import { FC } from 'react';

const CardSkeleton: FC = () => {
  return (
    <div className="w-[312px] min-w-[312px] min-h-[200px] bg-gray-200 flex flex-col gap-5 rounded-[18px] p-5 relative animate-pulse">
      <div className="absolute flex items-center gap-2 top-3 right-4">
        <div className="w-[24px] h-[24px] bg-gray-300 rounded-full"></div>
        <div className="w-[60px] h-[15px] bg-gray-300 rounded-md"></div>
      </div>
      <div className="min-w-[37px] min-h-[26px] max-w-[37px] max-h-[26px] bg-gray-300 rounded-md"></div>
      <div className="flex flex-col gap-1">
        <div className="w-[100px] h-[15px] bg-gray-300 rounded-md"></div>
        <div className="w-[150px] h-[20px] bg-gray-300 rounded-md mt-2"></div>
      </div>
      <div className="flex justify-between w-full mt-2">
        <div className="flex flex-col gap-1">
          <div className="w-[120px] h-[15px] bg-gray-300 rounded-md"></div>
          <div className="w-[100px] h-[20px] bg-gray-300 rounded-md mt-2"></div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-[50px] h-[15px] bg-gray-300 rounded-md"></div>
          <div className="w-[60px] h-[20px] bg-gray-300 rounded-md mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
