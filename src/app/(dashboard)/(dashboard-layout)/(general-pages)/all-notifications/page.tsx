'use client';

import React, { useEffect, useState } from 'react';

import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import Iconify from '@/components/shared/iconify';
import SearchInput from '@/components/shared/input-fields/search-bar';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { useAppSelector } from '@/redux/hooks';
import { INotification } from '@/types';

const AllNotifications: React.FC = () => {
  const INITIAL_COUNT = 5;
  const searchQuery = useAppSelector((state) => state.temp.filterName);
  const [activeTab, setActiveTab] = useState<'All' | 'unread'>('All');
  const [visibleNotifications, setVisibleNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const filteredNotifications = React.useMemo(() => {
    return content?.allNotificationsData.filter((notification) => {
      const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeTab === 'unread') {
        return notification.unread && matchesSearch;
      }
      return matchesSearch;
    });
  }, [searchQuery, activeTab]);

  useEffect(() => {
    setVisibleNotifications(filteredNotifications.slice(0, INITIAL_COUNT));
    setAllLoaded(false);
  }, [filteredNotifications]);

  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleNotifications(filteredNotifications);
      setLoading(false);
      setAllLoaded(true);
    }, 500);
  };

  const handleViewLess = () => {
    setVisibleNotifications(filteredNotifications.slice(0, INITIAL_COUNT));
    setAllLoaded(false);
  };
  return (
    <DashboardWrapper title="Notifications" subTitle="See all new and old notifications.">
      <Container styling="w-full overflow-hidden pb-2.5">
        {/* Search and Tabs */}
        <div className="p-5 md:px-8 flex flex-col sm:flex-row sm:justify-between items-center gap-5">
          <SearchInput />
          <div className="flex gap-4 text-md font-normal w-full sm:w-auto">
            {['All', 'unread']?.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTab(filter as 'All' | 'unread')}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg ${
                  activeTab === filter
                    ? 'border-primary-dark border text-primary-dark'
                    : 'border-light-gray border text-dark-gray'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Table */}
        <div className="max-h-[600px] overflow-y-auto">
          <DataTable
            ColumnsData={content?.columns?.allNotificationsColumns}
            tableRows={visibleNotifications}
            roundedHeader={true}
            TableBodyRow={({ id, title, description, date, time, unread }: INotification) => (
              <tr key={id}>
                <td className="px-4 lg:px-6 py-4 text-start break-words">
                  <div className="flex items-start gap-2">
                    <Iconify
                      className={`text-primary-dark relative top-[5px] ${unread ? 'block' : 'invisible'}`}
                      icon="prime:circle-fill"
                      width="10"
                      height="10"
                    />
                    <div className="flex flex-col gap-1">
                      <Typography size="md" className={`font-semibold ${unread ? 'text-black' : 'text-dark-gray'}`}>
                        {title || '--'}
                      </Typography>
                      <Typography size="md" className={`${unread ? 'text-black' : 'text-dark-gray'} font-normal`}>
                        {description || '--'}
                      </Typography>
                    </div>
                  </div>
                </td>

                <td className="px-4 lg:px-6 py-4 text-start">
                  <Typography size="sm" className="text-primary-text">
                    {date || '--'}
                  </Typography>
                </td>
                <td className="px-4 lg:px-6 py-4 text-start">
                  <Typography size="sm" className="text-primary-text">
                    {time || '--'}
                  </Typography>
                </td>
              </tr>
            )}
          />
          <hr className="text-light-gray mx-5" />

          {/* Loader or View More Button */}
          {!allLoaded && !loading && visibleNotifications.length < filteredNotifications.length && (
            <div className="pt-3 flex justify-center">
              <button onClick={handleViewMore} className="cursor-pointer flex justify-center items-center gap-1">
                <Typography size={'md'} as={'p'} className="text-primary-light font-semibold">
                  View More
                </Typography>
                <Iconify icon="mingcute:down-fill" className="text-primary-light" width="16" height="16" />
              </button>
            </div>
          )}

          {loading && (
            <div className="pt-3 flex justify-center items-center">
              <Iconify icon="eos-icons:loading" className="text-primary-dark animate-spin" width="24" height="24" />
            </div>
          )}
          {allLoaded && (
            <div className="pt-3 flex justify-center">
              <button onClick={handleViewLess} className="cursor-pointer flex justify-center items-center gap-1">
                <Typography size="md" as="p" className="text-primary-light font-semibold">
                  View Less
                </Typography>
                <Iconify icon="mingcute:up-fill" className="text-primary-light" width="16" height="16" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </DashboardWrapper>
  );
};

export default AllNotifications;
