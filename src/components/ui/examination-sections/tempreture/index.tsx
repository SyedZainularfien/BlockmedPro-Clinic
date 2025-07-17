import { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import MeasurementInput from '@/components/shared/input-fields/input-measurment-field';
import { content } from '@/data';
import { IExaminationSectionProps } from '@/types';

const TemperatureSection: FC<IExaminationSectionProps> = ({ formik, isOpen }) => {
  const { measurementConfigs } = content?.currentConsultations;

  const handleTemperatureChange = (value: string, unit: string) => {
    formik.setFieldValue('measurements.temperature', { value, unit });
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
            icon="game-icons:medical-thermometer"
            notClickable
            className="text-primary-light bg-white border border-gray rounded-xl p-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:w-[83%] gap-4 sm:gap-6">
          <MeasurementInput
            label="Temperature"
            units={measurementConfigs.temperature.units}
            value={formik.values.measurements.temperature?.value || ''}
            unit={formik.values.measurements.temperature?.unit || measurementConfigs.temperature.units[0]?.value}
            onValueChange={handleTemperatureChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TemperatureSection;
