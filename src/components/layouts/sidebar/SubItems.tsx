' use client';

import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { Typography } from '@/components/shared/typography';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeSidebar } from '@/redux/slices/temp-slice';
import { ISubItemProps } from '@/types';

const SubItem = ({ text, route, icon }: ISubItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === route || pathname.startsWith(route || '') || pathname.startsWith(`${route}/`);
  const { id } = useParams();
  const { isSidebarOpen } = useAppSelector((state) => state.temp);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    router.push(`${route}/${id}`);
    if (isSidebarOpen === true) {
      dispatch(closeSidebar());
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 pl-3 py-2.5 rounded-md cursor-pointer transition-colors ${
        isActive ? 'bg-[#EBEFFF]' : 'text-black hover:bg-[#EBEFFF]'
      }`}
    >
      {icon && (
        <Image
          src={icon}
          alt={`${text} icon`}
          width={16}
          height={16}
          className={isActive ? 'brightness-0 invert' : ''}
        />
      )}
      {/* {!icon && <div className="w-1.5 h-1.5 bg-current rounded-full" />} */}
      <Typography size="md" className={`font-semibold ${isActive ? 'text-black' : 'text-black'}`}>
        {text}
      </Typography>
    </div>
  );
};

export default SubItem;
