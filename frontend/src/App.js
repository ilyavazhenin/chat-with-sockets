/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import NotFound from './pages/404';
import LoginCard from './pages/login';
import RegisterCard from './pages/registration';
import ChatMain from './pages/chat';
import Navbar from './shared-components/Navbar';

import CurrentUserContext from './utils/auth-context';
import store from './slices/index';
import resources from './i18n/index';
import 'react-toastify/dist/ReactToastify.min.css';
import socket from './utils/socket-init';

const rollbarConfig = {
  accessToken: 'fb3026f9924146fab176325b87d89453',
  environment: 'testenv',
};

const App = () => {
  const [user, setUser] = useState({ userName: localStorage.getItem('userName'), token: localStorage.getItem('token') });
  socket.connect();
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <CurrentUserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<ChatMain />} />
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
