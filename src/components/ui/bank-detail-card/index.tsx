import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import RadioGroup from '@/components/shared/radio-group';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { bankDetailsForm } from '@/formik/forms/dashboard';
import { bankDetailsInitialValues } from '@/formik/initial-values/dashboard';
import { bankDetailsSchema } from '@/formik/validations/dashboard';
import { IBankDetailsCardProps } from '@/types';
import { getError, getTouched } from '@/utils/form-helpers';

const BankDetailsCard: React.FC<IBankDetailsCardProps> = ({
  bankDetailsData,
  setBankDetailsData,
  setAccountDetails,
}) => {
  const formik = useFormik({
    initialValues: bankDetailsInitialValues,
    validationSchema: bankDetailsSchema,
    onSubmit: (values) => {
      setBankDetailsData(values);
      setAccountDetails(true);
    },
  });

  const { bankCountryOptions, bankAccountCurrencyOptions } = content?.AddNewBank;

  const [bankDetails, setBankDetails] = useState(true);
  const {
    formFields: { bankAccountType, bankCountry, bankAccountCurrency },
  } = bankDetailsForm;
  return (
    <Container hasBorders styling="p-5 md:py-8 md:px-10 overflow-hidden">
      <div className={`flex flex-col`}>
        {bankDetailsData ? (
          <>
            <div className="flex items-center justify-between gap-5">
              <Typography size="h5" as="h5" className="text-primary-text">
                Enter Bank Details
              </Typography>
              <div className="flex items-center justify-center">
                <Typography
                  onClick={() => {
                    setBankDetailsData(null);
                    setAccountDetails(false);
                  }}
                  size="lg"
                  as="p"
                  className="text-primary-dark font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Edit
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-8 h-full w-full lg:w-[65%]">
              <div className="grid grid-cols-2 gap-2">
                <Typography size="lg" as="p" className="text-primary-text font-semibold">
                  Account Type
                </Typography>
                <Typography size="lg" as="p" className="text-dark-gray font-medium capitalize">
                  {bankDetailsData.bankAccountType}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Typography size="lg" as="p" className="text-primary-text font-semibold">
                  Bank Country
                </Typography>
                <Typography size="lg" as="p" className="text-dark-gray font-medium capitalize">
                  {bankDetailsData.bankCountry}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Typography size="lg" as="p" className="text-primary-text font-semibold">
                  Currency
                </Typography>
                <Typography size="lg" as="p" className="text-dark-gray font-medium capitalize">
                  {bankDetailsData.bankAccountCurrency}
                </Typography>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="flex items-center justify-between gap-5 cursor-pointer"
              onClick={() => setBankDetails(!bankDetails)}
            >
              <Typography size="h5" as="h5" className="text-primary-text">
                Enter Bank Details
              </Typography>
              <div className="flex items-center justify-center">
                <Iconify
                  className={`text-dark-gray duration-300 transition-all cursor-pointer ${bankDetails && 'rotate-90'}`}
                  icon="lucide:chevron-right"
                  height={28}
                  width={28}
                />
              </div>
            </div>
            <div
              className={`transition-[max-height] duration-500`}
              style={{
                maxHeight: bankDetails ? '1000px' : '0px',
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
                    <RadioGroup
                      optionsParentClassName="gap-20"
                      label=" Bank Account Type"
                      name="bankAccountType"
                      options={[
                        { label: 'Personal', value: 'personal' },
                        { label: 'Business', value: 'business' },
                      ]}
                      value={formik?.values?.bankAccountType}
                      onChange={(value: string) => formik.setFieldValue('bankAccountType', value)}
                      error={getError(bankAccountType.name, formik.touched, formik.errors)}
                      touched={getTouched(bankAccountType.name, formik.touched, formik.errors)}
                    />

                    <InputSelectField
                      label={bankDetailsForm.formFields.bankCountry.label}
                      placeholder={bankDetailsForm.formFields.bankCountry.placeholder}
                      name={bankDetailsForm.formFields.bankCountry.name}
                      options={bankCountryOptions}
                      value={bankCountryOptions.find((option) => option.value === formik.values.bankCountry)}
                      textColor="text-primary-text !m-0"
                      selectedTextColor="#312d2d"
                      height="h-[3.65rem]"
                      onSelect={(selected) => formik.setFieldValue('bankCountry', selected)}
                      className="rounded-xl"
                      error={getError(bankCountry.name, formik.touched, formik.errors)}
                      touched={getTouched(bankCountry.name, formik.touched, formik.errors)}
                      onBlur={formik.handleBlur}
                    />
                    <InputSelectField
                      label={'Bank Account Type'}
                      placeholder={bankDetailsForm.formFields.bankAccountCurrency.placeholder}
                      name={'bankAccountType'}
                      options={bankAccountCurrencyOptions}
                      value={bankAccountCurrencyOptions.find(
                        (option) => option.value === formik.values.bankAccountCurrency
                      )}
                      textColor="text-primary-text !m-0"
                      selectedTextColor="#312d2d"
                      height="h-[3.65rem]"
                      onSelect={(selected) => formik.setFieldValue('bankAccountCurrency', selected)}
                      className="rounded-xl"
                      error={getError(bankAccountCurrency.name, formik.touched, formik.errors)}
                      touched={getTouched(bankAccountCurrency.name, formik.touched, formik.errors)}
                      onBlur={formik.handleBlur}
                      menuPlacement="top"
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
          </>
        )}
      </div>
    </Container>
  );
};

export default BankDetailsCard;
