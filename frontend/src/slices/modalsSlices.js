import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalConfig: { },
  isOpened: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, action) => ({
      ...state,
      modalConfig: action.payload,
      isOpened: true,
    }),

    closeModal: (state) => ({
      ...state,
      isOpened: false,
    }),
  },
});

export default modalsSlice.reducer;
export const { actions } = modalsSlice;
