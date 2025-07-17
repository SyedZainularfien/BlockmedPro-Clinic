'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DataTable from '@/components/shared/data-table';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { IPrescriptionTableProps } from '@/types';
import { downloadPDF } from '@/utils/pdf-download';
import PrescriptionPdf from '../prescription-pdf';

const PrescriptionLayout = ({
  prescritptionTitle,
  prescritptionDate,
  prescritptionNo,
  clinicInfo,
  patientInfo,
  tableData,
  comments,
  reportedBy,
  backButtonText,
  drRegistrationNo,
}: any) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/patients');
  };

  // Prepare data for PDF
  const pdfData = {
    clinic: {
      name: clinicInfo.name,
      address: clinicInfo.address,
      phone: clinicInfo.phone,
      email: clinicInfo.email,
    },
    patient: {
      name: patientInfo.name,
      date_of_birth: patientInfo.dob,
      email: patientInfo.email,
      address: patientInfo.address,
      phone: patientInfo.phone,
    },
    prescription: {
      prescription_number: prescritptionNo,
      prescription_date: prescritptionDate,
    },
    medications: tableData,
    comments: comments,
    reportedBy: reportedBy,
    drRegistrationNo: drRegistrationNo,
  };

  return (
    <Container>
      <div className="px-3 sm:px-7.5 py-10 sm:py-14 flex flex-col justify-center items-center gap-5">
        <div className="w-[90%] flex flex-col gap-14">
          {/* Clinic Info */}
          <div className="flex flex-col items-center gap-1">
            <Typography size="md" className="text-dark-gray font-semibold">
              {clinicInfo.name}
            </Typography>
            <Typography size="md" className="text-dark-gray font-semibold whitespace-pre-line text-center">
              {clinicInfo.address}
            </Typography>
            <Typography size="md" className="text-dark-gray font-semibold">
              {clinicInfo.phone}
            </Typography>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-center gap-5 lg:justify-between">
            <div className="flex flex-col gap-0.5">
              <Typography size="h3" className="text-primary-light font-bold">
                {prescritptionTitle}
              </Typography>
              <div className="flex flex-col gap-3">
                <div className="flex gap-1">
                  <Typography size="xl" className="text-dark-gray font-semibold">
                    Prescription No.
                  </Typography>
                  <Typography size="xl" className="text-dark-gray font-semibold">
                    #{prescritptionNo}
                  </Typography>
                </div>
                <div className="flex gap-10">
                  <Typography size="lg" className="text-dark-gray font-bold">
                    Prescription Date:
                  </Typography>
                  <Typography size="lg" className="text-black font-bold">
                    {prescritptionDate}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="flex flex-col gap-2.5 justify-end">
              <Typography size="xl" className="text-black font-bold">
                {patientInfo.name}
              </Typography>
              <Typography size="lg" className="text-black font-bold">
                {patientInfo.dob}
              </Typography>
              <Typography size="md" className="text-dark-gray font-semibold">
                {patientInfo.email}
              </Typography>
              <Typography
                size="md"
                className="text-dark-gray font-semibold break-words whitespace-pre-wrap max-w-[300px]"
              >
                {patientInfo.address}
              </Typography>
              <Typography size="md" className="text-dark-gray font-semibold">
                {patientInfo.phone}
              </Typography>
            </div>
          </div>

          {/* Table */}
          <div>
            <DataTable
              ColumnsData={content?.columns?.prescriptionLayoutColumns}
              tableRows={tableData}
              TableBodyRow={({
                _id,
                nameOfDrug,
                strength,
                formulation,
                doseInstruction,
                qty,
              }: IPrescriptionTableProps) => (
                <tr key={_id} className="border-b border-light-gray text-nowrap">
                  <td className="px-4 border-r border-l border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{nameOfDrug || '--'}</Typography>
                  </td>
                  <td className="px-4 border-r border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{strength || '--'}</Typography>
                  </td>
                  <td className="px-4 border-r border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{formulation || '--'}</Typography>
                  </td>
                  <td className="px-4 border-r border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{doseInstruction || '--'}</Typography>
                  </td>
                  <td className="px-4 border-r border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{qty || '--'}</Typography>
                  </td>
                </tr>
              )}
            />
          </div>

          {/* Comments Section */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row justify-start items-start gap-1">
              <Typography size={'lg'} as={'p'} className="text-primary-light font-bold">
                Comments:
              </Typography>
              <Typography size={'lg'} as={'p'} className="text-dark-gray font-normal">
                {comments}
              </Typography>
            </div>

            {/* Footer Info */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <Typography size={'lg'} as={'p'} className="text-primary-light font-bold">
                  Reported by:
                </Typography>
                <Typography size={'lg'} as={'p'} className="text-dark-gray font-bold">
                  {reportedBy}
                </Typography>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <Typography size={'lg'} as={'p'} className="text-primary-light font-bold">
                    DR. Registration no.
                  </Typography>
                  <Typography size={'lg'} as={'p'} className="text-dark-gray font-bold">
                    {drRegistrationNo}
                  </Typography>
                </div>
                <div className="flex flex-col gap-1">
                  <Typography size={'lg'} as={'p'} className="text-primary-light font-bold">
                    Clinic Email
                  </Typography>
                  <Typography size={'lg'} as={'p'} className="text-dark-gray font-bold">
                    {clinicInfo.email}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-2.5">
            <Button className="w-full sm:w-fit" variant={'outlined'} onClick={handleGoBack}>
              {backButtonText}
            </Button>
            {downloadPDF(<PrescriptionPdf data={pdfData} />, `prescription-${prescritptionNo}`)}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrescriptionLayout;
