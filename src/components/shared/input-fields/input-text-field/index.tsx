'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

import { Typography } from '@/components/shared/typography';
import { InputFieldProps } from '@/types';
import Iconify from '../../iconify';

const InputTextField: FC<InputFieldProps> = ({
  name,
  label,
  card,
  value,
  error,
  onBlur,
  onFocus,
  styling,
  required,
  onChange,
  disabled,
  labelStyles,
  placeholder,
  placeholderTop = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="relative flex flex-col gap-2">
      {label && (
        <div>
          <Typography size="md" className={`${labelStyles} font-semibold`}>
            {label}
            {required && <span className="text-red">*</span>}
          </Typography>
        </div>
      )}
      <div className="relative">
        {placeholderTop && (
          <label
            className={`absolute left-5 transition-all duration-200 ${
              isFocused || value !== ''
                ? '-top-2 text-md font-semibold text-gray bg-white px-1'
                : 'top-4 text-lg text-light-gray font-semibold'
            }`}
          >
            {placeholder}
          </label>
        )}
        <input
          {...props}
          type="text"
          name={name}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholderTop ? '' : placeholder}
          className={`px-5 py-4 ${error ? 'hover:border-red' : 'hover:border-light-gray'} disabled:bg-gray-50 disabled:cursor-not-allowed text-black border ${error ? 'border-red' : 'border-light-gray'} text-lg placeholder:text-md placeholder:text-gray placeholder:font-medium font-medium focus:outline-none rounded-[12px] w-full ${styling}`}
        />
        {card && (
          <Image
            alt="Mastercard"
            height={24}
            width={24}
            src="/assets/svgs/mastercard-logo.svg"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-auto"
          />
        )}
        {disabled && (
          <Image
            alt="Mastercard"
            height={24}
            width={24}
            src="/assets/svgs/lock.svg"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-auto"
          />
        )}
      </div>
      {error && (
        <div className="flex items-start justify-start gap-2">
          <span className="relative top-[1px]">
            <Iconify icon="bx:error" className="text-red bg-white rounded-full p-[1px]" />
          </span>
          <Typography size="md" className="text-red">
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default InputTextField;
