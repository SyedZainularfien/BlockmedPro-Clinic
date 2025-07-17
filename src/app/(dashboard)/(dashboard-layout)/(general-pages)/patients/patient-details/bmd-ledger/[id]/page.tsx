'use client';

import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import BmdLedger from '@/components/ui/bmd-ledger';
import { content } from '@/data';

const BmdLedgerPage: NextPage = () => {
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
      <BmdLedger />
    </div>
  );
};

export default BmdLedgerPage;
