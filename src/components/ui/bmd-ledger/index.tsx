import Image from 'next/image';
import React, { FC } from 'react';

import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DateRange from '@/components/shared/date-range';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';

const BmdLedger: FC = () => {
  const { detailtedData, headerData } = content?.bmdLedger;

  const mid = detailtedData[0]?.measurements ? Math.ceil(detailtedData[0].measurements.length / 2) : 0;
  const [leftMeasurements, rightMeasurements] = [
    detailtedData[0]?.measurements ? detailtedData[0].measurements.slice(0, mid) : [],
    detailtedData[0]?.measurements ? detailtedData[0].measurements.slice(mid) : [],
  ];

  return (
    <DashboardWrapper
      title="BMD Ledger"
      subTitle="This the patients One True Record and represents their complete Digital Health Record."
    >
      <section className="flex flex-col gap-2.5">
        <div className="flex justify-end items-center w-full">
          <div className="w-full sm:w-fit">
            <DateRange data={[]} filterKey="dateRange" />
          </div>
        </div>
        {detailtedData?.length > 0 ? (
          detailtedData?.map((data, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col gap-3.5">
                <Container hasBorders>
                  <div className="flex flex-col gap-2.5 p-4">
                    <>
                      {/* Header Section - Single line with dividers */}
                      <div className="bg-primary-dark hidden px-4 sm:px-5 py-2.5 rounded-md xl:flex flex-wrap items-center gap-7.5">
                        {headerData?.map((item, index) => (
                          <React.Fragment key={item.label}>
                            <div className="flex items-center gap-1">
                              <Typography size="sm" className="text-white font-semibold">
                                {item.label}:
                              </Typography>
                              <Typography size="sm" className="text-white font-semibold">
                                {item.value}
                              </Typography>
                            </div>
                            {index < headerData.length - 1 && <div className="w-px h-5 bg-white" />}
                          </React.Fragment>
                        ))}
                      </div>
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full ">
                        {headerData?.map((item, index) => (
                          <React.Fragment key={index}>
                            <div className="bg-primary-dark block px-4 sm:px-5 py-2.5 rounded-md xl:hidden sm:max-w-[300px] flex-wrap items-center gap-7.5">
                              <div className="flex items-center gap-1">
                                <Typography size="sm" className="text-white font-semibold">
                                  {item.label}:
                                </Typography>
                                <Typography size="sm" className="text-white font-semibold">
                                  {item.value}
                                </Typography>
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </>

                    {/* Measurements Section - Two columns */}
                    <div className="py-3.5 px-4 sm:px-5 bg-background-gray rounded-md">
                      <div className=" max-h-[150px] overflow-y-auto custom-scrollbar">
                        <div className="flex flex-col sm:flex-row justify-between sm:gap-8 max-w-[680px]">
                          {[leftMeasurements, rightMeasurements].map((group, colIdx) => (
                            <div key={colIdx} className="flex-1">
                              {group.map((item) => (
                                <div key={item.label} className="flex items-baseline gap-3 mb-0.5">
                                  <span className="rounded-full bg-black h-1.5 w-1.5 flex-shrink-0 mt-1.5" />
                                  <div className="flex justify-between w-full">
                                    <div className="w-1/2">
                                      <Typography size="sm" className="text-black font-semibold">
                                        {item.label}
                                      </Typography>
                                    </div>
                                    <div className="w-1/2">
                                      <Typography size="sm" className="text-black">
                                        {item.value}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
                <hr className="text-light-gray" />
                <Container hasBorders>
                  <div className="px-4 sm:px-5 py-4">
                    <div className="flex flex-col gap-1.5">
                      {data.followUpData.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-2 md:gap-4">
                          <Typography size="sm" className="font-semibold text-black min-w-[160px]">
                            {item.label}
                          </Typography>
                          <div className="flex-1">
                            {Array.isArray(item.value) ? (
                              <>
                                {item.value.map((text, index) => (
                                  <Typography key={index} size="sm" className="text-black">
                                    {text}
                                  </Typography>
                                ))}
                                {item.label === 'Management Plans:' && item.advice && (
                                  <Typography size="sm" className="text-black font-bold mt-1">
                                    Advice: {item.advice}
                                  </Typography>
                                )}
                              </>
                            ) : (
                              <Typography size="sm" className="text-black">
                                {item.value}
                              </Typography>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Typography size="sm" className="text-dark-gray">
                              {item.time}
                            </Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Container>
              </div>
            </React.Fragment>
          ))
        ) : (
          <Container hasBorders>
            <div className="flex justify-center items-center">
              <div className="h-[600px] w-full flex flex-col items-center justify-center gap-3">
                <Image src="/assets/svgs/no-data.svg" alt="no-data" width={85} height={85} />
                <Typography size="lg" className="font-bold text-dark-gray">
                  {'No entries available'}
                </Typography>
              </div>
            </div>
          </Container>
        )}
      </section>
    </DashboardWrapper>
  );
};

export default BmdLedger;
