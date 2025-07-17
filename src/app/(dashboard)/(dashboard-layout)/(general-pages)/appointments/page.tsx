'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import CustomCheckboxSelect from '@/components/shared/custom-checkbox-select';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import DateRange from '@/components/shared/date-range';
import FilterButtons from '@/components/shared/filter-buttons';
import Iconify from '@/components/shared/iconify';
import SearchInput from '@/components/shared/input-fields/search-bar';
import MenuDropdown from '@/components/shared/menu-dropdown';
import Tabs from '@/components/shared/tabs';
import { Typography } from '@/components/shared/typography';
import StatsCard from '@/components/ui/stats-card';
import { content } from '@/data';
import { AppointmentsTableProps } from '@/types';

// Constants
const FILTERS = ['all', 'upcoming', 'arrived', 'consulting'];
const TABS = [
  { title: 'Appointment Diary', id: 1 },
  { title: 'Completed', id: 2 },
  { title: 'Cancelled', id: 3 },
];

const DEFAULT_ROWS_PER_PAGE = 10;
const INITIAL_PAGE = 1;

type FilterType = (typeof FILTERS)[number];
type TabId = (typeof TABS)[number]['id'];

interface AppointmentFilters {
  activeFilter: FilterType;
  selectedFilters: string[];
  currentPage: number;
  rowsPerPage: number;
}

const useAppointmentData = (activeTab: TabId) => {
  return useMemo(() => {
    const dataMap = {
      1: content.appointmentsDiary,
      2: content.completedAppointments,
      3: content.cancelledAppointments,
    } as const;

    return dataMap[activeTab as keyof typeof dataMap] || [];
  }, [activeTab]);
};

const useFilteredAppointments = (appointments: any[], filters: AppointmentFilters) => {
  return useMemo(() => {
    const { activeFilter, selectedFilters } = filters;

    // Apply status filter
    const statusFiltered =
      activeFilter === 'all' ? appointments : appointments.filter((apt) => apt.status.toLowerCase() === activeFilter);

    // Apply search/custom filters
    if (selectedFilters.length === 0) {
      return statusFiltered;
    }

    return statusFiltered.filter((appointment) => {
      const searchableFields = [
        appointment.appointNo,
        appointment.name,
        appointment.gender,
        appointment.patientId,
        appointment.date,
        appointment.time,
        appointment.specialty,
        appointment.appointmentType,
        appointment.assignedDoc?.name ?? '',
        appointment.status,
      ];

      return selectedFilters.some((filter) =>
        searchableFields.some((field) => field.toString().toLowerCase().includes(filter.toLowerCase()))
      );
    });
  }, [appointments, filters]);
};

const usePaginatedData = (data: any[], currentPage: number, rowsPerPage: number) => {
  return useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return {
      paginatedData: data.slice(startIndex, endIndex),
      meta: {
        totalItems: data.length,
        itemsPerPage: rowsPerPage,
        currentPage,
        totalPages: Math.ceil(data.length / rowsPerPage),
      },
    };
  }, [data, currentPage, rowsPerPage]);
};

// Utility functions
const getStatusStyles = (status: string) => {
  const statusMap = {
    arrived: 'bg-[#FFF6DC] text-[#FFC300]',
    upcoming: 'bg-[#CCECF9] text-[#02A1E0]',
    consulting: 'bg-[#D9F6DA] text-[#098B0D]',
    completed: 'bg-[#E3EAFF] text-[#003CFF]',
    cancelled: 'bg-[#F6E7E4] text-[#C9311A]',
  } as const;

  return statusMap[status.toLowerCase() as keyof typeof statusMap] || 'bg-gray-100 text-gray-600';
};

const getAppointmentTypeStyles = (appointmentType: string) => {
  return appointmentType.toLowerCase().includes('remote') ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600';
};

