'use client';

import React, { useState } from 'react';

import BackButton from '@/components/shared/back-button';
import { Typography } from '@/components/shared/typography';
import AccountDetailsCard from '@/components/ui/account-details-card';
import BankDetailsCard from '@/components/ui/bank-detail-card';

const AddNewBank = () => {
  const [bankDetailsData, setBankDetailsData] = useState<{
    bankAccountType: string;
    bankCountry: string;
    bankAccountCurrency: string;
  } | null>(null);
  const [accountDetails, setAccountDetails] = useState(false);

  return (
    <div className="mx-auto mt-12 w-full lg:w-[90%] xl:w-[80%] h-full">
      <div className="w-full flex flex-col gap-5 lg:gap-9 checkout-screen-h">
        <div className="flex flex-col gap-8 mx-auto w-full sm:w-[80%] lg:w-[65%]">
          <div className="flex flex-col w-full gap-1">
            <div className="flex items-center justify-between w-full">
              <div>
                <BackButton label="  Add Bank Details" />
              </div>
            </div>
            <div className="lg:w-full">
              <Typography as="p" size="lg" className="text-dark-gray font-medium">
                Add your billing details and card information and pay to get access to your pharmaceutical admin panel.
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <BankDetailsCard
              bankDetailsData={bankDetailsData}
              setBankDetailsData={setBankDetailsData}
              setAccountDetails={setAccountDetails}
            />
            <AccountDetailsCard
              enableForm={bankDetailsData ? true : false}
              accountDetails={accountDetails}
              setAccountDetails={setAccountDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBank;
