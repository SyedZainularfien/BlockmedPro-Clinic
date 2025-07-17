import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import SimpleLayout from '@/components/layouts/simple-layout';
import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import { Typography } from '@/components/shared/typography';
import { SuccessModalProps } from '@/types';

const SuccessModal: FC<SuccessModalProps> = ({
  title,
  subTitle,
  toSkip,
  skipLink = '/dashboard',
  addUserLink = '/add-users',
  buttonText,
  isModal,
  setIsOpen,
}) => {
  const router = useRouter();

  const handleSubmit = () => {
    if (isModal && setIsOpen) {
      setIsOpen(false);
    } else {
      router.push(addUserLink && addUserLink);
    }
  };

  const content = (
    <div className="flex justify-center items-center">
      <Container styling="bg-gradient-primary !pt-6 !pb-10 !px-10">
        <div className="flex flex-col items-center justify-center gap-7">
          <div className="flex flex-col justify-center items-center gap-1">
            <Image src="/assets/svgs/payment-success.svg" alt="Payment Successful" height={160} width={160} />
            <div className="flex flex-col justify-center items-center">
              <Typography size="h3" className="text-white font-bold">
                {title}
              </Typography>
              <Typography size="md" className="text-white font-normal">
                {subTitle}
              </Typography>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3.5">
            <Button variant="secondary" className="w-full" onClick={handleSubmit}>
              {buttonText}
            </Button>
            {toSkip && (
              <Link href={skipLink}>
                <Typography
                  size="md"
                  className="text-white font-normal text-center underline underline-offset-4 cursor-pointer"
                >
                  No, take me to the dashboard
                </Typography>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
  return isModal ? (
    <div className="fixed inset-0 z-100 flex items-center justify-center w-full py-10 bg-black/50 backdrop-blur-sm xl:py-0">
      {content}
    </div>
  ) : (
    <SimpleLayout>
      <div className="flex justify-center items-center h-[600px]">{content}</div>
    </SimpleLayout>
  );
};

export default SuccessModal;
