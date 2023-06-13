import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../utils/auth-context';
import Navbar from './components/Navbar';
import ChannelsBox from './components/ChannelsBox';
import MessagesBox from './components/MessagesBox';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import axios from 'axios';
import ActiveChannelContext from '../../utils/active-channel-context';


const Main = () => {
  const navigate = useNavigate();
  const { user } = useContext(CurrentUserContext);
  const dispatch = useDispatch();
  const [activeChannel, setActiveChannel] = useState({ id: 1, channelName: 'general' });

  useEffect(() => {
    if (!user.userName) navigate('/login');
    else {
      //TODO: вынести в инстанс аксиоса в утилс и потом реиспользовать
      const response = axios({ method: 'get', url: '/api/v1/data', headers: { Authorization: `Bearer ${user.token}` } });
      response.then(data => {
        // console.log(data.data);
        dispatch(channelsActions.addChannels(data.data.channels));
        dispatch(messagesActions.addMessages(data.data.messages));
      })
      .catch((err) => console.log(err, 'oops, ERROR in Main in useEffect!'));
    }
  }, [dispatch, navigate, user.token, user.userName]);
  
  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ActiveChannelContext.Provider value={{ activeChannel, setActiveChannel }}>
              <ChannelsBox />
              <MessagesBox />
            </ActiveChannelContext.Provider>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Main;
