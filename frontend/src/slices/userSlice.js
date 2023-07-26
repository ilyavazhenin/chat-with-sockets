import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  token: null,
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
    removeCurrentUser: (state) => ({
      ...state,
      userName: null,
      token: null,
    }),
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
