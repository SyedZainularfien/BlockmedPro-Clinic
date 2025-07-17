'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DoctorForm from '@/components/ui/doctor-form';
import { content } from '@/data';

const EditDoctor = () => {
  const { id } = useParams();
  const isValidId = content.doctorsData.some((data) => data?._id === Number(id));
  const router = useRouter();

  useEffect(() => {
    if (!isValidId) {
      router.push('/404');
    }
  }, [isValidId, router]);

  if (!isValidId) return null;

  return (
    <DashboardWrapper title="Edit Doctor" subTitle="Doctor Info">
      <DoctorForm initialData={content?.doctorData} />
    </DashboardWrapper>
  );
};

export default EditDoctor;
