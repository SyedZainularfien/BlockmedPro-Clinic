'use client';

import React, { FC, useState } from 'react';

import Container from '@/components/shared/container';
import DataTable from '@/components/shared/data-table';
import MenuDropdown from '@/components/shared/menu-dropdown';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { AppointmentsTableProps } from '@/types';

const SingleDoctorAppointmentTab: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [appointments] = useState<any[]>(content.appointmentsDiary);

  const paginatedData = appointments.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const meta = {
    totalItems: appointments.length,
    itemsPerPage: rowsPerPage,
    currentPage: currentPage,
    totalPages: Math.ceil(appointments.length / rowsPerPage),
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'arrived':
        return 'bg-yellow-100 text-yellow-600';
      case 'upcoming':
        return 'bg-blue-100 text-blue-600';
      case 'consulting':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getAppointmentTypeClass = (type: string) => {
    return type.toLowerCase().includes('remote') ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600';
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const dropdownItems = (id: string) => [
    {
      id: '1',
      label: 'View Details',
      icon: 'eva:eye-fill',
      onClick: () => console.log(`View details for appointment ID: ${id}`),
    },
  ];

  return (
    <Container>
      <div className="py-5">
        <DataTable
          tableRows={paginatedData}
          ColumnsData={content?.columns?.doctorsTabColumnsData}
          TableBodyRow={({
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
                <Typography size={'md'} className="text-dark-gray font-normal">
                  {appointNo || '--'}
                </Typography>
              </td>
              <td className="px-4 sm:px-6 py-3.5 text-start">
                <Typography size={'md'} className="text-dark-gray font-normal">
                  {name || '--'}
                </Typography>
              </td>
              <td className="px-4 sm:px-6 py-3.5 text-start">
                <Typography size={'md'} className="text-dark-gray font-normal">
                  {gender || '--'}
                </Typography>
              </td>
              <td className="px-4 sm:px-6 py-3.5 text-start">
                <Typography size={'md'} className="text-dark-gray font-normal">
                  {patientId || '--'}
                </Typography>
              </td>
              <td className="px-4 sm:px-6 py-3.5 text-start">
                <Typography size={'md'} className="text-dark-gray font-normal">
                  {date || '--'}
                </Typography>
              </td>
              <td className="px-4 sm:px-6 py-3.5 text-start">
                <Typography size={'md'} className="text-dark-gray font-normal">
                  {time || '--'}
                </Typography>
              </td>
              <td className="px-4 sm:px-6 py-3.5 text-start">
                <Typography size={'md'} className="text-dark-gray font-normal">
                  {specialty || '--'}
                </Typography>
              </td>
              <td className="px-4 sm:px-6 py-3.5 text-start">
                <Typography size={'md'} className="text-dark-gray font-normal">
                  <span className={`px-3 py-2 rounded-lg ${getAppointmentTypeClass(appointmentType)}`}>
                    {appointmentType || '--'}
                  </span>
                </Typography>
              </td>
              <td className="px-4 sm:px-6 py-3.5 text-start">
                <Typography size={'md'} className="text-dark-gray font-normal">
                  <span className={`px-4 py-2 rounded-lg ${getStatusClass(status)}`}>{status || '--'}</span>
                </Typography>
              </td>
              <td className="text-center px-4 lg:px-6 py-3.5">
                <MenuDropdown items={dropdownItems(_id)} idx={idx} totalDataLength={paginatedData?.length} />
              </td>
            </tr>
          )}
          headerColor="bg-white"
          headerClassName="text-gray-700"
          paginate={true}
          meta={meta}
          setCurrentPage={handlePageChange}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </Container>
  );
};

export default SingleDoctorAppointmentTab;
