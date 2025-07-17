import { Icon } from '@iconify/react';

type IconifyProps = {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
  notClickable?: boolean;
  onClick?: () => void;
  [key: string]: any;
};

const Iconify = ({ icon, size = 20, color, className = '', onClick, notClickable, ...other }: IconifyProps) => {
  return (
    <div onClick={onClick}>
      <Icon
        icon={icon}
        width={size}
        height={size}
        color={color}
        className={`${className} ${notClickable ? '' : 'cursor-pointer'}`}
        {...other}
      />
    </div>
  );
};

export default Iconify;
