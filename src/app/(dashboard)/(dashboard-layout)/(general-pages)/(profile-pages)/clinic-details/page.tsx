'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import Star from '@/components/ui/star-rating/Star';
import { content } from '@/data';
import { IDoctorInfoItemProps } from '@/types';

const InfoItem: FC<IDoctorInfoItemProps> = ({ label, value = false, labelWidth, valueWidth }) => (
  <div className="flex flex-col sm:flex-row gap-1 justify-between items-start">
    <div className={`${labelWidth ? labelWidth : ' w-full sm:w-1/3'}`}>
      <Typography size="md" className="text-black font-semibold">
        {label}
      </Typography>
    </div>
    <div className={`${valueWidth ? valueWidth : 'w-full sm:w-2/3'}`}>
      <Typography size="md" className="text-dark-gray font-semibold">
        {value}
      </Typography>
    </div>
  </div>
);

const ClinicDetails: FC = () => {
  const clinicDetails = content?.clinicDetails;
  const router = useRouter();

  const handleEditDetails = () => {
    router.push('/edit-clinic-details');
  };

  return (
    <DashboardWrapper title="Clinic Details" subTitle="Clinic Info">
      <div className="flex flex-col gap-5">
        <section className="">
          <Container>
            <div className="flex flex-col sm:flex-row gap-5 justify-center sm:justify-between sm:items-center px-7.5 py-5">
              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-1/2 items-center">
                <div className="w-[132px] h-[132px] rounded-full border-2 border-light-gray p-5 z-10 overflow-hidden">
                  <Image
                    width={132}
                    height={132}
                    alt="doctor"
                    src="/assets/svgs/medical-care.svg"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Typography size="xl" className="text-blue font-bold">
                    {'Medi Care Clinic'}
                  </Typography>
                  <div className="flex justify-start items-center gap-2">
                    <div className="flex justify-start items-center gap-1.5">
                      <Star value={1} maxRating={5} size={16} color="gold" fillPercentage={5} />
                      <Typography size="lg" className="text-black font-bold">
                        {'4.5'}
                      </Typography>
                    </div>
                    <Typography size="sm" className="text-dark-gray font-normal">
                      {'(1096 Reviews)'}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button variant={'primary'} className="w-full sm:w-[134px]" onClick={handleEditDetails}>
                  Edit Details
                </Button>
              </div>
            </div>
          </Container>
        </section>
        <section className="flex flex-col xl:flex-row gap-5">
          <div className="w-full">
            <Container>
              <div className="px-5 sm:px-7 py-5 sm:py-7 flex flex-col gap-5">
                <Typography size="lg" className="text-black font-bold">
                  Clinic Info
                </Typography>
                <div className="px-7 py-6 flex flex-col gap-5 bg-background-gray rounded-xl">
                  <InfoItem label="Clinic Name:" value={clinicDetails.info.clinicName} />
                  <hr className="w-full text-light-gray" />

                  <InfoItem label="Registration No:" value={clinicDetails.info.registrationNo} />
                  <hr className="w-full text-light-gray" />

                  <InfoItem label="VAT Registration No:" value={clinicDetails.info.vatRegistarationNo} />
                  <hr className="w-full text-light-gray" />

                  <InfoItem label="Postal Code:" value={clinicDetails.info.postalCode} />
                  <hr className="w-full text-light-gray" />

                  <InfoItem label="Registered In:" value={clinicDetails.info.registeredIn} />
                  <hr className="w-full text-light-gray" />

                  <InfoItem label="Overview:" value={clinicDetails.info.overview} isMultiLine />
                </div>
              </div>
            </Container>
          </div>
          <div className="w-full flex flex-col gap-5">
            <div>
              <Container>
                <div className="px-5 sm:px-7 py-5 sm:py-7 flex flex-col gap-5">
                  <Typography size="lg" className="text-black font-bold">
                    Contact Information
                  </Typography>
                  <div className="px-7 py-6 flex flex-col gap-5 bg-background-gray rounded-xl">
                    <InfoItem label="Email Address:" value={clinicDetails.contact.email} />
                    <hr className="w-full text-light-gray" />

                    <InfoItem label="Phone Number:" value={clinicDetails.contact.phone} />
                    <hr className="w-full text-light-gray" />

                    <InfoItem label="Address:" value={clinicDetails.contact.address} />
                  </div>
                </div>
              </Container>
            </div>
            <div>
              <Container>
                <div className="px-5 sm:px-7 py-5 sm:py-7 flex flex-col gap-5">
                  <Typography size="lg" className="text-black font-bold">
                    Specialized In
                  </Typography>
                  <div className="px-7 py-6 flex flex-col gap-5 bg-background-gray rounded-xl">
                    {clinicDetails?.specializedIn ? (
                      <>
                        {clinicDetails?.specializedIn?.map((specialty, index) => (
                          <React.Fragment key={index}>
                            <InfoItem
                              labelWidth="w-[12%]"
                              valueWidth="w-full"
                              label={`${index + 1}:`}
                              value={specialty.value}
                            />
                            {index !== clinicDetails.specializedIn.length - 1 && (
                              <hr className="w-full text-light-gray" />
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 items-center justify-center py-8">
                        <Iconify icon="carbon:hospital-bed" size={50} className="text-gray" />
                        <Typography size={'md'} className="text-gray font-semibold">
                          No patient data available
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </section>
      </div>
    </DashboardWrapper>
  );
};

export default ClinicDetails;
