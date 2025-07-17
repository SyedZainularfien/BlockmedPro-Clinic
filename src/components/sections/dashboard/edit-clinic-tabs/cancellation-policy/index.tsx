import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import TextEditor from '@/components/shared/text-editor';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { cancellationPolicySchema } from '@/formik/validations/dashboard';

const CancellationPolicy = () => {
  const clinicDetails = content?.clinicDetails;

  const formik = useFormik({
    initialValues: {
      cancelationPolicy: clinicDetails?.cancelationPolicy || '',
    },
    validationSchema: cancellationPolicySchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      toast.success('Cancellation Policy updated successfully');
    },
  });

  const { values, errors, touched, handleReset, handleSubmit, handleBlur, setFieldValue } = formik;
  return (
    <Container hasBorders>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7.5 py-5 px-5 sm:py-7.5 sm:px-10">
        <div className="flex flex-col gap-3">
          <Typography size={'lg'} className="text-black font-bold">
            Cancellation Policy
          </Typography>
          <TextEditor
            value={values?.cancelationPolicy}
            name={'cancelationPolicy'}
            onChange={(value: string) => setFieldValue('cancelationPolicy', value)}
            onBlur={handleBlur}
            placeholder={'Write your cancellation policy here...'}
            error={touched.cancelationPolicy && errors.cancelationPolicy ? errors.cancelationPolicy : ''}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-start sm:items-center gap-2.5">
          <Button onClick={handleReset} type="button" variant="outlined" className="w-full max-w-[250px]">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="w-full max-w-[250px]" disabled={!formik.isValid}>
            Save
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CancellationPolicy;
