import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import NotFound from './pages/404-page';
import LoginCard from './pages/login-page';
import Main from './pages/main-page';

import CurrentUserContext from './utils/auth-context';

function App() {
  const [user, setUser] = useState({ userName: localStorage.getItem('userName'), token: localStorage.getItem('token')});
  console.log(user, 'user in app');

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<LoginCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
