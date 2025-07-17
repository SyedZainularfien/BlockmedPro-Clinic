export const accountDetailsForm = {
  id: '03-add-new-bank-form',
  formFields: {
    bankName: {
      type: 'text',
      name: 'bankName',
      label: 'Bank Name',
      placeholder: 'Select Bank Name',
      errMsgs: {
        required: 'Bank Name is required.',
      },
    },
    accountHolderName: {
      type: 'text',
      name: 'accountHolderName',
      label: 'Account Holder Name',
      placeholder: 'Enter Account Holder Name',
      errMsgs: {
        required: 'Account Holder Name is required.',
      },
    },
    accountNumber: {
      type: 'number',
      name: 'accountNumber',
      label: 'Account Number',
      placeholder: 'Enter Account Number',
      errMsgs: {
        required: 'Account Number is required.',
      },
    },
    bankSortCode: {
      type: 'number',
      name: 'bankSortCode',
      label: 'Sort Code',
      placeholder: 'Enter Sort Code',
      errMsgs: {
        required: 'Sort Code is required.',
      },
    },
  },
};

export const bankDetailsForm = {
  id: '03-add-new-bank-form',
  formFields: {
    bankAccountType: {
      type: 'checkbox',
      name: 'bankAccountType',
      label: 'Bank Account Type',
      errMsgs: {
        required: 'Bank Account Type is required.',
      },
    },
    bankCountry: {
      type: 'text',
      name: 'bankCountry',
      label: 'Bank Country',
      placeholder: 'Select Bank Country',
      errMsgs: {
        required: 'Bank Country is required.',
      },
    },
    bankAccountCurrency: {
      type: 'text',
      name: 'bankAccountCurrency',
      label: 'Bank Account Currency',
      placeholder: 'Select Bank Account Currency',
      errMsgs: {
        required: 'Bank Account Currency is required.',
      },
    },
  },
};
export const profileForm = {
  id: '01-profile-form',
  formFields: {
    first_name: {
      type: 'text',
      name: 'first_name',
      label: 'First Name',
      placeholder: 'Enter first name',
      errMsgs: {
        required: 'First name is required.',
        minlength: 'First name must be at least 3 characters long',
      },
    },
    last_name: {
      type: 'text',
      name: 'last_name',
      label: 'Last Name',
      placeholder: 'Enter last name',
      errMsgs: {
        required: 'Last name is required.',
        minlength: 'Last name must be at least 3 characters long',
      },
    },
    email: {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      errMsgs: {
        required: 'Email is required.',
        valid: 'Email is not valid.',
      },
    },
  },
};

export const securityForm = {
  id: '02-security-form',
  formFields: {
    old_password: {
      type: 'password',
      name: 'old_password',
      label: 'Old Password',
      placeholder: 'Old password',
      errMsgs: {
        required: 'Old password is required.',
        minlength: 'Password must be at least 8 characters long',
      },
    },
    new_password: {
      type: 'password',
      name: 'new_password',
      label: 'New Password',
      placeholder: 'New Password',
      errMsgs: {
        required: 'New password is required.',
        minlength: 'Password must be at least 8 characters long',
      },
    },
    confirm_password: {
      type: 'password',
      name: 'confirm_password',
      label: 'Confirm Password',
      placeholder: 'Confirm password',
      errMsgs: {
        required: 'Confirm password is required.',
        minlength: 'Password must be match',
        matchPassword: 'Password must be match',
      },
    },
  },
};
