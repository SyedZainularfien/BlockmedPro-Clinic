import React from 'react';
import Cards from 'react-credit-cards-2';

import { ICreditCardProps } from '@/types';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

const CreditCard: React.FC<ICreditCardProps> = ({ number, name, expiry, cvc, focus }) => {
  return <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus} />;
};

export default CreditCard;
