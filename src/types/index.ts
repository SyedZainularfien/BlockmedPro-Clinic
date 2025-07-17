import { Time } from '@internationalized/date';
import { DateValues } from 'date-fns';
import { ChangeEvent, FocusEvent, Key, ReactNode } from 'react';
import { Focused } from 'react-credit-cards-2';

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface InputFieldProps {
  disabled?: boolean;
  label?: string;
  card?: boolean;
  name?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  styling?: string;
  labelStyles?: string;
  textColor?: string;
  phoneCode?: string;
  phoneNumber?: string | number;
  [key: string]: any;
}

export interface InputNumberFeildProps {
  disabled?: boolean;
  label?: string;
  name?: string;
  value?: number | string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  styling?: string;
  labelStyles?: string;
  textColor?: string;
  [key: string]: any;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface InputPasswordFieldProps {
  disabled?: boolean;
  label?: string;
  value?: string;
  isDashboard?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  labelStyles?: string;
  error?: string;
  styling?: string;
  textColor?: string;
  strengthChecker?: boolean;
  [key: string]: any;
}

export interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export interface ISimpleLayoutProps {
  children: ReactNode;
}

export interface ISubItemProps {
  text: string;
  route: string;
  icon?: string;
}

export interface ISidebarItemProps {
  img?: string;
  text: string;
  route?: string;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  subItems?: ISubItemProps[];
}

export interface HeaderProps {
  title?: string;
  subTitle?: string;
  backButton?: boolean;
}

export interface Permission {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Role {
  id: number;
  title: string;
  permissions: Permission[];
}

export interface RoleCardProps {
  role: Role;
  onDelete?: (id: number) => void;
  onTogglePermission: (roleId: number, permissionId: string) => void;
}

export interface AddUserErrors {
  email?: string;
  department?: string;
  jobTitle?: string;
}

export interface AddUser {
  id: number;
  email: string;
  department: string;
  jobTitle: string;
}

export interface AddUserFormValues {
  users: AddUser[];
}

export interface AppointmentsTableProps {
  _id: string;
  idx: number;
  appointNo: string;
  name: string;
  patientId: string;
  date: string;
  time: string;
  gender: string;
  specialty: string;
  appointmentType: string;
  assignedDoc: any;
  status: string;
  assignedDocImg: string;
  assignedDocName: string;
  assignedDocId: string;
}
export interface IPatientsTableProps {
  _id: string;
  idx: number;
  appointNo: string;
  name: string;
  patientId: string;
  date: string;
  time: string;
  gender: string;
  specialty: string;
  appointmentType: string;
  assignedDoc: any;
  status: string;
  assignedDocImg: string;
  assignedDocName: string;
  assignedDocId: string;
}

export interface DashboardTableProps {
  _id: string;
  doctorName: string;
  certification: string;
  status: string;
}

export interface DashboardOptions extends Record<string, boolean> {
  patientDemographics: boolean;
  totalRevenue: boolean;
  doctors: boolean;
  ourSpecialties: boolean;
  ratings: boolean;
  clinicalDiseases: boolean;
  appointmentOverview: boolean;
  appointmentReports: boolean;
}

export interface PatientDetails {
  name: string;
  id: string;
  dateOfBirth: string;
  email: string;
  address: string;
  phone: string;
}

export interface TransactionsTableProps {
  idx: number;
  _id: string;
  doctorName: string;
  transactionId: string;
  activity: string;
  paymentMethod: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  amount: string;
  negative: boolean;
}
export interface IEarningsTableProps {
  _id: string;
  date: string;
  activity: string;
  description: string;
  from: string;
  transactionId: string;
  patientId: string;
  status: string;
  amount: string;
  negative: boolean;
}

export interface InvoiceTableProps {
  _id: number;
  sr: string;
  itemDescription: string;
  qty: string;
  price: string;
}
export interface IPrescriptionTableProps {
  _id: number;
  qty: string;
  nameOfDrug: string;
  strength: string;
  formulation: string;
  doseInstruction: string;
}

export interface IDonutChartComponentProps {
  data: any;
  height?: number;
  insideLabel: string;
}

export interface IBackButtonProps {
  route?: string;
  label?: string | string[];
  iconColor?: string;
}

export interface IAreaChartProps {
  seriesData: Array<{
    name: string;
    data: number[];
  }>;
  colors?: string[];
  categoriesData: string[];
  showDollarSign?: boolean;
  label?: string;
  showLegend?: boolean;
  height?: any;
  showYAxisValues?: boolean;
}

export interface IDonutChartProps {
  height?: any;
  isPercentage?: boolean;
  data: {
    female?: any;
    male?: any;
    name: string;
    value: number;
    color: string;
  }[];
  insideLabel?: string;
  clinicalDisease?: boolean;
}

export interface IClinicalDiseaseDataItem {
  color: string;
  name: string;
  value: number;
}

export interface IClinicalDiseaseDonutChartProps {
  data: IClinicalDiseaseDataItem[];
}

export interface IContainerProps {
  children: React.ReactNode;
  styling?: string;
  hasBorders?: boolean;
  borderBottomColor?: string;
  bottomBorder?: boolean;
  leftBorder?: boolean;
  leftBorderColor?: string;
}
export interface ICreditCardProps {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focus?: Focused;
}
export interface ICustomCheckboxProps {
  name?: string;
  label?: string;
  checked: boolean | undefined;
  lightbackground?: boolean;
  isDashboard?: boolean;
  onChange: (value: boolean) => void;
  styling?: string;
  [key: string]: any;
}

export interface ICustomCheckboxOption {
  label: string;
  value: string;
}

export interface ICustomCheckboxDropdownProps {
  title: string;
  options: ICustomCheckboxOption[];
  onApply?: (selected: string[]) => void;
  selectedFilters: string[];
  position?: string;
}
export interface CustomModalProps {
  title?: string;
  onClose: () => void;
  onConfirm?: (id?: number) => void;
  message?: string;
  id?: any | null;
  titleStyling?: string;
  messageStyling?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export interface DataTableColumn {
  id: string;
  label: string;
  sortable?: boolean;
}

export interface DataTableProps {
  notFonudText?: string;
  paginate?: boolean;
  loading?: boolean;
  tableRows: any[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  ColumnsData: DataTableColumn[];
  TableBodyRow: any;
  topListedCountries?: boolean;
  roundedHeader?: boolean;
  headerClassName?: string;
  headerPosition?: string;
  invoice?: boolean;
  headerColor?: string;
  meta?: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  setCurrentPage?: (page: number) => void;
  setRowsPerPage?: (rows: number) => void;
}

export interface DateRangeProps {
  data: any[];
  filterKey: string;
  position?: string;
  onFilter?: (filteredData: any[]) => void;
}

export interface InputSelectFieldProps {
  name?: string;
  label?: string;
  value?: any;
  error?: string;
  styling?: string;
  required?: boolean;
  backgroundColor?: string;
  onChange?: (newValue: any) => void;
  disabled?: boolean;
  labelStyles?: string;
  placeholder?: string;
  placeholderColor?: string;
  containerPadding?: string;
  options: any[];
  radius?: string;
  isMulti?: boolean;
  IT?: boolean;
  onSelect?: (selectedValue: any) => void;
  [key: string]: any;
}

export interface ProgressBarProps {
  uploadProgress: number;
}

export interface SearchInputProps {
  styling?: string;
}

export interface TooltipProps {
  message: string;
  trigger: 'hover' | 'click';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  children: React.ReactNode;
  copiedContent?: string;
  styling?: string;
}

export interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (roleTitle: string, permissions: Permission[]) => void;
  defaultPermissions: Permission[];
}

export interface AddNewUserModalProps {
  onClose: () => void;
}

export interface DashboardOptionsModalProps {
  onClose: () => void;
  dashboardOptions: {
    patientDemographics: boolean;
    totalRevenue: boolean;
    doctors: boolean;
    ourSpecialties: boolean;
    ratings: boolean;
    clinicalDiseases: boolean;
    appointmentOverview: boolean;
    appointmentReports: boolean;
    [key: string]: boolean;
  };
  setDashboardOptions: React.Dispatch<
    React.SetStateAction<{
      patientDemographics: boolean;
      totalRevenue: boolean;
      doctors: boolean;
      ourSpecialties: boolean;
      ratings: boolean;
      clinicalDiseases: boolean;
      appointmentOverview: boolean;
      appointmentReports: boolean;
      [key: string]: boolean;
    }>
  >;
  onSave: () => void;
}

export interface InvitePatientModalProps {
  uploadComplete: boolean;
  setShowModal: (show: boolean) => void;
  uploadProgress: number;
  handleCloseModal: () => void;
}

export interface OtpTimerProps {
  timer: number;
  handleResend: () => void;
}

export interface StarRatingProps {
  maxRating?: number;
  size?: number;
  color?: string;
  defaultRating?: number;
  onSetRating?: (rating: number) => void;
  addStyle?: object;
  gap?: number;
  precision?: number;
  readOnly?: boolean;
}

export interface StarProps {
  value: number;
  maxRating: number;
  size: number;
  color: string;
  fillPercentage: number; // Changed from full/half to precise percentage
  onRate?: () => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  onEnterKeyDown?: (event: React.KeyboardEvent) => void;
}
export interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  icon?: string;
  iconColor?: string;
  iconBgColor?: string;
  lineColor?: string;
  styling?: string;
  negative?: boolean;
  valueFontSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'xl' | 'lg' | 'md' | 'sm';
  isSvg?: boolean;
}

export interface SuccessModalProps {
  title: string;
  subTitle: string;
  buttonText: string;
  toSkip?: boolean;
  skipLink?: string;
  addUserLink?: string;
  isModal?: boolean;
  setIsOpen?: (value: boolean) => void;
}

export interface ToggleButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export interface IAppSliceState {
  isDoctor?: boolean;
}

export interface DropdownProps {
  placeholder?: React.ReactNode;
  data?: { label: string; value: string }[];
  className?: string;
  onSelect?: (value: string) => void;
  value?: string;
}

export interface IAddNewCardFormState {
  address: string;
  stateOrProvince: string;
  region: string;
  regionLabel: string;
  city: string;
  postalCode: string;
}

export interface IDoctorInfoItemProps {
  label: string;
  value: string;
  lessGap?: boolean;
  isMultiLine?: boolean;
  labelWidth?: string;
  valueWidth?: string;
}

export interface IDoctor {
  img: string;
  name: string;
  id: number;
}

export interface IDoctorsDropdownProps {
  doctors: IDoctor[];
  currentDoctor: IDoctor;
  onSelectDoctor: (doctor: IDoctor) => void;
}

export interface ITab {
  id: number;
  title: string;
  count?: number;
}

export interface ITabsProps {
  activeTab: number;
  setActiveTab: (id: number) => void;
  tabs: ITab[];
  filled?: boolean;
}

export interface IBillingDetailsCardProps {
  action?: boolean;
  item?: {
    address?: string;
    region?: string;
    postalCode?: string;
  };
  key: Key;
  cardKey: string;
}

export interface IEditUserRolelProps {
  onClose: () => void;
  options: { label: string; value: string }[];
}

export interface IDoctorFormProps {
  initialData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    phoneCode: string | number;
    gender: string;
    bloodGroup: string;
    dob: string;
    address: string;
    education: string;
    speciality: string;
    designation: string;
    profileImage: string;
    shiftPeriod: {
      days: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
      };
      timeSlots: {
        monday: { startTime: string; endTime: string }[];
        tuesday: { startTime: string; endTime: string }[];
        wednesday: { startTime: string; endTime: string }[];
        thursday: { startTime: string; endTime: string }[];
        friday: { startTime: string; endTime: string }[];
        saturday: { startTime: string; endTime: string }[];
        sunday: { startTime: string; endTime: string }[];
      };
    };
    uploadedFileName: string;
    bio: string;
  };
}

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}

