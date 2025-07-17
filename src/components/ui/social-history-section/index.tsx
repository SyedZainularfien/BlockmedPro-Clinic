import React, { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { ISocialHistorySectionProps } from '@/types';

const SocialHistorySection: FC<ISocialHistorySectionProps> = ({
  title,
  info,
  fields,
  modalName,
  clearAction,
  openDeleteModal,
  toggleModal,
}) => {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex justify-between items-center">
        <Typography size={'md'} as={'p'} className="text-black font-semibold">
          {title}
        </Typography>
        <div className="flex gap-2">
          {info && (
            <div onClick={() => openDeleteModal(title, clearAction)} className="cursor-pointer">
              <Iconify icon="fluent:delete-28-filled" size={24} className="text-white bg-red rounded-md p-1" />
            </div>
          )}
          {info ? (
            <div onClick={() => toggleModal(modalName, true)} className="cursor-pointer">
              <Iconify
                icon={'fluent:edit-12-regular'}
                size={24}
                className="text-white bg-primary-dark rounded-md p-1"
              />
            </div>
          ) : (
            <div
              onClick={() => toggleModal(modalName, true)}
              className="flex justify-start items-center gap-1.5 cursor-pointer"
            >
              <Iconify icon="gala:add" size={24} className="text-primary-light" />
              <Typography size={'md'} as={'p'} className="text-primary-light font-semibold">
                Add
              </Typography>
            </div>
          )}
        </div>
      </div>

      {info && (
        <div className="bg-background-gray rounded-xl p-5">
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => {
              const isLast = index === fields.length - 1;
              const borderClass = isLast ? '' : 'border-b border-light-gray pb-4';

              return (
                <div key={field.key} className="flex gap-7.5">
                  <div className={`w-[39%] ${borderClass}`}>
                    <Typography size={'md'} className="text-dark-gray font-semibold">
                      {field.label}
                    </Typography>
                  </div>
                  <div className={`w-[61%] ${borderClass}`}>
                    <Typography size={'md'} className="text-black font-semibold">
                      {info[field.key] || '--'}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <hr className="text-light-gray mt-4" />
    </div>
  );
};

export default SocialHistorySection;
