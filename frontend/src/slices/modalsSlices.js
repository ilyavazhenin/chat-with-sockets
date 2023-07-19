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

    closeModal: (state, action) => ({
      ...state,
      isOpened: action.payload,
    }),
  },
});

export default modalsSlice.reducer;
export const { actions } = modalsSlice;
