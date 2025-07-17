import { FormikProvider, useFormik } from 'formik';
import React from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import InputNumberField from '@/components/shared/input-fields/input-number-field';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { accountDetailsForm } from '@/formik/forms/dashboard';
import { accountDetailsInitialValues } from '@/formik/initial-values/dashboard';
import { accountDetailsSchema } from '@/formik/validations/dashboard';
import { IAccountDetailsCardProps } from '@/types';
import { getError, getTouched } from '@/utils/form-helpers';

const AccountDetailsCard = ({ enableForm, accountDetails, setAccountDetails }: IAccountDetailsCardProps) => {
  const {
    formFields: { bankName, accountHolderName, accountNumber, bankSortCode },
  } = accountDetailsForm;

  const formik = useFormik({
    initialValues: accountDetailsInitialValues,
    validationSchema: accountDetailsSchema,
    onSubmit: () => {},
  });
  const { bankNameOptions } = content?.AddNewBank;

  return (
    <Container hasBorders styling="p-5 md:py-8 md:px-10">
      <div className={`flex flex-col`}>
        <div
          className={`flex items-center justify-between gap-5 ${enableForm ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          onClick={() => {
            if (enableForm) {
              setAccountDetails(!accountDetails);
            }
          }}
        >
          <Typography size="h5" as="h5" className="text-primary-text">
            Enter Account Details
          </Typography>
          <div className="flex items-center justify-center">
            <Iconify
              className={`text-dark-gray duration-300 transition-all cursor-pointer ${accountDetails && 'rotate-90'}`}
              icon="lucide:chevron-right"
              height={28}
              width={28}
            />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-[max-height] duration-500`}
          style={{
            maxHeight: accountDetails ? '1000px' : '0px',
          }}
        >
          <FormikProvider value={formik}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              className="flex flex-col gap-6 pt-8 h-full"
            >
              <div className="flex flex-col gap-6 h-full">
                <InputSelectField
                  label={accountDetailsForm.formFields.bankName.label}
                  placeholder={accountDetailsForm.formFields.bankName.placeholder}
                  name={accountDetailsForm.formFields.bankName.name}
                  options={bankNameOptions}
                  textColor="text-primary-text !m-0"
                  value={bankNameOptions.find((option) => option.value === formik.values.bankName)}
                  selectedTextColor="#312d2d"
                  height="h-[3.65rem]"
                  className="rounded-xl"
                  onSelect={(selected: any) => formik.setFieldValue('bankName', selected)}
                  error={getError(bankName.name, formik.touched, formik.errors)}
                  touched={getTouched(bankName.name, formik.touched, formik.errors)}
                  onBlur={formik.handleBlur}
                />
                <InputTextField
                  label={accountDetailsForm.formFields.accountHolderName.label}
                  placeholder={accountDetailsForm.formFields.accountHolderName.placeholder}
                  name={accountDetailsForm.formFields.accountHolderName.name}
                  type="text"
                  value={formik.values.accountHolderName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={getError(accountHolderName.name, formik.touched, formik.errors)}
                  touched={getTouched(accountHolderName.name, formik.touched, formik.errors)}
                />
                <InputNumberField
                  label={accountDetailsForm.formFields.accountNumber.label}
                  placeholder={accountDetailsForm.formFields.accountNumber.placeholder}
                  name={accountDetailsForm.formFields.accountNumber.name}
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={getError(accountNumber.name, formik.touched, formik.errors)}
                  touched={getTouched(accountNumber.name, formik.touched, formik.errors)}
                />
                <InputNumberField
                  label={accountDetailsForm.formFields.bankSortCode.label}
                  placeholder={accountDetailsForm.formFields.bankSortCode.placeholder}
                  name={accountDetailsForm.formFields.bankSortCode.name}
                  value={formik.values.bankSortCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={getError(bankSortCode.name, formik.touched, formik.errors)}
                  touched={getTouched(bankSortCode.name, formik.touched, formik.errors)}
                />
              </div>

              <div className="w-full pt-4 pb-1">
                <Button
                  variant="primary"
                  size="medium"
                  className="w-full"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Next
                </Button>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </Container>
  );
};

export default AccountDetailsCard;
