'use client';

import { Icon } from '@iconify/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import AuthLayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import { Typography } from '@/components/shared/typography';

const Package: NextPage = () => {
  const router = useRouter();
  const [clinicalUsers, setClinicalUsers] = useState(1);
  const [nonClinicalUsers, setNonClinicalUsers] = useState(5);

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => setter((prev) => prev + 1);

  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    setter((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <AuthLayout imageSrc="/assets/svgs/package-logo.svg">
      <Container hasBorders styling="w-full px-8 py-7 sm:!px-18 sm:!py-11.5">
        <div className="flex flex-col gap-6 items-center">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-1">
            <Typography size="h4" className="text-black">
              License Fee / Year
            </Typography>
            <Typography size="h1" className="text-primary-light font-bold">
              $300
            </Typography>
          </div>
          <hr className="w-full h-1.5 border-light-gray" />
          {/* Includes Section */}
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col gap-7">
              <Typography size="h4" className="font-semibold">
                Includes:
              </Typography>
              {/* Features */}
              <div className="flex flex-col gap-2.5 text-black">
                {/* Clinical Users */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon icon="weui:done2-filled" width="24" height="24" className="text-green" />
                    <Typography size="lg" className="text-black font-semibold">
                      Number of Clinical Users
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decrement(setClinicalUsers)}>
                      <Icon icon="mdi:minus-circle-outline" className="text-xl text-black" />
                    </button>
                    <Typography>{clinicalUsers}</Typography>
                    <button onClick={() => increment(setClinicalUsers)}>
                      <Icon icon="mdi:plus-circle-outline" className="text-xl text-black" />
                    </button>
                  </div>
                </div>
                {/* Non-Clinical Users */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon icon="weui:done2-filled" width="24" height="24" className="text-green" />
                    <Typography size="lg" className="text-black font-semibold">
                      Number of Non-Clinical Users
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decrement(setNonClinicalUsers)}>
                      <Icon icon="mdi:minus-circle-outline" className="text-xl text-black" />
                    </button>
                    <Typography>{nonClinicalUsers}</Typography>
                    <button onClick={() => increment(setNonClinicalUsers)}>
                      <Icon icon="mdi:plus-circle-outline" className="text-xl text-black" />
                    </button>
                  </div>
                </div>

                {/* Static Features */}
                <div className="flex items-center gap-2">
                  <Icon icon="weui:done2-filled" width="24" height="24" className="text-green" />
                  <Typography size="lg" className="text-black font-semibold">
                    Patient Data Access
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="weui:done2-filled" width="24" height="24" className="text-green" />
                  <Typography size="lg" className="text-black font-semibold">
                    User Control Panel
                  </Typography>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button variant="primary" className="w-full" onClick={() => router.push('/add-new-card')}>
              Submit
            </Button>
          </div>
        </div>
      </Container>
    </AuthLayout>
  );
};

export default Package;
