'use client';

import { useFormik } from 'formik';
import React from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Iconify from '@/components/shared/iconify';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import TextAreaField from '@/components/shared/input-fields/text-area-field';
import { Typography } from '@/components/shared/typography';
import { addNewTicketValues } from '@/formik/initial-values/dashboard';
import { addNewTicketValidationSchema } from '@/formik/validations/dashboard';
import { IAddNewTicketFormValues } from '@/types';

const AddNewTicket = () => {
  const formik = useFormik<IAddNewTicketFormValues>({
    initialValues: addNewTicketValues,
    validationSchema: addNewTicketValidationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      }));

      formik.setFieldValue('attachments', [...formik.values.attachments, ...newFiles]);
    }
  };

  const removeFile = (id: number) => {
    formik.setFieldValue(
      'attachments',
      formik.values.attachments.filter((file) => file.id !== id)
    );
  };

  return (
    <DashboardWrapper
      backButton
      title="Create new ticket"
      subTitle="Operator of our support service will answer you within 1-24 hours"
    >
      <Container hasBorders styling="w-full xl:w-[65%]">
        <form onSubmit={formik.handleSubmit} className="py-5 sm:py-6.5 px-6 sm:px-10 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-2.5">
            <div className="w-full">
              <InputTextField
                name="name"
                label="Name"
                styling="!w-full"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
              />
            </div>
            <div className="w-full">
              <InputTextField
                name="email"
                label="Email"
                styling="!w-full"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
              />
            </div>
          </div>
          <InputTextField
            label="Subject"
            name="subject"
            placeholder="Subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subject && formik.errors.subject ? formik.errors.subject : ''}
          />
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-2.5">
            <InputSelectField
              label="Department"
              styling="w-full"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.department && formik.errors.department ? formik.errors.department : ''}
              options={[
                { label: 'Department 1', value: '1' },
                { label: 'Department 2', value: '2' },
                { label: 'Department 3', value: '3' },
              ]}
            />
            <InputSelectField
              label="Priority"
              styling="w-full"
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.priority && formik.errors.priority ? formik.errors.priority : ''}
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
              ]}
            />
          </div>
          <TextAreaField
            label="Message"
            name="message"
            labelStyles="!text-md"
            placeholder="Enter Message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && formik.errors.message ? formik.errors.message : ''}
          />
          <div className="w-full sm:w-1/2 flex flex-col gap-2">
            <Typography size="md" className="text-black font-semibold">
              Attachments
            </Typography>
            <div className="bg-white border border-light-gray p-1.5 rounded-[10px]">
              <label className="flex items-center gap-4 cursor-pointer">
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" multiple />
                <div className="bg-primary-dark text-white px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2">
                  <Iconify icon="gala:upload" className="w-4 h-4" />
                  <Typography size="md" className="text-white font-semibold">
                    Choose file
                  </Typography>
                </div>
                <Typography size={'sm'} className="text-dark-gray ml-4">
                  Max file size limit 5mb.
                </Typography>
              </label>
            </div>
            {formik.values.attachments.length > 0 && <hr className="text-light-gray my-2" />}

            {/* Uploaded Files */}
            <div className="max-h-[220px] overflow-y-auto custom-scrollbar pl-2 pr-3">
              <div className="space-y-3">
                {formik.values.attachments.map((file) => (
                  <div key={file.id} className="flex items-center justify-between">
                    <div className="flex flex-col items-start justify-center sm:flex-row sm:items-center sm:justify-between w-2/3 gap-1 sm:gap-4">
                      <div>
                        <Typography size={'sm'} as={'p'} className="text-dark-gray truncate max-w-[140px]">
                          {file.name}
                        </Typography>
                      </div>
                      <div>
                        <Typography size={'sm'} as={'p'} className="text-dark-gray text-left">
                          {file.size}
                        </Typography>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFile(file.id)} className="text-red-500">
                      <Iconify size={20} icon="material-symbols:cancel-outline-rounded" className="ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="text-light-gray" />
          <div className="flex justify-end items-center">
            <Button type="submit" className="w-full sm:w-[160px]">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </DashboardWrapper>
  );
};

export default AddNewTicket;
