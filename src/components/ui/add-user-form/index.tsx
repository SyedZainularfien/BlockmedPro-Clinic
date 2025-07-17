'use client';

import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import SimpleLayout from '@/components/layouts/simple-layout';
import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { addUsersInitialValues } from '@/formik/initial-values/auth';
import { addUserSchema } from '@/formik/validations/auth';
import { AddUserErrors, AddUserFormValues } from '@/types';

const MAX_USERS = 2;

const AddUsersForm: FC = () => {
  const router = useRouter();

  const formik = useFormik<AddUserFormValues>({
    initialValues: {
      users: addUsersInitialValues,
    },
    validationSchema: addUserSchema,
    onSubmit: (values) => {
      console.log('Form Values:', values);
      router.push('/dashboard');
    },
  });

  const handleSelectChange = (fieldName: string, selectedValue: string) => {
    formik.setFieldValue(fieldName, selectedValue);
    // Also trigger validation for this field
    formik.setFieldTouched(fieldName, true);
  };

  return (
    <SimpleLayout>
      <FormikProvider value={formik}>
        <Form className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center items-center gap-10 w-[90%]">
            <Container hasBorders styling="!px-10 !pt-7 pb-10">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col lg:justify-between lg:items-center gap-5 lg:flex-row">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                      <Typography size="h4" className="text-black font-bold">
                        Add Users
                      </Typography>
                      <Typography size="md" className="text-dark-gray font-normal">
                        {formik.values.users.length}/{MAX_USERS}
                      </Typography>
                    </div>
                    <Typography size="md" className="text-dark-gray font-normal">
                      You can add up to {MAX_USERS} users. Register them to BlockMed Pro by entering their details
                      below.
                    </Typography>
                  </div>
                  {formik.values.users.length < MAX_USERS && (
                    <Button
                      type="button"
                      onClick={() =>
                        formik.setFieldValue('users', [
                          ...formik.values.users,
                          {
                            id: formik.values.users.length + 1,
                            email: '',
                            department: '',
                            jobTitle: '',
                          },
                        ])
                      }
                      variant="primary"
                      className="flex justify-center items-center gap-2 px-2"
                    >
                      <Iconify className="w-[22px] h-[22px]" icon="gridicons:add-outline" />
                      <Typography size="lg" className="text-primary font-semibold">
                        Add
                      </Typography>
                    </Button>
                  )}
                </div>
                <hr className="text-light-gray" />

                <FieldArray name="users">
                  {({ remove }) => (
                    <div className="flex flex-col gap-7">
                      {formik.values.users.map((user, index) => (
                        <div key={user.id} className="flex flex-col gap-7.5">
                          {index > 0 && (
                            <div className="flex justify-end">
                              <Iconify
                                className="w-[20px] h-[20px] text-red cursor-pointer"
                                icon="zondicons:minus-outline"
                                onClick={() => remove(index)}
                              />
                            </div>
                          )}
                          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                            <InputTextField
                              label={`User ${index + 1}`}
                              placeholder="Enter your email"
                              name={`users[${index}].email`}
                              value={formik.values.users[index]?.email || ''}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.users?.[index]?.email
                                  ? (formik.errors.users?.[index] as AddUserErrors)?.email
                                  : ''
                              }
                            />
                            <InputSelectField
                              label="Department"
                              placeholder="Select"
                              name={`users[${index}].department`}
                              options={content.userDepartments}
                              value={formik.values.users[index]?.department || ''}
                              onChange={(value) => handleSelectChange(`users[${index}].department`, value)}
                              onBlur={() => formik.setFieldTouched(`users[${index}].department`, true)}
                              error={
                                formik.touched.users?.[index]?.department
                                  ? (formik.errors.users?.[index] as AddUserErrors)?.department
                                  : ''
                              }
                            />
                            <InputSelectField
                              label="Job Title/Role"
                              placeholder="Select"
                              name={`users[${index}].jobTitle`}
                              options={content.userRoles}
                              value={formik.values.users[index]?.jobTitle || ''}
                              onChange={(value) => handleSelectChange(`users[${index}].jobTitle`, value)}
                              onBlur={() => formik.setFieldTouched(`users[${index}].jobTitle`, true)}
                              error={
                                formik.touched.users?.[index]?.jobTitle
                                  ? (formik.errors.users?.[index] as AddUserErrors)?.jobTitle
                                  : ''
                              }
                            />
                          </div>
                          {index !== formik.values.users.length - 1 && <hr className="text-light-gray" />}
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>
            </Container>

            <div className="flex flex-col gap-3 items-center justify-between">
              <Button type="submit" variant="primary" disabled={!formik.isValid || !formik.dirty}>
                Send Invites and Continue
              </Button>
              <div className="flex justify-center items-center gap-1">
                <Typography size="md" className="text-dark-gray">
                  I will Add Users Later,
                </Typography>
                <Link href="/">
                  <Typography
                    size="md"
                    className="text-primary-light font-semibold cursor-pointer underline underline-offset-4"
                  >
                    Skip For Now
                  </Typography>
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </SimpleLayout>
  );
};

export default AddUsersForm;
