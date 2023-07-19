/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import NotFound from './pages/404';
import LoginCard from './pages/login';
import RegisterCard from './pages/registration';
import ChatMain from './pages/chat';
import Navbar from './shared-components/Navbar';
import PrivateRoute from './utils/private-route-main';
import store from './slices/index';
import socketInstance from './utils/socket-init';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'prod',
};

const App = () => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  useEffect(() => {
    socketInstance.connect();
    console.log(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                index
                element={(
                  <PrivateRoute>
                    <ChatMain />
                  </PrivateRoute>
                )}
              />
              <Route path="login" element={<LoginCard />} />
              <Route path="signup" element={<RegisterCard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
