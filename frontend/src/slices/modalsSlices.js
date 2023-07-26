import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: '',
  channelId: null,
  isOpened: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => ({
      ...state,
      modalType: payload.modalType,
      channelId: payload.channelId,
      isOpened: true,
    }),

    closeModal: () => ({ initialState }),
  },
});

export default modalsSlice.reducer;
export const { actions } = modalsSlice;
