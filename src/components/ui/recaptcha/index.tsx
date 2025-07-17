'use client';

import React, { FC, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// Add this type assertion
const ReCAPTCHAComponent = ReCAPTCHA as any;

const ReCaptchaComponent: FC = () => {
  const reCaptchaRef = useRef<ReCAPTCHA | null>(null);

  return (
    <div className="recaptcha-container min-h-[78px]">
      <ReCAPTCHAComponent style={{ display: 'inline-block' }} ref={reCaptchaRef} sitekey={'dummy-key'} />
    </div>
  );
};

export default ReCaptchaComponent;
