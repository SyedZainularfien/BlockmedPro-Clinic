import React, { FC } from 'react';

import { Button } from '@/components/shared/button';
import CustomCheckbox from '@/components/shared/custom-checkbox';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { DashboardOptionsModalProps } from '@/types';

const DashboardOptionsModal: FC<DashboardOptionsModalProps> = ({
  onClose,
  dashboardOptions,
  setDashboardOptions,
  onSave,
}) => {
  const handleOptionChange = (option: string, value: boolean) => {
    setDashboardOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  return (
    <ModalWrapper line onClose={onClose} title="Select the options below you want to show on dashboard">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-4 items-start w-full">
          <CustomCheckbox
            checked={dashboardOptions.patientDemographics}
            onChange={(value) => handleOptionChange('patientDemographics', value)}
            label="Patient Demographics"
          />
          <CustomCheckbox
            checked={dashboardOptions.totalRevenue}
            onChange={(value) => handleOptionChange('totalRevenue', value)}
            label="Total Revenue"
          />
          <CustomCheckbox
            checked={dashboardOptions.doctors}
            onChange={(value) => handleOptionChange('doctors', value)}
            label="Doctors"
          />
          <CustomCheckbox
            checked={dashboardOptions.ourSpecialties}
            onChange={(value) => handleOptionChange('ourSpecialties', value)}
            label="Our Specialties"
          />
          <CustomCheckbox
            checked={dashboardOptions.ratings}
            onChange={(value) => handleOptionChange('ratings', value)}
            label="Rating"
          />
          <CustomCheckbox
            checked={dashboardOptions.clinicalDiseases}
            onChange={(value) => handleOptionChange('clinicalDiseases', value)}
            label="Clinical Diseases"
          />
          <CustomCheckbox
            checked={dashboardOptions.appointmentOverview}
            onChange={(value) => handleOptionChange('appointmentOverview', value)}
            label="Appointment Overview"
          />
          <CustomCheckbox
            checked={dashboardOptions.appointmentReports}
            onChange={(value) => handleOptionChange('appointmentReports', value)}
            label="Appointment and Scheduling Reports"
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2.5">
          <Button type="button" onClick={onClose} className="w-full" variant="outlined">
            Cancel
          </Button>
          <Button type="button" onClick={onSave} className="w-full" variant="primary">
            Confirm
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DashboardOptionsModal;
