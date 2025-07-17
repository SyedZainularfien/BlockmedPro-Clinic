import React, { FC } from 'react';

import { Typography } from '../typography';

interface IFileUploadProps {
  dragActive: boolean;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadFile: FC<IFileUploadProps> = ({ dragActive, handleDrag, handleDrop, handleFileInputChange }) => {
  return (
    <div
      className={`w-full border-2 border-dashed min-h-[220px] rounded-xl flex justify-center items-center cursor-pointer transition-colors ${
        dragActive ? 'border-primary-light bg-light-blue' : 'border-light-gray hover:border-primary-light'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        multiple
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-center gap-1.5">
          <Typography size={'md'} className="text-primary-light font-semibold underline underline-offset-3">
            Choose File
          </Typography>
          <Typography size={'md'} className="text-gray font-semibold">
            Or drag and drop file here
          </Typography>
        </div>
        <div className="flex items-center justify-center">
          <Typography size={'md'} className="text-red font-normal">
            *
          </Typography>
          <Typography size={'md'} className="text-black font-normal">
            File supported .png, .jpg & .PDF
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
