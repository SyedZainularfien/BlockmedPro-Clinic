'use client';

import dynamic from 'next/dynamic';
import React, { FC } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const BasicAreaChart: FC<any> = ({ data, showUnit = true }) => {
  // Check if data is empty or undefined
  const isEmpty = !data?.yAxis || data.yAxis.length === 0;
  const fallbackSeries = [{ data: [0] }]; // Fallback series with a single 0 value
  const fallbackLabels = ['No record available']; // Fallback label
  const fallbackColors = ['#d3d3d3']; // Gray color

  const options = {
    chart: {
      type: 'area',
      height: 200,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    labels: isEmpty ? fallbackLabels : data.xAxis,
    xaxis: {
      type: 'category',
      labels: {
        style: {
          color: '#969696',
          fontSize: '12px',
        },
      },
    },
    grid: {
      show: false,
    },
    colors: isEmpty ? fallbackColors : ['#003CFF', '#007EE0'],
    yaxis: {
      axisBorder: {
        show: true,
        color: '#ededed',
      },
      labels: {
        formatter: (value: any) => `${value} ${showUnit ? 'kg' : ''}`,
        style: {
          color: '#969696',
          fontSize: '12px',
        },
      },
      opposite: false,
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex }: any) => {
        const value = series[seriesIndex][dataPointIndex].toFixed(1);

        return `
                    <div style="padding-left: 1rem; padding-right: 1rem; padding-top: 0.5rem; padding-bottom: 0.5rem; background: #000000; border: none; border-radius: 6px;">
                        <div style="display: flex; align-items: center;">
                        <span style="font-weight: semi-bold; color: #fff">${value}${showUnit ? 'kg' : ''}</span>
                        </div>
                    </div>
                `;
      },
    },
  };

  const series = isEmpty
    ? fallbackSeries
    : [
        {
          data: data.yAxis,
        },
      ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          // @ts-expect-error: ReactApexChart options type mismatch is ignored due to library limitations
          options={options}
          series={series}
          type="area"
          height={200}
        />
      </div>
    </div>
  );
};

export default BasicAreaChart;
