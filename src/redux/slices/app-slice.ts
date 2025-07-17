import { createSlice } from '@reduxjs/toolkit';

import { IAppSliceState } from '@/types';

const initialState: IAppSliceState = {
  isDoctor: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDoctor: (state, action) => {
      state.isDoctor = action.payload;
    },
  },
});

export const { setIsDoctor } = appSlice.actions;
export default appSlice.reducer;
