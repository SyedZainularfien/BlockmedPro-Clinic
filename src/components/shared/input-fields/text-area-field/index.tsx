import { Icon } from '@iconify/react';
import Image from 'next/image';
import { FC } from 'react';

import { Typography } from '../../typography';

const TextAreaField: FC<any> = ({
  name,
  label,
  value,
  error,
  onBlur,
  onFocus,
  styling,
  onChange,
  required,
  disabled,
  inputUnit,
  placeholder,
  labelStyles,
  textColor = 'text-black',
}) => {
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div>
          <Typography size="lg" className={`${labelStyles} font-semibold`}>
            {label}
            {required && <span className="text-red">*</span>}
          </Typography>
        </div>
      )}
      <div className="relative flex items-center">
        <textarea
          onFocus={onFocus}
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={handleBlur}
          // style={{ resize: 'none' }}
          className={`px-5 py-4  min-h-[4.8rem] ${textColor} border ${error ? 'border-red' : 'border-light-gray'} text-lg placeholder:text-md placeholder:text-placeholder-gray disabled:text-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-dull-white focus:outline-none rounded-[12px] w-full ${error ? 'hover:border-red' : ''} ${styling}`}
        />

        {inputUnit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-5 cursor-pointer text-dark-gray">
            <div className="pr-5">
              <Image src="/assets/icons/separator-line.svg" alt="Separator Line" width={1} height={55} />
            </div>
            <Typography size="md" as="p" className="font-normal">
              {inputUnit}
            </Typography>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-red">
          <div>
            <Icon icon="icon-park-outline:caution" width="18" height="18" />
          </div>
          <div>
            <Typography size="md" as="p" className="font-normal">
              {error}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAreaField;
