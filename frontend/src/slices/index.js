import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import userReducer from './userSlice.js';
import modalsReducer from './modalsSlices.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
    modals: modalsReducer,
  },
});
