import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/shared/button';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { content } from '@/data';
import { setSmokedInPastInfo } from '@/redux/slices/current-consultations';
import { ISmockedInPastModalProps } from '@/types';

const SmockedInPastModal: FC<ISmockedInPastModalProps> = ({ onClose, initialValues }) => {
  const dispatch = useDispatch();
  const {
    smokingTypesOptions,
    smokingFrequencyOptions,
    smokingDurationOptions,
    smokingAmountOptions,
    householdSmokingOptions,
  } = content?.currentConsultations?.smokedInPastModalData;
  const formik = useFormik({
    initialValues: {
      smokingType: initialValues?.smokingType || '',
      howOften: initialValues?.howOften || '',
      howLong: initialValues?.howLong || '',
      howMuch: initialValues?.howMuch || '',
      householdSmoking: initialValues?.householdSmoking || '',
    },
    onSubmit: (values) => {
      dispatch(setSmokedInPastInfo(values));
      onClose?.();
    },
  });

  return (
    <ModalWrapper
      title="Smoked in Past?"
      titleStyling="text-primary-dark text-left leading-none"
      line
      lineGap="gap-4"
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-3.5">
          <InputSelectField
            label="Smoking type"
            value={formik.values.smokingType}
            options={smokingTypesOptions}
            onSelect={(value) => formik.setFieldValue('smokingType', value)}
          />
          <InputSelectField
            label="How often did you smoke?"
            value={formik.values.howOften}
            options={smokingFrequencyOptions}
            onSelect={(value) => formik.setFieldValue('howOften', value)}
          />
          <InputSelectField
            label="How long did you smoke for?"
            value={formik.values.howLong}
            options={smokingDurationOptions}
            onSelect={(value) => formik.setFieldValue('howLong', value)}
          />
          <InputSelectField
            label="How much did you smoke?"
            value={formik.values.howMuch}
            options={smokingAmountOptions}
            onSelect={(value) => formik.setFieldValue('howMuch', value)}
          />
          <InputSelectField
            label="Household smoking?"
            value={formik.values.householdSmoking}
            options={householdSmokingOptions}
            onSelect={(value) => formik.setFieldValue('householdSmoking', value)}
          />
        </div>
        <hr className=" text-light-gray" />
        <Button type="submit">Save</Button>
      </form>
    </ModalWrapper>
  );
};

export default SmockedInPastModal;
