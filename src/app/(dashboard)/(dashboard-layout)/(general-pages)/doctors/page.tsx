'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import CustomCheckboxSelect from '@/components/shared/custom-checkbox-select';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Iconify from '@/components/shared/iconify';
import SearchInput from '@/components/shared/input-fields/search-bar';
import { Typography } from '@/components/shared/typography';
import DoctorCard from '@/components/ui/doctors-card';
import { content } from '@/data';

const Doctors = () => {
  const router = useRouter();
  return (
    <DashboardWrapper title="Doctors" subTitle="All Doctors List">
      <div className="flex flex-col gap-5">
        <Container hasBorders>
          <div className="w-full px-5 py-4 flex flex-col gap-4 md:flex-row md:justify-between justify-center items-center md:items-start">
            <SearchInput />
            <div className="w-full flex flex-col sm:flex-row justify-start md:justify-between items-center gap-4">
              <div className="w-full md:w-auto">
                <CustomCheckboxSelect
                  position="left-0"
                  title={'Speciality'}
                  options={content.filterOptions.speciality}
                  selectedFilters={[]}
                />
              </div>

              <Button
                onClick={() => router.push('/doctors/add-new-doctor')}
                variant="primary"
                className="flex justify-center items-center gap-2 w-full md:w-auto"
              >
                <Typography size={'lg'} as={'p'} className="text-center">
                  Add Doctor
                </Typography>
                <Iconify icon="mdi:add" color="white" />
              </Button>
            </div>
          </div>
        </Container>
        <div className="flex flex-col gap-5">
          {content?.doctorsData.map((doctor) => <DoctorCard key={doctor.registration} doctor={doctor} />)}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Doctors;
