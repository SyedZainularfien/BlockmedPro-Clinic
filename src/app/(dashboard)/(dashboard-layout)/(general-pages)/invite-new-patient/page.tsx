'use client';

import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Iconify from '@/components/shared/iconify';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import Tooltip from '@/components/shared/tooltip';
import { Typography } from '@/components/shared/typography';
import InvitePatientModal from '@/components/ui/modals/invite-patient-modal';
import SuccessModal from '@/components/ui/modals/success-modal';
import { inviteNewUsersInitialValues } from '@/formik/initial-values/dashboard';
import { InvitePatientSchema } from '@/formik/validations/auth';

const InviteNewPatient = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [emailErrors, setEmailErrors] = useState<Record<number, string>>({});
  console.log('🚀 ~ InviteNewPatient ~ emailErrors:', emailErrors);

  const registeredEmails = ['zunigavanessa@smith.info', 'beckycarr@hogan.com'];

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate multiple emails before submission
  const validateMultipleEmails = () => {
    const errors: Record<number, string> = {};
    let hasValidEmails = false;

    emails?.forEach((email, index) => {
      const trimmedEmail = email?.trim();
      if (!trimmedEmail) {
        errors[index] = 'Email is required';
      } else if (!isValidEmail(trimmedEmail)) {
        errors[index] = 'Invalid email format';
      } else if (registeredEmails?.includes(trimmedEmail)) {
        errors[index] = 'This email is already registered as patient.';
      } else {
        hasValidEmails = true;
      }
    });

    setEmailErrors(errors);
    return { hasValidEmails, errors };
  };

  const formik = useFormik({
    initialValues: inviteNewUsersInitialValues,
    validationSchema: InvitePatientSchema,
    onSubmit: (values) => {
      // Handle multiple emails from CSV
      if (emails.length > 0) {
        const { hasValidEmails, errors } = validateMultipleEmails();

        if (!hasValidEmails || Object.keys(errors).length > 0) {
          console.log('Validation failed for multiple emails');
          return;
        }

        console.log('Sending invites to:', emails);
        setShowSentModal(true);
      }
      // Handle single email input
      else {
        console.log('Sending invite to:', values.email);
        setShowSentModal(true);
      }
    },
  });

  const handleMultipleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (emails.length > 0) {
      const { hasValidEmails, errors } = validateMultipleEmails();

      if (!hasValidEmails || Object.keys(errors).length > 0) {
        console.log('Validation failed for multiple emails');
        return;
      }

      console.log('Sending invites to:', emails);
      setShowSentModal(true);
    } else {
      // Let formik handle single email submission
      formik.handleSubmit(e as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleCsvClick = () => {
    fileInputRef.current?.click();
  };

  // Email validation regex pattern
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setShowModal(true);
    setUploadProgress(0);
    setUploadComplete(false);
    setEmailErrors({}); // reset errors

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;

      const allEmails = text.match(emailRegex) || [];
      const uniqueEmails = [...new Set(allEmails)].filter((email) => email.trim() !== '');

      if (uniqueEmails.length === 0) {
        setEmails(['']); // set empty string to trigger rendering input
        setEmailErrors({ 0: 'No valid email addresses found in the uploaded CSV file.' });
        setShowModal(false);
        return;
      }

      const newEmailErrors: Record<number, string> = {};
      const filteredEmails: string[] = [];

      uniqueEmails.forEach((email, index) => {
        if (registeredEmails.includes(email)) {
          newEmailErrors[index] = 'This email is already registered as patient.';
        }
        filteredEmails.push(email);
      });

      setEmails(filteredEmails);
      setEmailErrors(newEmailErrors);
    };
    reader.readAsText(file);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadComplete(true);
      }
    }, 100);
  };

  // Function to handle multiple invite submissions
  const handleCloseModal = () => {
    console.log('Sending invites to:', emails);

    setShowModal(false);
  };

  const handleDeleteEmail = (index: number) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);

    // clear error on delete
    setEmailErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  return (
    <>
      <DashboardWrapper title="Register new patient" subTitle="Effortlessly Register New Patients.">
        <Container hasBorders>
          <form onSubmit={handleMultipleEmailSubmit}>
            <div className="relative w-full flex flex-col items-start justify-between">
              <div className="px-5 sm:px-10 py-5 sm:py-8 flex flex-col gap-0.5 w-full xl:w-1/2 z-20">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex flex-col gap-1">
                      <Typography size={'xl'} className="text-black font-bold">
                        Invite New Patient
                      </Typography>
                      <Typography size={'md'} className="text-dark-gray font-normal max-w-[460px]">
                        Enter new patient`s email to help them register on Blockmed Pro and book appointments directly
                        with your clinic.
                      </Typography>
                    </div>
                    <div>
                      <div className="flex justify-end relative right-0 top-5">
                        <Tooltip
                          message={
                            'Upload a CSV file to import patient emails. The system will automatically extract all email addresses from the file.'
                          }
                          trigger="hover"
                        >
                          <Iconify
                            onClick={handleCsvClick}
                            icon="eos-icons:csv-file"
                            width="24"
                            height="24"
                            className="text-primary-dark cursor-pointer"
                          />
                        </Tooltip>
                        <input
                          type="file"
                          accept=".csv"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {emails?.length > 0 ? (
                          emails?.map((email, index) => (
                            <div key={index} className="relative">
                              <InputTextField
                                label={index === 0 ? `Email` : undefined}
                                name={`email-${index}`}
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                  const updatedEmails = [...emails];
                                  updatedEmails[index] = e.target.value;
                                  setEmails(updatedEmails);

                                  // clear error on change
                                  setEmailErrors((prev) => {
                                    const newErrors = { ...prev };
                                    delete newErrors[index];
                                    return newErrors;
                                  });
                                }}
                                error={emailErrors[index]}
                                className="pr-12"
                              />

                              <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer flex justify-center items-center text-red hover:text-red-600 transition-colors"
                                onClick={() => handleDeleteEmail(index)}
                                style={{
                                  top:
                                    index === 0 && emailErrors[index]
                                      ? '48%'
                                      : index === 0
                                        ? 'calc(50% + 15px)'
                                        : emailErrors[index]
                                          ? '35%'
                                          : '50%',
                                }}
                              >
                                <Iconify icon="mdi:delete" width="20" height="20" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <InputTextField
                            label="Email"
                            name="email"
                            placeholder="Enter email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email ? formik.errors.email : ''}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2.5">
                    <button
                      type="button"
                      className="w-full md:w-[40%] cursor-pointer flex justify-center items-center gap-1.5 text-lg py-3 px-6 border border-primary-light rounded-[12px] text-primary-light"
                    >
                      <Iconify
                        icon="ri:link"
                        width="20"
                        height="20"
                        className="bg-primary-light text-white rounded-full p-1"
                      />
                      <Typography>Copy Link</Typography>
                    </button>
                    <Button type="submit" className="w-full md:w-[60%]">
                      Send Invite Link
                    </Button>
                  </div>
                </div>
              </div>
              <Image
                src="/assets/svgs/logo-2.svg"
                height={200}
                width={430}
                alt="bg-logo"
                className="absolute top-0 right-0 z-10 hidden xl:block"
              />
            </div>
          </form>
        </Container>
      </DashboardWrapper>
      {showModal && (
        <InvitePatientModal
          uploadComplete={uploadComplete}
          setShowModal={setShowModal}
          uploadProgress={uploadProgress}
          handleCloseModal={handleCloseModal}
        />
      )}
      {showSentModal && (
        <SuccessModal
          isModal
          buttonText="Done"
          title="Invite Sent"
          setIsOpen={setShowSentModal}
          subTitle="Your clinic`s invitation link has been sent successfully."
        />
      )}
    </>
  );
};

export default InviteNewPatient;
