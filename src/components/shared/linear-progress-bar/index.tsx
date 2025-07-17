import React, { FC } from 'react';

import { ProgressBarProps } from '@/types';
import { Typography } from '../typography';

const ProgressBar: FC<ProgressBarProps> = ({ uploadProgress }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full bg-light-gray rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
      <Typography
        size="xl"
        className="text-black font-bold flex justify-center items-center"
      >{`${uploadProgress}%`}</Typography>
    </div>
  );
};

export default ProgressBar;
