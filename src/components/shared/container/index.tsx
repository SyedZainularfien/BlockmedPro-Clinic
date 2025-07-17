import React, { FC } from 'react';

import { IContainerProps } from '@/types';

const Container: FC<IContainerProps> = ({
  children,
  styling,
  hasBorders,
  leftBorder = false,
  bottomBorder = false,
  leftBorderColor = '#2D58E6',
  borderBottomColor = '#2D58E6',
}) => {
  return (
    <div
      className="w-full flex justify-start relative rounded-[20px]"
      style={{
        backgroundColor: leftBorder ? leftBorderColor : bottomBorder ? borderBottomColor : 'transparent',
      }}
    >
      <div
        className={` w-full
        ${leftBorder ? 'ml-3' : 'ml-0'} 
        ${bottomBorder ? 'mb-1.5' : 'mb-0'} 
        ${hasBorders ? 'border border-light-gray' : ''} 
        bg-white rounded-[18px] 
        ${styling}
      `}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
