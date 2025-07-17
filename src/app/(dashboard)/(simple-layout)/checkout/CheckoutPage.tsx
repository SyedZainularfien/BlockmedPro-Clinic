'use client';

import { useStripe } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import BackButton from '@/components/shared/back-button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { Typography } from '@/components/shared/typography';
import BillingDetailsCard from '@/components/ui/billing-details-card';
// import { toast } from 'react-toastify';

import CardForm from '@/components/ui/card-form';
import BillingDetailsCardSkeleton from '@/components/ui/skeletons/billing-details-card-skeleton';
import { content } from '@/data';

// import { useGetCardsList } from '@/hooks/api/useGetCardsList';
// import { useAppSelector } from '@/redux/hooks';

const CheckoutPage: FC = () => {
  const stripe = useStripe();
  // const router = useRouter();
  // const pathname = usePathname();

  const searchParams = useSearchParams();
  const paymentIntentClient = searchParams.get('pi_client');

  // const locationOptions = useAppSelector((state) => state.app.location);

  const [formData, setFormData] = useState({
    address: '',
    stateOrProvince: '',
    region: '',
    regionLabel: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name: string, option: { value: string; key: string }): void => {
    setFormData((prevState) => ({
      ...prevState,
      [`${name}Label`]: option.value,
      [`${name}`]: option.key,
    }));
  };

  // const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // if (pathname === '/checkout' && !paymentIntentClient) {
    //   toast?.error('Oops! Looks like you missed a step.');
    //   return notFound();
    // }

    // stripe?.retrievePaymentIntent(paymentIntentClient || '')?.then(({ paymentIntent }) => {
    //   if (paymentIntent?.status === 'succeeded') {
    //     return router.push('/payment-status?status=success');
    //   }
    //   if (paymentIntent?.status === 'canceled') {
    //     return router.push('/payment-status?status=failed');
    //   }
    //   setAmount(paymentIntent?.amount || 0 / 100);
    // });
  }, [paymentIntentClient, stripe]);

  // const { data: cardsListData, isLoading: cardListIsLoading, isError: cardListIsError } = useGetCardsList();
  const cardsListData = content.cardsListData;
  const cardAlreadyAdded = cardsListData?.cards?.length > 0;

  const filteredBillingDetail = cardsListData?.cards?.filter((item) => item?.id === cardsListData?.defaultCard);

  const transformedBillingDetail = filteredBillingDetail?.map((item) => {
    const { id, billing_details } = item;
    return {
      _id: id,
      address: billing_details?.address?.line1 || '',
      city: billing_details?.address?.city || '',
      postalCode: billing_details?.address?.postal_code || '',
      region: billing_details?.address?.country || '',
      stateOrProvince: billing_details?.address?.state || '',
    };
  });

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-9 checkout-screen-h">
      <div>
        <BackButton />
      </div>
      <div className="w-full flex flex-col lg:flex-row items-start gap-5 lg:gap-8">
        <div className="w-full lg:w-[50%] flex flex-col gap-7">
          <div className="flex flex-col w-full gap-1">
            <div className="flex items-center justify-between w-full">
              <div className="w-full flex justify-between items-center">
                <Typography as="h3" size="h3" className="text-primary-dark ">
                  Checkout
                </Typography>
                {/* info icon */}
                <Iconify
                  icon="material-symbols:info-outline-rounded"
                  className="text-dark-gray cursor-pointer"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="lg:w-full">
              <Typography as="p" size="lg" className="text-dark-gray font-medium">
                Select a card or add a new one to complete your purchase.
              </Typography>
            </div>
          </div>
          <Container hasBorders>
            <div className="flex flex-col w-full gap-8 p-5 lg:p-10">
              <div>
                <Typography as="h5" size="h5" className="text-primary-text font-semibold !leading-tight">
                  Billing Address
                </Typography>
              </div>
              {false ? (
                <>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <BillingDetailsCardSkeleton key={index} />
                  ))}
                </>
              ) : cardAlreadyAdded ? (
                <div className="flex flex-col gap-3">
                  {transformedBillingDetail?.map((item, index) => (
                    <BillingDetailsCard item={item} key={index} cardKey={item._id} />
                  ))}
                </div>
              ) : (
                <div className="grid w-full grid-cols-2 gap-5">
                  <div className="w-full col-span-2">
                    <InputTextField
                      label="Address (optional)"
                      placeholder="Enter your address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full col-span-2">
                    <InputSelectField
                      label="State/Province (optional)"
                      name="stateOrProvince"
                      placeholder="State/Province"
                      textColor="!text-primary-text font-bold !m-0"
                      selectedTextColor="#312d2d"
                      className="!rounded-[12px] w-full"
                      height="h-[3.65rem]"
                      value={formData.stateOrProvince}
                      onChange={(value: any) => handleDropdownChange('stateOrProvince', value)}
                      onSelect={(value: any) => handleDropdownChange('stateOrProvince', value)}
                      options={content.stateOptions}
                    />
                  </div>
                  <div className="w-full col-span-2">
                    <InputSelectField
                      name="region"
                      label="Region (optional)"
                      textColor="font-bold !m-0"
                      className="!rounded-[12px] w-full"
                      height="h-[3.65rem]"
                      selectedTextColor="#312d2d"
                      value={formData.regionLabel}
                      onChange={(value: any) => handleDropdownChange('region', value)}
                      onSelect={(value: any) => handleDropdownChange('region', value)}
                      options={content.LocationOptions}
                      placeholder="Select"
                    />
                  </div>
                  <div className="w-full col-span-2">
                    <InputTextField
                      label="City (optional)"
                      name="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full col-span-2">
                    <InputTextField
                      label="Postal code (optional)"
                      name="postalCode"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
        <div className="w-full lg:w-[50%]">
          <CardForm
            formData={formData}
            paymentIntentClient={paymentIntentClient}
            amount={500}
            isLoading={false}
            cardsListData={cardsListData}
            cardAlreadyAdded={cardAlreadyAdded}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
