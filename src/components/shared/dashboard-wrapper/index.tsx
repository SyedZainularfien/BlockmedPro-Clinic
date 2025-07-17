import React, { FC } from 'react';

import Header from '@/components/ui/header';
import { IDashboardWrapperProps } from '@/types';

const DashboardWrapper: FC<IDashboardWrapperProps> = ({ children, title, subTitle, backButton }) => {
  return (
    <main className="flex flex-col h-[calc(100dvh-40px)]">
      <Header title={title} subTitle={subTitle} backButton={backButton} />
      <div className="overflow-y-auto overflow-x-hidden scrollbar-hide flex-1 pt-5 [&>*:last-child]:mb-5">
        {children}
      </div>
    </main>
  );
};

export default DashboardWrapper;
