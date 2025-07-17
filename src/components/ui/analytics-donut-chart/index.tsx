import React, { FC } from 'react';

import DonutChart from '@/components/shared/charts/donut-chart';
import { IDonutChartComponentProps } from '@/types';

const AnalyticsDonutChart: FC<IDonutChartComponentProps> = ({ data, insideLabel, height }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Donut Chart */}
      {/* Input Labels has to be updated according to the hover */}
      <DonutChart height={height} data={data} insideLabel={insideLabel} />

      {/* Horizontal Line */}
      <div className={`w-full border-t border-light-gray`} />

      {/* Legends */}
      <div
        className={`grid ${
          data.length > 4
            ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xs:grid-cols-4'
            : data.length <= 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-2 sm:grid-cols-3'
        } gap-y-1 py-2`}
      >
        {data.map((item: any) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-[#312D2D]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDonutChart;
