/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';

import NotFound from './pages/404';
import LoginCard from './pages/login';
import RegisterCard from './pages/registration';
import ChatMain from './pages/chat';
import Navbar from './shared-components/Navbar';

import CurrentUserContext from './utils/auth-context';
import store from './slices/index';
import resources from './i18n/index';

const rollbarConfig = { // only for production env to watch for frontend errors
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'prod',
};

const App = () => {
  const [user, setUser] = useState({ userName: localStorage.getItem('userName'), token: localStorage.getItem('token') });
  const [socketError, setSocketError] = useState({ message: '' });
  const socket = io('localhost:3000', {
    autoConnect: false,
  });

  const i18inst = i18n.createInstance();
  i18inst
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      resources,
      interpolation: {
        escapeValue: false,
      },
    }).then(() => {
      filter.add(filter.getDictionary('en'));
      filter.add(filter.getDictionary('ru'));
    });

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('connect_error', () => {
      setSocketError({ message: i18inst.t('chat.errors.socketError') });
    });
  }, []);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <CurrentUserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<ChatMain socket={socket} socketError={socketError} />} />
                <Route path="login" element={<LoginCard />} />
                <Route path="signup" element={<RegisterCard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CurrentUserContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
