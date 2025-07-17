'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

import { IAreaChartProps } from '@/types';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AreaChart: React.FC<IAreaChartProps> = ({
  seriesData,
  categoriesData,
  showDollarSign,
  height,
  showYAxisValues,
  colors,
}) => {
  const maxValue = Math.max(...seriesData.flatMap((series) => series.data));

  const chartOptions: ApexOptions = {
    chart: {
      height: height ? height : 300,
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      type: 'category',
      categories: categoriesData,
      labels: {
        style: {
          colors: '#969696',
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: maxValue,
      labels: {
        show: showYAxisValues ?? true,
        formatter: (value: number) => {
          if (showDollarSign) {
            return `$${value.toFixed(0)}`;
          }
          return `${value.toFixed(0)}`;
        },
        style: {
          colors: '#969696',
        },
      },
      axisBorder: {
        show: showYAxisValues ?? true,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: showYAxisValues ?? true,
      },
    },

    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      followCursor: true,
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        if (seriesIndex === undefined || dataPointIndex === undefined) return '';

        const value = w.globals.series[seriesIndex][dataPointIndex];
        const monthIndex = w.globals.labels[dataPointIndex];
        const seriesColor = w.globals.colors[seriesIndex];

        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        const month = monthNames[parseInt(monthIndex) - 1] || monthIndex;

        return `
      <div style="
        background: ${seriesColor} !important;
        color: white;
        padding: 6px 8px;
        border-radius: 8px;
        font-size: 14px;
      min-width: 90px;
        font-family: Arial, sans-serif;
        text-align: center;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      ">
        <div style="font-weight: bold;">${showDollarSign ? `$${value}` : value}</div>
        <div style="font-size: 12px;">${month}</div>
      </div>`;
      },
    },

    colors: colors ? colors : ['#2D58E6', '#8B90A0'],
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      fontSize: '14px',
      fontWeight: 600,
      labels: {
        colors: '#969696',
      },
      offsetY: -6,
    },
    fill: {
      opacity: 0.1,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'top',
            horizontalAlign: 'left',
          },
        },
      },
    ],
  };

  return (
    <div className="">
      <div id="chart">
        <ReactApexChart options={chartOptions} series={seriesData} type="area" height={height ? height : 300} />
      </div>
    </div>
  );
};

export default AreaChart;
