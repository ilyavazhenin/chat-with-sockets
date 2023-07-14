/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
// import { Provider } from 'react-redux';

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import notify from './utils/toast-notifier';

import NotFound from './pages/404';
import LoginCard from './pages/login';
import RegisterCard from './pages/registration';
import ChatMain from './pages/chat';
import Navbar from './shared-components/Navbar';

import { i18inst } from './i18n';
// import useUser from './hooks/useUser';

const rollbarConfig = { // only for production env to watch for frontend errors
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'prod',
};

const socket = io();

const App = () => {
  // const curentUser = {
  //   id: 1,
  //   userName: localStorage.getItem('userName'),
  //   token: localStorage.getItem('token'),
  // };

  // useUser(curentUser);

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  useEffect(() => {
    socket.on('connect_error', () => {
      notify.onLoadingDataError(i18inst.t('chat.toast.loadError'));
    });
  }, [socket]);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        {/* <Provider store={store}> */}
        {/* <CurrentUserContext.Provider value={{ user, setUser }}> */}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ChatMain socket={socket} />} />
            <Route path="login" element={<LoginCard />} />
            <Route path="signup" element={<RegisterCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* </CurrentUserContext.Provider> */}
        {/* </Provider> */}
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
