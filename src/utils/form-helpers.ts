// src/utils/formHelpers.ts
export const getError = (name: string, touched: any, errors: any) => {
  return touched[name as keyof typeof errors] && errors[name as keyof typeof errors]
    ? errors[name as keyof typeof errors]
    : '';
};

export const getTouched = (name: string, touched: any, errors: any) => {
  return touched[name as keyof typeof errors] && errors[name as keyof typeof errors]
    ? touched[name as keyof typeof errors]
    : '';
};
