'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import PrescriptionAndRecords from '@/components/ui/prescription-and-records';
import { content } from '@/data';

const PrescriptionsAndRecordsPage = () => {
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
  return (
    <div>
      <PrescriptionAndRecords />
    </div>
  );
};

export default PrescriptionsAndRecordsPage;
