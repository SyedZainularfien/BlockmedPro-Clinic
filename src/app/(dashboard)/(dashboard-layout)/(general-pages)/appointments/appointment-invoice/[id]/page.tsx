'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import CustomCheckbox from '@/components/shared/custom-checkbox';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import { Typography } from '@/components/shared/typography';
import PaymentOptionCard from '@/components/ui/payment-method';

const AppointmentInvoice = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>('blockmed');
  const { id } = useParams();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handlePay = () => {
    router.push(`/appointments/appointment-invoice/invoice/${id}`);
  };
  return (
    <DashboardWrapper
      backButton
      title="Invoice"
      subTitle="Choose any payment option and pay the amount to confirm this appointment."
    >
      <div>
        <Container styling="w-full xl:w-[55%] z-50">
          <div className="px-7.5 py-6 flex flex-col gap-5">
            <Container styling="!bg-background-gray p-5">
              <Typography size={'h4'} className="text-black font-bold">
                Payment invoice
              </Typography>
              <Typography size={'h2'} className="text-primary-light font-bold">
                $50,000
              </Typography>
            </Container>
            <div className="flex flex-col gap-2">
              <Typography size={'md'} className="text-black font-semibold">
                Select Payment Method
              </Typography>
              <div className="flex flex-col md:flex-row gap-4">
                <PaymentOptionCard
                  isImage
                  imgSrc={paymentMethod === 'blockmed' ? '/assets/svgs/white-logo.svg' : '/assets/svgs/favicon.svg'}
                  value="blockmed"
                  selectedValue={paymentMethod || ''}
                  onSelect={setPaymentMethod}
                  icon="bi:box-seam-fill"
                  label="Pay with blockmed pro"
                  iconBgClass="bg-primary-light"
                  iconStyles="text-white"
                />
                <PaymentOptionCard
                  value="other"
                  selectedValue={paymentMethod || ''}
                  onSelect={setPaymentMethod}
                  icon="fluent:wallet-credit-card-24-filled"
                  label="Other payment methods"
                  iconStyles="text-primary-light"
                />
              </div>
              <Typography size={'md'} className="text-dark-gray font-normal">
                Note: Please inform the patient to check their patient’s portal and follow the steps to pay the amount.
              </Typography>
            </div>
            {paymentMethod === 'other' && (
              <CustomCheckbox
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
                label="Yes, i have collected payment from the patient externally."
                styling="!text-dark-gray !font-normal !text-sm"
              />
            )}
            <Button disabled={paymentMethod === 'other' && !isChecked} onClick={handlePay}>
              Continue
            </Button>
          </div>
        </Container>
      </div>
      <Image
        src={'/assets/svgs/background-image.svg'}
        height={300}
        width={530}
        alt="bg-logo"
        className="absolute bottom-0 right-0 z-10"
      />
    </DashboardWrapper>
  );
};

export default AppointmentInvoice;
