'use client';

import { useFormik } from 'formik';
import React, { FC, useState } from 'react';

import { Button } from '@/components/shared/button';
import SearchInput from '@/components/shared/input-fields/search-bar';
import TextAreaField from '@/components/shared/input-fields/text-area-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { Typography } from '@/components/shared/typography';
import { presetValidationSchema } from '@/formik/validations/dashboard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setHistoryPreset, setSelectedPreset } from '@/redux/slices/current-consultations';
import { IPresetModalProps } from '@/types';

interface FormValues {
  newPresetValue: string;
}

const PresetModal: FC<IPresetModalProps> = ({ onClose }) => {
  const { historyPreset } = useAppSelector((state) => state?.currentConsultations);
  const { filterName } = useAppSelector((state) => state.temp);
  const [addPreset, setAddPreset] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik<FormValues>({
    initialValues: {
      newPresetValue: '',
    },
    validationSchema: presetValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(setHistoryPreset({ preset: values.newPresetValue }));
      resetForm();
      setAddPreset(false);
    },
  });

  const {
    values: { newPresetValue },
    handleBlur,
    handleSubmit,
    handleChange,
    touched,
    isValid,
    errors,
    isSubmitting,
  } = formik;

  const handleSelectPreset = (item: string) => {
    dispatch(setSelectedPreset(item));
    onClose?.();
  };

  const filteredPresets = historyPreset?.filter((item) => item.preset.toLowerCase().includes(filterName.toLowerCase()));

  return (
    <ModalWrapper
      line
      onClose={onClose}
      childrenStyling="!overflow-y-hidden"
      lineGap="gap-3.5"
      titleStyling={addPreset ? 'text-center !font-semibold' : 'text-left'}
      title={addPreset ? 'Add New Preset' : 'Automated Entries'}
      subTitle={!addPreset && 'Select an automated Entries which is suitable for patient condition'}
    >
      {!addPreset ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-3.5">
            <SearchInput styling="!max-w-full" />
            <Button type="button" className="min-w-[150px]" onClick={() => setAddPreset(true)}>
              Add Preset
            </Button>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-3">
            <div className="flex flex-col gap-1 max-h-[150px] bg-background-gray rounded-2xl p-2">
              {filteredPresets?.length > 0 ? (
                filteredPresets.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectPreset(item.preset)}
                    className="group px-4 py-2.5 flex items-center cursor-pointer rounded-md hover:bg-primary-dark"
                  >
                    <Typography size="md" as="p" className="group-hover:text-white">
                      {item.preset}
                    </Typography>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2.5 flex items-center justify-center">
                  <Typography size="md" as="p" className="text-gray">
                    No presets found
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-3.5">
            <TextAreaField
              name="newPresetValue" // Consistent naming
              onBlur={handleBlur}
              value={newPresetValue}
              onChange={handleChange}
              placeholder="Type here.."
              styling="!bg-light-gray !min-h-[193px]"
              error={touched.newPresetValue && errors.newPresetValue} // Fixed the field name
            />
            <div className="flex justify-center items-center w-full">
              <Button disabled={!isValid || isSubmitting} type="submit" className="w-[200px]">
                Save Preset
              </Button>
            </div>
          </div>
        </form>
      )}
    </ModalWrapper>
  );
};

export default PresetModal;
