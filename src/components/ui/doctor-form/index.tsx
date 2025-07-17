'use client';

import { useFormik } from 'formik';
import Image from 'next/image';
import React, { FC } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import FileUploadComponent from '@/components/shared/file-upload-component';
import Iconify from '@/components/shared/iconify';
import InputPhoneField from '@/components/shared/input-fields/input-phone-no-field';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import TextAreaField from '@/components/shared/input-fields/text-area-field';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { doctorsFormInitialValues } from '@/formik/initial-values/dashboard';
import { doctorFormSchema } from '@/formik/validations/dashboard';
import { IDoctorFormProps } from '@/types';
import ShiftPeriod from './shift-period';

const DoctorForm: FC<IDoctorFormProps> = ({ initialData }) => {
  const formik = useFormik({
    initialValues: initialData || doctorsFormInitialValues,
    validationSchema: doctorFormSchema,
    onSubmit: (values) => {
      console.log('Form submission values:', values);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } = formik;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          formik.setFieldValue('profileImage', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (file: File | null) => {
    if (file) {
      // Set all file-related fields in Formik
      setFieldValue('uploadedFileName', file.name);
      setFieldValue('uploadedFileSize', formatFileSize(file.size));
      setFieldValue('uploadedFileType', file.type);
      setFieldValue('fileSize', file.size);
      setFieldValue('uploadedFile', file); // Store the actual file object
      setFieldValue('uploadProgress', 100); // Assuming upload is complete

      console.log('File uploaded and stored in Formik:', {
        name: file.name,
        size: file.size,
        type: file.type,
        formattedSize: formatFileSize(file.size),
      });
    } else {
      // Clear all file-related fields when file is removed
      setFieldValue('uploadedFileName', '');
      setFieldValue('uploadedFileSize', 0);
      setFieldValue('uploadedFileType', '');
      setFieldValue('fileSize', 0);
      setFieldValue('uploadedFile', null);
      setFieldValue('uploadProgress', 0);
      setFieldValue('uploadSpeed', 0);

      console.log('File removed from Formik');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Container hasBorders>
        <div className="flex flex-col gap-6 py-5 px-5 psm:py-7.5 sm:px-10">
          {/* profile image */}
          <div className="relative flex flex-col gap-4 justify-center items-center">
            <div className="relative">
              <div className="rounded-full border-2 border-light-gray p-1 w-[178px] h-[178px] flex items-center justify-center overflow-hidden">
                <Image
                  src={values.profileImage}
                  alt="profile-picture"
                  height={170}
                  width={170}
                  className="object-cover bg-light-gray rounded-full"
                />
              </div>
              <label className="absolute bottom-4 right-0 bg-white p-2 rounded-full shadow-md flex items-center justify-center cursor-pointer">
                <Iconify icon="mingcute:edit-2-fill" className="text-primary-dark text-lg" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          {/* personal information */}
          <div className="w-full flex flex-col gap-7.5">
            {/* patient info */}
            <div className="w-full flex flex-col gap-2.5">
              <Typography size={'lg'} className="text-black font-bold">
                Profile Info
              </Typography>
              <Container hasBorders>
                <div className="w-full p-5 sm:p-10 flex flex-col gap-6">
                  <div className="w-full flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <InputTextField
                        name="firstName"
                        label="First Name"
                        placeholder="First Name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.firstName && touched.firstName ? errors.firstName : ''}
                      />
                    </div>
                    <div className="w-full">
                      <InputTextField
                        name="lastName"
                        label="Last Name"
                        placeholder="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lastName && touched.lastName ? errors.lastName : ''}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <InputSelectField
                        label="Gender"
                        name={'gender'}
                        value={content?.generalOptions.gender.find((option) => option.value === values.gender)}
                        onChange={(option) => setFieldValue('gender', option?.value)}
                        options={content?.generalOptions.gender}
                        placeholder="Gender"
                        error={errors.gender && touched.gender ? errors.gender : ''}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="w-full">
                      <InputSelectField
                        label="Blood Group"
                        name={'bloodGroup'}
                        value={content?.generalOptions.bloodGroup.find((option) => option.value === values.bloodGroup)}
                        onChange={(option) => setFieldValue('bloodGroup', option?.value)}
                        options={content?.generalOptions.bloodGroup}
                        placeholder="Select blood group"
                        error={errors.bloodGroup && touched.bloodGroup ? errors.bloodGroup : ''}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <InputTextField
                        name="dob"
                        label="Date Of Birth"
                        placeholder="DD/MM/YYYY"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.dob && touched.dob ? errors.dob : ''}
                      />
                    </div>
                    <div className="w-full">
                      <InputTextField
                        name="education"
                        label="Education"
                        placeholder="Enter education"
                        value={values.education}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.education && touched.education ? errors.education : ''}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <InputTextField
                        name="email"
                        label="Email"
                        placeholder="Enter email address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email ? errors.email : ''}
                      />
                    </div>
                    <div className="w-full">
                      <InputPhoneField
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter phone no."
                        value={values.phone}
                        phoneCode={values.phoneCode ? String(values.phoneCode) : undefined}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.phone && touched.phone ? errors.phone : ''}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <InputTextField
                        name="address"
                        label="Address"
                        placeholder="Enter address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.address && touched.address ? errors.address : ''}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <InputTextField
                        name="designation"
                        label="Designation"
                        placeholder="Enter designation"
                        value={values.designation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.designation && touched.designation ? errors.designation : ''}
                      />
                    </div>
                    <div className="w-full">
                      <InputSelectField
                        label="Speciality"
                        name={'speciality'}
                        value={content?.generalOptions.doctorSpeciality.find(
                          (option) => option.value === values.speciality
                        )}
                        onChange={(option) => setFieldValue('speciality', option?.value)}
                        options={content?.generalOptions.doctorSpeciality}
                        placeholder="Select specialty"
                        error={errors.speciality && touched.speciality ? errors.speciality : ''}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </div>
              </Container>
            </div>

            {/* shift period */}
            <div>
              <ShiftPeriod
                values={values.shiftPeriod}
                setFieldValue={(field, value) => {
                  setFieldValue(`shiftPeriod.${field}`, value);
                }}
              />
            </div>

            <div className="flex flex-col gap-7.5">
              {/* about */}
              <div className="w-full flex flex-col gap-2.5">
                <Typography size={'lg'} className="text-black font-bold">
                  About
                </Typography>
                <Container hasBorders>
                  <div className="w-full p-5 sm:p-10 flex flex-col gap-6">
                    {/* Upload document */}
                    <FileUploadComponent
                      onFileUpload={handleFileUpload}
                      initialFileName={values.uploadedFileName || null}
                    />

                    {/* Bio */}
                    <div>
                      <TextAreaField
                        name="bio"
                        label="Bio"
                        value={values.bio}
                        placeholder="Type here..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        labelStyles={'text-md font-semibold'}
                        error={errors.bio && touched.bio ? errors.bio : ''}
                        required
                      />
                    </div>
                  </div>
                </Container>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-2.5">
                <Button className="w-full sm:w-[240px]" variant={'outlined'}>
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-[240px]">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </form>
  );
};

export default DoctorForm;
