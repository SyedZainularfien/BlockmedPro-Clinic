import React from 'react';

import { RadioGroupProps } from '@/types';
import { Typography } from '../typography';

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  touched,
  error,
  className = '',
  optionsParentClassName = '',
  optionClassName = '',
  labelTextClassName = '',
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <Typography as="p" size="lg" className="font-semibold mb-1">
          {label}
        </Typography>
      )}
      <div className={`flex items-center gap-10 ${optionsParentClassName}`}>
        {options.map((option) => (
          <label key={option.value} className={`flex items-center gap-2 cursor-pointer ${optionClassName}`}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-5 w-5 rounded-full border-2 border-primary-dark accent-primary-dark cursor-pointer"
            />
            <Typography as="span" size="lg" className={`text-primary-text font-semibold ${labelTextClassName}`}>
              {option.label}
            </Typography>
          </label>
        ))}
      </div>
      {touched && error && (
        <Typography as="span" size="sm" className="text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default RadioGroup;
