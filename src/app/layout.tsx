import { Metadata } from 'next';

import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactQueryProvider from 'src/api/provider';
import StateProvider from 'src/redux/state-provider';

import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlockMed Pro - Clinic Module',
  description: 'This project is a module of BlockMed Pro project.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <StateProvider>
          <Suspense fallback={<Loading />}>
            <ToastContainer />
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </Suspense>
        </StateProvider>
      </body>
    </html>
  );
}
