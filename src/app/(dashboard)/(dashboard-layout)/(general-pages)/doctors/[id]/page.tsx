'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import SingleDoctorAppointmentTab from '@/components/sections/dashboard/doctor-tabs/appointments';
import DoctorInfoTab from '@/components/sections/dashboard/doctor-tabs/info-tab';
import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Tabs from '@/components/shared/tabs';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';

const DoctorDetails: NextPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const router = useRouter();
  const { id } = useParams();

  const isValidId = content.doctorsData.some((data) => data?._id === Number(id));

  useEffect(() => {
    if (!isValidId) {
      router.push('/404');
    }
  }, [isValidId, router]);

  if (!isValidId) return null;

  const tabs = [
    { id: 1, title: 'Doctor Info' },
    { id: 2, title: 'Appointments' },
  ];

  const handleNavigateEdit = () => {
    router.push(`/doctors/edit-doctor/${id}`);
  };

  const tabComponents: Record<number, React.ReactNode> = {
    1: <DoctorInfoTab />,
    2: <SingleDoctorAppointmentTab />,
  };

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
    localStorage.setItem('Doctor Info', tab.toString());
  };

  return (
    <DashboardWrapper title="Profile" subTitle="Doctor Info">
      <div className="flex flex-col gap-5">
        <section className="">
          <Container>
            <div className="flex flex-col sm:flex-row gap-5 justify-center sm:justify-between sm:items-center px-7.5 py-5">
              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-1/2 items-center">
                <div className="rounded-full border-2 border-light-gray p-1">
                  <Image
                    src={'/assets/svgs/dr-rehmata.svg'}
                    alt={'doctor'}
                    height={132}
                    width={132}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography size="xl" className="text-blue font-bold">
                    {'Dr. Jonas Smith'}
                  </Typography>
                  <div className="flex flex-col gap-1.5">
                    <Typography size="md" className="text-dark-gray font-semibold">
                      {'JonasSmith123@gmail.com'}
                    </Typography>
                    <Typography size="md" className="text-dark-gray font-semibold">
                      Registration# {'9283763672'}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button onClick={handleNavigateEdit} variant={'primary'} className="w-full sm:w-[134px]">
                  Edit Profile
                </Button>
              </div>
            </div>
          </Container>
        </section>
        {/* tabs */}
        <section>
          <Container>
            <div className="px-7.5">
              <Tabs activeTab={activeTab} setActiveTab={handleTabChange} tabs={tabs} />
            </div>
          </Container>
        </section>
        {/* tabs data */}
        <section>
          <div className="py-1">{tabComponents[activeTab] || null}</div>
        </section>
      </div>
    </DashboardWrapper>
  );
};

export default DoctorDetails;
