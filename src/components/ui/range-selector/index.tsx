'use client';

import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';

import { IRangeSelectorProps } from '@/types';

const RangeSelector: FC<IRangeSelectorProps> = ({
  icons,
  onChange,
  bordered,
  editable,
  value = 1,
  ranges = ['<18.5', '18.5 to 24.9', '25 to 29.9', '30 to 39.9', '40>'],
  labels = ['UNDERWEIGHT', 'HEALTHY WEIGHT', 'OVERWEIGHT', 'OBESITY', 'EXTREME OBESITY'],
}) => {
  const [activeIndex, setActiveIndex] = useState(value ?? 1);
  const [isDragging, setIsDragging] = useState(false);
  const scaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined && value !== activeIndex) {
      setActiveIndex(value);
    }
  }, [value]);

  const getActiveIndexFromPosition = (clientX: number): number => {
    if (!scaleRef.current) return activeIndex;

    const rect = scaleRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = relativeX / rect.width;
    const index = Math.floor(percentage * ranges.length);

    return Math.max(0, Math.min(labels.length - 1, index));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editable) return;
    setIsDragging(true);
    const newIndex = getActiveIndexFromPosition(e.clientX);
    setActiveIndex(newIndex);
    if (onChange) onChange(newIndex);
  };

  const handleTouchStart = (e: any) => {
    if (!editable) return;
    setIsDragging(true);
    const touch = e.touches[0];
    const newIndex = getActiveIndexFromPosition(touch.clientX);
    setActiveIndex(newIndex);
    if (onChange) onChange(newIndex);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !editable) return;
    const newIndex = getActiveIndexFromPosition(e.clientX);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      if (onChange) onChange(newIndex);
    }
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging || !editable) return;
    const touch = e.touches[0];
    const newIndex = getActiveIndexFromPosition(touch.clientX);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      if (onChange) onChange(newIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, activeIndex]);

  return (
    <div
      className={`w-full px-4 py-4 sm:px-6 sm:py-5 rounded-[18px] ${bordered ? 'border border-light-gray' : ''} mx-auto`}
    >
      {/* Icons */}
      <div className="flex justify-between mb-2 px-1 sm:px-2 gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
        {icons?.map((icon, index) => (
          <div key={index} className="text-center flex-1 min-w-[40px]">
            <Image
              src={icon}
              alt={`Icon ${index}`}
              className="w-9 h-9 sm:w-11.5 sm:h-11.5 mx-auto"
              height={46}
              width={46}
              loading="lazy"
              style={{ filter: activeIndex === index ? 'none' : 'grayscale(100%)' }}
            />
          </div>
        ))}
      </div>

      {/* Range values */}
      <div className="flex justify-between text-xs sm:text-sm font-normal text-dark-gray mb-2 gap-1 overflow-auto">
        {ranges.map((range, index) => (
          <div key={index} className="text-center flex-1 break-words">
            {range}
          </div>
        ))}
      </div>

      {/* Scale bar */}
      <div
        ref={scaleRef}
        className={`relative mb-4 select-none ${!editable ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="h-2 bg-light-gray rounded-full flex">
          {labels.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-full"
              style={{
                marginRight: index < labels.length - 1 ? '1px' : '0',
              }}
            />
          ))}
        </div>

        <div
          className={`absolute top-1/2 w-4 h-4 bg-primary-dark rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-lg transition-all duration-200 ${
            !editable ? 'cursor-not-allowed' : isDragging ? 'scale-110 cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            left: `${((activeIndex + 0.5) / ranges.length) * 100}%`,
          }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold overflow-x-auto custom-scrollbar">
        {labels.map((label, index) => (
          <div key={index} className="text-center last:text-end first:text-left flex-1 px-1 break-words">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RangeSelector;
