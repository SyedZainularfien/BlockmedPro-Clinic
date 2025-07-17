import Image from 'next/image';
import React from 'react';

import { Typography } from '@/components/shared/typography';

const ComingSoon = () => {
  return (
    <div className="relative flex justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <div>
          <Image
            src="/assets/svgs/coming-soon.svg"
            alt="coming soon image"
            height={275}
            width={275}
            className="w-[230px] h-[230px] sm:w-[275px] sm:h-[275px]"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <Typography size="h2" className="font-bold text-gradient-primary bg-clip-text text-transparent">
            Coming Soon
          </Typography>
          <Typography size="lg" className="font-semi-bold text-gray text-center text-wrap w-[70%]">
            Exciting News! Something amazing is coming soon. Stay tuned for updates!
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
