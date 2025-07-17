'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { ISeverityGaugeProps } from '@/types';

const SeverityGauge: React.FC<ISeverityGaugeProps> = ({
  levels,
  value: propValue,
  onChange,
  interactive = true,
  title,
  defaultValue,
}) => {
  // Use defaultValue or first level's value as fallback
  const fallbackValue = defaultValue ?? levels[0]?.value ?? 0;
  const [internalValue, setInternalValue] = useState(propValue ?? fallbackValue);
  const [isDragging, setIsDragging] = useState(false);
  const gaugeRef = useRef<HTMLDivElement>(null);

  const value = propValue !== undefined ? propValue : internalValue;

  const getIndicatorPosition = (val: number) => {
    const closest = levels.reduce((prev, curr) =>
      Math.abs(curr.value - val) < Math.abs(prev.value - val) ? curr : prev
    );
    const index = levels.indexOf(closest);
    return ((index + 0.5) / levels.length) * 100;
  };

  const indicatorPosition = getIndicatorPosition(value);

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!gaugeRef.current) return value;

      const rect = gaugeRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));

      const segmentSize = 100 / levels.length;
      const segmentIndex = Math.floor(percentage / segmentSize);
      return levels[Math.min(Math.max(segmentIndex, 0), levels.length - 1)]?.value ?? value;
    },
    [value, levels]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!interactive) return;
      e.preventDefault();
      setIsDragging(true);
      const newValue = getValueFromPosition(e.clientX);
      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [interactive, getValueFromPosition, onChange]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !interactive) return;
      const newValue = getValueFromPosition(e.clientX);
      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [isDragging, interactive, getValueFromPosition, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!levels || levels.length === 0) {
    console.warn('SeverityGauge: levels prop is required and must contain at least one level');
    return null;
  }

  return (
    <div className="w-full mx-auto">
      {/* Title Section */}
      {title && (
        <Typography size={'lg'} className="font-bold text-left mb-8">
          {title}
        </Typography>
      )}

      {/* Gauge Section */}
      <div className="relative">
        {/* Colored Segments Bar */}
        <div
          ref={gaugeRef}
          className={`flex h-2.5 rounded-lg overflow-hidden shadow-sm ${interactive ? 'cursor-pointer select-none' : ''}`}
          onMouseDown={handleMouseDown}
        >
          {levels.map((level, index) => (
            <div
              key={index}
              className={`${level.color} ${interactive ? 'hover:brightness-110' : ''}`}
              style={{ width: `${100 / levels.length}%` }}
            />
          ))}
        </div>

        {/* Indicator */}
        <div
          className={`absolute -top-1 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            isDragging ? 'scale-110' : 'hover:scale-105'
          } ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
          style={{ left: `${indicatorPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <Iconify
            icon="ph:tag-simple-fill"
            width="22"
            height="24"
            className={`${isDragging ? 'text-blue-600' : 'text-gray-800'} rotate-90`}
          />
        </div>
      </div>

      {/* Labels Section */}
      <div className="flex justify-between mt-4 text-sm">
        {levels.map((level, index) => (
          <div key={index} className="flex-1 text-center">
            <div className="font-medium text-gray-700">{level.label}</div>
            <div className="text-gray-500 text-xs mt-1">{level.range}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeverityGauge;
