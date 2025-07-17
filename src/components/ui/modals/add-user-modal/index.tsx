'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/shared/button';
import Iconify from '@/components/shared/iconify';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { Typography } from '@/components/shared/typography';
import { AddNewUserModalProps } from '@/types';

const AddNewUserModal: React.FC<AddNewUserModalProps> = ({ onClose }) => {
  const pricePerUser = 100;
  const router = useRouter();
  const [userNum, setUserNum] = useState(1);

  const handleIncreament = () => {
    setUserNum(userNum + 1);
  };

  const handleDecrement = () => {
    if (userNum > 1) setUserNum(userNum - 1);
  };

  const handleBuyUser = () => {
    router.push('/payment-through');
  };

  return (
    <ModalWrapper title="Add Users" titleStyling="text-center !text-h3 text-primary-color" onClose={onClose}>
      <div className="flex flex-col gap-8">
        <Typography size={'md'} as={'p'} className="text-dark-gray">
          Select the number of users you want to add in your team.
        </Typography>
        <div className="flex flex-col gap-5">
          <div className="w-full bg-gradient-primary rounded-2xl px-6 py-7 flex flex-col items-center gap-6">
            <Typography as="h5" size="h5" className="text-white text-center leading-tight">
              Number of users
            </Typography>

            <div className="flex gap-4 items-center text-white">
              <button
                disabled={userNum <= 1}
                onClick={handleDecrement}
                className={`rounded-full border border-white bg-white w-7.5 h-7.5 flex items-center justify-center ${
                  userNum <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                <Iconify icon="tabler:minus" color="black" width={30} height={30} />
              </button>

              <Typography size="h3" as="h3" className="text-white font-bold min-w-20 text-center">
                {userNum}
              </Typography>

              <button
                onClick={handleIncreament}
                className="rounded-full border border-white bg-white w-7.5 h-7.5 flex items-center justify-center cursor-pointer"
              >
                <Iconify icon="tabler:plus" color="black" width={22} height={22} />
              </button>
            </div>

            <div className="flex flex-col gap-3 w-full text-white">
              {[
                { label: 'Price per user', value: `$${pricePerUser}` },
                { label: 'QTY', value: userNum },
                { label: 'Total', value: `$${pricePerUser * userNum}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <Typography size="lg" as="p" className="font-medium">
                    {label}
                  </Typography>
                  <Typography size="lg" as="p" className="font-bold">
                    {value}
                  </Typography>
                </div>
              ))}
            </div>

            <hr className="border-t border-light-gray w-full" />

            <Typography as="p" size="md" className="text-light-gray text-center">
              Each user you add can have access to the platform according to the given permission
            </Typography>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <Button
                onClick={handleBuyUser}
                disabled={userNum <= 1}
                variant="secondary"
                size="medium"
                className="w-full"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddNewUserModal;
