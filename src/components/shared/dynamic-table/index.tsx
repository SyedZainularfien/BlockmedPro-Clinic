import React from 'react';

import { IDynamicTableProps } from '@/types';

const DynamicTable: React.FC<IDynamicTableProps> = ({
  columns,
  data,
  headerColor = 'bg-blue-100',
  styling,
  headerStyling,
}) => {
  return (
    <div className="w-full mx-auto">
      <div className="overflow-x-auto rounded-xl border-l border-r border-b border-light-gray">
        <table className="w-full border-collapse">
          <thead>
            <tr className={headerColor}>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-10 py-3 text-center ${headerStyling} text-md font-semibold text-nowrap text-black border-none ${
                    index === 0 ? 'border-l-0' : ''
                  } ${index === columns.length - 1 ? 'border-r-0' : ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    className={`px-10 py-3 text-sm text-black text-center ${styling} whitespace-nowrap border border-light-gray ${
                      colIndex === 0 ? 'border-l-0' : ''
                    } ${colIndex === columns.length - 1 ? 'border-r-0' : ''} ${
                      rowIndex === data.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    {row[column.key] || '--'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
