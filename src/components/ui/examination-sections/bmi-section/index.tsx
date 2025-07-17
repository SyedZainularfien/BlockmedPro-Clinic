import React, { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import MeasurementInput from '@/components/shared/input-fields/input-measurment-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { content } from '@/data';
import { IExaminationSectionProps } from '@/types';
import RangeSelector from '../../range-selector';

const BMISection: FC<IExaminationSectionProps> = ({ formik, isOpen }) => {
  const { measurementConfigs } = content?.currentConsultations;

  const handleHeightChange = (value: string, unit: string) => {
    formik.setFieldValue('measurements.height', { value, unit });
  };

  const handleWeightChange = (value: string, unit: string) => {
    formik.setFieldValue('measurements.weight', { value, unit });
  };

  const handleWaistChange = (value: string, unit: string) => {
    formik.setFieldValue('measurements.waist', { value, unit });
  };

  const handleBmiChange = (index: number) => {
    formik.setFieldValue('bmiIndex', index);
  };

  const bmiRanges = ['<18.5', '18.5 to 24.9', '25 to 29.9', '30 to 39.9', '40>'];
  const bmiLabels = ['UNDERWEIGHT', 'HEALTHY WEIGHT', 'OVERWEIGHT', 'OBESITY', 'EXTREME OBESITY'];

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
            icon="entypo:ruler"
            notClickable
            className="text-primary-light bg-white border border-gray rounded-xl p-2"
          />
        </div>
        <div className="flex flex-col w-full sm:w-[83%] gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <MeasurementInput
              label="Height"
              units={measurementConfigs.height.units}
              value={formik.values.measurements.height?.value || ''}
              unit={formik.values.measurements.height?.unit || measurementConfigs.height.units[0]?.value}
              onValueChange={handleHeightChange}
            />

            <MeasurementInput
              label="Weight"
              units={measurementConfigs.weight.units}
              value={formik.values.measurements.weight?.value || ''}
              unit={formik.values.measurements.weight?.unit || measurementConfigs.weight.units[0]?.value}
              onValueChange={handleWeightChange}
            />

            <InputTextField
              label="Body Mass Index"
              placeholder="Enter"
              value={formik.values.bmi || ''}
              onChange={(e) => formik.setFieldValue('bmi', e.target.value)}
              styling="!cursor-not-allowed"
              readOnly
            />

            <MeasurementInput
              label="Waist Circumference"
              units={measurementConfigs.waist.units}
              value={formik.values.measurements.waist?.value || ''}
              unit={formik.values.measurements.waist?.unit || measurementConfigs.waist.units[0]?.value}
              onValueChange={handleWaistChange}
            />
          </div>

          <div className="col-span-full">
            <RangeSelector
              bordered
              ranges={bmiRanges}
              labels={bmiLabels}
              onChange={handleBmiChange}
              value={formik.values.bmiIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMISection;
