// slices/temp-slice.ts
import { createSlice } from '@reduxjs/toolkit';

const tempSlice = createSlice({
  name: 'temp',
  initialState: {
    filterName: '',
    isSidebarOpen: false,
    logoutModalOpen: false,
    endConsultationModalOpen: false,
  },
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    onFilterName: (state, action) => {
      state.filterName = action.payload;
    },
    setLogoutModalOpen: (state, action) => {
      state.logoutModalOpen = action.payload;
    },
    setEndConsultaionModalOpen: (state, action) => {
      state.endConsultationModalOpen = action.payload;
    },
  },
});

export const {
  openSidebar,
  onFilterName,
  closeSidebar,
  toggleSidebar,
  setLogoutModalOpen,
  setEndConsultaionModalOpen,
} = tempSlice.actions;
export default tempSlice.reducer;
