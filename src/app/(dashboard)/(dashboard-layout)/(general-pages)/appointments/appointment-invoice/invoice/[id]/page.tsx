import React from 'react';

import InvoiceLayout from '@/components/sections/dashboard/invoice-layout';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import { content } from '@/data';

const AppointmentInvoice = () => {
  const data = content.ClinicInvoice;

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
        path="/appointments"
        backButtonText={'Back to Appointments'}
      />
    </DashboardWrapper>
  );
};

export default AppointmentInvoice;
