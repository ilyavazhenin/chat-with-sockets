import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addCurrentUser: userAdapter.addOne,
    removeCurrentUser: userAdapter.removeOne,
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
export const userSelectors = userAdapter.getSelectors((state) => state.user);
