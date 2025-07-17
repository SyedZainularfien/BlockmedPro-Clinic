'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { content } from '@/data';

const BookAppointment = () => {
  const patients = content.patients;
  const [searchInput, setSearchInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const input = searchInput?.trim().toLowerCase();

    if (!input) {
      setErrorMessage('Please enter a patient ID or email.');
      return;
    }

    const foundPatient = patients.find(
      (p) => p.patientId.toString().toLowerCase() === input || p.email.toLowerCase() === input
    );

    if (foundPatient) {
      router.push(`/appointments/appointment-details/${foundPatient.patientId}`);
    } else if (!foundPatient) {
      setErrorMessage('Patient details are not recognised, please try again.');
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <DashboardWrapper
      backButton
      title="Book an appointment"
      subTitle="Book an appointment directly from your clinic module."
    >
      <div className="w-full md:w-1/2 z-20">
        <Container styling="">
          <div className="px-7.5 py-6 flex flex-col gap-7">
            <InputTextField
              value={searchInput}
              error={errorMessage}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter patient ID or email"
              onKeyDown={handleKeyPress}
              label="Please Search for the Patient Using Their ID Or Email."
            />
            <Button onClick={handleSearch}>Search Patient</Button>
          </div>
        </Container>
      </div>
      <div className="absolute bottom-0 right-0 z-10 hidden sm:block">
        <Image src={'/assets/svgs/background-image.svg'} height={300} width={530} alt="bg-logo" />
      </div>
    </DashboardWrapper>
  );
};

export default BookAppointment;
