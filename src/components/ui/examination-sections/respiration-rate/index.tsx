import { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { IExaminationSectionProps } from '@/types';

const RespirationRateSection: FC<IExaminationSectionProps> = ({ formik, isOpen }) => {
  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100 pt-6 pb-6 first:pt-6 last:pb-0' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-start items-center overflow-hidden">
        <div className="w-full sm:w-[17%]">
          <Iconify
            size={50}
            icon="bi:lungs-fill"
            notClickable
            className="text-primary-light bg-white border border-gray rounded-xl p-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:w-[83%] gap-4 sm:gap-6">
          <InputTextField
            label="Respiration Rate"
            placeholder="Enter"
            value={formik.values.respirationrate || ''}
            onChange={(e) => formik.setFieldValue('respirationrate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default RespirationRateSection;
