'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import Container from '@/components/shared/container';
import Modal from '@/components/shared/custom-modal';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import DateRange from '@/components/shared/date-range';
import SearchInput from '@/components/shared/input-fields/search-bar';
import MenuDropdown from '@/components/shared/menu-dropdown';
import Tabs from '@/components/shared/tabs';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { AppointmentsTableProps, IDropdownItemType } from '@/types';

const DoctorAppointments = () => {
  const router = useRouter();
  const { upcoming, arrivedPatients, attended, cancelledAppointments } = content?.doctorsDashbaord?.allAppointments;
  const { general, cancelled } = content?.columns?.allAppointmentsColumnsData;

  // State management
  const [open, setOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // Memoized tabs configuration
  const tabs: any[] = useMemo(
    () => [
      { title: 'Upcoming', id: 1, data: upcoming, columns: general },
      { title: 'Arrived Patients', id: 2, data: arrivedPatients, columns: general },
      { title: 'Attended', id: 3, data: attended, columns: general },
      { title: 'Cancelled', id: 4, data: cancelledAppointments, columns: cancelled },
    ],
    [upcoming, arrivedPatients, attended, cancelledAppointments, general, cancelled]
  );

  const currentTab = useMemo(() => tabs.find((tab) => tab.id === activeTab) || tabs[0], [tabs, activeTab]);

  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return (currentTab?.data ?? []).slice(startIndex, startIndex + rowsPerPage);
  }, [currentTab?.data, currentPage, rowsPerPage]);

  const meta = {
    currentPage: currentPage,
    itemsPerPage: rowsPerPage,
    totalItems: currentTab?.data?.length,
    totalPages: Math.ceil(currentTab?.data?.length / rowsPerPage),
  };

  // Handlers
  const handleTabChange = useCallback((tab: number) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
    localStorage.setItem('transactionTabs', tab.toString());
  }, []);

  const handleViewDetails = useCallback(
    (id: string) => {
      router.push(`/patients/patient-details/patient-summary/${id}`);
    },
    [router]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleOpenCancelModal = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleCancelAppointment = useCallback(() => {
    setOpen(false);
  }, []);

  // Memoized dropdown options generator
  const getDropdownOptions = useCallback(
    (id: string): IDropdownItemType[] => [
      {
        id: '1',
        variant: 'primary',
        label: 'Get Vitals',
        icon: 'mdi:clipboard-vitals',
        onClick: () => handleViewDetails(id),
      },
      {
        id: '2',
        variant: 'secondary',
        label: 'Cancel Appointment',
        icon: 'fa6-solid:calendar-xmark',
        onClick: () => handleOpenCancelModal(),
      },
    ],
    [handleViewDetails, handleOpenCancelModal]
  );

  // Table row component
  const renderTableRow = useCallback(
    ({
      _id,
      idx,
      name,
      date,
      time,
      gender,
      status,
      appointNo,
      specialty,
      patientId,
      appointmentType,
    }: AppointmentsTableProps) => (
      <tr
        style={{
          backgroundColor: idx % 2 === 0 ? 'rgba(237, 237, 237, 0.8)' : 'rgba(237, 237, 237, 0.2)',
          textWrap: 'nowrap',
        }}
        key={_id}
      >
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {appointNo || '--'}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {name || '--'}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {gender || '--'}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {patientId || '--'}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {date || '--'}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {time || '--'}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {specialty || '--'}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            <span
              className={`px-3 py-2 rounded-lg ${
                appointmentType.toLowerCase().includes('remote')
                  ? 'bg-blue-100 text-blue-600'
                  : appointmentType.toLowerCase().includes('face to face')
                    ? 'bg-green-100 text-green-600'
                    : ''
              }`}
            >
              {appointmentType || '--'}
            </span>
          </Typography>
        </td>
        {status && (
          <td className={`px-4 sm:px-6 text-start ${status === 'Cancelled' ? 'py-[14.5px]' : 'py-3.5'}`}>
            <Typography size="md" className="text-dark-gray font-normal">
              <span className="px-4 py-2 rounded-lg bg-[#FAEAE8] text-[#C9311A]">{status || '--'}</span>
            </Typography>
          </td>
        )}
        {status !== 'Cancelled' && (
          <td className="text-center px-4 lg:px-6 py-3.5">
            <MenuDropdown
              items={getDropdownOptions(patientId)}
              idx={idx}
              totalDataLength={paginatedAppointments?.length}
              reduceValue={2}
            />
          </td>
        )}
      </tr>
    ),
    [getDropdownOptions]
  );

  return (
    <>
      <DashboardWrapper title="Appointments" subTitle="View & Manage Your Appointments Seamlessly">
        <div className="flex flex-col gap-5">
          <Container hasBorders>
            <div className="px-5 py-4 flex flex-col gap-3 sm:flex-row justify-center sm:justify-between items-center">
              <SearchInput />
              <div className="w-full sm:w-fit">
                <DateRange data={currentTab?.data ?? []} filterKey="date" />
              </div>
            </div>
          </Container>

          <Container hasBorders styling="">
            <div className="flex px-4 pt-5 justify-start items-center border-b border-light-gray">
              <div className="overflow-x-auto w-full">
                <Tabs
                  activeTab={activeTab}
                  setActiveTab={handleTabChange}
                  tabs={tabs?.map(({ title, id }) => ({ title, id }))}
                />
              </div>
            </div>

            <DataTable
              paginate={true}
              headerColor="bg-white"
              headerClassName="text-black"
              TableBodyRow={renderTableRow}
              setRowsPerPage={setRowsPerPage}
              meta={meta}
              tableRows={paginatedAppointments}
              setCurrentPage={handlePageChange}
              ColumnsData={currentTab?.columns || []}
            />
          </Container>
        </div>
      </DashboardWrapper>
      {open && (
        <Modal
          titleStyling="!text-left"
          messageStyling="!text-left"
          title={'Cancel Appointment'}
          confirmButtonText="Yes, Cancel"
          cancelButtonText="Don't Cancel"
          onClose={() => setOpen(false)}
          onConfirm={handleCancelAppointment}
          message="Are you sure you want to cancel this appointment?"
        />
      )}
    </>
  );
};

export default DoctorAppointments;
