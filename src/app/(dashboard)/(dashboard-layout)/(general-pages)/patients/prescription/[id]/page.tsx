'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import PrescriptionLayout from '@/components/sections/dashboard/prescription-layout';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import { content } from '@/data';

const Prescription = () => {
  const data = content.prescriptionData;

  const { id } = useParams();
  const router = useRouter();

  const patient = useMemo(() => {
    return content.allPatients.find((p) => p.patientId === id);
  }, [id]);

  useEffect(() => {
    if (!patient) {
      router.push('/404');
    }
  }, [patient, router]);

  if (!patient) return null;

  const {
    prescritptionTitle,
    prescritptionNo,
    prescritptionDate,
    paymentMethod,
    clinicInfo,
    patientInfo,
    tableData,
    comments,
    reportedBy,
    drRegistrationNo,
  } = data;
  return (
    <DashboardWrapper title="Prescription Preview">
      <PrescriptionLayout
        prescritptionTitle={prescritptionTitle}
        prescritptionNo={prescritptionNo}
        prescritptionDate={prescritptionDate}
        paymentMethod={paymentMethod}
        clinicInfo={clinicInfo}
        patientInfo={patientInfo}
        tableData={tableData}
        comments={comments}
        reportedBy={reportedBy}
        drRegistrationNo={drRegistrationNo}
        backButtonText={'Back to patients'}
      />
    </DashboardWrapper>
  );
};

export default Prescription;
