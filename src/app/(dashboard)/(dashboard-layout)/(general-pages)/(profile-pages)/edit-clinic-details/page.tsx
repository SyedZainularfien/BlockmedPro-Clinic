'use client';

import React, { useState } from 'react';

import AboutClinic from '@/components/sections/dashboard/edit-clinic-tabs/about-clinic';
import CancellationPolicy from '@/components/sections/dashboard/edit-clinic-tabs/cancellation-policy';
import ClinicInfo from '@/components/sections/dashboard/edit-clinic-tabs/clinic-info';
import SpecialisationAndPricing from '@/components/sections/dashboard/edit-clinic-tabs/specialization';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Tabs from '@/components/shared/tabs';

const EditClinicDetails = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const tabs = [
    { id: 1, title: 'Clinic Info' },
    { id: 2, title: 'Specialisation and pricing' },
    { id: 3, title: 'About' },
    { id: 4, title: 'Cancellation Policy' },
  ];

  const tabComponents: Record<number, React.ReactNode> = {
    1: <ClinicInfo />,
    2: <SpecialisationAndPricing />,
    3: <AboutClinic />,
    4: <CancellationPolicy />,
  };

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
    localStorage.setItem('clinicDetails', tab.toString());
  };
  return (
    <DashboardWrapper backButton title="Edit Details" subTitle="Update your clinic details here">
      <div className="flex flex-col items-start justify-center gap-5">
        <div className="flex justify-start w-full max-w-fit">
          <Container hasBorders styling="px-5 py-2.5">
            <Tabs filled tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />
          </Container>
        </div>
        <div className="w-full">
          <div className="py-1">{tabComponents[activeTab] || null}</div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default EditClinicDetails;
