import React from 'react';

import DonutChart from '@/components/shared/charts/donut-chart';
import { Typography } from '@/components/shared/typography';
import { IClinicalDiseaseDonutChartProps } from '@/types';

const ClinicalDiseaseDonutChart: React.FC<IClinicalDiseaseDonutChartProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-1.5 overflow-hidden">
      <div>
        <Typography size="lg" className="text-black font-bold text-start">
          Clinical Disease
        </Typography>
      </div>
      <div className="flex flex-col justify-center items-center md:items-center gap-1">
        {/* Donut Chart */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <DonutChart data={data} insideLabel="Patients" clinicalDisease />
        </div>

        <hr className="border-t border-light-gray my-4 w-full" />

        {/* Legends */}
        <div className="relative flex flex-col md:flex-row w-full gap-2 md:gap-10 h-[170px]">
          {/* Combined Scrollable Legends */}
          <div className="relative flex flex-1 flex-col space-y-2 md:space-y-0 md:flex-row gap-2 md:gap-10 overflow-y-auto custom-scrollbar max-h-[18rem] md:max-h-[18rem]">
            {/* Left Column */}
            <div className="flex-1 flex flex-col space-y-2 md:pr-12">
              {data.slice(0, data.length / 2).map((item, index) => (
                <div key={index} className="flex items-center justify-between space-x-8 lg:space-x-2 xl:space-x-10">
                  <div className="flex items-center space-x-4">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-dark-charcoal font-normal text-md max-w-[8rem] truncate">{item.name}</span>
                  </div>
                  <span className="text-primary-dark text-sm text-right font-medium">{item.value}%</span>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col space-y-2 md:pr-12">
              {data.slice(data.length / 2, data.length - 1).map((item, index) => (
                <div key={index} className="flex items-center justify-between space-x-8 lg:space-x-2 xl:space-x-10">
                  <div className="flex items-center space-x-4">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-dark-charcoal font-normal text-md max-w-[6rem] truncate">{item.name}</span>
                  </div>
                  <span className="text-primary-dark text-sm text-right font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalDiseaseDonutChart;
