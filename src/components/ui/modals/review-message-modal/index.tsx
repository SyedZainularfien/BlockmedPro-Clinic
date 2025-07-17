'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import TextAreaField from '@/components/shared/input-fields/text-area-field';
import { Typography } from '@/components/shared/typography';
import { IReviewModalProps } from '@/types';

const ReviewModal: React.FC<IReviewModalProps> = ({ onCancel, onSend, responseValue, onResponseChange, review }) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onCancel();
    }
  };

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center w-full py-10 bg-black/50 backdrop-blur-sm xl:py-0 transition-opacity duration-300 ${
        isMounted ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl mx-4 sm:mx-0 flex flex-col gap-1 rounded-2xl px-5 sm:px-10 py-7 relative"
      >
        <Container leftBorder styling="p-6">
          <div className="flex flex-col gap-6">
            {/* Review Header */}
            <div>
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2.5">
                  <Typography size="lg" className="font-bold">
                    Emily Thomas
                  </Typography>
                  <Typography size="sm" className="text-dark-gray">
                    07 APR 2024
                  </Typography>
                </div>

                <Iconify
                  onClick={onCancel}
                  className="absolute top-3 right-3 cursor-pointer"
                  height="30"
                  width="30"
                  icon="material-symbols:cancel-outline-rounded"
                  color="#312D2D"
                />
              </div>

              {/* Review Content */}
              <Typography size="sm" className="mt-2 text-black">
                &quot;{review}&quot;
              </Typography>
            </div>

            {/* Response Section */}
            <div>
              <Typography size="lg" className="font-semibold mb-3">
                Response
              </Typography>
              <TextAreaField
                placeholder="Type Here..."
                value={responseValue}
                onChange={onResponseChange}
                styling="min-h-[120px]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outlined" size="medium" onClick={onCancel} className="px-8">
                Cancel
              </Button>
              <Button variant="primary" size="medium" onClick={onSend} className="px-8" disabled={!responseValue}>
                Send
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ReviewModal;
