'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import CurrentConsultations from '@/components/sections/dashboard/current-consultations';
import { content } from '@/data';

const CurrentConsultationsPage = () => {
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
  return <CurrentConsultations />;
};

export default CurrentConsultationsPage;
