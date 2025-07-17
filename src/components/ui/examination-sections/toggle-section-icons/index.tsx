import { FC } from 'react';

import Iconify from '@/components/shared/iconify';
import { content } from '@/data';
import { SectionToggleIconsProps } from '@/types';

const SectionToggleIcons: FC<SectionToggleIconsProps> = ({ openSections, onToggle }) => {
  const { examinationSectionConfigs } = content?.currentConsultations;

  return (
    <div className="flex flex-wrap gap-7.5 justify-between items-center">
      {examinationSectionConfigs.map(({ key, icon }) => (
        <Iconify
          key={key}
          size={50}
          icon={icon}
          onClick={() => onToggle(key)}
          className={`rounded-xl p-2 ${
            openSections[key]
              ? 'bg-primary-light text-white'
              : 'bg-white text-primary-light border border-light-gray hover:bg-primary-light hover:text-white'
          }`}
        />
      ))}
    </div>
  );
};

export default SectionToggleIcons;
