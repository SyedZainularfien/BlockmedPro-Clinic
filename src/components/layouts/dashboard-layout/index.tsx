'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import Modal from '@/components/shared/custom-modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setIsDoctor } from '@/redux/slices/app-slice';
import { setEndConsultaionModalOpen, setLogoutModalOpen } from '@/redux/slices/temp-slice';
import { RootState } from '@/redux/store';
import { IDashboardLayoutProps } from '@/types';
import Sidebar from '../sidebar';

const DashboardLayout: FC<IDashboardLayoutProps> = ({ children }) => {
  const { isSidebarOpen, logoutModalOpen, endConsultationModalOpen } = useAppSelector((state: RootState) => state.temp);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCloseLogoutModal = () => {
    dispatch(setLogoutModalOpen(false));
  };

  const handleCloseConsulationtModal = () => {
    dispatch(setEndConsultaionModalOpen(false));
  };

  return (
    <>
      <div className="h-screen flex flex-col lg:flex-row relative mx-auto max-w-[2560px]">
        <Sidebar />
        {/* Main content */}
        <div className="flex-1 h-screen py-4 relative overflow-hidden">
          {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" />}
          <div className="h-100dvh bg-background-gray rounded-[20px] p-4 lg:pt-3.5 lg:px-5 mx-2 lg:mx-0 lg:mr-5 flex !pb-0 flex-col">
            {children}
          </div>
        </div>
      </div>
      {logoutModalOpen && (
        <Modal
          title="Logout"
          onClose={handleCloseLogoutModal}
          confirmButtonText="Logout"
          message="Are you sure you want to logout?"
          titleStyling="text-left"
          onConfirm={() => {
            router.push('/login');
            dispatch(setIsDoctor(false));
          }}
        />
      )}
      {endConsultationModalOpen && (
        <Modal
          title="Confirm End of Consultation"
          onClose={handleCloseConsulationtModal}
          confirmButtonText={'End Consultaion'}
          message="If you end this appointment, you will no longer be able to enter any additional patient data, and the final prescription will be sent to the pharmacy immediately (if selected) nearest to the patient's provided location."
          titleStyling="!text-left"
          messageStyling="!text-left"
          onConfirm={() => {
            router.push('/patients');
            dispatch(setIsDoctor(false));
          }}
        />
      )}
    </>
  );
};

export default DashboardLayout;
