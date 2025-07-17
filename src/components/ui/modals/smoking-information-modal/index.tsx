import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/shared/button';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { content } from '@/data';
import { setSmokingInfo } from '@/redux/slices/current-consultations';
import { ISmockingInformationModalProps } from '@/types';

const SmockingInformationModal: FC<ISmockingInformationModalProps> = ({ onClose, initialValues }) => {
  const dispatch = useDispatch();
  const { smokingTypesOptions, smokingFrequencyOptions, smokingDurationOptions, wantToQuitOptions } =
    content?.currentConsultations?.smokingInformationModalData;

  const formik = useFormik({
    initialValues: {
      smokingType: initialValues?.smokingType || '',
      howOften: initialValues?.howOften || '',
      howLong: initialValues?.howLong || '',
      wantToQuit: initialValues?.wantToQuit || '',
    },
    onSubmit: (values) => {
      dispatch(setSmokingInfo(values));
      onClose?.();
    },
  });

  return (
    <ModalWrapper
      title="Smoking"
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
            label="How often do you smoke?"
            value={formik.values.howOften}
            options={smokingFrequencyOptions}
            onSelect={(value) => formik.setFieldValue('howOften', value)}
          />
          <InputSelectField
            label="How long you have been smoking for?"
            value={formik.values.howLong}
            options={smokingDurationOptions}
            onSelect={(value) => formik.setFieldValue('howLong', value)}
          />
          <InputSelectField
            label="Want to quit"
            value={formik.values.wantToQuit}
            options={wantToQuitOptions}
            onSelect={(value) => formik.setFieldValue('wantToQuit', value)}
          />
        </div>
        <hr className=" text-light-gray" />
        <Button type="submit">Save</Button>
      </form>
    </ModalWrapper>
  );
};

export default SmockingInformationModal;
