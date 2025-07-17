'use client';

import { useEffect, useRef, useState } from 'react';

import { StarRatingProps } from '@/types';
import Star from './Star';

export default function StarRating({
  maxRating = 5,
  size = 20,
  color = '#F8D001',
  defaultRating = 0,
  onSetRating,
  addStyle = {},
  gap = 0,
  precision = 1,
  readOnly = false,
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const containerRef = useRef<HTMLUListElement>(null);

  function handleRating(value: number) {
    if (readOnly) return;

    const preciseRating = parseFloat((Math.round(value * precision) / precision).toFixed(precision));
    setRating(preciseRating);
    onSetRating?.(preciseRating);
  }

  const handleKeyDown = (event: React.KeyboardEvent<Element>) => {
    if (readOnly) return;

    if (event.key === 'Enter') {
      const newRating = hoverRating > 0 ? hoverRating : rating;
      handleRating(newRating);
    }
  };

  useEffect(() => {
    if (readOnly) return;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && containerRef.current) {
        containerRef.current.focus();
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [readOnly]);

  const starContainerStyle = {
    display: 'flex',
    margin: 0,
    padding: 0,
    gap: `${gap}px`,
    listStyle: 'none',
    ...addStyle,
  };

  return (
    <ul
      style={starContainerStyle}
      tabIndex={0}
      aria-label={`${rating} stars rating`}
      role="radiogroup"
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const displayRating = hoverRating > 0 ? hoverRating : rating;

        // Calculate the fill percentage for this star
        let fillPercentage = 0;
        if (displayRating >= starValue) {
          fillPercentage = 1; // Fully filled
        } else if (displayRating > starValue - 1) {
          fillPercentage = displayRating - (starValue - 1); // Partially filled
        }

        return (
          <Star
            key={i}
            value={starValue}
            maxRating={maxRating}
            size={size}
            color={color}
            fillPercentage={fillPercentage}
            onRate={() => !readOnly && handleRating(starValue)}
            onHoverIn={() => !readOnly && setHoverRating(starValue)}
            onHoverOut={() => !readOnly && setHoverRating(0)}
            onEnterKeyDown={handleKeyDown}
          />
        );
      })}
    </ul>
  );
}
