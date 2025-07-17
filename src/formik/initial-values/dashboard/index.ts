export const inviteNewUsersInitialValues = {
  email: '',
};

export const doctorsFormInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  phoneCode: '',
  gender: '',
  bloodGroup: '',
  dob: '',
  address: '',
  education: '',
  speciality: '',
  designation: '',
  profileImage: '/assets/images/default_user_avatar.png',
  shiftPeriod: {
    appointmentType: '',
    days: {
      monday: true,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    timeSlots: {
      monday: [{ startTime: '09:00 AM', endTime: '05:00 PM' }],
      tuesday: [{ startTime: '10:00 AM', endTime: '06:00 PM' }],
      wednesday: [{ startTime: '11:00 AM', endTime: '07:00 PM' }],
      thursday: [{ startTime: '12:00 AM', endTime: '08:00 PM' }],
      friday: [{ startTime: '01:00 PM', endTime: '09:00 PM' }],
      saturday: [{ startTime: '09:00 AM', endTime: '05:00 PM' }],
      sunday: [{ startTime: '09:00 AM', endTime: '05:00 PM' }],
    },
  },
  uploadedFileName: '',
  uploadedFileSize: '',
  uploadedFileType: '',
  uploadProgress: 0,
  fileSize: 0,
  uploadSpeed: 0,
  uploadedFile: null, // This will store the actual File object
  bio: '',
};

export const profileInitialValues = {
  firstName: 'Dr.Buran',
  lastName: 'Ahmed',
  email: 'drburhan@gmail.com',
  image: '/assets/svgs/dr-rehmata.svg',
};

export const changeEmailInitialValues = {
  oldEmail: 'dummyEmail.com',
  newEmail: '',
  password: '',
};
export const changePasswordInitialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const bankDetailsInitialValues = {
  bankAccountType: 'personal',
  bankCountry: '',
  bankAccountCurrency: '',
};

export const accountDetailsInitialValues = {
  bankName: '',
  accountHolderName: '',
  accountNumber: '',
  bankSortCode: '',
};

export const earningsInitialvalues = {
  amount: '',
};

export const registrationQuestionaireInitialvalues = {
  sleepHours: 0,
  exerciseValue: 0,
  improveSleep: '',
  overallHealth: '',
  howOften: '',
  typesOfExercises: '',
};

export const addNewTicketValues = {
  name: '',
  email: '',
  subject: '',
  department: '',
  priority: '',
  message: '',
  attachments: [],
};
