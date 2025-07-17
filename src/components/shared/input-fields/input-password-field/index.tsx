'use client';

import { FC, useEffect, useState } from 'react';

import { Typography } from '@/components/shared/typography';
import { InputPasswordFieldProps } from '@/types';
import CustomCheckbox from '../../custom-checkbox';
import Iconify from '../../iconify';

const InputPasswordField: FC<InputPasswordFieldProps> = ({
  name,
  value,
  label,
  error,
  onBlur,
  styling,
  disabled,
  required,
  onChange,
  placeholder,
  labelStyles,
  strengthChecker = false,
  ...props
}) => {
  const [strength, setStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [requirements, setRequirements] = useState({
    number: false,
    length: false,
    uppercase: false,
    specialChar: false,
    noForbiddenWords: false,
  });

  const forbiddenWords = ['password', 'blockmedpro'];

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const evaluateStrength = (password: string) => {
    const lowerPassword = password.toLowerCase();
    const conditions = {
      length: password.length >= 10,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[^a-zA-Z0-9]/.test(password),
      noForbiddenWords: !forbiddenWords.some((word) => lowerPassword.includes(word)),
    };

    setRequirements(conditions);

    let score = 0;
    if (conditions.length) score += 1;
    if (conditions.uppercase) score += 1;
    if (conditions.number) score += 1;
    if (conditions.specialChar) score += 1;
    if (conditions.noForbiddenWords) score += 1;

    score = Math.min(score, 5); // Cap score at 5

    setStrength(score);
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Moderate';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (strengthChecker && value) {
      evaluateStrength(value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, strengthChecker]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Typography size="md" className={`${labelStyles} font-semibold`}>
          {label}
          {required && <span className="text-red">*</span>}
        </Typography>
      </div>
      <div className="relative">
        <input
          name={name}
          disabled={disabled}
          type={passwordVisible ? 'text' : 'password'}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
          className={`px-5 py-4 ${error ? 'hover:border-red' : 'hover:border-light-gray'} disabled:bg-dull-white text-black border ${error ? 'border-red' : 'border-light-gray'} text-lg placeholder:text-lg placeholder:text-gray placeholder:font-medium font-medium focus:outline-none rounded-[12px] w-full ${styling}`}
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-5 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? (
            <Iconify icon="mdi:eye" width="20" height="20" style={{ color: '#969696' }} />
          ) : (
            <Iconify icon="mdi:eye-off" width="20" height="20" style={{ color: '#969696' }} />
          )}
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-2">
          <span className="relative top-[1px]">
            <Iconify icon="bx:error" className="text-red bg-white rounded-full p-[1px]" />{' '}
            <Iconify icon={`bx:error" className="text-red bg-none rounded-full p-[1px]`} />
          </span>
          <Typography size="md" className={'text-red'}>
            {error}
          </Typography>
        </div>
      )}
      {strengthChecker && value && (
        <>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${(strength / 5) * 100}%`,
                  backgroundColor: strength < 2 ? 'red' : strength < 4 ? 'orange' : 'green',
                }}
              />
            </div>
            <div className={`ml-2 text-sm text-gray`}>{getStrengthLabel()}</div>
          </div>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-center">
              <CustomCheckbox label="At least 10 characters long." checked={requirements.length} onChange={() => {}} />
            </li>
            <li className="flex items-center">
              <CustomCheckbox
                onChange={() => {}}
                checked={requirements.uppercase}
                label="At least one uppercase letter."
              />
            </li>
            <li className="flex items-center">
              <CustomCheckbox label="At least one number." checked={requirements.number} onChange={() => {}} />
            </li>
            <li className="flex items-center">
              <CustomCheckbox
                onChange={() => {}}
                label="Contains special character."
                checked={requirements.specialChar}
              />
            </li>
            <li className="flex items-center">
              <CustomCheckbox
                onChange={() => {}}
                checked={requirements.noForbiddenWords}
                label="Cannot contain the words'Password'or'BlockMed Pro'."
              />
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default InputPasswordField;
