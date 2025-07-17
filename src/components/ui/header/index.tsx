'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import BackButton from '@/components/shared/back-button';
import Iconify from '@/components/shared/iconify';
import MenuDropdown from '@/components/shared/menu-dropdown';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { useAppDispatch } from '@/redux/hooks';
import { setLogoutModalOpen, toggleSidebar } from '@/redux/slices/temp-slice';
import { HeaderProps } from '@/types';
import NotificationDropdown from '../notifications-dropdown';

const HeaderIcons = ({ iconSize, menuOptions }: any) => {
  const router = useRouter();

  const notifications = content?.notificationsData;
  return (
    <div className="flex justify-center items-center gap-2">
      <NotificationDropdown notifications={notifications} />
      <Iconify
        size={iconSize}
        icon="bi:chat-dots-fill"
        onClick={() => router.push('/chat')}
        className="text-white bg-primary-dark rounded-full p-1.5 cursor-pointer"
      />
      <MenuDropdown
        items={menuOptions}
        idx={1}
        totalDataLength={menuOptions?.length}
        icon={
          <Iconify
            size={iconSize}
            icon="ion:person"
            className="text-white bg-primary-dark rounded-full p-1.5 cursor-pointer"
          />
        }
      />
    </div>
  );
};

const Header: FC<HeaderProps> = ({ title, subTitle, backButton }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setLogoutModalOpen(true));
  };
  const router = useRouter();
  const menuOptions = [
    {
      id: '1',
      label: 'Profile',
      icon: 'fluent:person-20-filled',
      onClick: () => router.push('/profile'),
    },
    {
      id: '2',
      label: 'Clinic Details',
      icon: 'healthicons:ambulatory-clinic',
      onClick: () => router.push('/clinic-details'),
    },
    {
      id: '3',
      label: 'Saved Cards',
      icon: 'si:credit-card-detailed-fill',
      onClick: () => router.push('/cards-and-billing'),
    },
    {
      id: '4',
      label: 'Earnings',
      icon: 'fluent:building-bank-16-filled',
      onClick: () => router.push('/earnings'),
    },
    {
      id: '5',
      label: 'Security',
      icon: 'garden:security-26',
      onClick: () => router.push('/change-password'),
    },
    {
      id: '6',
      label: 'Logout',
      icon: 'majesticons:logout',
      onClick: handleLogout,
      variant: 'secondary',
    },
  ];
  return (
    <div className="flex flex-col gap-[17px]">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <button onClick={() => dispatch(toggleSidebar())} className="lg:hidden">
            <Iconify icon="ic:round-menu" size={28} className="text-primary-dark cursor-pointer" />
          </button>
          <div className="block sm:hidden">
            <HeaderIcons iconSize={28} menuOptions={menuOptions} />
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {backButton ? (
              <BackButton label={title} />
            ) : (
              <Typography size="h4" className="text-primary-light font-bold leading-none">
                {title}
              </Typography>
            )}
            <Typography size="lg" className={`text-dark-gray font-medium leading-none ${backButton ? 'pl-9' : ''}`}>
              {subTitle}
            </Typography>
          </div>

          <div className="hidden sm:block">
            <HeaderIcons menuOptions={menuOptions} iconSize={32} />
          </div>
        </div>
      </div>
      <hr className="w-full border-light-gray" />
    </div>
  );
};

export default Header;
