import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';


const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addOne,
  },
});

export default messagesSlice.reducer;
export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);