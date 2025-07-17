import { signInForm } from 'src/formik/forms/auth';
import * as Yup from 'yup';

const {
  formFields: { email, password },
} = signInForm;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = Yup.object({
  [email.name]: Yup.string().email(email.errMsgs.inValid).required(email.errMsgs.required),
  [password.name]: Yup.string().min(6, 'Password must be at least 6 characters').required(password.errMsgs.required),
});

export const optSchema = Yup.object({
  otp: Yup.string()
    .required('OTP is required.')
    .min(1, 'OTP must be at least 1 characters long')
    .max(6, 'OTP must be at most 6 characters long'),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Email must be valid.')
    .trim()
    .lowercase()
    .matches(emailRegex, { message: 'Email Address is required.' })
    .required('Email Address is required.'),
});

export const newPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().required('New password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

export const AddNewCardSchema = Yup.object({
  number: Yup.string()
    .matches(/^\d{16}$/, 'Card number must be exactly 16 digits')
    .required('Card number is required'),
  name: Yup.string().required('Cardholder name is required'),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .required('Expiry date is required'),
  cvc: Yup.string()
    .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits')
    .required('CVC is required'),
});

export const InvitePatientSchema = Yup.object({
  email: Yup.string().email('Incorrect email, please enter a correct email.').required('Email is required'),
});

export const addRoleSchema = Yup.object({
  roleTitle: Yup.string().required('Role Name is required'),
});

export const addUserSchema = Yup.object({
  users: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      department: Yup.string().required('Department is required'),
      jobTitle: Yup.string().required('Job Title/Role is required'),
    })
  ),
});
