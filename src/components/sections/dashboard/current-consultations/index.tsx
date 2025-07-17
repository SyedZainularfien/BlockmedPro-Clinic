'use client';

import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import CustomCheckbox from '@/components/shared/custom-checkbox';
import Modal from '@/components/shared/custom-modal';
import CustomRadioOption from '@/components/shared/custom-radio-check';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import Iconify from '@/components/shared/iconify';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import TextAreaField from '@/components/shared/input-fields/text-area-field';
import { Typography } from '@/components/shared/typography';
import ActivityLogs from '@/components/ui/activity-logs';
import { content } from '@/data';
import { useAppSelector } from '@/redux/hooks';
import { ConsultaionsFormValues, SectionKey } from '@/types';
import { calculateBmi } from '@/utils/calculate-bmi';
import BodyRepresentation from '../../../ui/body-representation';
import Examination from '../../../ui/examination';
import BreastFeedingModal from '../../../ui/modals/breastfeeding-modal';
import DrinkAlcoholModal from '../../../ui/modals/drink-alcohol-modal';
import PregnantModal from '../../../ui/modals/pregnancy-modal';
import PresetModal from '../../../ui/modals/preset-modal';
import SmockedInPastModal from '../../../ui/modals/smocked-in-past-modal';
import SmockingInformationModal from '../../../ui/modals/smoking-information-modal';
import SocialHistory from '../../../ui/social-history';

