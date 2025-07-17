'use client';

import { useFormik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

import Authlayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import InputPasswordField from '@/components/shared/input-fields/input-password-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { Typography } from '@/components/shared/typography';
import ReCaptchaComponent from '@/components/ui/recaptcha';
import { signInitialValues } from '@/formik/initial-values/auth';
import { loginSchema } from '@/formik/validations/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setIsDoctor } from '@/redux/slices/app-slice';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const doctorEmail = 'doctor@gmail.com';

  const formik = useFormik({
    initialValues: signInitialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      toast.success('Logged in successfully');
      if (values.email === doctorEmail) {
        router.push('/doctor-dashboard');
        dispatch(setIsDoctor(true));
      } else {
        router.push('/verify-otp');
        dispatch(setIsDoctor(false));
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <Authlayout imageSrc="/assets/svgs/login-image.svg">
      <Container hasBorders styling="w-full px-8 py-7 sm:!px-18 sm:!py-11.5">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          <div className="flex flex-col gap-10 w-full">
            <div className="w-full">
              <Typography size="h3" className="text-black font-bold">
                Clinic Login
              </Typography>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <InputTextField
                  name="email"
                  onBlur={handleBlur}
                  value={values.email}
                  label="Email Address"
                  onChange={handleChange}
                  error={touched.email && errors.email ? errors.email : ''}
                />
                <InputPasswordField
                  name="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={touched.password && errors.password ? errors.password : ''}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-1 lg:justify-between items-start">
                <ReCaptchaComponent />
                <Typography
                  onClick={() => router.push('forget-password')}
                  size="md"
                  className="text-primary-light cursor-pointer font-semibold"
                >
                  Forgot Password?
                </Typography>
              </div>
            </div>
          </div>
          <Button type="submit" disabled={!formik.isValid} className="w-full">
            Log In
          </Button>
        </form>
      </Container>
    </Authlayout>
  );
};

export default LoginPage;
