import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.deleteChannel, (state, action) => {
        console.log(action, 'ACTION');
        const restMessages = Object.values(state.entities)
          .filter(({ relatedChannelId }) => relatedChannelId !== action.payload);
        messagesAdapter.setAll(state, restMessages);
      });
  },
});

export default messagesSlice.reducer;
export const { actions } = messagesSlice;
export const msgSelectors = messagesAdapter.getSelectors((state) => state.messages);
