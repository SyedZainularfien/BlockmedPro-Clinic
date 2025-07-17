'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import RegistrationQuestionaire from '@/components/ui/registration-questionaire';
import { content } from '@/data';

const RegistrationQuestionairePage = () => {
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

  return <RegistrationQuestionaire />;
};

export default RegistrationQuestionairePage;
