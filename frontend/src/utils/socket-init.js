import { io } from 'socket.io-client';

const socket = io('localhost:3000', {
  // closeOnBeforeunload: true,
});

export default socket;
