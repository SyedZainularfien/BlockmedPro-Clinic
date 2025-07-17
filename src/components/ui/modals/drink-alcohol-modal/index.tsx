import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/shared/button';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { content } from '@/data';
import { setAlcoholInfo } from '@/redux/slices/current-consultations';
import { IDrinkAlcoholModalProps } from '@/types';

const DrinkAlcoholModal: FC<IDrinkAlcoholModalProps> = ({ onClose, initialValues }) => {
  const dispatch = useDispatch();
  const { alcoholFrequencyOptions, alcoholQuantityOptions, alcoholDependenceOptions } =
    content?.currentConsultations?.alcoholModalData;

  const formik = useFormik({
    initialValues: {
      frequency: initialValues?.frequency || '',
      quantity: initialValues?.quantity || '',
      dependence: initialValues?.dependence || '',
    },
    onSubmit: (values) => {
      dispatch(setAlcoholInfo(values));
      onClose?.();
    },
  });

  return (
    <ModalWrapper
      title="Drink Alcohol?"
      titleStyling="text-primary-dark text-left leading-none"
      line
      lineGap="gap-4"
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-3.5">
          <InputSelectField
            label="How often do you drink alcohol?"
            value={formik.values.frequency}
            options={alcoholFrequencyOptions}
            onSelect={(value) => formik.setFieldValue('frequency', value)}
          />
          <InputSelectField
            label="How much do you drink?"
            value={formik.values.quantity}
            options={alcoholQuantityOptions}
            onSelect={(value) => formik.setFieldValue('quantity', value)}
          />
          <InputSelectField
            label="History of alcohol dependence or excess?"
            value={formik.values.dependence}
            options={alcoholDependenceOptions}
            onSelect={(value) => formik.setFieldValue('dependence', value)}
          />
        </div>
        <hr className="text-light-gray" />
        <Button type="submit">Save</Button>
      </form>
    </ModalWrapper>
  );
};

export default DrinkAlcoholModal;