export interface IDayScheduleProps {
  day: string;
  dayLetter: string;
  timeSlots: ITimeSlot[];
  isEnabled: boolean;
  onToggleDay: (enabled: boolean) => void;
  onAddTimeSlot: () => void;
  onRemoveTimeSlot: (index: number) => void;
  onUpdateTimeSlot: (index: number, field: 'startTime' | 'endTime', value: string) => void;
}

export interface ITimeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  defaultValue?: Time;
}

export interface IDayData {
  day: string;
  letter: string;
  enabled: boolean;
  timeSlots: ITimeSlot[];
}

export interface IDayAndTimingProps {
  className?: string;
  values?: {
    days: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    };
    timeSlots: {
      [key: string]: ITimeSlot[];
    };
    appointmentType?: string;
  };
  setFieldValue?: (field: string, value: any) => void;
}

export type IDropdownItemType = {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'primary';
  isDisabled?: boolean;
  iconStyling?: string;
};

interface BankAccount {
  bankName: string;
  currency: string;
  iban: string;
  accountHolderName: string;
  default: boolean;
}

export interface BankAccountCardProps {
  bankAccounts: BankAccount[];
}

type Option = {
  label: string;
  value: string;
};

export type RadioGroupProps = {
  name: string;
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  touched?: boolean;
  error?: string;
  className?: string;
  optionsParentClassName?: string;
  optionClassName?: string;
  labelTextClassName?: string;
};

