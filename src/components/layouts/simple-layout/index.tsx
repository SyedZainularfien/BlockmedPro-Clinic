'use client';

import Image from 'next/image';

import { ISimpleLayoutProps } from '@/types';

const SimpleLayout = ({ children }: ISimpleLayoutProps) => {
  return (
    <div className="relative mx-auto max-w-[2560px] py-[32px] flex flex-col items-center h-[calc(100dvh-40px)] lg:h-[calc(100dvh-50px)] overflow-y-auto overflow-x-hidden scrollbar-hide flex-1">
      <div className="flex flex-col items-center gap-7.5 w-full">
        <Image src="/assets/svgs/logo.svg" alt="Logo" width={240} height={45} />
        <div className="w-[80%]">{children}</div>
      </div>
    </div>
  );
};

export default SimpleLayout;
