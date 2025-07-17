import dynamic from 'next/dynamic';
import React from 'react';

import { IPieChartProps } from '@/types';
import Container from '../../container';
import { Typography } from '../../typography';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart: React.FC<IPieChartProps> = ({ series, labels, legendTop, legendBottomAlign, width, title }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      width: width ? width : 250,
      type: 'pie',
    },
    labels: labels,
    colors: ['#4318FF', '#6AD2FF'],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
      y: {
        formatter: function (value) {
          return value + '%';
        },
      },
      custom: undefined,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header with Title and Legends */}
      {legendTop && (
        <div className="w-full flex justify-between items-center mb-3 mt-4">
          {/* Title */}
          <div className="">
            <Typography size="lg" className="text-black font-bold">
              {title}
            </Typography>
          </div>
          {/* Legends */}
          <div className="flex items-center space-x-4">
            {labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: options.colors ? options.colors[index] : '#000',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '6px',
                  }}
                />
                <Typography size="sm" className="text-gray font-medium">
                  {label}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Chart */}
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" width={width ? width : 250} />
      </div>
      {/* Custom Legends for Bottom Alignment */}
      {legendBottomAlign && (
        <div className="w-full flex flex-col items-center mt-4">
          {labels.map((label, index) => (
            <div key={index} className="flex justify-between items-center w-full sm:w-[70%] mb-1">
              <div className="flex items-center">
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: options.colors ? options.colors[index] : '#000',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '6px',
                  }}
                />
                <Typography size="sm" className="text-gray font-medium">
                  {label}
                </Typography>
              </div>
              <Typography size="sm" className="text-gray font-medium">
                {series[index]}%
              </Typography>
            </div>
          ))}
        </div>
      )}

      {/* Custom Legends for Bottom (if legendTop is false and legendBottomAlign is false) */}
      {!legendTop && !legendBottomAlign && (
        <Container styling="w-full flex justify-center items-center bg-white !shadow-none px-4 pt-4 pb-2">
          {labels.map((label, index) => (
            <div key={index} className={`flex flex-col items-center relative ${index === 0 ? 'pr-4' : 'pl-4'}`}>
              <div className="flex items-center mt-2">
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: options.colors ? options.colors[index] : '#000',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '6px',
                  }}
                />
                <Typography size="sm" className="text-gray font-medium">
                  {label}
                </Typography>
              </div>
              <Typography size="xl" className="text-black font-bold text-nowrap">
                {series[index]}%
              </Typography>
              {index === 0 && <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-light-gray hidden lg:block" />}
            </div>
          ))}
        </Container>
      )}
    </div>
  );
};

export default PieChart;
