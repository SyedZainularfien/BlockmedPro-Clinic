import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CreatePaymentMethodData } from '@stripe/stripe-js';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { AddNewCardRequest } from '@/api/api-types';
import BackButton from '@/components/shared/back-button';
import Container from '@/components/shared/container';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import { Typography } from '@/components/shared/typography';
import CardForm from '@/components/ui/card-form';
import { content } from '@/data';
import { IAddNewCardFormState } from '@/types';

const AddNewCardPage: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState<IAddNewCardFormState>({
    address: '',
    stateOrProvince: '',
    region: '',
    regionLabel: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name: string, option: { value: string; key: string }): void => {
    console.log('option', option);
    setFormData((prevState) => ({
      ...prevState,
      [`${name}Label`]: option?.value,
      [`${name}`]: option?.key,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      console.error('CardNumberElement is null');
      return;
    }

    const cardData: CreatePaymentMethodData = {
      type: 'card',
      card: cardNumberElement,
    };

    if (formData.city || formData.postalCode || formData.stateOrProvince || formData.region) {
      cardData.billing_details = {
        address: {
          city: formData.city,
          postal_code: formData.postalCode,
          state: formData.stateOrProvince,
          country: formData.region,
          line1: formData.address,
        },
      };
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod(cardData);

    if (error) {
      return;
    }

    const payload: AddNewCardRequest = {
      paymentMethodId: paymentMethod?.id,
      lastDigits: paymentMethod?.card?.last4 || '',
      brand: paymentMethod?.card?.brand || '',
      billingAddress: {
        region: formData?.region,
        stateOrProvince: formData?.stateOrProvince,
        city: formData?.city,
        address: formData?.address,
        postalCode: formData?.postalCode,
      },
    };

    // mutate(payload);
    console.log('payload', payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full gap-5 lg:gap-9 checkout-screen-h">
      <div className="w-full flex flex-col gap-5 lg:gap-7">
        <BackButton />
        <div className="flex flex-col w-full gap-1">
          <div className="flex items-center justify-between w-full">
            <div>
              <Typography as="h3" size="h3" className="text-primary-dark ">
                Add New Card
              </Typography>
            </div>
          </div>
          <div className="w-full xl:w-[60%]">
            <Typography as="p" size="lg" className="font-medium text-dark-gray">
              Enter your new card details below to securely save it for future purchases, making checkouts faster and
              easier.
            </Typography>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-start gap-5 lg:gap-8">
        <div className="w-full lg:w-[60%]">
          <Container hasBorders styling="p-4 lg:p-10 space-y-7">
            <div>
              <Typography as="h4" size="h4" className="text-primary-dark !leading-tight">
                Billing Address
              </Typography>
            </div>
            <div className="grid w-full grid-cols-2 gap-5">
              <div className="w-full col-span-2">
                <InputTextField
                  label="Address (optional)"
                  placeholder="Enter your address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full col-span-2">
                <InputSelectField
                  label="State/Province (optional)"
                  name="stateOrProvince"
                  placeholder="State/Province"
                  textColor="!text-primary-text font-bold !m-0"
                  selectedTextColor="#312d2d"
                  className="!rounded-[12px] w-full"
                  height="h-[3.65rem]"
                  value={formData.stateOrProvince}
                  // onChange={(value: any) => handleDropdownChange('stateOrProvince', value)}
                  onSelect={(value: any) => handleDropdownChange('stateOrProvince', value)}
                  options={content?.stateOptions}
                />
              </div>
              <div className="w-full col-span-2">
                <InputSelectField
                  name="region"
                  label="Region (optional)"
                  textColor="font-bold !m-0"
                  className="!rounded-[12px] w-full"
                  height="h-[3.65rem]"
                  selectedTextColor="#312d2d"
                  value={formData.regionLabel}
                  // onChange={(value: any) => handleDropdownChange('region', value)}
                  onSelect={(value: any) => handleDropdownChange('region', value)}
                  options={content?.LocationOptions}
                  placeholder="Select"
                />
              </div>
              <div className="w-full col-span-2">
                <InputTextField
                  label="City (optional)"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full col-span-2">
                <InputTextField
                  label="Postal code (optional)"
                  name="postalCode"
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Container>
        </div>
        <div className="w-full lg:w-[55%]">
          <CardForm addNewCard />
        </div>
      </div>
    </form>
  );
};

export default AddNewCardPage;
