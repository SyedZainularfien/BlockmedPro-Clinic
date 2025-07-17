'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type RadialBarChartProps = {
  series: number[];
  labels?: string[];
  size?: string;
  label?: string;
};

const RadialBarChart: React.FC<RadialBarChartProps> = ({ series, labels, size, label }) => {
  const total = series.reduce((acc, val) => acc + val, 0);
  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      height: 350,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: size ? size : '69%',
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '85%',
          margin: 7,
          dropShadow: {
            enabled: false,
          },
        },
        dataLabels: {
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 700,
            color: '#312D2D',
            offsetY: -30,
            formatter: (val) => `${val}`,
          },
          total: {
            show: true,
            label: label ? label : 'Total Appointments',
            fontSize: '16px',
            fontWeight: 600,
            color: '#312D2D',
            formatter: () => `${total}`,
          },
          name: {
            show: true,
            fontSize: '24px',
            fontWeight: 400,
            color: '#312D2D',
            offsetY: 10,
          },
        },
      },
    },
    colors: ['#003CFF', '#00BC00', '#FF8964'],
    labels: labels,
    stroke: {
      lineCap: 'round',
      width: 1,
    },
    legend: {
      show: false,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 400,
      itemMargin: {
        horizontal: 25,
      },
      labels: {
        colors: '#333333',
      },
    },
  };

  return (
    <div className="w-full max-w-[400px] relative">
      <ReactApexChart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default RadialBarChart;
