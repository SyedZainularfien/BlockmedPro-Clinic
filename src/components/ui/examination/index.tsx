'use client';

import React from 'react';

import TextAreaField from '@/components/shared/input-fields/text-area-field';
import { IExaminationProps } from '@/types';
import BloodPressureSection from '../examination-sections/blood-pressure';
import BMISection from '../examination-sections/bmi-section';
import ExertionSection from '../examination-sections/exertion-section';
import HeartRateSection from '../examination-sections/heart-rate';
import NeckCircumferenceSection from '../examination-sections/neck-circumference';
import OxygenSection from '../examination-sections/oxygen-section';
import PainSeveritySection from '../examination-sections/pain-severity';
import RespirationRateSection from '../examination-sections/respiration-rate';
import TemperatureSection from '../examination-sections/tempreture';
import SectionToggleIcons from '../examination-sections/toggle-section-icons';

const Examination = ({ formik, openSections, toggleSection }: IExaminationProps) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-7.5">
        <TextAreaField
          label="Examination"
          placeholder="Enter"
          styling="!min-h-[120px]"
          value={formik.values.examinationNotes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            formik.setFieldValue('examinationNotes', e.target.value)
          }
        />

        <SectionToggleIcons openSections={openSections} onToggle={toggleSection} />

        <hr className="text-light-gray" />
      </div>

      <div className="flex flex-col overflow-hidden">
        <BMISection formik={formik} isOpen={openSections.bmi} />
        {openSections.bmi && <hr className="text-light-gray" />}

        <BloodPressureSection formik={formik} isOpen={openSections.bloodPressure} />
        {openSections.bloodPressure && <hr className="text-light-gray" />}

        <HeartRateSection formik={formik} isOpen={openSections.heartRate} />
        {openSections.heartRate && <hr className="text-light-gray" />}

        <TemperatureSection formik={formik} isOpen={openSections.temperature} />
        {openSections.temperature && <hr className="text-light-gray" />}

        <OxygenSection formik={formik} isOpen={openSections.oxygen} />
        {openSections.oxygen && <hr className="text-light-gray" />}

        <NeckCircumferenceSection formik={formik} isOpen={openSections.neckCircumference} />
        {openSections.neckCircumference && <hr className="text-light-gray" />}

        <RespirationRateSection formik={formik} isOpen={openSections.respirationRate} />
        {openSections.respirationRate && <hr className="text-light-gray" />}

        <ExertionSection formik={formik} isOpen={openSections.exertion} />
        {openSections.exertion && <hr className="text-light-gray" />}

        <PainSeveritySection formik={formik} isOpen={openSections.severityRate} />
        {openSections.severityRate && <hr className="text-light-gray" />}
      </div>
    </section>
  );
};

export default Examination;
