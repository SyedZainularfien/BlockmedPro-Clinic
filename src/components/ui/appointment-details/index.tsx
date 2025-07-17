'use client';

import { NextPage } from 'next';
import React from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import CustomCalendar from '@/components/shared/custom-calender';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { IAppointmentDetailsProps } from '@/types';
import AppointmentTypeOption from '../appointment-type-options';
import TimeSelect from '../time-selector';

const AppointmentDetailComponent: NextPage<IAppointmentDetailsProps> = ({
  data,
  title,
  isEdit,
  subTitle,
  onConfirm,
  specialist,
  setSpecialist,
  appointmentType,
  setAppointmentType,
  selectedTime = '01:30 pm',
  setSelectedTime = () => {},
  setSelectedDate = () => {},
}) => {
  // Find patient by ID

  const handleSelectSpecialist = (selectedOption: { label: string; value: string } | null) => {
    if (setSpecialist) {
      setSpecialist(selectedOption);
    }
  };

  const patientDetails = [
    { label: 'Patient Name', value: data?.name ?? '--' },
    { label: 'Patient ID', value: data?.patientId ?? '--' },
    { label: 'Date of Birth', value: data?.dob ?? '--' },
    { label: 'Email', value: data?.email ?? '--' },
    { label: 'Address', value: data?.patientId ?? '--' },
    { label: 'Phone', value: data?.appointmentType ?? '--' },
    // { label: 'Status', value: patient.status },
  ];

  return (
    <DashboardWrapper backButton title={title} subTitle={subTitle}>
      <div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Left Section - Patient Details */}
          <div className="w-full flex flex-col gap-5 md:w-1/2">
            <div>
              <Container hasBorders>
                <div className="px-8 py-6 flex flex-col gap-6">
                  <Typography size="lg" className="font-bold text-black">
                    Patient Details
                  </Typography>

                  <div className="space-y-4">
                    {patientDetails?.map(({ label, value }) => (
                      <div className="flex" key={label}>
                        <Typography size="md" className="w-1/3 text-black font-semibold">
                          {label}:
                        </Typography>
                        <Typography size="md" className="w-2/3 text-dark-gray font-normal">
                          {value}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </div>

            {/* Calendar Section */}
            <CustomCalendar setSelectedDate={setSelectedDate} />
          </div>

          {/* Right Section - Appointment Options */}
          <div className="w-full flex flex-col gap-5 md:w-1/2">
            {/* Appointment Type */}
            <Container hasBorders styling="px-7.5 pt-6 pb-6 md:pb-[48px]">
              <div className="flex flex-col gap-10">
                <Typography size={'lg'} className="font-bold text-black">
                  Appointment Type
                </Typography>

                <div className="flex flex-wrap gap-4">
                  <AppointmentTypeOption
                    value="face-to-face"
                    selected={appointmentType ?? ''}
                    onSelect={setAppointmentType}
                    icon="bi:house-add-fill"
                    title="Face to Face Consultation"
                    iconBg="bg-primary-dark"
                  />
                  <AppointmentTypeOption
                    value="remote"
                    selected={appointmentType ?? ''}
                    onSelect={setAppointmentType}
                    icon="logos:google-meet"
                    title="Remote Consultation"
                    iconBg="bg-gray-200"
                  />
                </div>
              </div>
            </Container>
            <div className="relative">
              <InputSelectField
                radius="14px"
                name="specialist"
                value={specialist}
                onChange={handleSelectSpecialist}
                options={content?.appointmentSpecialistsList}
                placeholder="Select Specialist"
                placeholderStyles="#312D2D"
                styling="placeholder-black font-semibold rounded-full"
              />
            </div>

            {/* Time Selection */}
            <Container hasBorders styling="px-7.5 py-6">
              <div className="flex flex-col gap-3.5">
                <Typography size="lg" className=" font-bold text-black">
                  Choose Appointment Time
                </Typography>
                <TimeSelect
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  data={content?.appointmentTimeSlots}
                />
              </div>
            </Container>

            {/* Save Button */}
            <div className="flex justify-end items-center">
              <Button className="w-full lg:w-3/4" onClick={onConfirm}>
                {isEdit ? 'Save' : 'Confirm Appointment'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default AppointmentDetailComponent;
