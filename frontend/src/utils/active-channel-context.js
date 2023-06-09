import { createContext } from 'react';

const ActiveChannelContext = createContext({ activeChannel: {}, setActiveChannelId: () => {} });

export default ActiveChannelContext;
