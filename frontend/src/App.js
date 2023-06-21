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
import store from './slices/index'

function App() {
  const [user, setUser] = useState({ userName: localStorage.getItem('userName'), token: localStorage.getItem('token')});
  console.log(user, 'user in app');

  return (
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
    
  );
}

export default App;
