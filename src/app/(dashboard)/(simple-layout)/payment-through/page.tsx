'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react';

import BackButton from '@/components/shared/back-button';
import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';

const PaymnentThrough: NextPage = () => {
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/checkout');
  };

  return (
    <div className="mx-auto w-full h-full">
      <div className="w-full flex flex-col gap-5 lg:gap-9 checkout-screen-h">
        <div>
          <BackButton />
        </div>
        <div className="flex flex-col gap-8 mx-auto w-full sm:w-[80%] lg:w-[60%]">
          <Container hasBorders styling="p-6 sm:p-8">
            <div className="flex flex-col justify-center items-center gap-5 pt-2">
              <Typography size="h3" as="h3" className="text-primary-text capitalize">
                How will you pay
              </Typography>
              <div className="w-full bg-background-gray p-8 rounded-2xl text-center space-y-1">
                <Typography size="lg" as="p" className="text-dark-gray font-bold">
                  2 Users Add on
                </Typography>
                <Typography size="h2" as="h2" className="text-primary-text font-bold">
                  $200
                </Typography>
              </div>
              <Typography size="md" as="p" className="text-dark-gray">
                Select your preferred payment method below to complete your transaction.
              </Typography>
              <div className="w-full border-t border-light-gray flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <span className="bg-white rounded-full p-2 shadow-lg h-[45px] w-[45px] flex items-center justify-center">
                    <Iconify icon="lucide:wallet" width={24} height={24} className="text-primary-text" />
                  </span>
                  <Typography size="xl" as="p" className="text-primary-text font-bold">
                    Credit
                  </Typography>
                </div>
                <div>
                  <Typography size="lg" as="p" className="text-primary-text font-bold">
                    Balance
                  </Typography>
                  <Typography size="xl" as="p" className="text-primary-text font-bold">
                    $1100
                  </Typography>
                </div>
              </div>
              <div className="w-full space-y-3">
                <Button onClick={handleSubmit} variant="primary" size="medium" className="w-full">
                  Pay With Credit
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="outlined"
                  size="medium"
                  className="w-full !border-primary-dark !text-primary-dark"
                >
                  Pay With Card
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PaymnentThrough;
