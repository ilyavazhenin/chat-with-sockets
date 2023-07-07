import { io } from "socket.io-client";

const socket = io({
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    },
  },
});

export default socket;
