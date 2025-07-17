import React, { FC } from 'react';

import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { IDoctorInfoItemProps } from '@/types';

const InfoItem: FC<IDoctorInfoItemProps> = ({ label, value = false }) => (
  <div className="flex flex-col sm:flex-row gap-1 justify-between items-start">
    <div className="w-1/3">
      <Typography size="md" className="text-black font-semibold">
        {label}
      </Typography>
    </div>
    <div className="w-2/3">
      <Typography size="md" className="text-dark-gray font-semibold">
        {value}
      </Typography>
    </div>
  </div>
);

const DoctorInfoTab: FC = () => {
  const singleDoctor = content?.singleDoctor;
  return (
    <section className="flex flex-col xl:flex-row gap-5">
      <div className="w-full">
        <Container>
          <div className="px-5 sm:px-7 py-5 sm:py-7 flex flex-col gap-5">
            <Typography size="lg" className="text-black font-bold">
              Doctor Info
            </Typography>
            <div className="px-7 py-6 flex flex-col gap-5 bg-background-gray rounded-xl">
              <InfoItem label="Gender:" value={singleDoctor.info.gender} />
              <hr className="w-full text-light-gray" />

              <InfoItem label="Date Of Birth:" value={singleDoctor.info.dateOfBirth} />
              <hr className="w-full text-light-gray" />

              <InfoItem label="Blood Group:" value={singleDoctor.info.bloodGroup} />
              <hr className="w-full text-light-gray" />

              <InfoItem label="Education:" value={singleDoctor.info.education} />
              <hr className="w-full text-light-gray" />

              <InfoItem label="Designation:" value={singleDoctor.info.designation} />
              <hr className="w-full text-light-gray" />

              <InfoItem label="Speciality:" value={singleDoctor.info.speciality} />
              <hr className="w-full text-light-gray" />

              <div className="flex flex-col gap-1 sm:flex-row justify-between items-start">
                <div className="w-1/3">
                  <Typography size="md" className="text-black font-semibold">
                    Shift Period:
                  </Typography>
                </div>
                <div className="w-2/3">
                  <div className="flex flex-col  gap-4">
                    {singleDoctor.info.shiftPeriods.map((shift, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-1 justify-between items-start sm:items-center"
                      >
                        <Typography size="md" className="text-dark-gray font-semibold">
                          {shift.day}
                        </Typography>
                        <Typography size="md" className="text-dark-gray font-semibold">
                          {shift.time}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="w-full text-light-gray" />

              <InfoItem label="Bio:" value={singleDoctor.info.bio} isMultiLine />
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
                <InfoItem label="Email Address:" value={singleDoctor.contact.email} />
                <hr className="w-full text-light-gray" />

                <InfoItem label="Phone Number:" value={singleDoctor.contact.phone} />
                <hr className="w-full text-light-gray" />

                <InfoItem label="Address:" value={singleDoctor.contact.address} />
              </div>
            </div>
          </Container>
        </div>
        <div>
          <Container>
            <div className="px-5 sm:px-7 py-5 sm:py-7 flex flex-col gap-5">
              <Typography size="lg" className="text-black font-bold">
                Next Patient (Upcoming)
              </Typography>
              <div className="px-7 py-6 flex flex-col gap-5 bg-background-gray rounded-xl">
                {singleDoctor.nextPatient.patientAvailile ? (
                  <>
                    <InfoItem label="Patient Name:" value={singleDoctor.nextPatient.name} />
                    <hr className="w-full text-light-gray" />

                    <InfoItem label="Patient Id:" value={singleDoctor.nextPatient.id || '--'} />
                    <hr className="w-full text-light-gray" />

                    <InfoItem label="Disease:" value={singleDoctor.nextPatient.disease} />
                    <hr className="w-full text-light-gray" />

                    <InfoItem label="Address:" value={singleDoctor.nextPatient.address} />
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
  );
};

export default DoctorInfoTab;
