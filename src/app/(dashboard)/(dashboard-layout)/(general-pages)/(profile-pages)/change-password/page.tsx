'use client';

import { useFormik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import InputPasswordField from '@/components/shared/input-fields/input-password-field';
import { Typography } from '@/components/shared/typography';
import { changePasswordInitialValues } from '@/formik/initial-values/dashboard';
import { changePasswordSchema } from '@/formik/validations/dashboard';
import { IChangePasswordFormValues } from '@/types';

const ChangePassword = () => {
  const formik = useFormik<IChangePasswordFormValues>({
    initialValues: changePasswordInitialValues,
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      toast.success('Email updated successfully');
    },
  });
  return (
    <DashboardWrapper title="Security" subTitle="Update your login password here.">
      <section className="w-full xl:max-w-2/3">
        <Container hasBorders>
          <div className="py-5 sm:py-7.5 px-6 sm:px-10 w-full">
            <div className="flex flex-col gap-6.5 w-full">
              <Typography size={'h5'} className="text-black font-bold">
                Change Password
              </Typography>
              <div className="w-full">
                <Container styling="">
                  <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[60px]">
                    {/* Input Fields */}
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-6 w-full">
                        <div className="w-full">
                          <InputPasswordField
                            label="Old Password"
                            labelStyles="text-md"
                            name="oldPassword"
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                            placeholder="Enter your old password"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.oldPassword && formik.errors.oldPassword ? formik.errors.oldPassword : ''
                            }
                          />
                        </div>
                        <div className="w-full">
                          <InputPasswordField
                            label="New Passwrord"
                            labelStyles="text-md"
                            name="newPassword"
                            placeholder="Enter your new password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : ''
                            }
                          />
                        </div>
                        <div className="w-full">
                          <InputPasswordField
                            label="Confirm Password"
                            labelStyles="text-md"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.confirmPassword && formik.errors.confirmPassword
                                ? formik.errors.confirmPassword
                                : ''
                            }
                            placeholder="Confirm Password"
                            autoComplete="off"
                            strengthChecker
                          />
                        </div>
                      </div>
                      <div className="flex justify-center sm:justify-end items-start sm:items-center gap-2.5">
                        <Button type="submit" variant="primary" className="w-full sm:w-[250px]">
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </form>
                </Container>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div>
        <Image
          src="/assets/svgs/security-bg.svg"
          height={364}
          width={514}
          alt="bg-logo"
          className="absolute bottom-5 right-5 z-10 hidden sm:block"
        />
      </div>
    </DashboardWrapper>
  );
};

export default ChangePassword;