const CurrentConsultations = () => {
  const { dropDownOptions } = content?.currentConsultations;
  const [openPresetModal, setOpenPresetModal] = useState(false);
  const { selectedPreset, smokingInfo, smokedInPastInfo, alcoholInfo, pregnancyInfo, breastfeedingInfo } =
    useAppSelector((state) => state.currentConsultations);

  const [openSections, setOpenSections] = React.useState<Record<SectionKey, boolean>>({
    bmi: false,
    oxygen: false,
    exertion: false,
    heartRate: false,
    temperature: false,
    severityRate: false,
    bloodPressure: false,
    respirationRate: false,
    neckCircumference: false,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: string;
    action: () => void;
  } | null>(null);

  // State for modal visibility and edit mode
  const [modals, setModals] = useState({
    smokingInfo: false,
    smokedInPast: false,
    alcohol: false,
    pregnancy: false,
    breastfeeding: false,
  });

  const openDeleteModal = (type: string, action: () => void) => {
    setDeleteTarget({ type, action });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget?.action) deleteTarget.action();
    setIsDeleteModalOpen(false);
  };

  const toggleModal = (modalName: keyof typeof modals, isOpen: boolean) => {
    setModals((prev) => ({ ...prev, [modalName]: isOpen }));
  };

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formik = useFormik<ConsultaionsFormValues>({
    initialValues: {
      selectedOption: 'aesthetics',
      selectedSnomedCode: '',
      selectedAssessments: [],
      selectedConsultationType: 'home',
      safetyNetting: false,
      history: selectedPreset || '',
      diagnosis: '',
      actionPlan: '',
      measurements: {
        height: { value: '', unit: 'ft' },
        weight: { value: '', unit: 'lbs' },
        waist: { value: '', unit: 'in' },
        neckCircumference: { value: '', unit: 'in' },
        temperature: { value: '', unit: 'celsius' },
      },
      bmiIndex: 1,
      painSeverityIndex: 0,
      exertion: '',
      examinationNotes: '',
      bmi: '',
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });
  const { values, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    if (selectedPreset) {
      setFieldValue('history', selectedPreset);
    }
  }, [selectedPreset, setFieldValue]);

  useEffect(() => {
    const { height, weight } = formik.values.measurements;
    const bmi = calculateBmi(height, weight);

    if (bmi !== null) {
      let bmiIndex = 0;
      if (bmi < 18.5) bmiIndex = 0;
      else if (bmi < 25) bmiIndex = 1;
      else if (bmi < 30) bmiIndex = 2;
      else if (bmi < 40) bmiIndex = 3;
      else bmiIndex = 4;

      formik.setValues({
        ...formik.values,
        bmi: bmi.toFixed(1),
        bmiIndex,
      });
    } else {
      formik.setFieldValue('bmi', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.measurements.height, formik.values.measurements.weight]);

  const handleChangeAssessment = (value: string) => {
    const newAssessments = values.selectedAssessments.includes(value)
      ? values.selectedAssessments.filter((item) => item !== value)
      : [...values.selectedAssessments, value];
    setFieldValue('selectedAssessments', newAssessments);
  };

  const handleOpenPresetModal = () => {
    setOpenPresetModal(!openPresetModal);
  };

  const snomedCodeOptions = [
    { value: 'code1', label: 'SNOMED Code 1' },
    { value: 'code2', label: 'SNOMED Code 2' },
    { value: 'code3', label: 'SNOMED Code 3' },
  ];

  return (
    <>
      <DashboardWrapper title="Consultations" subTitle="Monitor and Record Patient Vitals & Diagnosis Accurately">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col xl:flex-row gap-5">
            {/* Left side */}
            <section className="w-full xl:w-[70%]">
              <div className="flex flex-col gap-4">
                <div className="w-fit">
                  <InputSelectField
                    value={values.selectedOption}
                    options={dropDownOptions}
                    containerPadding={'2px'}
                    styling="min-w-[235px]"
                    placeholderColor="#FFFFFF"
                    backgroundColor="#2D58E6"
                    onSelect={(value: string) => setFieldValue('selectedOption', value)}
                  />
                </div>
                <Container hasBorders>
                  <div className="flex flex-col gap-6 px-5 py-4 sm:px-7.5 sm:py-6">
                    {/* assessment */}
                    <div className="flex flex-col gap-3.5">
                      <div className="space-y-3">
                        <Typography size={'xl'} className="text-black font-bold">
                          Consultations Details
                        </Typography>
                        <Typography size={'lg'} className="text-black font-bold">
                          Assessment
                        </Typography>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-start items-center gap-6">
                        <div className="w-full sm:w-fit border border-light-gray rounded-xl sm:rounded-2xl p-4">
                          <CustomCheckbox
                            label="Review"
                            lightbackground
                            checked={values.selectedAssessments.includes('review')}
                            id="review"
                            styling="!text-md !font-semibold"
                            onChange={() => handleChangeAssessment('review')}
                          />
                        </div>
                        <div className="w-full sm:w-fit border border-light-gray rounded-xl sm:rounded-2xl p-4">
                          <CustomCheckbox
                            label="Follow-up"
                            lightbackground
                            checked={values.selectedAssessments.includes('follow-up')}
                            id="follow-up"
                            styling="!text-md !font-semibold"
                            onChange={() => handleChangeAssessment('follow-up')}
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="text-light-gray" />
                    {/* consultation type */}
                    <div className="flex flex-col gap-3.5">
                      <Typography size={'lg'} className="text-black font-bold">
                        Consultation Type
                      </Typography>
                      <div className="flex flex-wrap gap-5">
                        <div className="w-full sm:w-fit">
                          <CustomRadioOption
                            id="face-to-face"
                            label="Face to Face Consultation"
                            value="face-to-face"
                            checked={values.selectedConsultationType === 'face-to-face'}
                            onChange={() => setFieldValue('selectedConsultationType', 'face-to-face')}
                          />
                        </div>
                        <div className="w-full sm:w-fit">
                          <CustomRadioOption
                            id="video"
                            label="Video Consultation"
                            value="video"
                            checked={values.selectedConsultationType === 'video'}
                            onChange={() => setFieldValue('selectedConsultationType', 'video')}
                          />
                        </div>
                        <div className="w-full sm:w-fit">
                          <CustomRadioOption
                            id="home-visit"
                            label="Home Visit"
                            value="home-visit"
                            checked={values.selectedConsultationType === 'home-visit'}
                            onChange={() => setFieldValue('selectedConsultationType', 'home-visit')}
                          />
                        </div>
                        <div className="w-full sm:w-fit">
                          <CustomRadioOption
                            id="telephone"
                            label="Telephone Consultation"
                            value="telephone"
                            checked={values.selectedConsultationType === 'telephone'}
                            onChange={() => setFieldValue('selectedConsultationType', 'telephone')}
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="text-light-gray" />
                    {/* body representation */}
                    {values.selectedOption !== 'generalConsultation' && (
                      <div className="">
                        <BodyRepresentation selectedOption={values.selectedOption} />
                      </div>
                    )}
                    <hr className="text-light-gray" />
                    {/* history */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center gap-4">
                        <Typography size={'lg'} className="text-black font-bold">
                          History
                        </Typography>
                        <Iconify
                          width="20"
                          height="20"
                          icon="fa:cogs"
                          onClick={handleOpenPresetModal}
                          className="bg-light-blue rounded p-1 text-primary-dark cursor-pointer"
                        />
                      </div>
                      <TextAreaField
                        name="history"
                        value={values.history}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFieldValue('history', e.target.value)
                        }
                        placeholder="Enter"
                        styling="!min-h-[120px]"
                      />
                    </div>
                    <hr className="text-light-gray" />
                    {/* Social History */}
                    <div>
                      <SocialHistory openDeleteModal={openDeleteModal} toggleModal={toggleModal} />
                    </div>
                    {/* Examination */}
                    <div>
                      <Examination openSections={openSections} toggleSection={toggleSection} formik={formik} />
                    </div>
                    {/* Diagnosis */}
                    <div className="flex flex-col gap-6">
                      <Typography size={'lg'} className="text-black font-bold">
                        Diagnosis
                      </Typography>
                      <InputSelectField
                        label="SNOMED Code"
                        value={values.selectedSnomedCode}
                        options={snomedCodeOptions}
                        onSelect={(value: string) => setFieldValue('selectedSnomedCode', value)}
                      />
                      <TextAreaField
                        name="diagnosis"
                        value={values.diagnosis}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFieldValue('diagnosis', e.target.value)
                        }
                        label="Other Non-SNOMED Diagnosis"
                        placeholder="Enter"
                      />
                      <hr className="text-light-gray" />
                      <TextAreaField
                        name="actionPlan"
                        value={values.actionPlan}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFieldValue('actionPlan', e.target.value)
                        }
                        label="Action Plan"
                        placeholder="Enter"
                        styling="!min-h-[120px]"
                      />
                      <div className="border border-light-gray rounded-xl px-5 py-4">
                        <CustomCheckbox
                          label="Safety Netting advice provided - to contact if worsens, no better or if any new concerns"
                          checked={values.safetyNetting}
                          lightbackground
                          styling="!text-md !font-semibold"
                          onChange={() => setFieldValue('safetyNetting', !values.safetyNetting)}
                        />
                      </div>
                      <hr className="text-light-gray" />
                      <div className="flex justify-end">
                        <Button type="submit" className="min-w-[118px] w-full sm:w-fit">
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </section>
            {/* Activity Logs */}
            <section className="w-full xl:w-[30%]">
              <ActivityLogs />
            </section>
          </div>
        </form>
      </DashboardWrapper>
      {openPresetModal && <PresetModal onClose={() => setOpenPresetModal(false)} />}
      {/* Modals */}
      {modals.smokingInfo && (
        <SmockingInformationModal
          onClose={() => toggleModal('smokingInfo', false)}
          initialValues={smokingInfo || undefined}
        />
      )}
      {modals.smokedInPast && (
        <SmockedInPastModal
          onClose={() => toggleModal('smokedInPast', false)}
          initialValues={smokedInPastInfo || undefined}
        />
      )}
      {modals.alcohol && (
        <DrinkAlcoholModal onClose={() => toggleModal('alcohol', false)} initialValues={alcoholInfo || undefined} />
      )}
      {modals.pregnancy && (
        <PregnantModal onClose={() => toggleModal('pregnancy', false)} initialValues={pregnancyInfo || undefined} />
      )}
      {modals.breastfeeding && (
        <BreastFeedingModal
          onClose={() => toggleModal('breastfeeding', false)}
          initialValues={breastfeedingInfo || undefined}
        />
      )}

      {isDeleteModalOpen && (
        <Modal
          title="Delete"
          confirmButtonText="Delete"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default CurrentConsultations;
