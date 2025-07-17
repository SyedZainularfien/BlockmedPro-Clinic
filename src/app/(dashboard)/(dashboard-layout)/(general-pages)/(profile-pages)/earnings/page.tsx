'use client';

import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import DateRange from '@/components/shared/date-range';
import Iconify from '@/components/shared/iconify';
import SearchInput from '@/components/shared/input-fields/search-bar';
import RangeCalender from '@/components/shared/range-calender';
import { Typography } from '@/components/shared/typography';
import SuccessModal from '@/components/ui/modals/success-modal';
import WithdrawFundModal from '@/components/ui/modals/withdraw-fund-modal';
import { content } from '@/data';
import { earningsInitialvalues } from '@/formik/initial-values/dashboard';
import { earningsSchema } from '@/formik/validations/dashboard';
import { IEarningsTableProps } from '@/types';

const Earnings = () => {
  const [earnings] = useState(content.earningstableData);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(content.earningstableData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const formik = useFormik({
    initialValues: earningsInitialvalues,
    validationSchema: earningsSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      toast.success('Withdrawal request submitted successfully!');
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleCloseModal();
      setSuccessModalOpen(true);
    },
  });

  const { values, errors, touched, isValid, handleSubmit, handleChange, handleBlur, resetForm } = formik;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };
  return (
    <DashboardWrapper
      title="Earnings And Withdrawal"
      subTitle="View & withdraw earnings. Securely manage your banking information. "
    >
      <div className="flex flex-col gap-5">
        <Container hasBorders styling="py-4 px-5 sm:py-7 sm:px-7.5">
          <div className="block lg:hidden mb-4">
            <RangeCalender />
          </div>
          <div className="flex flex-wrap justify-between gap-8">
            {/* Available Earnings For Use */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Typography size={'lg'} className="text-black font-bold">
                  Available Earnings For Use
                </Typography>
              </div>
              <div className="space-y-2">
                <Typography size={'h4'} className="text-black font-bold">
                  $128k
                </Typography>
                <Typography size={'sm'} className="text-dark-gray font-semibold">
                  Withdrawn to date: $ 69.5k
                </Typography>
              </div>
              <Button onClick={handleOpenModal}>Withdraw</Button>
            </div>

            {/* Future Payments */}
            <div className="space-y-4 xl:border-l border-light-gray pl-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Typography size={'lg'} className="text-black font-bold">
                    Future Payments
                  </Typography>
                  <Iconify icon="material-symbols:info-outline" className="w-4 h-4 text-dark-gray" />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Typography size={'sm'} className="text-dark-gray font-semibold">
                      Payments being cleared
                    </Typography>
                    <Iconify icon="material-symbols:info-outline" className="w-4 h-4 text-dark-gray" />
                  </div>
                  <Typography size={'h4'} className="text-black font-bold">
                    $22k
                  </Typography>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Typography size={'sm'} className="text-dark-gray font-semibold">
                      Payments for active orders
                    </Typography>
                    <Iconify icon="material-symbols:info-outline" className="w-4 h-4 text-dark-gray" />
                  </div>
                  <Typography size={'h4'} className="text-black font-bold">
                    $15k
                  </Typography>
                </div>
              </div>
            </div>

            {/* Earning & Expenses */}
            <div className="space-y-4 xl:border-l border-light-gray pl-6">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <Typography size={'lg'} className="text-black font-bold">
                    Earning & Expenses
                  </Typography>
                  <Iconify icon="material-symbols:info-outline" className="w-4 h-4 text-dark-gray" />
                </div>
                <div className="hidden lg:block">
                  <RangeCalender />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Typography size={'sm'} className="text-dark-gray font-semibold">
                      Earnings to date
                    </Typography>
                    <Iconify icon="material-symbols:info-outline" className="w-4 h-4 text-dark-gray" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$220k</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Typography size={'sm'} className="text-dark-gray font-semibold">
                      Expenses to date
                    </Typography>
                    <Iconify icon="material-symbols:info-outline" className="w-4 h-4 text-dark-gray" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$68k</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container hasBorders styling="">
          <div className="flex flex-col">
            <div className="w-full py-3.5 px-5 2xl:7 2xl:py-5 flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
              <Typography size={'h5'} className="text-black font-bold leading-0">
                Withdraw History
              </Typography>
              <div className="w-full md:w-auto flex flex-col sm:flex-row justify-center items-center gap-5">
                <SearchInput />
                <div className="w-full">
                  <DateRange data={content?.earningstableData} filterKey={'date'} onFilter={setFilteredData} />
                </div>
              </div>
            </div>
            {/* Table */}
            <div className="px-5">
              <DataTable
                paginate
                roundedHeader
                ColumnsData={content?.columns?.earningsTableColumns}
                tableRows={paginatedData}
                rowsPerPage={rowsPerPage}
                meta={{
                  totalItems: earnings.length,
                  itemsPerPage: rowsPerPage,
                  currentPage,
                  totalPages: Math.ceil(earnings.length / rowsPerPage),
                }}
                setCurrentPage={setCurrentPage}
                setRowsPerPage={setRowsPerPage}
                notFonudText="No Withdrawals history Available"
                TableBodyRow={({
                  _id,
                  date,
                  activity,
                  description,
                  from,
                  transactionId,
                  patientId,
                  status,
                  amount,
                  negative,
                }: IEarningsTableProps) => (
                  <tr key={_id} className="text-nowrap">
                    <td className="px-4 lg:px-6 py-3 text-start break-words">
                      <Typography size="md" className="text-black">
                        {date || '--'}
                      </Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <Typography size="md">{activity || '--'}</Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <Typography size="md">{description || '--'}</Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <Typography size="md">{from || '--'}</Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <Typography size="md">{transactionId || '--'}</Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <Typography size="md">{patientId || '--'}</Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      {status === 'Cleared' ? (
                        <div className="flex w-fit items-center justify-center bg-[#D9F6DA] text-green rounded-lg px-4 py-2">
                          <Typography size="md">{status || '--'}</Typography>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1 border border-light-gray rounded-lg px-2 py-2">
                          <Iconify
                            icon="fluent:clock-12-regular"
                            className="text-black align-middle"
                            width={20}
                            height={20}
                          />
                          <Typography size="md" className="align-middle">
                            {status || '--'}
                          </Typography>
                        </div>
                      )}
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-center">
                      <div
                        className={`flex justify-center items-center gap-0.5 rounded-[10px] p-2 ${negative === true ? 'bg-[#FFDEDE] text-red' : 'bg-[#D9F6DA] text-green'} `}
                      >
                        <Iconify icon={negative === true ? 'uil:arrow-down' : 'uil:arrow-up'} />
                        <Typography size="md" className="">
                          {amount || '--'}
                        </Typography>
                      </div>
                    </td>
                  </tr>
                )}
              />
            </div>
          </div>
        </Container>
      </div>
      {isModalOpen && (
        <WithdrawFundModal
          onClose={handleCloseModal}
          values={values}
          errors={errors}
          touched={touched}
          isValid={isValid}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
        />
      )}
      {successModalOpen && (
        <SuccessModal
          isModal
          setIsOpen={() => setSuccessModalOpen(false)}
          title="Withdrawal Success!"
          subTitle="Your withdrawal amount will be transfer after approval by the admin."
          buttonText="Done"
        />
      )}
    </DashboardWrapper>
  );
};

export default Earnings;
