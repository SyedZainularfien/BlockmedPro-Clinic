'use client';

import Image from 'next/image';
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { fetchCountries } from '@/api/service/get-countires-number';
import { Typography } from '@/components/shared/typography';
import useClickOutside from '@/hooks/outside-click/useOutsideClick';
import { ICountry, InputFieldProps } from '@/types';
import Iconify from '../../iconify';

const InputPhoneField: FC<InputFieldProps> = memo(
  ({
    name,
    label,
    value,
    error,
    onBlur,
    onFocus,
    styling,
    required,
    onChange,
    disabled,
    phoneCode,
    placeholder,
    labelStyles,
    textColor = 'text-black',
    ...props
  }) => {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<ICountry>({
      name: 'United States',
      code: phoneCode ? phoneCode : '+1',
      flag: 'https://flagcdn.com/us.svg',
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useClickOutside(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

    useEffect(() => {
      const fetchAndSetCountries = async () => {
        try {
          const data = await fetchCountries();
          setCountries(data);
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };

      fetchAndSetCountries();
    }, []);

    const handleSelectCountry = useCallback((country: ICountry) => {
      setSelectedCountry(country);
      setDropdownOpen(false);
      setSearchTerm('');
    }, []);

    const filteredCountries = useMemo(() => {
      const term = searchTerm?.trim().toLowerCase();
      if (!term) return countries;

      return countries.filter(
        (country) => country.name.toLowerCase().startsWith(term) || country.code.toLowerCase().startsWith(term)
      );
    }, [countries, searchTerm]);

    const handleDropdownToggle = () => {
      setDropdownOpen((prev) => !prev);
    };

    return (
      <div className="flex flex-col gap-2 relative">
        {label && (
          <Typography size="md" className={`${labelStyles} font-semibold`}>
            {label}
            {required && <span className="text-red">*</span>}
          </Typography>
        )}
        <div className="relative flex max-[450px]:flex-col sm:flex-row gap-2">
          {/* Country Selector Button */}
          <button
            ref={buttonRef}
            type="button"
            className="relative flex items-center px-4 py-4 border border-light-gray rounded-lg bg-white cursor-pointer sm:w-32 justify-between"
            onClick={handleDropdownToggle}
          >
            <div className="relative w-6 h-6 flex">
              <Image
                src={selectedCountry.flag}
                alt={`${selectedCountry.name} flag`}
                fill
                className="object-contain min-w-[16px]"
                sizes="24px"
                priority
              />
            </div>
            <span className="text-center flex-1">
              <Typography size="md" className="whitespace-nowrap">
                {selectedCountry.code}
              </Typography>
            </span>
            <Iconify icon="bx:chevron-down" className="ml-2 text-gray" />
          </button>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute z-50 bg-white border border-light-gray rounded-xl shadow-lg w-full md:w-72 max-h-72 overflow-y-auto flex flex-col gap-1 p-3 top-full mt-2"
            >
              {/* Search Bar */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-full px-3 py-2 border border-light-gray rounded-lg text-lg placeholder:text-lg placeholder:font-medium placeholder:text-placeholder-light-gray focus:outline-none"
              />

              {/* Country List */}
              {filteredCountries.length === 0 && searchTerm?.trim() ? (
                <div className="flex justify-center items-center py-4">No countries found</div>
              ) : (
                <div className="mt-2 flex flex-col gap-2 text-dark-charcoal overflow-auto py-2 rounded-md">
                  {filteredCountries.map((country) => (
                    <div
                      key={`${country.code}-${country.name}`}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer ${
                        selectedCountry.name === country.name
                          ? 'bg-light-gray text-black'
                          : 'hover:bg-primary-dark hover:text-white'
                      }`}
                      onClick={() => handleSelectCountry(country)}
                    >
                      <div className="relative w-6 h-6">
                        <Image
                          src={country.flag}
                          alt={`${country.name} flag`}
                          width={20}
                          height={10}
                          className="object-cover"
                        />
                      </div>
                      <Typography size="sm" className="flex-1 text-sm truncate font-medium">
                        {country.name}
                      </Typography>
                      <Typography size="sm" className="text-sm">
                        ({country.code})
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Input Field */}
          <input
            {...props}
            type="number"
            name={name}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-5 py-4 flex-1 ${textColor} border ${
              error ? 'border-red' : 'border-light-gray'
            } text-lg placeholder:text-lg placeholder:text-gray no-spinner disabled:text-light-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-gray-100 focus:outline-none rounded-xl w-full ${styling}`}
          />
        </div>
        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-md text-red">
            <Iconify icon="bx:error" className="text-red bg-white rounded-full p-[1px]" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

InputPhoneField.displayName = 'InputPhoneField';

export default InputPhoneField;