export interface IOption {
  value: string;
  label: string;
}

export interface INotificationDropdownProps {
  className?: string;
  notifications: {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    unread: boolean;
  }[];
}

export interface INotification {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  unread: boolean;
}
export interface ChatMessage {
  name: string;
  timestamp: string;
  isSupport: boolean;
  text: string;
  attachment?: {
    name: string;
    url: string;
    size: string;
  };
}

export interface ChatBoxProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  ticket: any;
}

export interface ILevel {
  label: string;
  range: string;
  color: string;
  value: number;
}

export interface ISeverityGaugeProps {
  levels: ILevel[];
  value?: number;
  onChange?: (value: number) => void;
  interactive?: boolean;
  title?: string;
  unit?: string;
  defaultValue?: number;
}
export interface IFileUpload {
  id: string;
  type: string;
  fileName: string;
  format: string;
  size: string;
  file?: File;
}

export interface IDragEventHandlers {
  preventDefault: () => void;
  stopPropagation: () => void;
  type: string;
}

export interface IDropEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

export interface IAssignDoctor {
  id: any;
  label: any;
  imageUrl: any;
}

export interface IAppointmentDetailsProps {
  data?: any;
  title: string;
  subTitle: string;
  isEdit?: boolean;
  selectedTime?: string;
  selectedDate?: Date;
  setSelectedDate?: (date: Date) => void;
  onConfirm?: () => void;
  onSelectTime?: (time: string) => void;
  setSelectedTime: (time: string) => void;
  appointmentType?: 'face-to-face' | 'remote';
  specialist?: { label: string; value: string } | null;
  setAppointmentType?: (type: 'face-to-face' | 'remote') => void;
  setSpecialist?: (selectedOption: { label: string; value: string } | null) => void;
  onSelectSpecialist?: (selectedOption: { label: string; value: string } | null) => void;
}

