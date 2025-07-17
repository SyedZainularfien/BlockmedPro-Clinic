import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

import { IWeightChartProps } from '@/types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const WeightChart: React.FC<IWeightChartProps> = ({ data, idealWeight, unit = 'kg', height = 300, className = '' }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'Weight',
        data: data.map((item) => item.weight),
        color: '#4F46E5',
      },
      ...(idealWeight
        ? [
            {
              name: 'Ideal Weight',
              data: new Array(data.length).fill(idealWeight),
              color: '#E5E7EB',
            },
          ]
        : []),
    ],
    xaxis: {
      categories: data.map((item) => item.month),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value} ${unit}`,
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: ['#DBEAFE'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#4F46E5', '#E5E7EB'],
    },
    markers: {
      size: 4,
      colors: ['#4F46E5', '#E5E7EB'],
      strokeColors: ['#4F46E5', '#E5E7EB'],
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${value} ${unit}`,
      },
      style: {
        fontSize: '12px',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: idealWeight ? true : false,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '12px',
      markers: {
        size: 8,
      },
    },
  };

  return (
    <div className={`w-full ${className}`}>
      <Chart options={chartOptions} series={chartOptions.series} type="area" height={height} />
    </div>
  );
};

export default WeightChart;
