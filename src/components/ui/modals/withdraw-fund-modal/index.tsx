'use client';

import React, { FC } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import InputNumberField from '@/components/shared/input-fields/input-number-field';
import ModalWrapper from '@/components/shared/modal-wrapper';
import { Typography } from '@/components/shared/typography';
import { IWithdrawFundModalProps } from '@/types';

const WithdrawFundModal: FC<IWithdrawFundModalProps> = ({
  onClose,
  values,
  errors,
  touched,
  isValid,
  handleSubmit,
  handleChange,
  handleBlur,
  availableBalance = 0,
}) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <ModalWrapper onClose={onClose} title="Withdraw Funds" titleStyling="text-left !text-[24px] text-primary-light">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-4">
          {/* Withdraw To Section */}
          <div className="flex flex-col gap-3">
            <Typography size="md" className="font-semibold text-black">
              Withdraw To
            </Typography>

            <Container styling="p-4 border border-light-gray">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <Typography size="md" className="font-medium text-black">
                    Bank Name (XXXX) | USD
                  </Typography>
                  <div className="flex flex-col gap-1">
                    <Typography size="sm" className="text-gray-500 uppercase tracking-wide">
                      IBAN
                    </Typography>
                    <Typography size="sm" className="text-gray-500">
                      XXXXXXXXXXXXXXXXXXXXXXX
                    </Typography>
                  </div>
                </div>
                <Typography
                  size="md"
                  className="text-dark-gray underline-offset-3 underline cursor-pointer hover:underline"
                >
                  Change Bank
                </Typography>
              </div>
            </Container>
          </div>

          {/* Amount Section */}
          <div className="flex flex-col gap-2.5">
            <InputNumberField
              type="number"
              value={values.amount}
              name="amount"
              error={touched.amount && errors.amount ? errors.amount : ''}
              onBlur={handleBlur}
              required
              label="Amount"
              onChange={handleChange}
              placeholder="Enter Amount Here"
            />

            <div className="flex justify-between items-center border-b border-light-gray pb-2">
              <Typography size="md" className="text-dark-gray">
                Available balance
              </Typography>
              <Typography size="md" className="text-dark-gray font-medium">
                $ {availableBalance}
              </Typography>
            </div>
          </div>
          {/* Info Text */}
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 bg-dark-gray rounded-full mt-2 flex-shrink-0"></div>
            <Typography size="sm" className="text-dark-gray leading-relaxed">
              Instantly access your funds with our streamlined withdrawal process.
            </Typography>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <Button type="submit" variant="primary" size="medium" disabled={!isValid} className="w-full py-4">
              Withdraw
            </Button>

            <Button type="button" variant="outlined" size="medium" onClick={handleCancel} className="w-full py-4">
              Cancel
            </Button>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default WithdrawFundModal;
