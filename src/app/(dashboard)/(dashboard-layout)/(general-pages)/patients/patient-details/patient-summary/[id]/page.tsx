'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import PatientSummaryComponent from '@/components/ui/patient-summary-section';
import { content } from '@/data';

const PatientSummary = () => {
  const { id } = useParams();
  const router = useRouter();

  const data = { ...content?.patientSummary };

  const patient = useMemo(() => {
    return content.allPatients.find((p) => p.patientId === id);
  }, [id]);

  useEffect(() => {
    if (!patient) {
      router.push('/404');
    }
  }, [patient, router]);

  if (!patient) return null;

  return <PatientSummaryComponent id={id} data={data} />;
};

export default PatientSummary;
