import { NextPage } from 'next';
import React from 'react';

import AuthLayout from '@/components/layouts/auth-layout';
import OtpSection from '@/components/sections/auth/otp';

const OTP: NextPage = () => {
  return (
    <AuthLayout imageSrc="/assets/svgs/otp-logo.svg">
      <OtpSection />
    </AuthLayout>
  );
};

export default OTP;
