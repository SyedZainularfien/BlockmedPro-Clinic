'use client';

import { useFormik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import InputPasswordField from '@/components/shared/input-fields/input-password-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { changeEmailInitialValues } from '@/formik/initial-values/dashboard';
import { changeEmailSchema } from '@/formik/validations/dashboard';
import { IChangeEmailFormValues } from '@/types';

const ChangeEmail = () => {
  const formik = useFormik<IChangeEmailFormValues>({
    initialValues: changeEmailInitialValues,
    validationSchema: changeEmailSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      toast.success('Email updated successfully');
    },
  });
  return (
    <DashboardWrapper
      backButton
      title="Change Email Address"
      subTitle="To change email, Please enter your current password."
    >
      <section className="w-full xl:max-w-2/3">
        <Container hasBorders>
          <div className="py-5 sm:py-7.5 px-6 sm:px-10 w-full">
            <div className="flex justify-center items-center w-full">
              <div className="w-full">
                <Container styling="">
                  <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[60px]">
                    {/* Input Fields */}
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-6 w-full">
                        <div className="w-full">
                          <InputTextField
                            label="Old Email Address"
                            labelStyles="text-md"
                            disabled
                            name="oldEmail"
                            value={formik.values.oldEmail}
                            onChange={formik.handleChange}
                            placeholder="Enter your old email address"
                          />
                        </div>
                        <div className="w-full">
                          <InputTextField
                            label="New Email Address"
                            labelStyles="text-md"
                            name="newEmail"
                            value={formik.values.newEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.newEmail && formik.errors.newEmail ? formik.errors.newEmail : ''}
                            placeholder="Enter your new email address here..."
                          />
                        </div>
                        <div className="w-full">
                          <InputPasswordField
                            label="Password"
                            labelStyles="text-md"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                            placeholder="Enter your password to confirm changes"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center sm:justify-end items-start sm:items-center gap-2.5">
                        <Button type="submit" variant="primary" className="w-full sm:w-[250px]">
                          Update Email
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
          src="/assets/svgs/profile-bg.svg"
          height={343}
          width={500}
          alt="bg-logo"
          className="absolute bottom-5 right-5 z-10 hidden sm:block"
        />
      </div>
    </DashboardWrapper>
  );
};

export default ChangeEmail;
