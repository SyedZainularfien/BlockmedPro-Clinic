import React, { FC } from 'react';

import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { RoleCardProps } from '@/types';
import ToggleButton from '../toggle-button';

const RoleCard: FC<RoleCardProps> = ({ role, onDelete, onTogglePermission }) => {
  return (
    <>
      <Container bottomBorder>
        <div className="p-5 pb-10 h-full">
          <div className="flex justify-end items-center">
            <button onClick={() => onDelete?.(role.id)} className="hover:opacity-75" aria-label="Delete role">
              <Iconify icon="zondicons:minus-solid" width={20} color="#C9311A" />
            </button>
          </div>
          <div className="flex flex-col gap-[30px]">
            <Typography size="xl" className="text-blue font-bold">
              {role.title}
            </Typography>
            <div className="flex flex-col gap-4 bg-background-gray py-4 px-7.5 rounded-[12px]">
              <Typography size="md" className="font-normal text-gray">
                Access
              </Typography>
              <div className="flex flex-col gap-5">
                {role.permissions.map((permission, index) => (
                  <React.Fragment key={permission.id}>
                    <div className="flex justify-between items-center">
                      <Typography size="md" className="font-semibold text-blue">
                        {permission.name}
                      </Typography>
                      <ToggleButton
                        checked={permission.enabled}
                        onChange={() => onTogglePermission(role.id, permission.id)}
                      />
                    </div>
                    {index < role.permissions.length - 1 && <hr className="text-light-gray" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RoleCard;
