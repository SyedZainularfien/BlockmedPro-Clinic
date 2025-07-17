'use client';

import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import TextAreaField from '@/components/shared/input-fields/text-area-field';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { aboutClinicSchema } from '@/formik/validations/dashboard';

const AboutClinic = () => {
  const clinicDetails = content?.clinicDetails;

  const formik = useFormik({
    initialValues: {
      overview: clinicDetails?.info?.overview || '',
    },
    validationSchema: aboutClinicSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      toast.success('Clinic overview updated successfully');
    },
  });

  const { values, errors, touched, handleReset, handleChange, handleSubmit, handleBlur } = formik;

  return (
    <Container hasBorders>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-5 px-5 sm:py-7.5 sm:px-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <Typography size={'lg'} className="text-black font-bold">
              About
            </Typography>
            <Container hasBorders>
              <div className="p-4 sm:p-10 flex flex-col gap-5">
                <TextAreaField
                  styling={'!min-h-40 !text-dark-gray'}
                  label={'Overview'}
                  labelStyles={'!text-md'}
                  value={values?.overview}
                  name={'overview'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={'Write about your clinic...'}
                  error={touched.overview && errors.overview ? errors.overview : ''}
                />
              </div>
            </Container>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-start sm:items-center gap-2.5">
            <Button onClick={handleReset} type="button" variant="outlined" className="w-full max-w-[250px]">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="w-full max-w-[250px]" disabled={!formik.isValid}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default AboutClinic;
