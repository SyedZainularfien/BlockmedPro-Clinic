'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import BankAccountCard from '@/components/ui/billing-account-card';
import BillingDetailsCard from '@/components/ui/billing-details-card';
import Card from '@/components/ui/card';
import BankAccountCardSkeleton from '@/components/ui/skeletons/bank-account-card-skeleton';
import BillingDetailsCardSkeleton from '@/components/ui/skeletons/billing-details-card-skeleton';
import CardSkeleton from '@/components/ui/skeletons/card-skeleton';
import { content } from '@/data';

const CardsBillingsPage: NextPage = () => {
  const router = useRouter();
  const { cardsListData, billingAddressData, transactionsData, bankAccountsData } = content?.CardsBillings;

  const handleDefaultChange = (id: string): void => {
    console.log('default payment method id', id);
  };

  return (
    <DashboardWrapper title="Cards & Billing" subTitle="Update or change your cards and billing information here">
      <div className="flex justify-center w-full h-full">
        <div className="flex flex-col w-full sm:w-[95%] xl:w-full gap-3 xl:gap-5">
          <div className="w-full">
            <Container styling="w-full flex flex-col gap-3 px-5 xl:!px-10 !py-5">
              <div className="flex sm:items-center justify-between gap-4 sm:gap-0 sm:flex-row flex-col">
                <div className="flex items-center gap-2.5">
                  <Typography as="h5" size="h5" className="text-primary-dark">
                    Saved Cards
                  </Typography>
                  <button
                    disabled={false}
                    className="flex items-center disabled:opacity-50 gap-1  disabled:text-dark-gray text-primary-dark cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Iconify icon="lets-icons:edit" width="16" height="16" />
                    <Typography as="p" size="sm" className="font-semibold">
                      Edit
                    </Typography>
                  </button>
                </div>
                <button
                  onClick={() => router.push('/add-new-card')}
                  className="py-2 px-2.5 rounded-lg flex bg-primary-dark items-center gap-2 cursor-pointer"
                >
                  <Iconify
                    icon="ic:round-add"
                    width="20"
                    height="20"
                    className="bg-white text-primary-dark rounded-md"
                  />
                  <Typography as="p" size="md" className="text-white font-semibold">
                    Add Card
                  </Typography>
                </button>
              </div>
              <div className="flex w-full gap-5 overflow-x-auto scrollbar-hide">
                {false ? (
                  // Render skeleton loaders while card data is loading
                  Array(4)
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    .fill()
                    ?.map((_, index) => <CardSkeleton key={index} />)
                ) : cardsListData?.cards?.length > 0 ? (
                  // Render actual card list if data is available
                  cardsListData?.cards
                    ?.sort((a, b) => {
                      // If a card is the default card, it should appear first
                      if (a.id === cardsListData?.defaultCard) return -1;
                      if (b.id === cardsListData?.defaultCard) return 1;
                      return 0;
                    })
                    ?.map((card, index) => (
                      <Card
                        key={index}
                        isDefault={card?.id === cardsListData?.defaultCard}
                        cardData={card}
                        onChange={() => handleDefaultChange(card?.id)}
                      />
                    ))
                ) : (
                  // Render a message if no cards are found
                  <div className="flex items-center justify-center w-full py-6">
                    <Typography as="p" size="md" className="text-dark-gray font-medium">
                      No cards available
                    </Typography>
                  </div>
                )}
              </div>
            </Container>
          </div>
          <div className="flex flex-col justify-between w-full gap-3 pb-10 lg:gap-5 lg:flex-row">
            <div className="flex flex-col gap-5 lg:gap-5 lg:w-[60%]">
              <Container hasBorders>
                <div className="flex flex-col gap-3.5 px-5 md:!px-10 !py-5 md:!py-8">
                  <div>
                    <Typography size={'h5'} as={'p'} className="text-black font-bold">
                      License Fee
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Typography as="p" size="md" className="text-dark-gray font-semibold">
                      Next Payment : 25 June 2025
                    </Typography>
                    <div className="flex items-center gap-4">
                      <Image src="/assets/svgs/mastercard-logo.svg" alt="card-icon" width={24} height={15} />
                      <Typography as="p" size="md" className="text-black font-semibold">
                        XXXX XXXX XXXX XXXX
                      </Typography>
                    </div>
                  </div>
                </div>
              </Container>
              <div className="flex flex-col gap-3 lg:gap-5">
                <div>
                  <Container hasBorders styling="flex flex-col gap-3 px-5 md:!px-10 !py-5 md:!py-8">
                    <div className="flex items-center">
                      <Typography as="h5" size="h5" className="text-black font-bold">
                        Billing Information
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                      {false ? (
                        // Render skeleton loaders while data is loading
                        Array.from({ length: 2 })?.map((_, index) => <BillingDetailsCardSkeleton key={index} />)
                      ) : billingAddressData && billingAddressData.length > 0 ? (
                        // Render actual billing information once data is loaded
                        billingAddressData
                          ?.slice(0, 2)
                          ?.map((item, index) => (
                            <BillingDetailsCard item={item} key={index} cardKey={item._id} action />
                          ))
                      ) : (
                        // Render a message if no billing address is found
                        <div className="flex flex-col items-center gap-5 justify-center py-6">
                          <Image src="/assets/svgs/no-data.svg" alt="no-data" width={85} height={85} />
                          <Typography as="p" size="md" className="text-dark-gray font-semibold">
                            No billing address added
                          </Typography>
                        </div>
                      )}
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <div className="lg:w-[40%]">
              {false ? (
                // Render skeleton loader while transactions data is loading
                <BankAccountCardSkeleton />
              ) : transactionsData?.items && transactionsData.items.length > 0 ? (
                // Render actual transactions once data is loaded
                <BankAccountCard bankAccounts={bankAccountsData.items} />
              ) : (
                // Render a message if no transactions are found
                <Container styling="px-5 md:!px-10 py-5 md:!py-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <Typography as="h5" size="h5" className="text-primary-dark">
                        Bank Accounts
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-center py-6">
                    <Typography as="p" size="md" className="text-dark-gray font-semibold">
                      No bank accounts found
                    </Typography>
                  </div>
                </Container>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default CardsBillingsPage;
