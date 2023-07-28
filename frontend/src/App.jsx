/* eslint-disable react/destructuring-assignment */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import NotFound from './pages/404';
import LoginCard from './pages/login';
import RegisterCard from './pages/registration';
import ChatMain from './pages/chat';
import Navbar from './shared-components/Navbar';
import PrivateRoute from './pages/chat/components/PrivateRouteForChat';
import './App.css';
import SocketContext from './context/socket-context';

const App = () => {
  const socketInstance = useContext(SocketContext);

  useEffect(() => {
    socketInstance.connect();
    return () => {
      socketInstance.disconnect();
    };
  });

  return (
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
  );
};

export default App;
