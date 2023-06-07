import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../utils/auth-context';
import Navbar from './components/Navbar';
import ChannelsBox from './components/ChannelsBox';
import MessagesBox from './components/MessagesBox';
import axios from 'axios';

const Main = () => {
  const navigate = useNavigate();
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!user.userName) navigate('/login');
  // получение стартовых данных, сохраненных на сервере (каналы и сообщения)
  //TODO: сделать инстанс аксиоса и убрать в утилс
    else {
      const response = axios({ method: 'get', url: '/api/v1/data', headers: { Authorization: `Bearer ${user.token}` } });
      response.then(data => console.log(data.data));
    }
  });
  
  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <MessagesBox />
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Main;
