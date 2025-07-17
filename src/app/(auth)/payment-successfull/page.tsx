'use client';

import { NextPage } from 'next';
import React from 'react';

import SuccessModal from '@/components/ui/modals/success-modal';

const PaymentSuccessful: NextPage = () => {
  return (
    <SuccessModal
      title="Payment Successfull"
      subTitle="Your payment for access to our platform has been processed. Thank you!"
      buttonText="Great! Lets add users"
      toSkip
      skipLink="/dashboard"
      addUserLink="/add-users"
    />
  );
};

export default PaymentSuccessful;
