'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import InvoiceLayout from '@/components/sections/dashboard/invoice-layout';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import { content } from '@/data';

const PatientInvoice = () => {
  const data = content.transactionInvoice;

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
    invoiceTitle,
    invoiceNumber,
    invoiceDate,
    issueDate,
    paymentMethod,
    clinicInfo,
    patientInfo,
    tableData,
    total,
  } = data;
  return (
    <DashboardWrapper title="Invoice Preview">
      <InvoiceLayout
        invoiceTitle={invoiceTitle}
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
        issueDate={issueDate}
        paymentMethod={paymentMethod}
        clinicInfo={clinicInfo}
        patientInfo={patientInfo}
        tableData={tableData}
        total={total}
        path="/patients"
        backButtonText={'Back to patients'}
      />
    </DashboardWrapper>
  );
};

export default PatientInvoice;
