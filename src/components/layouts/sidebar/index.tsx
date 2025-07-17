'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { Button } from '@/components/shared/button';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import useClickOutside from '@/hooks/outside-click/useOutsideClick';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeSidebar, setEndConsultaionModalOpen, setLogoutModalOpen } from '@/redux/slices/temp-slice';
import { RootState } from '@/redux/store';
import SidebarItem from './SidebarItems';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const { isDoctor } = useAppSelector((state: RootState) => state.app);
  const { isSidebarOpen } = useAppSelector((state: RootState) => state.temp);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setLogoutModalOpen(true));
  };
  const handleEndConsultation = () => {
    dispatch(setEndConsultaionModalOpen(true));
  };

  const handleBackToPatients = () => {
    router.push('/patients');
  };

  useClickOutside(sidebarRef, () => dispatch(closeSidebar()), isSidebarOpen);
  const NAV_ITEMS = content?.NAV_ITEMS;

  const sidebarItems = pathname.includes('patient-details')
    ? NAV_ITEMS.patientDetails
    : isDoctor
      ? NAV_ITEMS.doctorsDashboard
      : NAV_ITEMS.main;

  return (
    <aside
      ref={sidebarRef}
      className={`fixed lg:static z-50 transition-transform duration-300 bg-white h-[100dvh] overflow-y-auto w-[250px]
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}
    >
      {/* Close button for mobile */}
      <div className="lg:hidden flex justify-end p-2.5 px-4">
        <button onClick={() => dispatch(closeSidebar())} className="cursor-pointer">
          <Iconify icon="ic:round-close" width={24} height={24} />
        </button>
      </div>

      {/* Fixed header section */}
      <div className="flex-shrink-0 px-4 pt-2.5">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center items-center">
            <Image
              src="/assets/svgs/logo.svg"
              alt="logo"
              height={32}
              width={192}
              priority
              className="cursor-pointer"
              onClick={() => router.push('/dashboard')}
            />
          </div>
          {sidebarItems === NAV_ITEMS?.main || sidebarItems === NAV_ITEMS?.doctorsDashboard ? (
            <div
              onClick={() => router.push('/dashboard')}
              className="flex gap-3 items-center p-3 border border-gray rounded-lg cursor-pointer"
            >
              <Image
                src={
                  sidebarItems === NAV_ITEMS?.doctorsDashboard
                    ? '/assets/svgs/dr-jonas.svg'
                    : '/assets/svgs/dr-rehmata.svg'
                }
                alt="user profile"
                height={40}
                width={40}
                className="rounded-full object-cover"
              />
              <div>
                <Typography size="md" className="font-semibold text-gray-600">
                  {sidebarItems === NAV_ITEMS?.doctorsDashboard ? 'Welcome Jonas!' : 'Welcome John!'}
                </Typography>
                <Typography size="sm" className="text-black">
                  {sidebarItems === NAV_ITEMS?.doctorsDashboard ? 'Doctor' : 'Admin'}
                </Typography>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={handleBackToPatients}
                className="flex items-center justify-start gap-4 w-full cursor-pointer py-3.5 px-5 border border-gray rounded-lg bg-white focus:outline-none transition-colors mb-2"
              >
                {/* back icon */}
                <Iconify icon="line-md:arrow-left" width={16} height={16} className="text-black" />

                <Typography size="md" className="text-black font-semibold">
                  Back to Patients
                </Typography>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable navigation section */}
      <nav className="flex-grow overflow-y-auto custom-scrollbar py-6 space-y-2 px-4">
        {sidebarItems.map((item, index) => (
          <React.Fragment key={index}>
            <SidebarItem {...item} expanded={expanded} setExpanded={setExpanded} />
            {index === 2 && <hr className="text-light-gray leading-none" />}
          </React.Fragment>
        ))}
      </nav>

      {/* Fixed bottom section with invite and logout */}

      {sidebarItems === NAV_ITEMS.patientDetails ? (
        <div className="px-4 pb-5">
          <Button
            variant={'danger'}
            onClick={handleEndConsultation}
            className="flex items-center justify-center gap-5 w-full cursor-pointer !rounded-lg"
          >
            <Image src="/assets/svgs/end-consultaion.svg" alt="end-consultaion-image" width={20} height={20} />
            <Typography size="md" className="text-white font-semibold">
              End Consultation
            </Typography>
          </Button>
        </div>
      ) : (
        <div className="flex-shrink-0 px-4 pb-2.5">
          {isDoctor === false && (
            <>
              <hr className="text-primary-dark opacity-10 mb-4" />

              <div className="p-4 mb-4 text-white bg-gradient-primary rounded-lg">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <Typography size="md" className="font-semibold">
                      Invite New Patient
                    </Typography>
                    <Typography size="sm" className="font-normal">
                      Send patients a personalized invitation link to access health records, book appointments, and stay
                      connected.
                    </Typography>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/invite-new-patient')}
                    className="w-[80%] text-nowrap text-primary-dark text-sm font-semibold !rounded-lg"
                  >
                    Invite New Patient
                  </Button>
                </div>
              </div>
            </>
          )}
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full cursor-pointer py-3.5 px-5 border border-gray rounded-lg text-black hover:bg-gray-100 focus:outline-none transition-colors mb-2"
          >
            <Typography size="md" className="text-black font-semibold">
              Logout
            </Typography>
            <Iconify icon="line-md:logout" width={20} height={20} className="rotate-180" />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
