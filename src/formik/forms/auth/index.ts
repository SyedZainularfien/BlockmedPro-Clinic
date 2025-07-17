export const signInForm = {
  id: '01-sign-in-form',
  formFields: {
    email: {
      type: 'email',
      name: 'email',
      label: 'Email address',
      placeholder: 'Enter your email',
      errMsgs: {
        required: 'Email is required.',
        inValid: 'Email must be valid.',
      },
    },
    password: {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      errMsgs: {
        required: 'Password is required.',
      },
    },
  },
};
