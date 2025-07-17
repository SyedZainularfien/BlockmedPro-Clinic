import React, { FC } from 'react';

import { ICustomCheckboxProps } from '@/types';
import Iconify from '../iconify';

const CustomCheckbox: FC<ICustomCheckboxProps> = ({ label, checked, onChange, styling, lightbackground, ...props }) => {
  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onChange(!checked);
  };

  return (
    <div className="flex items-center gap-2">
      <div
        onClick={handleCheckboxClick}
        className={`flex-shrink-0 w-4 h-4 md:w-4.5 md:h-4.5 flex items-center justify-center cursor-pointer rounded-sm ${
          checked ? (lightbackground ? 'bg-[#E3F0FF]' : 'bg-primary-dark') : 'border border-gray'
        }`}
      >
        {checked && (
          <Iconify icon="charm:tick" width="16" height="16" color={`${lightbackground ? '#2D58E6' : 'white'} `} />
        )}
      </div>
      {label && (
        <span className={`flex-1 leading-tight text-sm md:text-base font-semibold text-black break-words ${styling}`}>
          {label}
        </span>
      )}
      <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} className="sr-only" {...props} />
    </div>
  );
};

export default CustomCheckbox;
