import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeSidebar } from '@/redux/slices/temp-slice';
import { ISidebarItemProps } from '@/types';
import SubItem from './SubItems';

const SidebarItem = ({ img, text, route, subItems, expanded, setExpanded }: ISidebarItemProps) => {
  const { isSidebarOpen } = useAppSelector((state) => state.temp);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isActive =
    pathname === route || pathname.startsWith(route || '') || subItems?.some((item) => pathname === item.route);

  const hasSubItems = subItems && subItems.length > 0;

  const handleClick = () => {
    if (hasSubItems) {
      setExpanded(!expanded);
    } else if (route) {
      router.push(route);
    }
    if (isSidebarOpen === true) {
      dispatch(closeSidebar());
    }
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={handleClick}
        className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-colors ${
          isActive ? 'bg-primary-dark text-white' : 'text-black hover:bg-[#EBEFFF]'
        }`}
      >
        {img && (
          <Image
            src={img}
            alt={`${text} icon`}
            width={18}
            height={18}
            className={isActive ? 'brightness-0 invert' : ''}
          />
        )}
        <Typography size="md" className={`font-semibold ${isActive ? 'text-white' : 'text-black'} flex-grow`}>
          {text}
        </Typography>
        {hasSubItems && (
          <Iconify
            icon="material-symbols:chevron-right"
            width={20}
            height={20}
            className={`transition-transform ${expanded ? 'rotate-90' : ''} ${isActive ? 'text-white' : 'text-gray-600'}`}
          />
        )}
      </div>

      {/* Submenu Container */}
      {hasSubItems && (
        <div
          className="overflow-hidden space-y-1.5 transition-all mt-2 duration-300"
          style={{
            maxHeight: expanded ? `${subItems.length * 50}px` : '0px',
            opacity: expanded ? 1 : 0,
          }}
        >
          {subItems.map((item, index) => (
            <SubItem key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
