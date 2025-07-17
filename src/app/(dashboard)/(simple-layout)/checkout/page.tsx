'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { NextPage } from 'next';

import { content } from '@/data';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PK ||
    (() => {
      throw new Error('NEXT_PUBLIC_STRIPE_PK is not defined');
    })()
);
const appearance = content?.appearance;

const Page: NextPage = () => {
  return (
    <div className="mx-auto w-full h-full">
      <Elements stripe={stripePromise} options={{ appearance: appearance as any }}>
        <CheckoutPage />
      </Elements>
    </div>
  );
};

export default Page;
