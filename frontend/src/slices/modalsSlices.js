import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalConfig: { },
  isOpened: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, modalType, action) => ({
      ...state,
      [modalType]: action.payload,
      isOpened: true,
    }),

    closeModal: (state, modalType, action) => ({
      ...state,
      [modalType]: action.payload,
      isOpened: false,
    }),
  },
});

export default modalsSlice.reducer;
export const { actions } = modalsSlice;
