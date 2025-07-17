'use client';

import Image from 'next/image';
import React, { FC, useState } from 'react';

import { Button } from '@/components/shared/button';
import AreaChart from '@/components/shared/charts/area-chart';
import BasicAreaChart from '@/components/shared/charts/area-chart/basic-area-chart';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DynamicTable from '@/components/shared/dynamic-table';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import { Typography } from '@/components/shared/typography';
import { PatientInfoItem, PatientSummaryProps } from '@/types';

const PatientSummaryComponent: FC<PatientSummaryProps> = ({ id, data }) => {
  const patientId = Array.isArray(id) ? id[0] : id;
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const getWeightDataForYear = (year: string) => {
    console.log(year);
    return {
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      yAxis: Array(12)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100) + 50),
    };
  };

  const [chartData, setChartData] = useState(getWeightDataForYear(selectedYear));

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setChartData(getWeightDataForYear(year));
  };

  const yearOptions = Array.from({ length: 2050 - 1950 + 1 }, (_, i) => {
    const year = (1950 + i).toString();
    return {
      label: year,
      value: year,
    };
  });

  const patientInfo: PatientInfoItem[] = [
    { label: 'Patient ID:', value: patientId ?? 'Unknown' },
    { label: 'Patient Name:', value: 'Jhon Cena' },
    { label: 'Age:', value: 24 },
    { label: 'Date Of Birth:', value: '23 July 1996' },
    { label: 'Gender:', value: 'Male' },
    { label: 'Ethnicity:', value: 'Asian' },
    { label: 'Phone Number:', value: '+44867383928' },
    { label: 'NHS No:', value: '---' },
  ];

  const {
    columns,
    alleries,
    medication,
    familyProblem,
    healthProblem,
    dietDataFirst,
    bloodPressure,
    dietDataSecond,
    // weightChartData,
    patientSummaryBMI,
    patientSummaryWeight,
    workLifeBalanceFirst,
    workLifeBalanceSecond,
    socailConnectionFirst,
    socailConnectionSecond,
    socailConnectionThird,
    generalHealthAndWellBeing,
  } = data;

  return (
    <DashboardWrapper title="Patient Summary" subTitle="Check the patient summary here">
      <section className="flex flex-col gap-10">
        <Container hasBorders>
          <div className="flex flex-col-reverse sm:flex-row justify-between items-start">
            <div className="w-full sm:w-[85%] flex flex-col gap-4.5 py-4 sm:py-5 px-5 sm:px-7.5">
              <div className="flex justify-start items-center flex-wrap gap-5 xl:gap-20">
                {patientInfo?.slice(0, 4).map(({ label, value }) => (
                  <div className="flex justify-start items-center gap-2.5" key={label}>
                    <Typography size="md" className="text-black font-semibold">
                      {label}
                    </Typography>
                    <Typography size="md" className="text-dark-gray font-semibold">
                      {value}
                    </Typography>
                  </div>
                ))}
              </div>
              <hr className="text-light-gray" />
              <div className="flex justify-start items-center flex-wrap gap-5 xl:gap-20">
                {patientInfo?.slice(4).map(({ label, value }) => (
                  <div className="flex justify-start items-center gap-2.5" key={label}>
                    <Typography size="md" className="text-black font-semibold">
                      {label}
                    </Typography>
                    <Typography size="md" className="text-dark-gray font-semibold">
                      {value}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-2.5 py-2.5">
              <Button>Join Meeting</Button>
            </div>
          </div>
        </Container>
        <Container hasBorders>
          <div className="py-4 sm:py-5 px-5 sm:px-7.5 flex flex-col gap-7">
            {/* Weight */}
            <div className="flex flex-col gap-3.5">
              <Typography size="lg" className="text-black font-bold">
                Weight
              </Typography>
              <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-5">
                <Container hasBorders>
                  <div className="pt-5">
                    <div className="flex justify-between items-center px-5 w-full">
                      {/* legends */}
                      <div className="flex items-center gap-4">
                        {/* Legend: Weight */}
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#003CFF]"></span>
                          <span className="text-sm text-gray-700">Weight</span>
                        </div>
                        {/* Legend: Ideal Weight */}
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#E3DDF7]"></span>
                          <span className="text-sm text-gray-700">Ideal Weight</span>
                        </div>
                      </div>

                      {/* dropdown */}
                      <div className="">
                        <InputSelectField
                          containerPadding="6"
                          value={selectedYear}
                          options={yearOptions}
                          onSelect={handleYearChange}
                        />
                      </div>
                    </div>
                    <BasicAreaChart data={chartData} showUnit={true} />
                  </div>
                </Container>
                <div className="w-full">
                  <DynamicTable
                    columns={columns?.weightColumns}
                    data={patientSummaryWeight.tableData}
                    headerColor="bg-blue-100"
                  />
                </div>
              </div>
            </div>
            <hr className="text-light-gray w-full" />
            {/* BMI (Body Mass Index) */}
            <div className="flex flex-col gap-3.5">
              <Typography size="lg" className="text-black font-bold">
                BMI (Body Mass Index)
              </Typography>
              <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-5">
                <div className="w-full flex justify-center items-center">
                  <div>
                    <Image src={'/assets/svgs/bmi.svg'} alt="bmi-img" height={286} width={295} />
                  </div>
                </div>
                <div className="w-full">
                  <DynamicTable
                    columns={columns?.bmiColumns}
                    data={patientSummaryBMI.tableData}
                    headerColor="bg-blue-100"
                  />
                </div>
              </div>
            </div>
            <hr className="text-light-gray w-full" />
            {/* Blood Pressure & General Health And Well-Being */}
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="flex flex-col gap-3.5 w-full">
                <Typography size="lg" className="text-black font-bold">
                  Blood Pressure
                </Typography>
                <Container hasBorders>
                  <div className="">
                    <AreaChart
                      seriesData={bloodPressure.series}
                      categoriesData={bloodPressure.categories}
                      colors={['#2D58E6', '#0D2C55']}
                    />
                  </div>
                </Container>
              </div>
              <div className="flex flex-col gap-3.5 w-full">
                <Typography size="lg" className="text-black font-bold">
                  General Health And Well-Being
                </Typography>
                <div className="flex flex-col gap-5">
                  <DynamicTable
                    columns={columns?.generalHealthAndWellBeingFirst}
                    data={generalHealthAndWellBeing.tableDataFirst}
                    headerColor="bg-blue-100"
                  />
                  <DynamicTable
                    columns={columns?.generalHealthAndWellBeingSecond}
                    data={generalHealthAndWellBeing.tableDataSecond}
                    headerColor="bg-blue-100"
                  />
                </div>
              </div>
            </div>
            <hr className="text-light-gray w-full" />
            {/* Medications */}
            <div className="flex flex-col gap-3.5">
              <Typography size="lg" className="text-black font-bold">
                Medications
              </Typography>
              <DynamicTable columns={columns?.medicationsColumns} data={medication} headerColor="bg-blue-100" />
            </div>
            <hr className="text-light-gray w-full" />
            {/* Allergies */}
            <div className="flex flex-col gap-3.5">
              <Typography size="lg" className="text-black font-bold">
                Allergies
              </Typography>
              <DynamicTable columns={columns?.alergiesColumns} data={alleries} headerColor="bg-blue-100" />
            </div>
            <hr className="text-light-gray w-full" />
            {/* Diet */}
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="flex flex-col gap-3.5 w-full">
                <Typography size="lg" className="text-black font-bold">
                  Diet
                </Typography>
                <div className="flex flex-col gap-5">
                  <DynamicTable columns={columns?.dietColumnsFirst} data={dietDataFirst} headerColor="bg-blue-100" />
                  <DynamicTable columns={columns?.dietColumnsSecond} data={dietDataSecond} headerColor="bg-blue-100" />
                </div>
              </div>
              <div className="flex flex-col gap-3.5 w-full">
                <Typography size="lg" className="text-black font-bold">
                  Work-Life Balance
                </Typography>
                <div className="flex flex-col gap-5">
                  <DynamicTable
                    columns={columns?.workLifeBalanceColumnsFirst}
                    data={workLifeBalanceFirst}
                    headerColor="bg-blue-100"
                  />
                  <DynamicTable
                    columns={columns?.workLifeBalanceColumnsSecond}
                    data={workLifeBalanceSecond}
                    headerColor="bg-blue-100"
                  />
                </div>
              </div>
            </div>
            <hr className="text-light-gray w-full" />
            {/* Social Connections */}
            <div className="flex flex-col gap-3.5 w-full">
              <Typography size="lg" className="text-black font-bold">
                Social Connections
              </Typography>
              <div className="flex flex-col gap-5">
                <DynamicTable
                  columns={columns?.socialConnectionColumnsFirst}
                  data={socailConnectionFirst}
                  headerColor="bg-blue-100"
                />
                <DynamicTable
                  columns={columns?.socialConnectionColumnsSecond}
                  data={socailConnectionSecond}
                  headerColor="bg-blue-100"
                />
                <DynamicTable
                  columns={columns?.socialConnectionColumnsThird}
                  data={socailConnectionThird}
                  headerColor="bg-blue-100"
                />
              </div>
            </div>
            <hr className="text-light-gray w-full" />
            {/* Health Problems (Self Reported) */}
            <div className="flex flex-col gap-3.5">
              <Typography size="lg" className="text-black font-bold">
                Health Problems (Self Reported)
              </Typography>
              <DynamicTable
                styling="!text-start"
                headerStyling="!text-start"
                columns={columns?.healthProblemsColumn}
                data={healthProblem}
                headerColor="bg-blue-100"
              />
            </div>
            <hr className="text-light-gray w-full" />
            {/* Family Problems (Self Reported) */}
            <div className="flex flex-col gap-3.5">
              <Typography size="lg" className="text-black font-bold">
                Family Problems (Self Reported)
              </Typography>
              <DynamicTable columns={columns?.familyProblemsColumn} data={familyProblem} headerColor="bg-blue-100" />
            </div>
          </div>
        </Container>
      </section>
    </DashboardWrapper>
  );
};

export default PatientSummaryComponent;
