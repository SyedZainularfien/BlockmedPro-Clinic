import * as Yup from 'yup';

import { accountDetailsForm, bankDetailsForm, profileForm, securityForm } from '@/formik/forms/dashboard';

export const doctorFormSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.number().required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
  bloodGroup: Yup.string().required('Blood group is required'),
  dob: Yup.string().required('Date of birth is required'),
  address: Yup.string().required('Address is required'),
  education: Yup.string().required('Education is required'),
  speciality: Yup.string().required('Speciality is required'),
  designation: Yup.string().required('Designation is required'),
  bio: Yup.string().required('Bio is required'),
  // appointmentType: Yup.string().required('Appointment type is required'),
  shiftPeriod: Yup.object({
    appointmentType: Yup.string().required('Appointment type is required'),
  }),
});

export const profileSchema = Yup.object().shape({
  // image: Yup.string().url('Invalid image URL').nullable(),
  firstName: Yup.string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .required('Last name is required'),
});

export const changeEmailSchema = Yup.object().shape({
  newEmail: Yup.string().trim().email('Enter a valid email address').required('New email address is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Old password is required'),
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const clinicInfoSchema = Yup.object().shape({
  clinicName: Yup.string().required('Clinic name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  registeredIn: Yup.string().required('Registered in is required'),
  postalCode: Yup.string().required('Postal code is required'),
  registrationNo: Yup.string().required('Registration number is required'),
  vatRegistarationNo: Yup.string().required('VAT registration number is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
});

export const aboutClinicSchema = Yup.object().shape({
  overview: Yup.string().required('Overview is required'),
});

export const cancellationPolicySchema = Yup.object().shape({
  cancelationPolicy: Yup.string().required('Cancellation policy is required'),
});
export const specialisationValidationSchema = Yup.object({
  selectedSpecializations: Yup.array()
    .min(1, 'At least one specialization must be selected')
    .required('Specializations are required'),
  specializations: Yup.array().of(
    Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required(),
      price: Yup.number().min(0, 'Price must be 0 or greater').required('Price is required'),
    })
  ),
  newSpecialtyInput: Yup.string(),
});

export const bankDetailsSchema = Yup.object({
  bankAccountType: Yup.string().required(bankDetailsForm.formFields.bankAccountType.errMsgs.required),
  bankCountry: Yup.string().required(bankDetailsForm.formFields.bankCountry.errMsgs.required),
  bankAccountCurrency: Yup.string().required(bankDetailsForm.formFields.bankAccountCurrency.errMsgs.required),
});

export const accountDetailsSchema = Yup.object({
  [accountDetailsForm.formFields.bankName.name]: Yup.string().required(
    accountDetailsForm.formFields.bankName.errMsgs.required
  ),
  [accountDetailsForm.formFields.accountHolderName.name]: Yup.string().required(
    accountDetailsForm.formFields.accountHolderName.errMsgs.required
  ),
  [accountDetailsForm.formFields.accountNumber.name]: Yup.number().required(
    accountDetailsForm.formFields.accountNumber.errMsgs.required
  ),
  [accountDetailsForm.formFields.bankSortCode.name]: Yup.number().required(
    accountDetailsForm.formFields.bankSortCode.errMsgs.required
  ),
});

const { first_name, last_name, email } = profileForm.formFields;
export const profileFormSchema = Yup.object({
  [first_name.name]: Yup.string().min(3, first_name.errMsgs.minlength).required(first_name.errMsgs.required),
  [last_name.name]: Yup.string().min(3, last_name.errMsgs.minlength).required(last_name.errMsgs.required),
  [email.name]: Yup.string().email(email.errMsgs.valid).required(email.errMsgs.required),
});

const { old_password, new_password, confirm_password } = securityForm.formFields;
export const securityFormSchema = Yup.object({
  [old_password.name]: Yup.string().min(8, old_password.errMsgs.minlength).required(old_password.errMsgs.required),
  [new_password.name]: Yup.string().min(8, new_password.errMsgs.minlength).required(new_password.errMsgs.required),
  [confirm_password.name]: Yup.string()
    .oneOf([Yup.ref('new_password')], confirm_password.errMsgs.matchPassword)
    .required(confirm_password.errMsgs.required),
});

export const presetValidationSchema = Yup.object({
  newPresetValue: Yup.string()
    .required('Preset is required')
    .min(3, 'Preset must be at least 3 characters')
    .max(500, 'Preset cannot exceed 500 characters'),
});

const availableBalance = 100;
export const earningsSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be a positive number')
    .max(availableBalance, `Amount cannot exceed available balance of $${availableBalance}`),
});

export const registrationQuestionaireSchema = Yup.object().shape({
  improveSleep: Yup.string().required('Required'),
  overallHealth: Yup.string().required('Required'),
  howOften: Yup.string().required('Required'),
  typesOfExercises: Yup.string().required('Required'),
});

export const addNewTicketValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  department: Yup.string().required('Department is required'),
  priority: Yup.string().required('Priority is required'),
  message: Yup.string().required('Message is required'),
});
