import React, { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import { IActionButtonProps, IBillingDetailsCardProps, InfoRowProps } from '@/types';
import Container from '../../shared/container';
import { Typography } from '../../shared/typography';

const BillingDetailsCard: FC<IBillingDetailsCardProps> = ({ action = false, item = {}, cardKey }) => {
  const { address, region, postalCode } = item || {};
  const hasAddress = Boolean(address);
  const hasRegion = Boolean(region);
  const hasPostalCode = Boolean(postalCode);
  const hasNoData = !hasAddress && !hasRegion && !hasPostalCode;

  const ActionButton: FC<IActionButtonProps> = ({ icon, label, color, disabled = false }) => (
    <button
      disabled={disabled}
      className={`flex items-center gap-1.5 ${
        disabled ? 'opacity-50 text-dark-gray cursor-not-allowed' : `cursor-pointer text-${color}`
      }`}
    >
      <Iconify icon={icon} width="16" height="16" className={`${disabled ? 'text-dark-gray' : `text-${color}`}`} />
      <Typography as="p" size="sm" className="font-semibold">
        {label}
      </Typography>
    </button>
  );

  const InfoRow: FC<InfoRowProps> = ({ label, value, missing }) => (
    <div className="flex gap-3">
      <div className="w-1/3 md:w-1/4 lg:w-1/5">
        <Typography as="p" size="md" className="text-black font-normal">
          {label}:
        </Typography>
      </div>
      <div className="w-2/3 md:w-3/4 lg:w-4/5">
        <Typography as="p" size="md" className="text-black font-semibold">
          {value || `No ${missing} found`}
        </Typography>
      </div>
    </div>
  );

  return (
    <Container hasBorders key={cardKey} styling="rounded-xl flex flex-col gap-3 p-4 sm:p-6 relative !shadow-none">
      {action && (
        <div className="absolute flex gap-2 sm:gap-3 top-3 right-3 sm:right-4">
          <ActionButton icon="fluent:delete-28-regular" label="Delete" color="red" />
          <ActionButton icon="lets-icons:edit" label="Edit" color="primary-dark" />
        </div>
      )}

      {hasNoData ? (
        <Typography as="p" size="md" className="text-black font-semibold text-center py-2">
          No billing address available for this card.
        </Typography>
      ) : (
        <div className={`flex flex-col gap-3 ${action ? 'pt-3' : ''}`}>
          <InfoRow label="Address" value={address} missing="address" />
          <InfoRow label="Country" value={region} missing="region" />
          <InfoRow label="Postal Code" value={postalCode} missing="postal code" />
        </div>
      )}
    </Container>
  );
};

export default BillingDetailsCard;
