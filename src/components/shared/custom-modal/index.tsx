'use client';

import React from 'react';

import { CustomModalProps } from '@/types';
import ScrollContainer from '../../ui/scrollable-container';
import { Button } from '../button';
import ModalWrapper from '../modal-wrapper';
import { Typography } from '../typography';

const Modal: React.FC<CustomModalProps> = ({
  id,
  title,
  message,
  onClose,
  onConfirm,
  titleStyling,
  messageStyling,
  cancelButtonText,
  confirmButtonText,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(id ?? undefined);
    }
    onClose();
  };

  return (
    <ModalWrapper title={title} titleStyling={titleStyling} onClose={onClose}>
      <div className="flex flex-col gap-8 w-full">
        <div className="text-start">
          <ScrollContainer>
            <Typography size="lg" className={`text-dark-gray text-wrap text-center ${messageStyling}`}>
              {message}
            </Typography>
          </ScrollContainer>
        </div>

        {/* Modal Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <Button variant="outlined" size="medium" className="w-full" onClick={onClose}>
            {cancelButtonText ?? 'Cancel'}
          </Button>
          <Button
            variant="danger"
            size="medium"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleConfirm();
              onClose();
            }}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
