import React, { FC, useState } from 'react';

import { Button } from '@/components/shared/button';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { IEditUserRolelProps } from '@/types';

const EditUserRole: FC<IEditUserRolelProps> = ({ onClose, options }) => {
  const [selectedRole, setSelectedRole] = useState<{ label: string; value: string } | null>(null);

  const handleRoleChange = (option: any) => {
    setSelectedRole(option);
  };

  return (
    <ModalWrapper
      title="Edit Role"
      subTitle="Choose a role you want to assign this user."
      onClose={onClose}
      titleStyling="text-left"
    >
      <div className="w-full flex flex-col gap-5 items-center justify-center mt-5.5">
        <InputSelectField name="role" value={selectedRole} onChange={handleRoleChange} options={options} />
        <Button variant="primary" className="w-full" onClick={onClose} disabled={!selectedRole}>
          Update Role
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default EditUserRole;
