import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AlcoholInfo,
  BreastfeedingInfo,
  ICurrentConsultationsState,
  PregnancyInfo,
  SmokedInPastInfo,
  SmokingInfo,
} from '@/types';

const initialState: ICurrentConsultationsState = {
  smokingInfo: null,
  smokedInPastInfo: null,
  alcoholInfo: null,
  pregnancyInfo: null,
  breastfeedingInfo: null,
  selectedPreset: null,
  historyPreset: [
    { preset: 'Examination of this patient and found bug' },
    { preset: 'John die is feeling unconscious and need urgent inspection' },
    { preset: 'Need a clear look' },
    { preset: 'Patient reported severe headache and blurry vision' },
    { preset: 'Vitals are stable, but patient complains of chest discomfort' },
    { preset: 'Recommended X-ray for suspected fracture' },
    { preset: 'Follow-up needed for blood test results' },
    { preset: 'Patient showing signs of allergic reaction' },
    { preset: 'Discussed treatment plan with patient’s guardian' },
    { preset: 'Advised complete bed rest and hydration' },
  ],
};

export const currentConsultationsSlice = createSlice({
  name: 'currentConsultations',
  initialState,
  reducers: {
    setSmokingInfo: (state, action: PayloadAction<SmokingInfo>) => {
      state.smokingInfo = action.payload;
    },
    setSmokedInPastInfo: (state, action: PayloadAction<SmokedInPastInfo>) => {
      state.smokedInPastInfo = action.payload;
    },
    setAlcoholInfo: (state, action: PayloadAction<AlcoholInfo>) => {
      state.alcoholInfo = action.payload;
    },
    setPregnancyInfo: (state, action: PayloadAction<PregnancyInfo>) => {
      state.pregnancyInfo = action.payload;
    },
    setBreastfeedingInfo: (state, action: PayloadAction<BreastfeedingInfo>) => {
      state.breastfeedingInfo = action.payload;
    },
    clearSmokingInfo: (state) => {
      state.smokingInfo = null;
    },
    clearSmokedInPastInfo: (state) => {
      state.smokedInPastInfo = null;
    },
    clearAlcoholInfo: (state) => {
      state.alcoholInfo = null;
    },
    clearPregnancyInfo: (state) => {
      state.pregnancyInfo = null;
      console.log('Cleareddd');
    },
    clearBreastfeedingInfo: (state) => {
      state.breastfeedingInfo = null;
    },
    setHistoryPreset: (state, action: PayloadAction<{ preset: string }>) => {
      state.historyPreset = [...state.historyPreset, action.payload];
    },
    // clearHistoryPreset: (state) => {
    //   state.historyPreset = state.historyPreset.slice(0, -1);
    // },
    setSelectedPreset: (state, action: PayloadAction<string>) => {
      state.selectedPreset = action.payload;
    },
  },
});

export const {
  setSmokingInfo,
  setSmokedInPastInfo,
  setAlcoholInfo,
  setPregnancyInfo,
  setBreastfeedingInfo,
  clearSmokingInfo,
  clearSmokedInPastInfo,
  clearAlcoholInfo,
  clearPregnancyInfo,
  setHistoryPreset,
  clearBreastfeedingInfo,
  // clearHistoryPreset,
  setSelectedPreset,
} = currentConsultationsSlice.actions;

export default currentConsultationsSlice.reducer;
