import React from 'react';

import { Typography } from '../typography';

type CustomRadioOptionProps = {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
};

const CustomRadioOption: React.FC<CustomRadioOptionProps> = ({ id, label, value, checked, onChange }) => {
  return (
    <div className="relative">
      <input
        type="radio"
        id={id}
        name="custom-radio-group"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`flex items-center px-3 sm:px-4 py-3 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-200 ease-in-out ${
          checked ? 'border-primary-dark' : 'border-light-gray bg-white'
        }`}
      >
        <div
          className={`flex-shrink-0 w-3.5 h-3.5 rounded-full border mr-4 flex items-center justify-center transition-all duration-200 ${
            checked ? 'border-primary-dark bg-white' : 'border-gray-300 bg-white'
          }`}
        >
          {checked && <div className="w-2 h-2 bg-primary-dark rounded-full" />}
        </div>
        <Typography
          size={'md'}
          className={`text-base font-medium transition-colors duration-200 ${checked ? 'text-black' : 'text-dark-gray'}`}
        >
          {label}
        </Typography>
      </label>
    </div>
  );
};

export default CustomRadioOption;
