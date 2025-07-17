'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import Iconify from '@/components/shared/iconify';
import SearchInput from '@/components/shared/input-fields/search-bar';
import MenuDropdown from '@/components/shared/menu-dropdown';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';

const TicketsPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsData = content.allTickets;

  const paginatedData = ticketsData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const meta = {
    totalItems: ticketsData.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(ticketsData.length / rowsPerPage),
  };

  const router = useRouter();

  // navigate to single ticket based on dynamic id
  const navigateToTicket = (id: string) => {
    router.push(`/tickets/response/${id}`);
  };

  const menuItmem = (id: string) => [
    {
      id: '1',
      label: 'View Ticket',
      icon: 'mdi:eye',
      onClick: () => navigateToTicket(id),
    },
  ];

  const handleAddTicket = () => {
    router.push('/tickets/add-new-ticket');
  };

  return (
    <DashboardWrapper title="Tickets" subTitle="Create and manage support tickets.">
      <Container styling="shadow-[0px_4px_20px_rgba(0,0,0,0.06)]">
        <div className="w-full flex flex-col custom-1400:flex custom-1400:flex-row justify-between gap-2 p-5 md:px-8">
          <div className="flex sm:flex-row justify-between sm:items-center gap-4 sm:gap-5  flex-col items-end">
            <div className="text-dark-gray w-full sm:w-[ 50%]">
              <SearchInput />
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-end sm:items-center gap-3 sm:gap-7.5">
              <Typography size={'md'} className="text-dark-gray">
                {`Total Tickets: ${meta.totalItems}`}
              </Typography>
              <div className="sm:flex sm:justify-end">
                <Button
                  variant="primary"
                  onClick={handleAddTicket}
                  className="flex justify-center items-center gap-2 !py-2.5 !px-4"
                >
                  <Iconify icon="mdi:plus-box" color="white" width={28} height={28} />
                  <span className="text-center">New Ticket</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DataTable
          paginate
          ColumnsData={content?.columns?.ticketsColumnsData}
          roundedHeader={true}
          tableRows={paginatedData}
          rowsPerPage={rowsPerPage}
          meta={meta}
          notFonudText="No Tickets Added yet"
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          TableBodyRow={({
            id,
            idx,
            ticket_no,
            subject,
            issue_date,
            responses,
            last_updated,
            status,
            issue_time,
            last_updated_time,
          }: any) => {
            return (
              <tr key={id} className="">
                <td className="px-4 lg:px-6 py-3.5 text-start">
                  <Typography size="md">{ticket_no || '--'}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-3.5 text-start">
                  <Typography size="md">{subject || '--'}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-3.5 text-start">
                  <div className="flex flex-col items-start justify-center gap-1">
                    <Typography size="md" className="text-black">
                      {issue_date || '--'}
                    </Typography>
                    <Typography size="sm" className="text-black font-normal ml-3 text-center">
                      {issue_time || '--'}
                    </Typography>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3.5 text-start">
                  <Typography size="md">{responses || '--'}</Typography>
                </td>
                <td className="px-4 lg:px-6 py-3.5 text-start">
                  <div className="flex flex-col items-start justify-center gap-1">
                    <Typography size="md" className="text-black">
                      {last_updated || '--'}
                    </Typography>
                    <Typography size="sm" className="text-black font-normal ml-3 text-center">
                      ({last_updated_time})
                    </Typography>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3.5 text-start">
                  <div
                    className={`max-w-[96px] py-2 px-4 text-center rounded-lg text-nowrap  ${
                      status === 'Active'
                        ? 'bg-[#D9F6DA] text-green'
                        : status === 'Cancelled'
                          ? 'bg-red bg-opacity-20 text-red'
                          : status === 'Closed'
                            ? 'bg-light-gray text-dark-gray'
                            : ''
                    }`}
                  >
                    <Typography size="md">{status || '--'}</Typography>
                  </div>
                </td>
                <td className="px-4 lg:px-6  text-center">
                  <MenuDropdown items={menuItmem(ticket_no)} idx={idx} totalDataLength={paginatedData?.length} />
                </td>
              </tr>
            );
          }}
        />
      </Container>
    </DashboardWrapper>
  );
};

export default TicketsPage;
