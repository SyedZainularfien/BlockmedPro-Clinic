'use client';

import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Iconify from '@/components/shared/iconify';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { Typography } from '@/components/shared/typography';
import { profileInitialValues } from '@/formik/initial-values/dashboard';
import { profileSchema } from '@/formik/validations/dashboard';

const Profile = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: profileInitialValues,
    validationSchema: profileSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      toast.success('Profile updated successfully');
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      formik.setFieldValue('image', imageUrl);
    }
  };
  return (
    <DashboardWrapper title="Profile" subTitle="Update your profile here">
      <section className="w-full xl:max-w-2/3">
        <Container hasBorders>
          <div className="py-5 sm:py-7.5 px-6 sm:px-10 w-full">
            <div className="flex justify-center items-center w-full">
              <div className="w-full">
                <Container styling="">
                  <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[60px]">
                    {/* Image Section */}
                    <div className="relative flex flex-col gap-4 justify-center items-center">
                      <div className="relative">
                        <div className="rounded-full border-2 border-light-gray p-1 w-[178px] h-[178px] flex items-center justify-center overflow-hidden">
                          <Image
                            src={formik.values.image}
                            alt="profile-picture"
                            height={170}
                            width={170}
                            className="object-cover rounded-full"
                          />
                        </div>
                        <label className="absolute bottom-4 right-0 bg-white p-2 rounded-full shadow-md flex items-center justify-center cursor-pointer">
                          <Iconify icon="mingcute:edit-2-fill" className="text-primary-dark text-lg" />
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                      </div>
                      {/* error */}
                      {formik.touched.image && formik.errors.image && (
                        <Typography size="sm" className="text-red-500">
                          {formik.errors.image}
                        </Typography>
                      )}
                    </div>
                    {/* Input Fields */}
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col sm:flex-row gap-6 w-full">
                        <div className="w-full sm:w-1/2">
                          <InputTextField
                            label="First Name"
                            labelStyles="text-md"
                            name="firstName"
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}
                          />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <InputTextField
                            label="Last Name"
                            labelStyles="text-md"
                            name="lastName"
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-start sm:items-center gap-1">
                          <Typography size="md" className="font-semibold">
                            Email Address
                          </Typography>
                          <Typography
                            onClick={() => router.push('/change-email')}
                            size="md"
                            className="text-primary-light border-b border-primary-light font-semibold cursor-pointer"
                          >
                            Change email address
                          </Typography>
                        </div>
                        <InputTextField
                          disabled
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-start sm:items-center gap-2.5">
                        <Button onClick={formik.handleReset} type="button" variant="outlined" className="w-full">
                          Cancel
                        </Button>
                        <Button type="submit" variant="primary" className="w-full">
                          Save
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

export default Profile;
