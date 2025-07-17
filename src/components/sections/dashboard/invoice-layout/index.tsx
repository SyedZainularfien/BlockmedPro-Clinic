'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DataTable from '@/components/shared/data-table';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { InvoiceTableProps } from '@/types';
import { downloadPDF } from '@/utils/pdf-download';
import ClinicPdf from '../clinic-pdf';

const InvoiceLayout = ({
  invoiceTitle,
  invoiceNumber,
  invoiceDate,
  issueDate,
  paymentMethod,
  clinicInfo,
  patientInfo,
  tableData,
  backButtonText,
  total,
  path,
}: any) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(path);
  };
  const pdfData = {
    clinic: {
      name: clinicInfo.name,
      address: clinicInfo.address,
      phone: clinicInfo.phone,
    },
    patient: {
      name: patientInfo.name,
      date_of_birth: patientInfo.dob,
      email: patientInfo.email,
      address: patientInfo.address,
      phone: patientInfo.phone,
    },
    invoice: {
      invoice_number: invoiceNumber,
      invoice_date: invoiceDate,
      issue_date: issueDate,
      payment_method: paymentMethod,
      payment_reference: '',
    },
    items: tableData.map((item: any) => ({
      sr_no: item.sr,
      description: item.itemDescription,
      quantity: item.qty,
      price: item.price,
    })),
    totals: {
      sub_total: total.subTotal,
      shipping: 0,
      tax: {
        vat_rate: 15,
        vat_amount: total.tax,
      },
      discount: total.discount,
      grand_total: total.total,
    },
  };
  return (
    <Container>
      <div className="px-3 sm:px-7.5 py-10 sm:py-14 flex flex-col justify-center items-center gap-5">
        <div className="w-[90%] flex flex-col gap-12.5">
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
              <Typography size="h3" className="text-black font-bold">
                {invoiceTitle}
              </Typography>
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-1">
                  <Typography size="xl" className="text-dark-gray font-semibold">
                    Invoice No.
                  </Typography>
                  <Typography size="xl" className="text-dark-gray font-semibold">
                    #{invoiceNumber}
                  </Typography>
                </div>
                <div className="flex gap-10">
                  <Typography size="lg" className="text-dark-gray font-bold">
                    Invoice Date:
                  </Typography>
                  <Typography size="lg" className="text-black font-bold">
                    {invoiceDate}
                  </Typography>
                </div>
                <div className="flex gap-14">
                  <Typography size="lg" className="text-dark-gray font-bold">
                    Issue Date:
                  </Typography>
                  <Typography size="lg" className="text-black font-bold">
                    {issueDate}
                  </Typography>
                </div>
                <div className="flex gap-17">
                  <Typography size="lg" className="text-dark-gray font-bold">
                    Payment:
                  </Typography>
                  <Typography size="lg" className="text-black font-bold">
                    {paymentMethod}
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
              ColumnsData={content?.columns?.invoiceLayoutColumns}
              tableRows={tableData}
              TableBodyRow={({ _id, sr, itemDescription, qty, price }: InvoiceTableProps) => (
                <tr key={_id} className="border-b border-light-gray text-nowrap">
                  <td className="px-4 border-r border-l border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{sr || '--'}</Typography>
                  </td>
                  <td className="px-4 border-r border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{itemDescription || '--'}</Typography>
                  </td>
                  <td className="px-4 border-r border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{qty || '--'}</Typography>
                  </td>
                  <td className="px-4 border-r border-light-gray lg:px-6 py-4 text-start break-words">
                    <Typography size="md">{`$${price}` || '--'}</Typography>
                  </td>
                </tr>
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4.5">
              <div className="py-4 px-0 sm:px-7.5 flex flex-col gap-4.5">
                <div className="flex justify-between items-center">
                  <Typography size={'md'} className="text-black font-semibold">
                    Sub Total
                  </Typography>
                  <Typography size={'md'} className="text-black font-semibold">
                    ${total.subTotal}
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography size={'md'} className="text-black font-semibold">
                    Tax: Vat (15%)
                  </Typography>
                  <Typography size={'md'} className="text-black font-semibold">
                    ${total.tax}
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography size={'md'} className="text-black font-semibold">
                    Discount
                  </Typography>
                  <Typography size={'md'} className="text-black font-semibold">
                    ${total.discount}
                  </Typography>
                </div>
              </div>
              <div className="py-4 px-7.5 flex justify-between items-center bg-primary-dark">
                <Typography size={'md'} className="text-white font-semibold">
                  Grand Total
                </Typography>
                <Typography size={'md'} className="text-white font-semibold">
                  ${total.total}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end items-center gap-2.5">
              <Button className="w-full sm:w-fit" variant={'outlined'} onClick={handleGoBack}>
                {backButtonText}
              </Button>
              {downloadPDF(<ClinicPdf data={pdfData} />, `invoice-${invoiceNumber}`)}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default InvoiceLayout;
