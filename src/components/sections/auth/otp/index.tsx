'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import OTPInput from 'react-otp-input';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import OtpTimer from '@/components/ui/otp-timer';
import { verifyOtpInitialValues } from '@/formik/initial-values/auth';
import { optSchema } from '@/formik/validations/auth';

const OtpSection = ({ previousPage }: any) => {
  const router = useRouter();
  const otpInputRef = useRef(null);
  const [timer, setTimer] = useState<number>(0);
  const [resendCount, setResendCount] = useState<number>(0);

  const { values, errors, touched, setFieldTouched, setFieldValue, handleSubmit, validateForm, isValid } = useFormik({
    initialValues: verifyOtpInitialValues,
    onSubmit: (values) => {
      if (values.otp.length === 6) {
        toast.success('OTP verified successfully!');
        router.push(previousPage ? previousPage : '/package');
        console.log(values);
      } else {
        toast.error('Please enter a 6-digit OTP.');
      }
    },
    validationSchema: optSchema,
  });
  console.log('Errors:', errors);

  const handleOtpChange = (otp: string) => {
    const numericOtp = otp.replace(/\D/g, '');
    setFieldValue('otp', numericOtp);
  };

  const handleResend = () => {
    if (resendCount < 3) {
      setTimer(120);
      setResendCount(resendCount + 1);
      localStorage.setItem('otpTimer', JSON.stringify(120));
    }
  };

  useEffect(() => {
    const storedTimer = localStorage.getItem('otpTimer');
    if (storedTimer) {
      const remainingTime = JSON.parse(storedTimer);
      setTimer(remainingTime);
    }

    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          localStorage.setItem('otpTimer', JSON.stringify(newTime));
          return newTime;
        });
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      localStorage.removeItem('otpTimer');
    }
  }, [timer]);

  return (
    <Container hasBorders styling="w-full px-5 py-7 sm:!px-18 sm:!py-11.5">
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-6 justify-start">
            <div className="flex flex-col gap-5">
              <Typography size="h3" className="text-black font-bold">
                Verification
              </Typography>
              <div className="flex flex-col">
                <Typography size="h4" className="text-black font-bold">
                  Enter Your OTP
                </Typography>
                <Typography size="md" className="text-dark-gray">
                  someone@gmail.com
                </Typography>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-center w-full" ref={otpInputRef}>
                  <div className="flex flex-col items-start justify-center gap-2">
                    <OTPInput
                      value={values.otp}
                      onChange={handleOtpChange}
                      inputStyle={{
                        width: '62.5%',
                        height: '60px',
                        margin: '0 5px',
                        borderRadius: '10px',
                        border: `1px solid ${errors.otp && touched.otp ? 'red' : '#EDEDED'}`,

                        backgroundColor: 'transparent',
                        textAlign: 'center',
                        color: '#312D2D',
                        fontSize: '20px',
                        appearance: 'textfield',
                        outline: 'none',
                      }}
                      shouldAutoFocus={true}
                      numInputs={6}
                      // @ts-expect-error: The following line causes a type error because the library has not been updated to match the current TypeScript definitions.
                      inputMode="numeric"
                      renderInput={(props) => (
                        <input
                          {...props}
                          type="text"
                          pattern="\d*"
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          onBlur={() => {
                            setFieldTouched('otp', true, false); // Do not validate on blur
                          }}
                        />
                      )}
                    />
                    {touched.otp && errors.otp ? (
                      <div className="flex items-center">
                        <span className="relative top-[1px]">
                          <Iconify icon="bx:error" className={'text-red bg-white rounded-full p-[1px]'} />
                        </span>
                        <Typography size="md" className="pl-1 text-red">
                          {errors.otp}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <OtpTimer timer={timer} handleResend={handleResend} />
                  <Button
                    variant={'primary'}
                    disabled={!isValid}
                    className="w-full"
                    type="submit"
                    onClick={() => {
                      validateForm();
                    }}
                  >
                    Submit
                  </Button>
                  <div className="flex flex-col lg:flex-row justify-center items-center space-x-2">
                    <Typography size={'md'} className="text-dark-gray">
                      Want to change the email?
                    </Typography>
                    <Link href={'/reset-password'}>
                      <Typography className="text-primary-light font-semibold underline underline-offset-4 decoration-[1px]">
                        Click Here
                      </Typography>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OtpSection;
