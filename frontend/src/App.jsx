import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import NotFound from './pages/404';
import LoginCard from './pages/login';
import RegisterCard from './pages/registration';
import ChatMain from './pages/chat';
import Navbar from './shared-components/Navbar';
import PrivateRoute from './pages/chat/components/PrivateRouteForChat';
import store from './slices/index';
import socketInstance from './utils/socket-init';
import resources, { i18inst } from './i18n';
import './App.css';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'prod',
};

const init18next = async () => {
  await i18inst
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });
};

const App = () => {
  init18next();

  useEffect(() => {
    filter.add(filter.getDictionary('en'));
    filter.add(filter.getDictionary('ru'));
    socketInstance.connect();
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
