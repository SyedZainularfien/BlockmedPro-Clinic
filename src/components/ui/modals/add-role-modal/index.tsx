import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/shared/button';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { Typography } from '@/components/shared/typography';
import { addRoleInitialValues } from '@/formik/initial-values/auth';
import { addRoleSchema } from '@/formik/validations/auth';
import { AddModalProps, Permission } from '@/types';
import ScrollContainer from '../../scrollable-container';
import ToggleButton from '../../toggle-button';

const AddRoleModal: React.FC<AddModalProps> = ({ onClose, onConfirm, defaultPermissions }) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    setPermissions(defaultPermissions.map((permission) => ({ ...permission, enabled: false })));
  }, [defaultPermissions]);

  const formik = useFormik({
    initialValues: addRoleInitialValues,
    validationSchema: addRoleSchema,
    onSubmit: (values) => {
      onConfirm(values.roleTitle, permissions);
      formik.resetForm();
      setPermissions((prev) => prev.map((permission) => ({ ...permission, enabled: false })));
    },
  });

  const handleTogglePermission = (permissionId: string) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === permissionId ? { ...permission, enabled: !permission.enabled } : permission
      )
    );
  };

  const handleClose = () => {
    onClose();
    formik.resetForm();
    setPermissions(defaultPermissions.map((permission) => ({ ...permission, enabled: false })));
  };

  return (
    <ModalWrapper title="Add a New Role" titleStyling="text-center text-blue pb-10" onClose={handleClose}>
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col gap-5">
            <InputTextField
              autoFocus
              name="roleTitle"
              value={formik.values.roleTitle}
              onChange={formik.handleChange}
              label="Role Name"
              placeholder="Role name"
              labelStyles="text-blue"
            />
            <div className="flex flex-col gap-2 bg-background-gray rounded-[12px] py-4 px-7.5">
              <Typography size="md" className="text-gray font-normal">
                Access
              </Typography>
              <ScrollContainer>
                <div className="flex flex-col divide-y divide-light-gray">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex justify-between items-center py-3.5">
                      <Typography size="md" className="font-semibold text-blue">
                        {permission.name}
                      </Typography>
                      <ToggleButton
                        checked={permission.enabled}
                        onChange={() => handleTogglePermission(permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </ScrollContainer>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Button variant="outlined" size="medium" className="w-full" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              formik.setTouched({ roleTitle: true });
              formik.handleSubmit();
            }}
            variant="primary"
            size="medium"
            className="w-full"
            disabled={!formik.isValid || !formik.dirty}
          >
            Add
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddRoleModal;
