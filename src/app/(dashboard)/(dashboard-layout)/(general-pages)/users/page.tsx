'use client';

import { NextPage } from 'next';
import React, { useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import CustomCheckboxSelect from '@/components/shared/custom-checkbox-select';
import Modal from '@/components/shared/custom-modal';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import Iconify from '@/components/shared/iconify';
import SearchInput from '@/components/shared/input-fields/search-bar';
import MenuDropdown from '@/components/shared/menu-dropdown';
import { Typography } from '@/components/shared/typography';
import AddNewUserModal from '@/components/ui/modals/add-user-modal';
import EditUserRole from '@/components/ui/modals/edit-user-role-modal';
import { content } from '@/data';
import { IDropdownItemType } from '@/types';

const Users: NextPage = () => {
  const [users] = useState(content.usersData);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(users);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterData = (data: typeof users, filters: string[]) => {
    return data.filter((user) => {
      if (filters.length === 0 || filters.includes('all')) return true;

      return filters.some((filter) => user.role.toLowerCase() === filter.toLowerCase());
    });
  };

  const editModalOptions = [
    { value: 'doctor', label: 'Doctor' },
    { value: 'compoundedMedications', label: 'Compounded Medications' },
    { value: 'trackingInventory', label: 'Tracking Inventory' },
    { value: 'pharmacyTechnician/ACT', label: 'Pharmacy Technician/ACT' },
  ];

  const handleFilterChange = (newFilters: string[]) => {
    setSelectedFilters(newFilters);
    setCurrentPage(1);
    setFilteredData(filterData(users, newFilters));
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const dropdownOptions: IDropdownItemType[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: 'mdi:edit-box',
      onClick: handleEditModalOpen,
      variant: 'primary',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'material-symbols:delete-rounded',
      onClick: handleDeleteModalOpen,
      variant: 'secondary',
    },
  ];

  return (
    <>
      <DashboardWrapper title="Users" subTitle="Users Detail">
        <Container>
          <div className="px-5 py-4">
            <div className="flex flex-col gap-4">
              <div className="w-full flex flex-col lg:flex-row justify-center items-start lg:items-center gap-5">
                <div className="w-full flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <SearchInput />
                  <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-end items-start sm:items-center gap-5">
                    <div className="flex justify-center items-center gap-1">
                      <Typography size={'md'} className="text-dark-gray">
                        Total Users:
                      </Typography>
                      <Typography size={'md'} className="text-dark-gray">
                        {filteredData.length}
                      </Typography>
                    </div>
                    <div className="w-full sm:w-auto">
                      <CustomCheckboxSelect
                        title={'Role'}
                        onApply={handleFilterChange}
                        selectedFilters={selectedFilters}
                        options={content.filterOptions.role}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-auto flex justify-end items-center">
                  <Button
                    onClick={handleAddModalOpen}
                    variant="primary"
                    className="flex w-full sm:w-auto justify-center items-center gap-2 text-nowrap"
                  >
                    <span className="text-center">Add New User</span>
                    <Iconify icon="mdi:add" color="white" />
                  </Button>
                </div>
              </div>
              <DataTable
                paginate
                roundedHeader
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setCurrentPage={setCurrentPage}
                ColumnsData={content?.columns?.usersColumns}
                meta={{
                  totalItems: filteredData.length,
                  itemsPerPage: rowsPerPage,
                  currentPage: currentPage,
                  totalPages: Math.ceil(filteredData.length / rowsPerPage),
                }}
                tableRows={paginatedData}
                notFonudText="No User Added"
                TableBodyRow={(row: any) => (
                  <tr key={row._id} className="bg-white">
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <Typography size="md">{row.userName || '--'}</Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <Typography size="md">{row.emailAddress || '--'}</Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <Typography size="md">{row.role || '--'}</Typography>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <div className="flex flex-col items-center gap-1">
                        <Typography size="md" className="text-black">
                          {row.joinedDate || '--'}
                        </Typography>
                        <Typography size="sm" className="text-dark-gray font-normal text-center">
                          {row.joinedTime || '--'}
                        </Typography>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <div className="flex flex-col items-center gap-1">
                        <Typography size="md" className="text-black">
                          {row.lastLogin || '--'}
                        </Typography>
                        <Typography size="sm" className="text-dark-gray font-normal text-center">
                          {row.lastLoginTime || '--'}
                        </Typography>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-center">
                      <div
                        className={`flex justify-center items-center rounded-[10px] p-2 ${row.status === 'Inactive' ? 'bg-light-gray text-dark-gray' : 'bg-[#D9F6DA] text-green'} `}
                      >
                        <Iconify
                          icon="mdi:dot"
                          size={24}
                          className={`${row.status === 'Active' ? 'block' : 'hidden'}`}
                        />
                        <Typography size="md" className="">
                          {row.status || '--'}
                        </Typography>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 text-start">
                      <MenuDropdown
                        items={dropdownOptions}
                        idx={row.idx}
                        totalDataLength={paginatedData?.length}
                        reduceValue={2}
                      />
                    </td>
                  </tr>
                )}
              />
            </div>
          </div>
        </Container>
      </DashboardWrapper>
      {isAddModalOpen && <AddNewUserModal onClose={() => setIsAddModalOpen(false)} />}
      {isDeleteModalOpen && (
        <Modal
          title="Delete"
          confirmButtonText="Delete"
          onClose={handleDeleteModalClose}
          message="Are you sure you want to delete this user?"
        />
      )}
      {isEditModalOpen && <EditUserRole onClose={handleEditModalClose} options={editModalOptions} />}
    </>
  );
};

export default Users;
