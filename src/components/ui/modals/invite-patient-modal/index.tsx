import Image from 'next/image';
import React, { FC } from 'react';

import { Button } from '@/components/shared/button';
import ProgressBar from '@/components/shared/linear-progress-bar';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { Typography } from '@/components/shared/typography';
import { InvitePatientModalProps } from '@/types';

const InvitePatientModal: FC<InvitePatientModalProps> = ({
  uploadComplete,
  setShowModal,
  uploadProgress,
  handleCloseModal,
}) => {
  return (
    <ModalWrapper
      title={uploadComplete ? 'Emails Extracted Successfully' : 'Processing File, Please Wait'}
      onClose={() => setShowModal(false)}
    >
      {uploadComplete ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <Image src="/assets/svgs/file-uploaded.svg" alt="Success" width={100} height={100} />
          <Typography size="xl" className="text-black font-bold">
            Uploaded Successful
          </Typography>
          <Button className="w-full" onClick={handleCloseModal}>
            Continue
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <Image src="/assets/svgs/upload-file.svg" alt="Success" width={100} height={100} />
          <ProgressBar uploadProgress={uploadProgress} />
        </div>
      )}
    </ModalWrapper>
  );
};

export default InvitePatientModal;
