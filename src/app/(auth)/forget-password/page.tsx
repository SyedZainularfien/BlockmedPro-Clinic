'use client';

import { useFormik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import AuthLayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { Typography } from '@/components/shared/typography';
import { forgetPasswordInitialValues } from '@/formik/initial-values/auth';
import { forgotPasswordSchema } from '@/formik/validations/auth';

const ResetPassword: NextPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: forgetPasswordInitialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
      router.push('/verify-otp');
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleReset(values);
    },
  });

  const { values, touched, errors, dirty, isValid, isSubmitting, handleBlur, handleChange, handleSubmit, handleReset } =
    formik;
  return (
    <AuthLayout imageSrc="/assets/svgs/forgot-pass-logo.svg">
      <Container hasBorders styling="w-full px-8 py-7 sm:!px-18 sm:!py-11.5">
        <div className="flex flex-col gap-8 lg:gap-7">
          <div className="flex flex-col items-start gap-4">
            <Typography size="h3" className="text-black text-center font-bold">
              Forgotten password?
            </Typography>
            <Typography size="md" className="text-dark-gray text-center">
              No worries, we will send you instructions to reset your password.
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-7">
              <InputTextField
                name={'email'}
                onBlur={handleBlur}
                value={values.email}
                label={'Email Address'}
                onChange={handleChange}
                placeholder={'Enter your email address'}
                error={touched.email && errors.email ? errors.email : ''}
              />
              <div className="flex flex-col gap-4">
                <Button variant="primary" className="w-full" disabled={!dirty || !isValid || isSubmitting}>
                  Reset Password
                </Button>
                <div className="flex space-x-2 items-center justify-center group">
                  <div className="flex justify-center items-center text-center">
                    <Iconify icon="material-symbols:arrow-back-rounded" className="text-dark-gray" />
                  </div>
                  <Link href={'/login'} className="text-dark-gray text-center">
                    <Typography size={'md'}>Back to Login</Typography>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </AuthLayout>
  );
};

export default ResetPassword;