export interface IChangeEmailFormValues {
  oldEmail: string;
  newEmail: string;
  password: string;
}
export interface IChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ITestRecordUploadedFile {
  id: string;
  type: string;
  fileName: string;
  format: string;
  size: string;
  file?: File;
}
export interface ICalendarComponentProps {
  initialDate?: Date;
  onChange?: (date: Date) => void;
  dateSelected?: Date;
  setSelectedDate?: (date: Date) => void;
}

export interface IDashboardWrapperProps {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  backButton?: boolean;
}
export interface IFileUploaderProps {
  label?: string;
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
}

export interface ICountry {
  name: string;
  code: string;
  flag: string;
}
export interface ITableColumn {
  key: string;
  label: string;
}

export interface ITableRow {
  [key: string]: string | number;
}

export interface IDynamicTableProps {
  columns: ITableColumn[];
  data: ITableRow[];
  headerColor?: string;
  styling?: string;
  headerStyling?: string;
}
export interface IRangeCalenderProps {
  position?: string;
}
export interface IAccountDetailsCardProps {
  enableForm: boolean;
  accountDetails: boolean;
  setAccountDetails: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IActivityLog {
  id: string;
  action: string;
  patientName: string;
  timestamp: string;
  performedBy: string;
  isChecked: boolean;
  details?: string;
}
export interface IBankDetailsCardProps {
  bankDetailsData: {
    bankAccountType: string;
    bankCountry: string;
    bankAccountCurrency: string;
  } | null;
  setBankDetailsData: (
    data: {
      bankAccountType: string;
      bankCountry: string;
      bankAccountCurrency: string;
    } | null
  ) => void;
  setAccountDetails: (data: boolean) => void;
}

export interface IActionButtonProps {
  icon: string;
  label: string;
  color: string;
  disabled?: boolean;
}
export interface InfoRowProps {
  label: string;
  value?: string;
  missing: string;
}
export interface IReviewModalProps {
  onCancel: () => void;
  onSend: () => void;
  responseValue: string;
  review?: string;
  onResponseChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export interface IWithdrawFundModalProps {
  onClose: () => void;
  values: any;
  errors: any;
  touched: any;
  isValid: boolean;
  handleSubmit: any;
  handleChange: any;
  handleBlur: any;
  availableBalance?: number;
}
export interface IWeightDataPoint {
  month: string;
  weight: number;
}

export interface IWeightChartProps {
  data: IWeightDataPoint[];
  year?: number;
  idealWeight?: number;
  unit?: string;
  height?: number;
  className?: string;
}
export interface IAllergiesCardProps {
  data: {
    allergy: string;
    specification: string;
    reaction: string;
  }[];
}

export interface ICurrentConsultatoinModalsProps {
  onClose: () => void;
  onConfirm?: () => void;
}

export interface ConsultaionsMeasurementValue {
  value: string;
  unit: string;
}

export interface ConsultaionsFormValues {
  selectedOption: string;
  selectedSnomedCode: string;
  selectedAssessments: string[];
  selectedConsultationType: string;
  safetyNetting: boolean;
  history: string;
  diagnosis: string;
  actionPlan: string;
  // Examination fields
  measurements: {
    height: ConsultaionsMeasurementValue;
    weight: ConsultaionsMeasurementValue;
    waist: ConsultaionsMeasurementValue;
    neckCircumference: ConsultaionsMeasurementValue;
    temperature: ConsultaionsMeasurementValue;
  };
  bmiIndex: number;
  painSeverityIndex: number;
  exertion: string;
  examinationNotes: string;
  bmi: string;
}

export interface IAddNewTicketUploadedFile {
  id: number;
  name: string;
  size: string;
}

export interface IAddNewTicketFormValues {
  name: string;
  email: string;
  subject: string;
  department: string;
  priority: string;
  message: string;
  attachments: IAddNewTicketUploadedFile[];
}

export interface IPaymentOptionCardProps {
  value: string;
  imgSrc?: string;
  selectedValue: string;
  onSelect: (value: string) => void;
  icon: string;
  label: string;
  isImage?: boolean;
  iconBgClass?: string;
  iconStyles?: string;
}

export interface SmokingInfo {
  smokingType: string;
  howOften: string;
  howLong: string;
  wantToQuit: string;
}

export interface SmokedInPastInfo {
  smokingType: string;
  howOften: string;
  howLong: string;
  howMuch: string;
  householdSmoking: string;
}

export interface AlcoholInfo {
  frequency: string;
  quantity: string;
  dependence: string;
}

export interface PregnancyInfo {
  isPregnant: string;
  dueDate: DateValues | string | null;
}

export interface BreastfeedingInfo {
  isBreastfeeding: string;
}

export interface ICurrentConsultationsState {
  smokingInfo: SmokingInfo | null;
  smokedInPastInfo: SmokedInPastInfo | null;
  alcoholInfo: AlcoholInfo | null;
  pregnancyInfo: PregnancyInfo | null;
  breastfeedingInfo: BreastfeedingInfo | null;
  historyPreset: { preset: string }[];
  selectedPreset: string | null;
}

export interface IPieChartProps {
  title?: string;
  series: number[];
  labels: string[];
  legendTop?: boolean;
  legendBottomAlign?: boolean;
  width?: any;
}

export interface IMeasurementUnit {
  value: string;
  label: string;
}

export interface IMeasurementInputProps {
  label: string;
  units: IMeasurementUnit[];
  value?: string;
  unit?: string;
  styling?: string;
  error?: boolean;
  onValueChange?: (value: string, unit: string) => void;
  placeholder?: string;
  showEditIcon?: boolean;
}

export interface IBodyRepresentationProps {
  selectedOption: string;
}

export interface IUploadedFile {
  id: number;
  name: string;
  size: string;
}

export interface IExaminationProps {
  formik?: any;
  openSections: Record<SectionKey, boolean>;
  toggleSection: (section: SectionKey) => void;
}

export interface ISocialHistoryProps {
  openDeleteModal: (type: string, action: () => void) => void;
  toggleModal: (
    modalName: 'smokingInfo' | 'smokedInPast' | 'alcohol' | 'pregnancy' | 'breastfeeding',
    isOpen: boolean
  ) => void;
}

export interface ITimeSelectProps {
  data: { time: string; disabled: boolean }[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export interface PrescriptionItem {
  id: number;
  medicine: string;
  salt: string;
  formulation: string;
  quantity: string;
  dosage: string;
  duration: string;
  isEditing?: boolean;
}

export interface PrescriptionRowProps {
  idx: number;
  id: number;
  medicine: string;
  salt: string;
  formulation: string;
  quantity: string;
  dosage: string;
  duration: string;
  isEditing: boolean;
  onEdit: (id: number) => void;
  onSave: (id: number) => void;
  onChange: (id: number, data: Partial<PrescriptionItem>) => void;
  onDelete: (id: number) => void;
}

export interface PrescriptionTableProps {
  prescriptionData: PrescriptionItem[];
  prescriptionTableData: PrescriptionItem[];
  setPrescriptionTableData: React.Dispatch<React.SetStateAction<PrescriptionItem[]>>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface IRangeSelectorProps {
  editable?: boolean;
  ranges?: string[];
  labels?: string[];
  icons?: string[];
  bordered?: boolean;
  value?: number;
  onChange?: (index: number) => void;
}

export type PatientInfoItem = {
  label: string;
  value: string | number;
};
export interface PatientSummaryProps {
  id: any;
  data: any;
}

export interface SmokingInfoValues {
  smokingType?: string;
  howOften?: string;
  howLong?: string;
  wantToQuit?: string;
}

export interface ISmockingInformationModalProps extends ICurrentConsultatoinModalsProps {
  initialValues?: SmokingInfoValues;
}

interface SmokedInPastValues {
  smokingType?: string;
  howOften?: string;
  howLong?: string;
  howMuch?: string;
  householdSmoking?: string;
}

export interface ISmockedInPastModalProps extends ICurrentConsultatoinModalsProps {
  initialValues?: SmokedInPastValues;
}

export interface IPresetModalProps {
  onClose?: () => void;
}

interface PregnancyInfoValues {
  isPregnant?: string;
  dueDate?: any;
}

export interface IPregnantModalProps extends ICurrentConsultatoinModalsProps {
  initialValues?: PregnancyInfoValues;
}

interface AlcoholInfoValues {
  frequency?: string;
  quantity?: string;
  dependence?: string;
}

export interface IDrinkAlcoholModalProps extends ICurrentConsultatoinModalsProps {
  initialValues?: AlcoholInfoValues;
}

interface BreastfeedingInfoValues {
  isBreastfeeding?: string;
}

export interface IBreastFeedingModalProps extends ICurrentConsultatoinModalsProps {
  initialValues?: BreastfeedingInfoValues;
}

export interface ISocialHistorySectionProps {
  title: string;
  info: any;
  fields: { label: string; key: string }[];
  modalName: any;
  clearAction: () => void;
  openDeleteModal: (title: string, clearAction: () => void) => void;
  toggleModal: (modalName: any, isOpen: boolean) => void;
}

export interface SectionToggleIconsProps {
  openSections: { [key: string]: boolean };
  onToggle: (section: SectionKey) => void;
}

export interface IExaminationSectionProps {
  isOpen: boolean;
  formik: any;
}

export type SectionKey =
  | 'bmi'
  | 'oxygen'
  | 'exertion'
  | 'heartRate'
  | 'temperature'
  | 'severityRate'
  | 'bloodPressure'
  | 'respirationRate'
  | 'neckCircumference';
