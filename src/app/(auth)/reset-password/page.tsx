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
import InputPasswordField from '@/components/shared/input-fields/input-password-field';
import { Typography } from '@/components/shared/typography';
import { resetPasswordInitialValues } from '@/formik/initial-values/auth';
import { newPasswordSchema } from '@/formik/validations/auth';

const NewPassword: NextPage = () => {
  const router = useRouter();

  const { values, touched, errors, dirty, isValid, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: resetPasswordInitialValues,
    validationSchema: newPasswordSchema,
    onSubmit: (values) => {
      router.push('/login');
      console.log(values);
    },
  });

  console.log('Errors:', errors);

  return (
    <AuthLayout imageSrc="/assets/svgs/new-pass-logo.svg">
      <Container hasBorders styling="w-full px-8 py-7 sm:!px-18 sm:!py-11.5">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-8 justify-start items-start">
            <div className="flex flex-col gap-0 items-start justify-start">
              <Typography size={'h3'} className="text-black font-bold">
                Setup A New Password
              </Typography>
              <Typography size={'md'} className="text-dark-gray font-normal">
                Set your new password according to the instructions.
              </Typography>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-[20px] w-full">
                <InputPasswordField
                  onBlur={handleBlur}
                  strengthChecker={true}
                  onChange={handleChange}
                  name={'newPassword'}
                  label={'New Password'}
                  value={values.newPassword}
                  placeholder={'Enter your password'}
                  error={touched.newPassword && errors.newPassword ? errors.newPassword : ''}
                />
                <InputPasswordField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name={'confirmPassword'}
                  label={'Confirm Password'}
                  value={values.confirmPassword}
                  placeholder={'Confirm your password'}
                  error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
                />
                <div className="flex flex-col gap-6 mt-2">
                  <Button variant={'primary'} className="w-full" disabled={isSubmitting || !dirty || !isValid}>
                    Submit
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
        </div>
      </Container>
    </AuthLayout>
  );
};

export default NewPassword;
