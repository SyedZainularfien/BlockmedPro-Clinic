'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Container from '@/components/shared/container';
import CustomCheckboxSelect from '@/components/shared/custom-checkbox-select';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import DateRange from '@/components/shared/date-range';
import SearchInput from '@/components/shared/input-fields/search-bar';
import MenuDropdown from '@/components/shared/menu-dropdown';
import { Typography } from '@/components/shared/typography';
import StatsCard from '@/components/ui/stats-card';
import { content } from '@/data';
import { IDropdownItemType, IPatientsTableProps } from '@/types';

const AllPatients: NextPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [patients, setPatients] = useState<any[]>(content.allPatients);
  const router = useRouter();

  const paginatedData = patients.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const meta = {
    totalItems: patients.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(patients.length / rowsPerPage),
  };
  // const handleRemoveFilter = (label: string) => {
  //   setSelectedFilters((prev) => prev.filter((item) => item !== label));
  // };

  // const clearAllFilters = () => {
  //   setSelectedFilters([]);
  // };

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setPatients(content.allPatients);
    }
  }, [selectedFilters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/patients/patient-details/patient-summary/${id}`);
  };

  const handleFilterDoctor = (selectedOptions: string[]) => {
    setSelectedFilters(selectedOptions);
    if (selectedOptions.length === 0) {
      setPatients(content.allPatients);
    } else {
      const filteredPatients = content.allPatients.filter((patient) =>
        selectedOptions.includes(patient.assignedDoc.name)
      );
      setPatients(filteredPatients);
    }
  };

  const dropdownOptions = (id: string): IDropdownItemType[] => [
    {
      id: '1',
      variant: 'primary',
      label: 'View Prescription',
      icon: 'mdi:clipboard-vitals',
    },
    {
      id: '2',
      variant: 'primary',
      icon: 'mdi:edit-box',
      label: 'View Reciept',
    },
    {
      id: '3',
      variant: 'primary',
      label: 'View Details',
      icon: 'fluent:person-clock-24-filled',
      onClick: () => handleViewDetails(id),
    },
  ];

  return (
    <DashboardWrapper title="Patients" subTitle="View & Manage Patients">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {content?.patientsStatsCardData?.map((data, index) => (
            <Container hasBorders bottomBorder borderBottomColor={data.iconColor} key={index}>
              <StatsCard
                isSvg
                valueFontSize="h4"
                title={data.title}
                value={data.value}
                percentage={data.percentage}
                icon={data.icon}
                negative={data.negative}
                iconColor={data.iconColor}
                iconBgColor={data.iconBgColor}
              />
            </Container>
          ))}
        </div>

        <Container styling="py-3 px-4 sm:py-4 sm:px-5">
          <div className=" w-full flex flex-col gap-2">
            <div className="w-full grid grid-cols-1 md:flex md:justify-between gap-2 md:items-center md:flex-wrap text-wrap">
              <SearchInput />
              <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-5">
                <div className="w-full sm:w-fit">
                  <CustomCheckboxSelect
                    title={'Search by Doctor'}
                    options={content.filterOptions.doctors}
                    selectedFilters={selectedFilters}
                    onApply={handleFilterDoctor}
                  />
                </div>
                <div className="w-full">
                  <DateRange data={content.allPatients} filterKey={'date'} onFilter={setPatients} />
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container hasBorders>
          {/* Header with tabs */}
          <div className="gap-4 px-6 py-4.5 sm:px-7.5 sm:py-5.5 border-b border-light-gray">
            <Typography size={'lg'} className="text-black font-semibold">
              All Patients
            </Typography>
          </div>
          {/* Data Table */}
          <DataTable
            tableRows={paginatedData}
            ColumnsData={content?.columns?.allPatientsColumnData}
            TableBodyRow={({
              _id,
              idx,
              name,
              date,
              time,
              gender,
              status,
              specialty,
              patientId,
              appointmentType,
            }: IPatientsTableProps) => (
              <tr
                style={{
                  backgroundColor: idx % 2 === 0 ? 'rgba(237, 237, 237, 0.8)' : 'rgba(237, 237, 237, 0.2)',
                  textWrap: 'nowrap',
                }}
                key={_id}
              >
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
                    <span
                      className={`px-3 py-2 rounded-lg ${
                        appointmentType.toLowerCase().includes('remote')
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {appointmentType || '--'}
                    </span>
                  </Typography>
                </td>
                <td className="px-4 sm:px-6 py-3.5 text-start">
                  <Typography size={'md'} className="text-dark-gray font-normal">
                    <span
                      className={`px-4 py-2 rounded-lg ${
                        status.toLowerCase() === 'arrived'
                          ? 'bg-[#FFF6DC] text-[#FFC300]'
                          : status.toLowerCase() === 'upcoming'
                            ? 'bg-[#CCECF9] text-[#02A1E0]'
                            : status.toLowerCase() === 'consulting'
                              ? 'bg-[#D9F6DA] text-[#098B0D]'
                              : status.toLowerCase() === 'completed'
                                ? 'bg-[#E3EAFF] text-[#003CFF]'
                                : status.toLowerCase() === 'cancelled'
                                  ? 'bg-[#F6E7E4] text-[#C9311A]'
                                  : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {status || '--'}
                    </span>
                  </Typography>
                </td>
                <td className="text-center px-4 lg:px-6 py-3.5">
                  <MenuDropdown
                    items={dropdownOptions(patientId)}
                    idx={idx}
                    totalDataLength={paginatedData?.length}
                    reduceValue={4}
                  />
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
        </Container>
      </div>
    </DashboardWrapper>
  );
};

export default AllPatients;
