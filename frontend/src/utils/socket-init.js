import { io } from 'socket.io-client';

const socket = io({
  autoConnect: false,
  transportOptions: {
    webtransport: {
      hostname: '127.0.0.1',
    },
  },
});

export default socket;