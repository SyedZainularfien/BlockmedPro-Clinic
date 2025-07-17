import { DatePicker } from '@heroui/date-picker';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/shared/button';
// import CustomDateInput from '@/components/shared/input-fields/input-date-field';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { content } from '@/data';
import { setPregnancyInfo } from '@/redux/slices/current-consultations';
import { IPregnantModalProps } from '@/types';

const PregnantModal: FC<IPregnantModalProps> = ({ onClose, initialValues }) => {
  const dispatch = useDispatch();
  // const [selectedDate, setSelectedDate] = useState('');
  // const today = new Date().toISOString().split('T')[0];
  const { pregnancyOptions } = content?.currentConsultations?.pregnancyModalData;

  const formik = useFormik({
    initialValues: {
      isPregnant: initialValues?.isPregnant || '',
      dueDate: initialValues?.dueDate || '',
    },
    onSubmit: (values) => {
      dispatch(setPregnancyInfo(values));
      onClose?.();
    },
  });

  return (
    <ModalWrapper
      title="Pregnant?"
      titleStyling="text-primary-dark text-left leading-none"
      line
      lineGap="gap-4"
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full min-h-[200px]">
        <div className="flex flex-col gap-3.5">
          <InputSelectField
            label="Are you pregnant?"
            value={formik.values.isPregnant}
            options={pregnancyOptions}
            onSelect={(value) => formik.setFieldValue('isPregnant', value)}
          />
          <DatePicker
            color="default"
            classNames={{
              base: 'w-full',
              inputWrapper:
                'bg-white shadow-none  border border-[#ededed] hover:bg-transparent focus-within:bg-none px-6 py-7',
              input: 'text-gray-900 placeholder:text-gray-100',
              calendar: 'bg-red-500 shadow-none border border-gray-200 rounded-lg',
            }}
          />
        </div>
        <hr className="text-light-gray" />
        <Button type="submit">Save</Button>
      </form>
    </ModalWrapper>
  );
};

export default PregnantModal;
