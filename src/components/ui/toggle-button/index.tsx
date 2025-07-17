import React from 'react';

import { ToggleButtonProps } from '@/types';

const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked = false,
  onChange,
  disabled = false,
  name,
  className = '',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
      />
      <div
        className="w-[32px] h-[18px] bg-light-gray rounded-full peer
         dark:bg-light-gray peer-checked:after:translate-x-full after:content-['']
          after:absolute after:top-[2px] after:left-[2px] after:bg-[#969696] peer-checked:after:bg-[#2D58E6]
           after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#D5DEFA]"
      />
    </label>
  );
};

export default ToggleButton;
