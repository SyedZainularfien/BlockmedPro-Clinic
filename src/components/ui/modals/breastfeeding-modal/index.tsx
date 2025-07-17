import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/shared/button';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { content } from '@/data';
import { setBreastfeedingInfo } from '@/redux/slices/current-consultations';
import { IBreastFeedingModalProps } from '@/types';

const BreastFeedingModal: FC<IBreastFeedingModalProps> = ({ onClose, initialValues }) => {
  const dispatch = useDispatch();

  const { breastFeedingOptions } = content?.currentConsultations?.breastFeedingModalData;

  const formik = useFormik({
    initialValues: {
      isBreastfeeding: initialValues?.isBreastfeeding || '',
    },
    onSubmit: (values) => {
      dispatch(setBreastfeedingInfo(values));
      onClose?.();
    },
  });

  return (
    <ModalWrapper
      title="Breastfeeding?"
      titleStyling="text-primary-dark text-left leading-none"
      line
      lineGap="gap-4"
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full min-h-[200px]">
        <div className="flex flex-col gap-3.5">
          <InputSelectField
            label="Are you currently Breastfeeding?"
            value={formik.values.isBreastfeeding}
            options={breastFeedingOptions}
            onSelect={(value) => formik.setFieldValue('isBreastfeeding', value)}
          />
        </div>
        <hr className="text-light-gray" />
        <Button type="submit">Save</Button>
      </form>
    </ModalWrapper>
  );
};

export default BreastFeedingModal;
