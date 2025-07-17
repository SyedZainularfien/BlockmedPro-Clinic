'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { IDonutChartProps } from '@/types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SimpleRadialChart: React.FC<IDonutChartProps> = ({
  height,
  data,
  insideLabel,
  clinicalDisease,
  isPercentage,
}) => {
  const totalData = data.reduce((acc, item) => acc + item.value, 0);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '55%',
        },
        track: {
          background: '#F1F1F1',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 17,
            fontSize: '24px',
            fontWeight: 700,
            formatter: () => `${totalData}${isPercentage ? '%' : ''}`,
          },
          total: {
            show: true,
            label: insideLabel || '',
            color: '#969696',
            fontSize: '14px',
            fontWeight: 600,
            formatter: () => (clinicalDisease ? `${totalData}k` : `${totalData}${isPercentage ? '%' : ''}`),
          },
        },
      },
    },
    colors: data.map((item) => item.color),
    stroke: {
      lineCap: 'round',
    },
    labels: data.map((item) => item.name),
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: '18px',
                },
                total: {
                  fontSize: '12px',
                },
              },
            },
          },
        },
      },
    ],
  };

  const chartSeries = data.map((item) => item.value);

  return (
    <div className="w-full">
      <Chart options={chartOptions} series={chartSeries} type="radialBar" height={height || 250} />
    </div>
  );
};

export default SimpleRadialChart;
