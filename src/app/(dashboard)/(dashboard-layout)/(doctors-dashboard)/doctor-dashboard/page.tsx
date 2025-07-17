'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import PieChart from '@/components/shared/charts/pie-chart';
import RadialBarChart from '@/components/shared/charts/radial-chart';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import { Typography } from '@/components/shared/typography';
import StatsCard from '@/components/ui/stats-card';
import { content } from '@/data';

const DoctorDashbaord = () => {
  const { StatsCardData, todaysPatientsData, gender } = content?.doctorsDashbaord?.dashbaord;
  const columns = content?.columns?.todaysPatientsColumns;
  return (
    <DashboardWrapper title="Dashbaord" subTitle="Welcome to your doctor dashboard.">
      <div className="flex flex-col gap-5">
        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {StatsCardData?.map((data, index) => (
            <Container bottomBorder borderBottomColor={data.iconColor} key={index}>
              <StatsCard
                isSvg
                icon={data.icon}
                valueFontSize="h4"
                title={data.title}
                value={data.value}
                negative={data.negative}
                iconColor={data.iconColor}
                percentage={data.percentage}
                iconBgColor={data.iconBgColor}
              />
            </Container>
          ))}
        </div>
        {/* table and charts */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* left */}
          <div className="flex flex-col gap-5 w-full xl:w-[60%]">
            <div className="flex flex-col gap-5">
              <Container hasBorders>
                <div className="px-5 py-3.5 flex flex-col gap-4 w-full">
                  <Typography size={'lg'} as={'p'} className="text-black font-bold">
                    Today&apos;s Patients
                  </Typography>
                  <DataTable
                    roundedHeader
                    ColumnsData={columns}
                    tableRows={todaysPatientsData}
                    TableBodyRow={({ id, patient, time, status }: any) => (
                      <tr key={id} className="border-b border-light-gray text-nowrap last:border-b-0">
                        <td className="px-4 lg:px-6 py-4 text-start break-words">
                          <div className="flex items-center gap-2">
                            <span className="w-10 h-10 rounded-full bg-gray-200">
                              <Image
                                src={patient?.img}
                                width={40}
                                height={40}
                                alt={patient?.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </span>
                            <Typography size="md" className="font-semibold text-black">
                              {patient?.name || '--'}
                            </Typography>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-start break-words">
                          <Typography size="md">{time || '--'}</Typography>
                        </td>
                        <td className="px-4 lg:px-5 py-4 text-start">
                          <Typography
                            size="md"
                            className={`px-4 py-2 rounded-lg w-fit text-nowrap flex items-center justify-center gap-2 ${
                              status === 'Face To Face'
                                ? 'bg-[#D9F6DA] text-[#098B0D]'
                                : 'bg-light-blue text-primary-light'
                            }`}
                          >
                            {status || '--'}
                          </Typography>
                        </td>
                      </tr>
                    )}
                  />
                  <div className="flex justify-end items-center pb-2">
                    <Link href="/view-all">
                      <Typography size={'md'} as={'p'} className="text-primary-light font-semibold leading-0">
                        View All
                      </Typography>
                    </Link>
                  </div>
                </div>
              </Container>
              <div className="flex flex-col lg:flex-row gap-5">
                {/* pie */}
                <Container hasBorders styling="px-4">
                  <PieChart title="Gender" series={gender?.series} labels={gender?.labels} legendTop width={200} />
                </Container>
                {/* data */}
                <Container hasBorders styling="">
                  <div className="flex flex-col gap-4 px-5 py-5">
                    <Typography size={'lg'} as={'p'} className="text-black font-bold leading-none">
                      Upcoming Patient
                    </Typography>
                    <hr className="text-light-gray" />
                    <div className="flex flex-col gap-7.5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-10 h-10 rounded-full bg-gray-200">
                            <Image
                              src={'/assets/svgs/dr-rehmata.svg'}
                              width={40}
                              height={40}
                              alt={'dr-rehmat'}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </span>
                          <Typography size="md" className="font-semibold text-black">
                            John Doe
                          </Typography>
                        </div>
                        <Typography
                          size="md"
                          className={`px-4 py-2 rounded-lg w-fit text-nowrap flex items-center justify-center bg-[#D9F6DA] text-[#098B0D]`}
                        >
                          Face To Face
                        </Typography>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <Typography size={'md'} as={'p'} className="text-black font-semibold">
                            Gender
                          </Typography>
                          <Typography size={'md'} as={'p'} className="text-black">
                            Male
                          </Typography>
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography size={'md'} as={'p'} className="text-black font-semibold">
                            Speciality
                          </Typography>
                          <Typography size={'md'} as={'p'} className="text-black">
                            Cardiology
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col gap-5 w-full xl:w-[40%]">
            <Container hasBorders>
              <div className="p-6 flex flex-col">
                <Typography size={'lg'} as={'p'} className="text-black font-bold">
                  Appointments Overview
                </Typography>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <RadialBarChart
                    size="60%"
                    series={[2600, 800, 300]}
                    labels={['Face to Face', 'Cancelled', 'Remote Appointment']}
                  />
                  <div className="w-full border-t border-light-gray mt-1" />
                  <div className="w-full flex flex-col justify-center items-center sm:flex-row gap-5 mt-4">
                    <div className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#003CFF] mr-1.5"></span>
                      <Typography size="sm" className="text-black font-normal">
                        Face to Face
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF8964] mr-1.5"></span>
                      <Typography size="sm" className="text-black font-normal">
                        Remote Appointment
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00BC00] mr-1.5"></span>
                      <Typography size="sm" className="text-black font-normal">
                        Cancelled
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
            <Container hasBorders>
              <div className="p-6 flex flex-col">
                <Typography size={'lg'} as={'p'} className="text-black font-bold">
                  Next Appointment In
                </Typography>
                <div className="flex justify-center items-center">
                  <RadialBarChart size="67%" label="Next Appointment" series={[2600]} labels={['Next Appointment']} />
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default DoctorDashbaord;
