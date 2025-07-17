'use client';

import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '@/components/shared/typography';
import {
  clearAlcoholInfo,
  clearBreastfeedingInfo,
  clearPregnancyInfo,
  clearSmokedInPastInfo,
  clearSmokingInfo,
} from '@/redux/slices/current-consultations';
import { RootState } from '@/redux/store';
import { ISocialHistoryProps } from '@/types';
import SocialHistorySection from '../social-history-section';

const SocialHistory: FC<ISocialHistoryProps> = ({ openDeleteModal, toggleModal }) => {
  const dispatch = useDispatch();
  const { smokingInfo, smokedInPastInfo, alcoholInfo, pregnancyInfo, breastfeedingInfo } = useSelector(
    (state: RootState) => state.currentConsultations
  );

  return (
    <>
      <section className="flex flex-col gap-6">
        <Typography size={'lg'} as={'p'} className="text-black font-bold">
          Social History
        </Typography>
        <div className="flex flex-col gap-5.5">
          {/* Smoking Information Section */}
          <SocialHistorySection
            title="Smoking Information"
            info={smokingInfo}
            fields={[
              { label: 'Smoking Type', key: 'smokingType' },
              { label: 'How Often', key: 'howOften' },
              { label: 'How long Have Been Smoking', key: 'howLong' },
              { label: 'Want to Quit?', key: 'wantToQuit' },
            ]}
            modalName="smokingInfo"
            clearAction={() => dispatch(clearSmokingInfo())}
            openDeleteModal={openDeleteModal}
            toggleModal={toggleModal}
          />

          {/* Smoked in Past Section */}
          <SocialHistorySection
            title="Smoked in Past?"
            info={smokedInPastInfo}
            fields={[
              { label: 'Smoking Type', key: 'smokingType' },
              { label: 'How Often', key: 'howOften' },
              { label: 'How long Did You Been Smoking', key: 'howLong' },
              { label: 'How Much Did You Smoke', key: 'howMuch' },
              {
                label: 'Do any members of your household currently or have previously smoked?',
                key: 'householdSmoking',
              },
            ]}
            modalName="smokedInPast"
            clearAction={() => dispatch(clearSmokedInPastInfo())}
            openDeleteModal={openDeleteModal}
            toggleModal={toggleModal}
          />

          {/* Drink Alcohol Section */}
          <SocialHistorySection
            title="Drink Alcohol?"
            info={alcoholInfo}
            fields={[
              { label: 'How Often do you drink alcohol?', key: 'frequency' },
              { label: 'How much do you drink?', key: 'quantity' },
              { label: 'History of alcohol dependence or excess?', key: 'dependence' },
            ]}
            modalName="alcohol"
            clearAction={() => dispatch(clearAlcoholInfo())}
            openDeleteModal={openDeleteModal}
            toggleModal={toggleModal}
          />

          {/* Pregnancy Section */}
          <SocialHistorySection
            title="Are you Pregnant"
            info={pregnancyInfo}
            fields={[
              { label: 'Are you pregnant?', key: 'isPregnant' },
              { label: 'Estimated Due Date(EDD)?', key: 'dueDate' },
            ]}
            modalName="pregnancy"
            clearAction={() => dispatch(clearPregnancyInfo())}
            openDeleteModal={openDeleteModal}
            toggleModal={toggleModal}
          />

          {/* Breastfeeding Section */}
          <SocialHistorySection
            title="Breastfeeding?"
            info={breastfeedingInfo}
            fields={[{ label: 'Are you currently Breastfeeding?', key: 'isBreastfeeding' }]}
            modalName="breastfeeding"
            clearAction={() => dispatch(clearBreastfeedingInfo())}
            openDeleteModal={openDeleteModal}
            toggleModal={toggleModal}
          />
        </div>
      </section>
    </>
  );
};

export default SocialHistory;
