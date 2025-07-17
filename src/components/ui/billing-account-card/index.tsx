'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import { BankAccountCardProps } from '@/types';
import Container from '../../shared/container';
import { Typography } from '../../shared/typography';

const BankAccountCard: FC<BankAccountCardProps> = ({ bankAccounts }) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <Container hasBorders styling="px-5 md:!px-10 !py-5 md:!py-10 flex flex-col gap-4">
        <div className="flex justify-start items-center ">
          <div>
            <Typography as="h5" size="h5" className="text-black font-bold">
              Saved Banks
            </Typography>
          </div>
        </div>
        <div className="space-y-5">
          {bankAccounts?.map((account, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-between items-start md:gap-4">
                <div className="w-3/5 sm:w-9/12 flex flex-col items-start justify-between">
                  <div className="flex items-center gap-1">
                    <Typography as="p" size="md" className="text-primary-text font-semibold">
                      {account?.bankName}
                    </Typography>
                    |
                    <Typography as="p" size="md" className="text-primary-text font-semibold">
                      {account?.currency}
                    </Typography>
                  </div>
                  <div>
                    <Typography as="p" size="sm" className="text-dark-gray leading-relaxed">
                      IBAN : <br /> {account?.iban}
                    </Typography>
                  </div>
                </div>
                <div className="w-2/5 sm:w-1/4">
                  {account?.default ? (
                    <Typography
                      as="p"
                      size="md"
                      className="text-primary-dark underline underline-offset-2 font-semibold sm:whitespace-nowrap text-right cursor-pointer"
                    >
                      Default
                    </Typography>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <Typography
                        as="p"
                        size="md"
                        className="text-dark-gray underline underline-offset-2 font-semibold sm:whitespace-nowrap text-right cursor-pointer"
                      >
                        Set as default
                      </Typography>
                      <button className="cursor-pointer bg-white rounded-full shadow-xl p-1">
                        <Iconify icon="fluent:delete-24-regular" width="20" height="20" className="text-red" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <hr className="text-light-gray w-full" />
            </React.Fragment>
          ))}
          <div>
            <button
              onClick={() => router.push('/add-new-bank')}
              className="flex justify-center items-center gap-2 cursor-pointer"
            >
              <Iconify
                icon="material-symbols:add"
                className="text-primary-dark rounded-full border border-primary-dark"
              />
              <Typography as="p" size="lg" className="text-primary-dark font-semibold">
                Add New Bank
              </Typography>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BankAccountCard;
