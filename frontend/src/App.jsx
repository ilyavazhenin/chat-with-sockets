/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
// import notify from './utils/toast-notifier';

import NotFound from './pages/404';
import LoginCard from './pages/login';
import RegisterCard from './pages/registration';
import ChatMain from './pages/chat';
import Navbar from './shared-components/Navbar';

// import { i18inst } from './i18n';
// import useUser from './hooks/useUser';
import PrivateRoute from './utils/private-route-main';
import store from './slices/index';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'prod',
};

const socket = io();

const App = () => {
  // const authorizedUser = {
  //   id: 1, // need for using Entity in Slice
  //   userName: localStorage.getItem('userName'),
  //   token: localStorage.getItem('token'),
  // };

  // useUser(authorizedUser);
  // const user = useUser();
  // console.log(authorizedUser, 'authorizedUser');

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  // useEffect(() => {
  //   socket.on('connect_error', () => {
  //     notify.onLoadingDataError(i18inst.t('chat.toast.loadError'));
  //   });
  // }, [socket]);
  console.log('iam rendering');

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          {/* <CurrentUserContext.Provider value={{ user, setUser }}> */}
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                index
                element={(
                  <PrivateRoute>
                    <ChatMain socket={socket} />
                  </PrivateRoute>
                )}
              />
              <Route path="login" element={<LoginCard />} />
              <Route path="signup" element={<RegisterCard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          {/* </CurrentUserContext.Provider> */}
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
