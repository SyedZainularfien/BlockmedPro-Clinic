import React from 'react';

import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DoctorForm from '@/components/ui/doctor-form';

const AddDoctor = () => {
  return (
    <DashboardWrapper title="Add New Doctor" subTitle="Fill the form below to add a new doctor">
      <DoctorForm />
    </DashboardWrapper>
  );
};

export default AddDoctor;
