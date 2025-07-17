export interface AddNewCardRequest {
  paymentMethodId: string;
  lastDigits: string;
  brand: string;
  billingAddress: {
    region: string;
    stateOrProvince: string;
    city: string;
    address: string;
    postalCode: string;
  };
}
