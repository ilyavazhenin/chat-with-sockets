import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../utils/auth-context';
import Navbar from './components/Navbar';
import ChannelsBox from './components/ChannelsBox';
import MessagesBox from './components/MessagesBox';

const Main = () => {
  const navigate = useNavigate();
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!user.userName) navigate('/login');
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
