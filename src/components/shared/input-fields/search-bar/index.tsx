/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { onFilterName } from '@/redux/slices/temp-slice';
import { SearchInputProps } from '@/types';
import Iconify from '../../iconify';

const SearchInput: React.FC<SearchInputProps> = ({ styling }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onFilterName(''));
  }, []);

  return (
    <div
      className={`w-full lg:max-w-[320px] lg:min-w-[300px] flex items-center border border-light-gray rounded-xl px-4 py-3.5 ${styling}`}
    >
      <Iconify icon="proicons:search" className="text-gray " />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 text-md w-full bg-transparent border-none outline-none text-gray placeholder-gray"
        onChange={(e) => dispatch(onFilterName(e.target.value))}
      />
    </div>
  );
};

export default SearchInput;
