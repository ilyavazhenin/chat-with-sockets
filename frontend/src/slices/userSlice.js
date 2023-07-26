import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: localStorage.getItem('userName'),
  token: localStorage.getItem('token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addCurrentUser: (state, action) => ({
      ...state,
      userName: action.payload.userName,
      token: action.payload.token,
    }),
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
