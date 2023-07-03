import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import NotFound from './pages/404-page';
import LoginCard from './pages/login-page';
import RegisterCard from './pages/registration';
import Main from './pages/main-page';
import Navbar from './pages/main-page/components/Navbar';

import CurrentUserContext from './utils/auth-context';
import { Provider } from 'react-redux';
import store from './slices/index';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../../frontend/src/i18n/index';
import 'react-toastify/dist/ReactToastify.min.css';

import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'fb3026f9924146fab176325b87d89453',
  environment: 'testenv',
};

function App() {
  const [user, setUser] = useState({ userName: localStorage.getItem('userName'), token: localStorage.getItem('token')});
  console.log(user, 'user in app');

  i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
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
                <Route path="/" element={<Main />} />
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
}

export default App;
