'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Container from '@/components/shared/container';
import CustomCheckboxSelect from '@/components/shared/custom-checkbox-select';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import DateRange from '@/components/shared/date-range';
import Iconify from '@/components/shared/iconify';
import SearchInput from '@/components/shared/input-fields/search-bar';
import MenuDropdown from '@/components/shared/menu-dropdown';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { IDropdownItemType, TransactionsTableProps } from '@/types';

const Transactions: NextPage = () => {
  const [transactions] = useState(content.transactionsData);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(content.transactionsData);

  const router = useRouter();

  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterData = (data: typeof content.transactionsData, filters: string[]) => {
    return data.filter((transaction) => {
      if (filters.length === 0 || filters.includes('all')) return true;

      return filters.some((filter) => transaction.activity.toLowerCase() === filter.toLowerCase());
    });
  };

  const handleFilterChange = (newFilters: string[]) => {
    setSelectedFilters(newFilters);
    setCurrentPage(1);
    setFilteredData(filterData(content.transactionsData, newFilters));
  };

  const dropdownItems = (id: string): IDropdownItemType[] => [
    {
      id: '1',
      label: 'View Reciept',
      icon: 'lets-icons:print-light',
      onClick: () => router.push(`/transactions/transaction-invoice/${id}`),
      variant: 'primary',
    },
  ];

  return (
    <DashboardWrapper title="Transactions" subTitle="All Transactions History">
      <Container>
        <div className="flex flex-col gap-5 py-4 px-5">
          <div className="flex flex-col sm:flex-row gap-5 justify-center sm:justify-between items-start sm:items-center">
            <SearchInput />
            <div className="w-full flex flex-col sm:flex-row justify-end items-center gap-5">
              <div className="w-full sm:w-fit">
                <DateRange data={content?.transactionsData} filterKey={'date'} onFilter={setFilteredData} />
              </div>
              <div className="w-full sm:w-fit">
                <CustomCheckboxSelect
                  title={'Activity'}
                  options={content.filterOptions.activity}
                  selectedFilters={selectedFilters}
                  onApply={handleFilterChange}
                />
              </div>
            </div>
          </div>
          <DataTable
            paginate
            roundedHeader
            ColumnsData={content?.columns?.transactionsColumns}
            tableRows={paginatedData}
            rowsPerPage={rowsPerPage}
            meta={{
              totalItems: transactions.length,
              itemsPerPage: rowsPerPage,
              currentPage,
              totalPages: Math.ceil(transactions.length / rowsPerPage),
            }}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            notFonudText="No Transactions Available"
            TableBodyRow={({
              _id,
              idx,
              doctorName,
              transactionId,
              activity,
              paymentMethod,
              patientName,
              patientId,
              date,
              time,
              amount,
              negative,
            }: TransactionsTableProps) => (
              <tr key={_id} className="text-nowrap">
                <td className="px-4 lg:px-6 py-3 text-start break-words">
                  <Typography size="md" className="text-black">
                    {doctorName || '--'}
                  </Typography>
                </td>
                <td className="px-4 lg:px-6 py-3 text-start">
                  <Typography size="md">{transactionId || '--'}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-3 text-start">
                  <Typography size="md">{activity || '--'}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-3 text-start">
                  <Typography size="md">{paymentMethod || '--'}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-3 text-start">
                  <Typography size="md">{patientName || '--'}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-3 text-start">
                  <Typography size="md">{patientId || '--'}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-3 text-start">
                  <div className="flex flex-col items-start justify-center gap-1">
                    <Typography size="md" className="text-black">
                      {date || '--'}
                    </Typography>
                    <Typography size="sm" className="text-black font-normal text-center">
                      {time || '--'}
                    </Typography>
                  </div>
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
                <td className="text-center px- 3 lg:px-6 py-4 relative">
                  <MenuDropdown items={dropdownItems(_id)} idx={idx} totalDataLength={paginatedData?.length} />
                </td>
              </tr>
            )}
          />
        </div>
      </Container>
    </DashboardWrapper>
  );
};

export default Transactions;
