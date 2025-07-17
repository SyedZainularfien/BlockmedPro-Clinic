'use client';

import React, { FC, useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import CustomCheckbox from '@/components/shared/custom-checkbox';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DateRange from '@/components/shared/date-range';
import Iconify from '@/components/shared/iconify';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import SearchInput from '@/components/shared/input-fields/search-bar';
import Tooltip from '@/components/shared/tooltip';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import AlllergiesCard from '../allergies-card';
import PrescriptionTable from '../prescription-table';

const PrescriptionAndRecords: FC = () => {
  const { prescriptionData, pharmaciesOptions, recordsTableData, allergyData } = useMemo(
    () => content.prescriptionAndRecords,
    []
  );

  const [comment, setComments] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [records, setRecords] = useState(recordsTableData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [prescriptionTableData, setPrescriptionTableData] = useState(prescriptionData);
  const [selectedPharmacy, setSelectedPharmacy] = useState(pharmaciesOptions[0]?.value);

  const handleSave = useCallback(() => {
    console.log('Save button clicked', prescriptionTableData);
  }, [prescriptionTableData]);

  const handleCheckboxChange = useCallback(() => {
    setIsChecked((prev) => !prev);
  }, []);

  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setComments(e.target.value);
  }, []);

  const handlePharmacyChange = useCallback((value: string) => {
    setSelectedPharmacy(value);
  }, []);

  const renderRecords = useMemo(
    () =>
      records.map((item, index) => (
        <div key={`record-${index}`} className="flex flex-col gap-2.5 w-full">
          <div className="p-5 border border-light-gray rounded-xl grid grid-cols-3 gap-4 items-start w-full">
            <div className="flex justify-start">
              <div className="flex flex-col">
                <Typography size="sm" className="text-black font-normal">
                  {item.date}
                </Typography>
                <Typography size="sm" className="text-black font-normal">
                  {item.time}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1">
              {item.medicationAndDosageDetail.map((medication, medIndex) => (
                <Typography key={`medication-${medIndex}`} size="sm" className="text-black font-normal">
                  {medication}
                </Typography>
              ))}
            </div>

            <div className="flex justify-start">
              <div className="bg-background-gray rounded-xl py-2.5 px-4 max-w-sm">
                <Typography size="sm" className="text-dark-gray font-normal">
                  {item.comments}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )),
    [records]
  );

  return (
    <DashboardWrapper>
      <div className="flex flex-col gap-5">
        {/* prescriptions and allergies */}
        <div className="flex flex-col xl:flex-row gap-5">
          <section className="w-full flex flex-col gap-5 xl:w-[68%]">
            <Container hasBorders>
              <PrescriptionTable
                prescriptionData={prescriptionData}
                prescriptionTableData={prescriptionTableData}
                setPrescriptionTableData={setPrescriptionTableData}
                editingId={editingId}
                setEditingId={setEditingId}
              />

              <div className="px-4 sm:px-6 py-7.5 flex flex-col gap-2.5">
                <InputTextField
                  label="Comments"
                  placeholder="Type comments here"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <div className="flex flex-col gap-1">
                  <div className="flex justify-start item-center gap-4">
                    <CustomCheckbox
                      label="Send prescription to pharmacy"
                      styling="!text-sm !font-normal !text-black"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <Tooltip
                      message="Select this option with patients choice. If this is on then we will send prescription to pharmacy. Otherwise patient will personally visit any pharmacy and pickup medicine."
                      trigger="hover"
                      position="bottom-right"
                      styling="!bottom-0.5"
                    >
                      <Iconify
                        icon="material-symbols:info-outline-rounded"
                        className="text-dark-gray cursor-pointer"
                        width={20}
                        height={20}
                      />
                    </Tooltip>
                  </div>
                  <Typography size="sm" className="text-dark-gray">
                    Note: Save button will add this prescription in records and also in our system. To send prescription
                    to patient and pharmacy you need to end this appointment.
                  </Typography>
                </div>
                <div className="flex flex-col gap-5">
                  <InputSelectField
                    label="Select Pharmacy"
                    required
                    value={selectedPharmacy || pharmaciesOptions[0]?.value}
                    onChange={handlePharmacyChange}
                    options={pharmaciesOptions}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSave} className="min-w-[136px] w-full sm:w-fit">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </section>
          <section className="w-full xl:w-[32%]">
            <AlllergiesCard data={allergyData} />
          </section>
        </div>

        {/* records */}
        <Container hasBorders>
          <div className="flex flex-col gap-3.5">
            <div className="px-5 pt-3.5 flex flex-col md:flex-row md:justify-between md:items-center gap-5">
              <Typography size="xl" className="text-black font-bold">
                Records
              </Typography>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
                <SearchInput />
                <div className="w-full">
                  <DateRange data={recordsTableData} filterKey="dateAndTime" onFilter={setRecords} />
                </div>
              </div>
            </div>
            <hr className="text-light-gray w-full" />
            <div className="px-5 pb-5 flex flex-col gap-2.5">
              <div className="w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[600px]">
                  {/* Header */}
                  <div className="w-full mb-2.5 py-4 px-5 bg-primary-dark rounded-lg grid grid-cols-3 gap-4">
                    <Typography size="md" className="text-white font-semibold text-left">
                      Date & Time
                    </Typography>
                    <Typography size="md" className="text-white font-semibold text-left">
                      Medication and dosage detail
                    </Typography>
                    <Typography size="md" className="text-white font-semibold text-left">
                      Comment
                    </Typography>
                  </div>
                  {/* Records */}
                  <div className="max-h-144 overflow-y-auto custom-scrollbar flex flex-col gap-2.5">
                    {renderRecords}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </DashboardWrapper>
  );
};

export default PrescriptionAndRecords;
