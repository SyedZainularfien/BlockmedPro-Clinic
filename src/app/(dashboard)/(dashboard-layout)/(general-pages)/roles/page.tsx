'use client';

import Image from 'next/image';
import React, { FC, useState } from 'react';

import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/custom-modal';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import AddRoleModal from '@/components/ui/modals/add-role-modal';
import RoleCard from '@/components/ui/role-card';
import { content } from '@/data';
import { Permission, Role } from '@/types';

const defaultPermissions: Permission[] = content?.rolesDefaultPermissions;

const initialRoles: Role[] = [
  { id: 1, title: 'Doctor', permissions: [...defaultPermissions] },
  { id: 2, title: 'Compounded Medications', permissions: [...defaultPermissions] },
  { id: 3, title: 'Tracking Inventory', permissions: [...defaultPermissions] },
  { id: 4, title: 'Pharmacy Technician/ACT', permissions: [...defaultPermissions] },
];

const Roles: FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  const handleDeleteRole = (roleId: number) => {
    setSelectedRoleId(roleId);
    setIsDeleteOpen(true);
  };

  const handleConfirm = (roleId: number): void => {
    setRoles(roles.filter((role) => role.id !== roleId));
    setIsDeleteOpen(false);
  };

  const handleAddRole = () => {
    setIsAddOpen(true);
  };

  const handleConfirmAddRole = (roleTitle: string, permissions: Permission[]): void => {
    const newRole: Role = {
      id: Date.now(),
      title: roleTitle,
      permissions,
    };
    setRoles([...roles, newRole]);
    setIsAddOpen(false);
  };

  const handleTogglePermission = (roleId: number, permissionId: string): void => {
    setRoles(
      roles?.map((role) => {
        if (role?.id === roleId) {
          return {
            ...role,
            permissions: role.permissions?.map((permission) => {
              if (permission.id === permissionId) {
                return { ...permission, enabled: !permission.enabled };
              }
              return permission;
            }),
          };
        }
        return role;
      })
    );
  };
  return (
    <>
      <DashboardWrapper title="Roles" subTitle="Add roles or manage user access control">
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-end items-center">
            <Button variant="primary" className="flex justify-center items-center gap-2" onClick={handleAddRole}>
              <span className="text-center">Add New Role</span>
              <Iconify icon="mdi:add" color="white" />
            </Button>
          </div>
          {roles.length === 0 ? (
            <div className="flex justify-center items-center h-[500px]">
              <div className="flex flex-col justify-center items-center gap-2.5">
                <div className="w-full flex justify-center items-center">
                  <Image src="/assets/svg/no-roles.svg" alt="404" height={170} width={110} />
                </div>
                <Typography size="xl" className="text-placeholder-gray font-bold">
                  No Roles Added Yet
                </Typography>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {roles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  onDelete={handleDeleteRole}
                  onTogglePermission={handleTogglePermission}
                />
              ))}
            </div>
          )}
        </div>
      </DashboardWrapper>
      {isDeleteOpen && (
        <Modal
          title="Delete"
          titleStyling={'text-left'}
          confirmButtonText="Delete"
          onClose={() => setIsDeleteOpen(false)}
          message="Are you sure you want to delete this Role"
          onConfirm={() => {
            if (selectedRoleId !== null) {
              handleConfirm(selectedRoleId);
            }
          }}
          id={selectedRoleId}
        />
      )}

      {isAddOpen && (
        <AddRoleModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onConfirm={handleConfirmAddRole}
          defaultPermissions={defaultPermissions}
        />
      )}
    </>
  );
};

export default Roles;
