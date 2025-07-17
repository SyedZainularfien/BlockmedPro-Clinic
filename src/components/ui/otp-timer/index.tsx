import React, { FC } from 'react';

import { Typography } from '@/components/shared/typography';
import { OtpTimerProps } from '@/types';
import { formatTime } from '@/utils/format-time';

const OtpTimer: FC<OtpTimerProps> = ({ timer, handleResend }) => {
  return (
    <div className="flex justify-end items-center space-x-2">
      <Typography size={'md'} className="text-primary-light">
        {timer > 0 ? formatTime(timer) : '00:00'}
      </Typography>
      <button onClick={handleResend} disabled={timer > 0} type="button">
        <Typography
          size={'md'}
          className={`font-semibold ${timer > 0 ? 'text-gray cursor-not-allowed' : 'text-gray hover:text-light-gray'}`}
        >
          Resend
        </Typography>
      </button>
    </div>
  );
};

export default OtpTimer;
