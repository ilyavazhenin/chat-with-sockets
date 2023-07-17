import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deleteChannelModalShow: { show: false, config: {} },
  renameChannelModalShow: { show: false, config: {} },
  createChannelModalShow: { show: false, config: {} },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, modalTypeShow, action) => ({ ...state, [modalTypeShow]: action.payload }),
    closeModal: (state, modalTypeShow, action) => ({ ...state, [modalTypeShow]: action.payload }),
  },
});

export default modalsSlice.reducer;
export const { actions } = modalsSlice;
