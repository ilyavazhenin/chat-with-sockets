import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import store from './slices/index';
import resources, { i18inst } from './i18n';
import App from './App';
import './App.css';
import SocketContext from './context/socket-context';

const init = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'prod',
  };

  await i18inst
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  const socketInstance = io({
    autoConnect: false,
    transportOptions: {
      webtransport: {
        hostname: '127.0.0.1',
      },
    },
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketContext.Provider value={socketInstance}>
            <App />
          </SocketContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
