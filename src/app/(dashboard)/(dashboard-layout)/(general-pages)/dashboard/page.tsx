'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/shared/button';
import AreaChart from '@/components/shared/charts/area-chart';
import RadialBarChart from '@/components/shared/charts/radial-chart';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import AnalyticsDonutChart from '@/components/ui/analytics-donut-chart';
import ClinicalDiseaseDonutChart from '@/components/ui/clinical-disease-chart';
import DashboardOptionsModal from '@/components/ui/modals/dashboard-options-modal';
import StarRating from '@/components/ui/star-rating';
import StatsCard from '@/components/ui/stats-card';
import { content } from '@/data';
import { useDashboardSections } from '@/hooks/dashboad-options/useDashboardOptions';
import { DashboardTableProps } from '@/types';

const DashbaordPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const { dashboardOptions, tempDashboardOptions, setTempDashboardOptions, handleSaveOptions } = useDashboardSections();

  const handleOpenModal = () => {
    setTempDashboardOptions({ ...dashboardOptions });
    setIsOpen(true);
  };

  const handleSave = () => {
    handleSaveOptions(handleCloseModal);
  };
  return (
    <>
      <DashboardWrapper title="Dashboard" subTitle="Welcome to your clinic dashboard.">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex justify-end items-center">
            <Button className="!py-2" variant={'primary'} onClick={handleOpenModal}>
              Edit Dashboard
            </Button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              {content?.dashboardStatsCardData?.map((data, index) => (
                <Container bottomBorder borderBottomColor={data.iconColor} key={index}>
                  <StatsCard
                    valueFontSize="h4"
                    title={data.title}
                    value={data.value}
                    percentage={data.percentage}
                    icon={data.icon}
                    negative={data.negative}
                    iconColor={data.iconColor}
                    isSvg
                    iconBgColor={data.iconBgColor}
                  />
                </Container>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-[55%] flex flex-col gap-5">
                {dashboardOptions?.patientDemographics && (
                  <div>
                    <Container styling="">
                      <div className="flex flex-col gap-2 pt-4 px-4">
                        <div className="flex flex-col items-start gap-1.5 justify-between md:flex-row md:justify-between md:items-center">
                          <Typography size="lg" className="text-black font-bold md:pl-4">
                            Patient Demographics
                          </Typography>
                          {/* Legends */}
                          <div className="flex justify-center items-center gap-4">
                            <div className="flex justify-center items-center gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-[#2D58E6]" />
                              <Typography size="sm" className="text-dark-gray font-normal">
                                New Patients
                              </Typography>
                            </div>
                            <div className="flex justify-center items-center gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-[#8B90A0]" />
                              <Typography size="sm" className="text-dark-gray font-normal">
                                Existing Patients
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <AreaChart
                          seriesData={content?.patientDemographics.series}
                          categoriesData={content?.patientDemographics.categories}
                        />
                      </div>
                    </Container>
                  </div>
                )}

                {dashboardOptions.doctors && (
                  <div>
                    <Container styling="p-5 flex flex-col gap-1">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center">
                          <Typography size="lg" className="text-black font-bold">
                            Doctors
                          </Typography>
                          <div
                            onClick={() => router.push('/doctors/add-new-doctor')}
                            className="flex gap-2.5 justify-center items-center cursor-pointer"
                          >
                            <Iconify
                              size={24}
                              icon="ic:round-add"
                              className="text-white bg-primary-dark rounded-md cursor-pointer"
                            />
                            <Typography size="md" className="text-black font-semibold">
                              Add doctor
                            </Typography>
                          </div>
                        </div>
                        <DataTable
                          roundedHeader={true}
                          ColumnsData={content?.columns?.dashboardColumns}
                          tableRows={content?.doctorsList}
                          TableBodyRow={({ _id, doctorName, certification, status }: DashboardTableProps) => (
                            <tr key={_id} className="border-b border-light-gray text-nowrap last:border-b-0">
                              <td className="px-4 lg:px-6 py-4 text-start break-words">
                                <div className="flex items-center gap-2">
                                  <span className="w-10 h-10 rounded-full bg-gray-200">
                                    <Image
                                      src="/assets/svgs/dr-rehmata.svg"
                                      width={40}
                                      height={40}
                                      alt="doctor"
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                    {/* image */}
                                  </span>
                                  <div className="flex flex-col gap-0.5">
                                    <Typography size="md" className="font-semibold text-black">
                                      {doctorName || '--'}
                                    </Typography>
                                    <Typography size="sm" className="text-dark-gray font-normal">
                                      {status || '--'}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 text-start break-words">
                                <Typography size="md">{certification || '--'}</Typography>
                              </td>
                              <td className="px-4 lg:px-5 py-4 text-start">
                                <Typography
                                  size="md"
                                  className={`px-4 py-2 rounded-lg text-nowrap flex items-center justify-center gap-2 ${
                                    status === 'Active' ? 'bg-[#D9F6DA] text-[#098B0D]' : 'bg-light-gray text-dark-gray'
                                  }`}
                                >
                                  {status === 'Active' && (
                                    <span className="w-2 h-2 rounded-full bg-[#098B0D] inline-block" />
                                  )}
                                  {status || '--'}
                                </Typography>
                              </td>
                            </tr>
                          )}
                        />
                        <div className="flex justify-end items-center">
                          <Link className="flex gap-0.5 justify-center items-center" href={'/doctors'}>
                            <Typography size="md" className="text-primary-light font-semibold">
                              View All
                            </Typography>
                            <Iconify
                              icon="ic:round-arrow-forward-ios"
                              height={12}
                              width={12}
                              className="text-primary-light"
                            />
                          </Link>
                        </div>
                      </div>
                    </Container>
                  </div>
                )}

                {dashboardOptions.clinicalDiseases && (
                  <div>
                    <Container styling="px-4 md:px-10 py-5">
                      <ClinicalDiseaseDonutChart data={content.clinicalDiseases} />
                    </Container>
                  </div>
                )}
              </div>
              <div className="w-ful sm:w-[45%] flex flex-col gap-5">
                {dashboardOptions.totalRevenue && (
                  <Container styling="">
                    <div className="flex flex-col gap-2 pt-4 px-4">
                      <div className="flex flex-col justify-center items-start">
                        <Typography size="lg" className="text-black font-bold pl-4">
                          Total Revenue
                        </Typography>
                        <Typography size="h3" className="text-black font-bold pl-4">
                          $36,900
                        </Typography>
                      </div>
                      <AreaChart
                        height={253}
                        showYAxisValues={false}
                        seriesData={content.totalRevenue.series}
                        categoriesData={content.totalRevenue.categories}
                      />
                    </div>
                  </Container>
                )}

                {dashboardOptions.ourSpecialties && (
                  <div>
                    <Container>
                      <div className="py-5 px-7.5 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <Typography size="lg" className="text-black font-bold">
                            Our Specialities:
                          </Typography>
                          <Iconify
                            icon="cil:pencil"
                            height={24}
                            width={24}
                            className="bg-primary-dark text-white p-1.5 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {content?.ourSpecialties.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-center items-center p-1 rounded-[22px] border border-dark-gray"
                            >
                              <Typography size="md" className="text-dark-gray font-semibold truncate">
                                {item}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Container>
                  </div>
                )}

                {dashboardOptions.ratings && (
                  <div>
                    <Container>
                      <div className="py-5 px-7.5 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <Typography size="lg" className="text-black font-bold">
                            Overall Ratings
                          </Typography>
                          <div className="flex gap-2 justify-center items-center">
                            <StarRating size={16} readOnly defaultRating={4.6} />
                            <Typography size="lg" className="text-black font-bold">
                              4.6
                            </Typography>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography size="lg" className="text-black font-bold">
                            Reviews
                          </Typography>
                          <Typography size="lg" className="text-black font-bold">
                            {` (${'1069'} Reviews)`}
                          </Typography>
                        </div>
                      </div>
                    </Container>
                  </div>
                )}

                {dashboardOptions.appointmentOverview && (
                  <div>
                    <Container>
                      <div className="p-6 flex flex-col items-center justify-center">
                        <RadialBarChart series={[2600, 800]} labels={['Face to Face', 'Remote']} />
                        <div className="w-full border-t border-light-gray" />
                        <div className="w-full flex flex-col justify-center items-center sm:flex-row gap-5 mt-4">
                          <div className="flex items-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#003CFF] mr-1.5"></span>
                            <Typography size="sm" className="text-black font-normal">
                              Face to Face
                            </Typography>
                          </div>
                          <div className="flex items-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00BC00] mr-1.5"></span>
                            <Typography size="sm" className="text-black font-normal">
                              Remote Appointment
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Container>
                  </div>
                )}

                {dashboardOptions.appointmentReports && (
                  <div>
                    <Container>
                      <div className="py-5 px-7.5 flex flex-col gap-3">
                        <div className="flex justify-start items-center">
                          <Typography size="lg" className="text-black font-bold">
                            Appointment and Scheduling Reports
                          </Typography>
                        </div>
                        <AnalyticsDonutChart data={content.appointmentAndScheduling} insideLabel="Total" height={247} />
                      </div>
                    </Container>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>
      {isOpen && (
        <DashboardOptionsModal
          onClose={handleCloseModal}
          dashboardOptions={tempDashboardOptions}
          setDashboardOptions={setTempDashboardOptions}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default DashbaordPage;
