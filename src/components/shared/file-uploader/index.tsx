'use client';

import React, { useRef } from 'react';

import { IFileUploaderProps } from '@/types';
import { Typography } from '../typography';

const FileUploader: React.FC<IFileUploaderProps> = ({
  onFileSelect,
  accept = '*',
  multiple = false,
  maxSizeMB = 5,
  label = ' Choose file',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    files.filter((file) => {
      if (file.size <= maxSizeBytes) {
        return true;
      } else {
        alert(`${file.name} exceeds the maximum file size of ${maxSizeMB}MB.`);
        return false;
      }
    });
    onFileSelect(files);
  };
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef?.current?.click();
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      onClick={triggerFileSelect}
      className="w-full lg:w-3/4 xl:1/2 flex items-center gap-3 p-1 pr-4 rounded-xl border border-light-gray relative cursor-pointer"
    >
      <button type="button" className="bg-primary-dark text-white py-3 px-5 rounded-lg text-sm font-semibold">
        {label}
      </button>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        ref={fileInputRef}
        multiple={multiple}
        className="hidden"
      />
      <Typography as="p" size="sm" className="text-dark-gray">
        Max file size limit {maxSizeMB}MB.
      </Typography>
    </div>
  );
};

export default FileUploader;
