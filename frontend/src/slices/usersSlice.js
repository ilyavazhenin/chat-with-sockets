import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';


const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: usersAdapter.addOne,
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
export const selectors = usersAdapter.getSelectors((state) => state.users);