const Appointments: NextPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState<TabId>(1);
  const [filters, setFilters] = useState<AppointmentFilters>({
    activeFilter: 'all',
    selectedFilters: [],
    currentPage: INITIAL_PAGE,
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
  });

  const router = useRouter();

  // Custom hooks
  const appointments = useAppointmentData(activeTab);
  const filteredAppointments = useFilteredAppointments(appointments, filters);
  const { paginatedData, meta } = usePaginatedData(filteredAppointments, filters.currentPage, filters.rowsPerPage);

  const statsCards = useMemo(() => content.appointmentsStatsCardData.slice(0, 3), []);

  // Event handlers
  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setFilters((prev) => ({ ...prev, currentPage: INITIAL_PAGE }));
    localStorage.setItem('transactionTabs', tab.toString());
  }, []);

  const handleFilterChange = useCallback((filterType: keyof AppointmentFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
      ...(filterType !== 'currentPage' && { currentPage: INITIAL_PAGE }), // Reset page when filters change
    }));
  }, []);

  const handleFilterApply = useCallback(
    (selected: string[]) => {
      const newFilters = selected.filter((item) => !filters.selectedFilters.includes(item));
      const labels = newFilters
        ?.map(
          (value) =>
            Object.values(content.filterOptions)
              .flat()
              .find((option) => option.value === value)?.label
        )
        .filter((label): label is string => label !== undefined);

      handleFilterChange('selectedFilters', [...filters.selectedFilters, ...labels]);
    },
    [filters.selectedFilters, handleFilterChange]
  );

  const handleRemoveFilter = useCallback(
    (label: string) => {
      const updatedFilters = filters.selectedFilters.filter((item) => item !== label);
      handleFilterChange('selectedFilters', updatedFilters);
    },
    [filters.selectedFilters, handleFilterChange]
  );

  const clearAllFilters = useCallback(() => {
    handleFilterChange('selectedFilters', []);
  }, [handleFilterChange]);

  // Navigation handlers
  const handleEditAppointment = useCallback(
    (id: string) => {
      router.push(`/appointments/edit-appointment/${id}`);
    },
    [router]
  );

  const handleViewAppointmentDetails = useCallback(
    (id: string) => {
      router.push(`/appointments/appointment-details/${id}`);
    },
    [router]
  );

  const handleBookAppointment = useCallback(() => {
    router.push('/appointments/book-appointment');
  }, [router]);

  // Menu options factories
  const createMenuOptions = useCallback(
    (status: string, id: string) => {
      const baseOptions = {
        arrived: [
          { id: '1', label: 'Get Vitals', icon: 'mdi:clipboard-vitals', variant: 'primary' as const },
          {
            id: '2',
            label: 'Edit Appointments',
            icon: 'mdi:edit-box',
            onClick: () => handleEditAppointment(id),
            variant: 'primary' as const,
          },
          {
            id: '3',
            label: 'View Details',
            icon: 'fluent:person-clock-24-filled',
            onClick: () => handleViewAppointmentDetails(id),
            variant: 'primary' as const,
          },
          { id: '4', label: 'Cancel Appointment', icon: 'fa6-solid:calendar-xmark', variant: 'secondary' as const },
        ],
        upcoming: [
          { id: '1', label: 'Mark As Arrived', icon: 'fluent:person-available-20-filled', variant: 'primary' as const },
          {
            id: '2',
            label: 'Edit Appointment',
            icon: 'mdi:edit-box',
            onClick: () => handleEditAppointment(id),
            variant: 'primary' as const,
          },
          { id: '3', label: 'Cancel Appointment', icon: 'fa6-solid:calendar-xmark', variant: 'secondary' as const },
        ],
        consulting: [
          {
            id: '1',
            label: 'Back To Arrived',
            icon: 'fluent:person-available-20-filled',
            variant: 'secondary' as const,
          },
        ],
        completed: [
          { id: '1', label: 'Book Appointment', icon: 'fluent:person-clock-24-filled', onClick: handleBookAppointment },
        ],
      };

      return baseOptions[status.toLowerCase() as keyof typeof baseOptions] || [];
    },
    [handleEditAppointment, handleViewAppointmentDetails, handleBookAppointment]
  );

  // Table row component
  const TableRow = useCallback(
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
      assignedDoc,
      appointmentType,
    }: AppointmentsTableProps) => (
      <tr
        style={{
          backgroundColor: idx % 2 === 0 ? 'rgba(237, 237, 237, 0.8)' : 'rgba(237, 237, 237, 0.2)',
          textWrap: 'nowrap',
        }}
        key={_id}
      >
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {appointNo || '--'}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {name}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {gender}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {patientId}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {date}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {time}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            {specialty}
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            <span className={`px-3 py-2 rounded-lg ${getAppointmentTypeStyles(appointmentType)}`}>
              {appointmentType}
            </span>
          </Typography>
        </td>
        <td className="px-4 sm:px-6 py-3.5 text-start">
          <>
            {assignedDoc ? (
              <span className="flex justify-start gap-2.5 items-center">
                <Image src={assignedDoc.img} alt="doc-image" width={20} height={20} />
                <Typography>{assignedDoc.name}</Typography>
              </span>
            ) : (
              '--'
            )}
          </>
        </td>
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <Typography size="md" className="text-dark-gray font-normal">
            <span className={`px-4 py-2 rounded-lg ${getStatusStyles(status)}`}>{status}</span>
          </Typography>
        </td>
        <td className="text-center px-4 lg:px-6 py-2.5">
          {status !== 'Cancelled' && (
            <MenuDropdown
              items={createMenuOptions(status, patientId)}
              idx={idx}
              totalDataLength={paginatedData?.length}
              reduceValue={4}
            />
          )}
        </td>
      </tr>
    ),
    [createMenuOptions]
  );

  return (
    <DashboardWrapper title="Appointments" subTitle="View & Manage Your Appointments">
      <div className="flex flex-col gap-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {statsCards?.map((data, index) => (
            <Container hasBorders bottomBorder borderBottomColor={data.iconColor} key={index}>
              <StatsCard
                isSvg
                icon={data.icon}
                title={data.title}
                value={data.value}
                valueFontSize="h4"
                negative={data.negative}
                iconColor={data.iconColor}
                percentage={data.percentage}
                iconBgColor={data.iconBgColor}
              />
            </Container>
          ))}
        </div>

        {/* Today's Date */}
        <Container hasBorders>
          <div className="px-7.5 py-5 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center items-start">
            <div className="flex justify-center items-center gap-1">
              <Iconify icon="uil:calender" size={18} className="text-dark-gray" />
              <Typography size="lg" className="text-dark-gray font-medium">
                Today&apos;s Date
              </Typography>
            </div>
            <Typography size="lg" className="text-dark-gray font-medium">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </div>
        </Container>

        {/* Filters */}
        <Container hasBorders styling="py-5 px-7">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full grid grid-cols-1 md:flex md:justify-start gap-2 md:items-center md:flex-wrap">
              <CustomCheckboxSelect
                position="left-0"
                title="Gender"
                options={content.filterOptions.gender}
                selectedFilters={filters.selectedFilters}
                onApply={handleFilterApply}
              />
              <CustomCheckboxSelect
                title="Specialty"
                options={content.filterOptions.speciality}
                selectedFilters={filters.selectedFilters}
                onApply={handleFilterApply}
              />
              <CustomCheckboxSelect
                title="Search by Doctor"
                options={content.filterOptions.doctors}
                selectedFilters={filters.selectedFilters}
                onApply={handleFilterApply}
              />
              <CustomCheckboxSelect
                title="Appointment Type"
                options={content.filterOptions.appointmentType}
                selectedFilters={filters.selectedFilters}
                onApply={handleFilterApply}
              />
              <DateRange
                data={appointments}
                filterKey="date"
                onFilter={(data) => handleFilterChange('selectedFilters', data)}
              />
            </div>

            {/* Active Filters */}
            <div className="flex flex-col lg:flex-row gap-2">
              {filters?.selectedFilters.length > 0 && (
                <div className="py-3 px-4 flex flex-wrap gap-2 border border-dotted rounded-lg border-light-gray lg:max-w-[80%]">
                  {filters.selectedFilters?.map((filter) => (
                    <div
                      key={filter}
                      className="flex gap-2 items-center bg-light-gray text-black px-3 py-1 rounded-md shadow-sm"
                    >
                      <Typography size="md" className="font-semibold text-dark-charcoal">
                        {filter}
                      </Typography>
                      <Iconify
                        width="16px"
                        icon="fontisto:close"
                        className="text-dark-gray cursor-pointer"
                        onClick={() => handleRemoveFilter(filter)}
                      />
                    </div>
                  ))}
                </div>
              )}
              {filters.selectedFilters.length > 0 && (
                <div className="flex justify-start items-start relative lg:top-4">
                  <button onClick={clearAllFilters} className="text-red flex gap-2 items-center cursor-pointer">
                    <Iconify icon="fluent:delete-48-filled" />
                    <Typography size="md" className="font-semibold">
                      Clear Filters
                    </Typography>
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>

        {/* Main Content */}
        <Container hasBorders styling="">
          {/* Header with tabs */}
          <div className="flex flex-col gap-4 px-4 pt-5 sm:flex-row sm:justify-between sm:items-center">
            <div className="overflow-x-auto w-full">
              <Tabs tabs={TABS} activeTab={activeTab} setActiveTab={handleTabChange} />
            </div>
            <Button className="min-w-max mt-2 sm:mt-0" onClick={handleBookAppointment}>
              Book Appointment
            </Button>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 xl:gap-0 mb-6 px-4 xl:px-7.5 py-4 xl:py-5 border-b border-t border-light-gray">
            <div className="w-full md:w-1/3">
              <SearchInput />
            </div>
            {activeTab === 1 && (
              <FilterButtons
                filters={FILTERS}
                activeFilter={filters.activeFilter}
                setActiveFilter={(filter) => handleFilterChange('activeFilter', filter)}
              />
            )}
          </div>

          {/* Data Table */}
          <DataTable
            tableRows={paginatedData}
            ColumnsData={content?.columns?.appointmentsColumnsData}
            TableBodyRow={TableRow}
            headerColor="bg-white"
            headerClassName="text-gray-700"
            paginate={true}
            meta={meta}
            setCurrentPage={(page) => handleFilterChange('currentPage', page)}
            setRowsPerPage={(rows) => handleFilterChange('rowsPerPage', rows)}
          />
        </Container>
      </div>
    </DashboardWrapper>
  );
};

export default Appointments;
