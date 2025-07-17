import React, { FC, useEffect, useRef, useState } from 'react';

import Iconify from '../iconify';
import { Typography } from '../typography';

const ModalWrapper: FC<any> = ({
  children,
  title,
  subTitle,
  titleStyling,
  onClose,
  line,
  lineGap,
  childrenStyling,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
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
        className="w-full max-w-xl mx-4 sm:mx-0 bg-white flex flex-col gap-1 rounded-2xl px-5 sm:px-10 py-7 relative"
      >
        <Iconify
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer"
          height="24"
          width="24"
          icon="material-symbols:cancel-outline-rounded"
          color="#312D2D"
        />
        <div
          className={`flex flex-col ${titleStyling?.includes('text-left') ? 'items-start' : 'items-center'} ${
            line ? (lineGap ? lineGap : 'gap-7') : 'gap-1'
          }`}
        >
          <Typography size="h5" className={`font-bold ${titleStyling}`}>
            {title}
          </Typography>
          {subTitle && (
            <Typography size="md" className="text-dark-gray">
              {subTitle}
            </Typography>
          )}
          {line && <hr className="w-full border-t border-light-gray" />}
          <div className={`max-h-[660px] w-full ${childrenStyling}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
