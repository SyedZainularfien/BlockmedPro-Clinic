import React from 'react';

import { StarProps } from '@/types';

const Star = ({
  value,
  maxRating,
  size,
  color,
  fillPercentage,
  onRate,
  onHoverIn,
  onHoverOut,
  onEnterKeyDown,
}: StarProps) => {
  const getStarStatus = () => {
    if (fillPercentage >= 1) return 'full';
    if (fillPercentage <= 0) return 'empty';
    return `${Math.round(fillPercentage * 100)}% filled`;
  };

  const pointedStarPath = 'M10 1.2l2.5 5.9 6.5 0.6-4.9 4.2 1.5 6.1-5.6-3.4-5.6 3.4 1.5-6.1-4.9-4.2 6.5-0.6z';

  return (
    <li
      role="radio"
      aria-label={`star ${getStarStatus()}`}
      aria-setsize={maxRating}
      aria-posinset={value}
      aria-checked={fillPercentage > 0}
      tabIndex={0}
      style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onFocus={onHoverIn}
      onBlur={onHoverOut}
      onKeyDown={onEnterKeyDown}
    >
      {fillPercentage >= 1 ? (
        // Full Pointed Star
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={color} stroke={color}>
          <path d={pointedStarPath} />
        </svg>
      ) : fillPercentage <= 0 ? (
        // Empty Pointed Star
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke={color}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={pointedStarPath} />
        </svg>
      ) : (
        // Partially filled pointed star with precise percentage
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" stroke={color}>
          <defs>
            <linearGradient id={`partialStar-${value}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${fillPercentage * 100}%`} style={{ stopColor: color, stopOpacity: 1 }} />
              <stop offset={`${fillPercentage * 100}%`} style={{ stopColor: 'white', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path fill={`url(#partialStar-${value})`} stroke={color} d={pointedStarPath} />
        </svg>
      )}
    </li>
  );
};

export default Star;
