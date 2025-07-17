'use client';

import React, { FC } from 'react';

type CustomDateInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  styling?: string;
};

const CustomDateInput: FC<CustomDateInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Select a date',
  min,
  max,
  error,
  styling,
  disabled = false,
  required = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        required={required}
        className={`px-5 py-4 ${error ? 'hover:border-red' : 'hover:border-light-gray'} disabled:bg-gray-50 disabled:cursor-not-allowed text-black border ${error ? 'border-red' : 'border-light-gray'} text-lg placeholder:text-md placeholder:text-gray placeholder:font-medium font-medium focus:outline-none rounded-[12px] !w-full ${styling}`}
      />
    </div>
  );
};

export default CustomDateInput;
