import { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import { content } from '@/data';
import { IExaminationSectionProps } from '@/types';
import RangeSelector from '../../range-selector';

const PainSeveritySection: FC<IExaminationSectionProps> = ({ formik, isOpen }) => {
  const { painSeverityEmojis } = content?.currentConsultations;

  const handleSeverityChange = (index: number) => {
    formik.setFieldValue('painSeverityIndex', index);
  };

  const painSeverityRanges = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  const painSeverityLabels = ['NO PAIN', 'MILD PAIN', 'MODERATE PAIN', 'SEVERE PAIN', 'WORST PAIN POSSIBLE'];

  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100 pt-6 pb-6 first:pt-6 last:pb-0' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-start items-center overflow-hidden">
        <div className="w-full sm:w-[17%]">
          <Iconify
            size={50}
            icon="streamline:smiley-emoji-terrified-solid"
            notClickable
            className="text-primary-light bg-white border border-gray rounded-xl p-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:w-[83%] gap-4 sm:gap-6">
          <div className="col-span-full cursor-not">
            <RangeSelector
              ranges={painSeverityRanges}
              labels={painSeverityLabels}
              onChange={handleSeverityChange}
              value={formik.values.painSeverityIndex}
              icons={painSeverityEmojis}
              editable
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainSeveritySection;
