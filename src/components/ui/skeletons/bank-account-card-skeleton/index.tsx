import { FC } from 'react';

import Container from '@/components/shared/container';

const BankAccountCardSkeleton: FC = () => {
  return (
    <div className="w-full">
      <Container styling="xl:!px-10 pt-5 flex flex-col gap-4 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div className="w-[200px] h-[24px] bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-[25%]">
            <div className="w-full h-[40px] bg-gray-300 rounded-[8px] animate-pulse"></div>
          </div>
        </div>

        {/* Divider */}
        <div>
          <hr className="w-full text-dark-gray" />
        </div>

        {/* Content */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full">
                  <div className="w-[350px] h-[50px] bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BankAccountCardSkeleton;
