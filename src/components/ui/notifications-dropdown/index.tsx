'use client';

import { useRouter } from 'next/navigation';
import React, { FC, useRef, useState } from 'react';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import useClickOutside from '@/hooks/outside-click/useOutsideClick';
import { INotificationDropdownProps } from '@/types';

type TabType = 'all' | 'unread';

const NotificationDropdown: FC<INotificationDropdownProps> = ({ className = '', notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = notifications.filter((n) => n.unread).length;
  const filteredNotifications = activeTab === 'unread' ? notifications.filter((n) => n.unread) : notifications;

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);
  const handleViewAllClick = () => {
    closeDropdown();
    router.push('/all-notifications');
  };

  useClickOutside(dropdownRef, closeDropdown, isOpen);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Bell Icon */}
      <div className="relative cursor-pointer" onClick={toggleDropdown}>
        <Iconify
          size={32}
          icon="iconamoon:notification-bold"
          className="text-white bg-primary-dark rounded-full p-1.5 cursor-pointer"
        />
        {unreadCount > 0 && (
          <span className="absolute bottom-5 left-5 text-white bg-red rounded-full p-2 w-4 h-4 flex items-center justify-center text-[9px] min-w-4">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>

      {isOpen && (
        <Container styling="absolute !shadow-lg !w-[280px] md:!w-[388px] mt-4 -right-16 z-50">
          {/* Header */}
          <div className="py-5 flex justify-between items-center">
            <Typography as="h6" size="xl" className="font-bold text-primary-text pl-10">
              Notifications
            </Typography>
            <div className="pr-5 cursor-pointer">
              <Iconify icon="mdi:cross-circle-outline" width="24" height="24" onClick={closeDropdown} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border border-light-gray py-2 px-7 justify-center font-md font-normal gap-10">
            <button
              className={`px-4 cursor-pointer py-2.5 w-1/2 rounded-xl ${
                activeTab === 'all' ? 'text-white bg-primary-dark font-medium' : 'text-black bg-white'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`w-1/2 cursor-pointer px-4 py-2.5 rounded-xl ${
                activeTab === 'unread' ? 'text-white bg-primary-dark font-medium' : 'text-black bg-white'
              } flex items-center justify-center gap-2`}
              onClick={() => setActiveTab('unread')}
            >
              Unread
              {unreadCount > 0 && (
                <span className="text-white bg-red rounded-full px-2 py-1 text-xs">{unreadCount}</span>
              )}
            </button>
          </div>

          {/* Notifications List */}
          <div className="bg-white max-h-[400px] overflow-y-auto custom-scrollbar shadow-lg">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 flex cursor-pointer border border-light-gray justify-between items-start ${
                    notification.unread ? '' : 'bg-white pl-7'
                  }`}
                >
                  <div className="flex justify-center items-start gap-2">
                    <div className="w-4 relative top-0.5 flex items-center justify-center">
                      {notification.unread && (
                        <Iconify className="text-primary-dark" icon="prime:circle-fill" width="15" height="15" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Typography
                        size="md"
                        className={`font-semibold ${notification.unread ? 'text-black' : 'text-dark-gray'}`}
                      >
                        {notification.title}
                      </Typography>
                      <Typography
                        size="sm"
                        className={`font-semibold ${notification.unread ? 'text-black' : 'text-dark-gray'}`}
                      >
                        {notification.description}
                      </Typography>
                      <div className="flex items-center gap-1">
                        <Typography size="sm" className="font-normal text-dark-gray">
                          {notification.date}
                        </Typography>
                        <Typography size="sm" className="font-normal text-dark-gray">
                          {notification.time}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <Typography size="sm" className="text-gray">
                  No notifications available.
                </Typography>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="w-full p-3 flex justify-center bg-white rounded-b-2xl">
            <Button variant="primary" onClick={handleViewAllClick} className="mx-auto w-[90%]">
              View All Notifications
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default NotificationDropdown;
