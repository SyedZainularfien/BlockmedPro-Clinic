import { FC } from 'react';
import Select from 'react-select';

import { Typography } from '@/components/shared/typography';
import { InputSelectFieldProps, IOption } from '@/types';
import Iconify from '../../iconify';

const InputSelectField: FC<InputSelectFieldProps> = ({
  name,
  label,
  value,
  error,
  radius,
  styling,
  options,
  required,
  onChange,
  onSelect,
  disabled,
  labelStyles,
  placeholder,
  backgroundColor,
  placeholderColor,
  containerPadding,
  isMulti = false,
  ...props
}) => {
  const selectedOption = isMulti
    ? options.filter((opt) => {
        if (Array.isArray(value)) {
          return value.some((v) => (typeof v === 'object' ? v.value === opt.value : v === opt.value));
        }
        return false;
      })
    : (() => {
        if (!value) return null;

        if (typeof value === 'object' && value.value !== undefined) {
          return value;
        }

        return options.find((opt) => opt.value === value) || null;
      })();

  const handleOnChange = (newValue: IOption | IOption[] | null) => {
    console.log('🚀 ~ InputSelectField onChange triggered:', newValue);

    if (!newValue) {
      const emptyValue = isMulti ? [] : null;
      onSelect?.(emptyValue);
      onChange?.(emptyValue);
      return;
    }

    if (isMulti) {
      const values = (newValue as IOption[]).map((opt) => opt.value);
      onSelect?.(values);
      onChange?.(newValue);
    } else {
      const selectedValue = (newValue as IOption).value;
      onSelect?.(selectedValue);
      onChange?.(newValue);
    }
  };
  return (
    <div className="w-full relative flex flex-col gap-2">
      {label && (
        <Typography size="md" className={`${labelStyles} font-semibold`}>
          {label} {required && <span className="text-red">*</span>}
        </Typography>
      )}
      <div className="relative">
        <Select
          {...props}
          name={name}
          value={selectedOption}
          placeholder={placeholder || 'Select...'}
          onChange={handleOnChange}
          isMulti={isMulti}
          isDisabled={disabled}
          options={options}
          classNamePrefix="react-select"
          className={`text-black text-lg font-medium ${styling}`}
          styles={{
            control: (base, state) => ({
              ...base,
              padding: containerPadding ? containerPadding : '8px',
              borderRadius: radius || '12px',
              borderColor: error ? '#C9311A' : '#EDEDED',
              cursor: disabled ? 'not-allowed' : 'pointer',
              backgroundColor: backgroundColor || '#FFFFFF',
              boxShadow: state.isFocused ? 'none' : base.boxShadow,
              '&:hover': {
                borderColor: error ? '#C9311A' : '#EDEDED',
              },
            }),
            placeholder: (base) => ({
              ...base,
              color: placeholderColor || '#D1D1D1',
              fontWeight: '500',
            }),
            singleValue: (base) => ({
              ...base,
              color: backgroundColor ? '#FFFFFF' : '#000000',
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
              position: 'absolute',
              marginTop: '4px',
            }),
            menuList: (base) => ({
              ...base,
              padding: '10px',
              maxHeight: '200px',
              overflowY: 'auto',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? backgroundColor || '#2D58E6'
                : state.isFocused
                  ? '#F0F0F0'
                  : '#FFFFFF',
              color: state.isSelected ? '#FFFFFF' : '#000000',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              margin: '4px 0',
            }),
            dropdownIndicator: (base) => ({
              ...base,
              padding: '4px',
              color: backgroundColor ? '#FFFFFF' : '#000000',
            }),
            valueContainer: (base) => ({
              ...base,
              padding: '4px 8px',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
          }}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2">
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

export default InputSelectField;
