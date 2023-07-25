import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes';

const fetchExistedChatData = createAsyncThunk(
  'channels/getExistedChatData',
  async (user) => {
    const response = axios({ method: 'get', url: routes.data, headers: { Authorization: `Bearer ${user?.token}` } });
    const { data } = await response;
    return data;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  activeChannel: {
    id: 1,
    name: 'general',
  },
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    deleteChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setActiveChannel: (state, action) => ({ ...state, activeChannel: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExistedChatData.fulfilled, (state, action) => {
        const { channels } = action.payload;
        channelsAdapter.setAll(state, channels);
      });
  },
});

export default channelsSlice.reducer;
export const { actions } = channelsSlice;
export { fetchExistedChatData };
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
