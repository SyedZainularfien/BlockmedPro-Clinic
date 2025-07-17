import { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import MeasurementInput from '@/components/shared/input-fields/input-measurment-field';
import { content } from '@/data';
import { IExaminationSectionProps } from '@/types';

const NeckCircumferenceSection: FC<IExaminationSectionProps> = ({ formik, isOpen }) => {
  const { measurementConfigs } = content?.currentConsultations;

  const handleNeckCircumferenceChange = (value: string, unit: string) => {
    formik.setFieldValue('measurements.neckCircumference', { value, unit });
  };

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
            icon="ion:person"
            notClickable
            className="text-primary-light bg-white border border-gray rounded-xl p-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:w-[83%] gap-4 sm:gap-6">
          <MeasurementInput
            label="Neck Circumference"
            units={measurementConfigs.neckCircumference.units}
            value={formik.values.measurements.neckCircumference?.value || ''}
            unit={
              formik.values.measurements.neckCircumference?.unit || measurementConfigs.neckCircumference.units[0]?.value
            }
            onValueChange={handleNeckCircumferenceChange}
          />
        </div>
      </div>
    </div>
  );
};
export default NeckCircumferenceSection;
