import { io } from 'socket.io-client';

const socket = await io('localhost:3000', {
  closeOnBeforeunload: true,
  autoConnect: false,
});

export default socket;
