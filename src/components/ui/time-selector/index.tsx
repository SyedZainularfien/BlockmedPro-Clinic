import React, { FC } from 'react';

import { ITimeSelectProps } from '@/types';

const TimeSelect: FC<ITimeSelectProps> = ({ data, selectedTime, setSelectedTime }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {data.map(({ time, disabled }) => (
        <button
          key={time}
          className={`py-2 px-4 rounded-full text-sm border cursor-pointer ${
            selectedTime === time
              ? 'bg-primary-dark text-white border-primary-dark'
              : disabled
                ? 'border-gray-200 text-gray-400 !cursor-not-allowed opacity-60 bg-light-gray'
                : 'border-gray-300 text-black'
          }`}
          onClick={() => !disabled && setSelectedTime(time)}
          disabled={disabled}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSelect;
