'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  imageSrc?: string;
  altText?: string;
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ imageSrc, altText = 'Auth Image', children }) => {
  return (
    <div className="flex min-h-screen px-5 lg:px-[40px] py-[30px] bg-white items-center justify-center">
      <div className="flex gap-10 w-full mx-auto">
        {/* Left Side: Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative h-full">
          <Image
            src={imageSrc || ''}
            alt={altText}
            width={500}
            height={500}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>

        {/* Right Side: Children (Form) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
