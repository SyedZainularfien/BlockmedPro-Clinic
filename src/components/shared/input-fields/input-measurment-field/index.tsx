import React, { useCallback, useEffect, useState } from 'react';

import { IMeasurementInputProps } from '@/types';
import Iconify from '../../iconify';

const MeasurementInput: React.FC<IMeasurementInputProps> = ({
  label,
  units,
  value = '',
  unit = units[0]?.value || '',
  onValueChange,
  placeholder = 'Enter',
  styling = '',
  error = false,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [selectedUnit, setSelectedUnit] = useState<string>(unit);

  // Sync with props when they change
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setSelectedUnit(unit);
  }, [unit]);

  // Memoized callback to prevent unnecessary re-renders
  const handleValueChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      if (onValueChange) {
        onValueChange(newValue, selectedUnit);
      }
    },
    [onValueChange, selectedUnit]
  );

  const handleUnitChange = useCallback(
    (newUnit: string) => {
      setSelectedUnit(newUnit);
      if (onValueChange) {
        onValueChange(inputValue, newUnit);
      }
    },
    [onValueChange, inputValue]
  );

  // Debug logging - remove in production
  useEffect(() => {
    console.log('MeasurementInput Debug:', {
      label,
      inputValue,
      selectedUnit,
      propsValue: value,
      propsUnit: unit,
    });
  }, [label, inputValue, selectedUnit, value, unit]);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center mb-3">
        <label className="text-md font-semibold text-black">{label}</label>
      </div>

      <div className="flex gap-2.5">
        <div className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder={placeholder}
            className={`px-5 py-4 ${
              error ? 'hover:border-red border-red' : 'hover:border-light-gray border-light-gray'
            } disabled:bg-gray-50 disabled:cursor-not-allowed text-black border text-lg placeholder:text-md placeholder:text-gray placeholder:font-medium font-medium focus:outline-none rounded-xl w-full ${styling}`}
          />
          {error && <div className="text-red text-sm mt-1">This field is required</div>}
        </div>

        <div className="relative">
          <select
            value={selectedUnit}
            onChange={(e) => handleUnitChange(e.target.value)}
            className={`appearance-none w-20 px-3 py-4 pr-8 text-md text-black bg-white border ${
              error ? 'border-red' : 'border-light-gray'
            } rounded-xl outline-none cursor-pointer focus:outline-none transition-colors duration-200`}
          >
            {units.map((unitOption) => (
              <option key={unitOption.value} value={unitOption.value}>
                {unitOption.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <Iconify icon="ic:round-keyboard-arrow-down" className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementInput;
