import { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { IExaminationSectionProps } from '@/types';

const HeartRateSection: FC<IExaminationSectionProps> = ({ formik, isOpen }) => {
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
            icon="material-symbols:ecg-heart"
            notClickable
            className="text-primary-light bg-white border border-gray rounded-xl p-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:w-[83%] gap-4 sm:gap-6">
          <InputTextField
            label="Heart Rate"
            placeholder="Enter"
            value={formik.values.heartrate || ''}
            onChange={(e) => formik.setFieldValue('heartrate', e.target.value)}
          />

          <InputTextField
            label="Pulse"
            placeholder="Enter"
            value={formik.values.pulse || ''}
            onChange={(e) => formik.setFieldValue('pulse', e.target.value)}
          />

          <InputTextField
            label="Site"
            placeholder="Enter"
            value={formik.values.site || ''}
            onChange={(e) => formik.setFieldValue('site', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeartRateSection;
