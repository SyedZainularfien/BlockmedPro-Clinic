'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { IDonutChartProps } from '@/types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DonutChart: React.FC<IDonutChartProps> = ({ height, data, insideLabel, clinicalDisease, isPercentage }) => {
  const totalData = data.reduce((acc, item) => acc + item.value, 0);

  // For the Reviews component case where we want to show empty space
  const shouldShowEmptySpace = data.length === 1 && data[0]?.name === 'Positive';

  // If showing empty space, we'll add a second data point with the remaining percentage
  const chartData = shouldShowEmptySpace
    ? [...data, { name: 'Remaining', value: data[0] ? 100 - data[0].value : 0, color: '#F1F1F1' }]
    : data;

  const getItemMargin = () => {
    if (data.length >= 8) {
      return {
        horizontal: 5,
        vertical: 4,
      };
    }
    return {
      horizontal: 10,
      vertical: 4,
    };
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    labels: chartData.map((item) => item.name),
    colors: chartData.map((item) => item.color),
    stroke: {
      show: false,
    },
    legend: {
      show: false,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '12px',
      itemMargin: getItemMargin(),
      formatter: (label: string) => label,
      markers: {
        strokeWidth: 0,
        offsetX: -2,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex }) {
        const item = chartData[seriesIndex];
        // Don't show tooltip for the "Remaining" part if it exists
        if (shouldShowEmptySpace && item?.name === 'Remaining') return '';
        return `<div class="apexcharts-tooltip-box" style="background: ${item?.color}; color: white; padding: 8px; border-radius: 4px;">
          <div style="font-weight: bold;">${item?.name}</div>
          <div>${series[seriesIndex]}%</div>
        </div>`;
      },
      style: {
        fontSize: '12px',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: -10,
              color: '#000',
              fontSize: '14px',
              fontWeight: 'normal',
            },
            value: {
              show: true,
              offsetY: isPercentage ? 0 : 10,
              formatter: () => `${shouldShowEmptySpace && data[0] ? data[0].value : totalData}`,
              color: '#000',
              fontSize: isPercentage ? '20px' : '32px',
              fontWeight: 700,
            },
            total: {
              show: true,
              showAlways: true,
              label: insideLabel,
              color: '#969696',
              fontSize: '14px',
              fontWeight: 600,
              formatter: () => (clinicalDisease ? `${totalData}k` : isPercentage ? `${totalData}%` : `${totalData}`),
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  name: {
                    fontSize: '10px',
                  },
                  value: {
                    fontSize: '18px',
                  },
                },
              },
            },
          },
          legend: {
            fontSize: '10px',
            itemMargin: {
              horizontal: 5,
              vertical: 2,
            },
          },
        },
      },
    ],
  };

  const chartSeries = chartData.map((item) => item.value);

  return (
    <>
      <div className="">
        {chartSeries.length > 0 && (
          <div className="">
            <Chart options={chartOptions} series={chartSeries} type="donut" height={height ? height : 250} />
          </div>
        )}
      </div>
    </>
  );
};

export default DonutChart;
