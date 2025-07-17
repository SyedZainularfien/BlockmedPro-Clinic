'use client';

import { useFormik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import InputPhoneField from '@/components/shared/input-fields/input-phone-no-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { clinicInfoSchema } from '@/formik/validations/dashboard';

const ClinicInfo = () => {
  const clinicDetails = content?.clinicDetails;
  const formik = useFormik({
    initialValues: {
      clinicName: clinicDetails?.info?.clinicName || '',
      email: clinicDetails?.contact?.email || '',
      registeredIn: clinicDetails?.info?.registeredIn || '',
      postalCode: clinicDetails?.info?.postalCode || '',
      registrationNo: clinicDetails?.info?.registrationNo || '',
      vatRegistarationNo: clinicDetails?.info?.vatRegistarationNo || '',
      phone: clinicDetails?.contact?.phone || '',
      address: clinicDetails?.contact?.address || '',
      image: clinicDetails?.image,
    },
    validationSchema: clinicInfoSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      toast.success('Clinic information updated successfully!');
    },
  });

  const { values, errors, touched, handleReset, handleChange, handleSubmit } = formik;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      formik.setFieldValue('image', imageUrl);
    }
  };

  return (
    <Container hasBorders>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-5 px-5 sm:py-7.5 sm:px-10">
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
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <Typography size={'lg'} className="text-black font-bold">
              Clinic Info
            </Typography>
            <Container hasBorders>
              <div className="p-4 sm:p-10 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-start">
                  <div className="w-full">
                    <InputTextField
                      name="clinicName"
                      label="Clinic Name"
                      value={values.clinicName}
                      onChange={handleChange}
                      error={touched.clinicName && errors.clinicName ? errors.clinicName : ''}
                    />
                  </div>
                  <div className="w-full">
                    <InputTextField
                      name="email"
                      label="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && errors.email ? errors.email : ''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-start">
                  <div className="w-full">
                    <InputTextField
                      name="registeredIn"
                      label="Company Registered In"
                      value={values.registeredIn}
                      onChange={handleChange}
                      error={touched.registeredIn && errors.registeredIn ? errors.registeredIn : ''}
                    />
                  </div>
                  <div className="w-full">
                    <InputTextField
                      name="postalCode"
                      label="Postal Code"
                      value={values.postalCode}
                      onChange={handleChange}
                      error={touched.postalCode && errors.postalCode ? errors.postalCode : ''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-start">
                  <div className="w-full">
                    <InputTextField
                      name="registrationNo"
                      label="Registration No"
                      value={values.registrationNo}
                      onChange={handleChange}
                      error={touched.registrationNo && errors.registrationNo ? errors.registrationNo : ''}
                    />
                  </div>
                  <div className="w-full">
                    <InputTextField
                      name="vatRegistarationNo"
                      label="VAT Registration No"
                      value={values.vatRegistarationNo}
                      onChange={handleChange}
                      error={touched.vatRegistarationNo && errors.vatRegistarationNo ? errors.vatRegistarationNo : ''}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-start">
                  <div className="w-full">
                    <InputPhoneField
                      name="phone"
                      label="Phone No"
                      value={values.phone}
                      onChange={handleChange}
                      error={touched.phone && errors.phone ? errors.phone : ''}
                    />
                  </div>
                  <div className="w-full">
                    <InputTextField
                      name="address"
                      label="Address"
                      value={values.address}
                      onChange={handleChange}
                      error={touched.address && errors.address ? errors.address : ''}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-start sm:items-center gap-2.5">
            <Button type="button" variant="outlined" className="w-full max-w-[250px]" onClick={handleReset}>
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

export default ClinicInfo;
