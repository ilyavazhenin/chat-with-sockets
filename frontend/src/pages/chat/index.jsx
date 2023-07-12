/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import CurrentUserContext from '../../utils/auth-context';
import ChannelsBox from './components/ChannelsBox';
import MessagesBox from './components/MessagesBox';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions, msgSelectors } from '../../slices/messagesSlice';
import ActiveChannelContext from '../../utils/active-channel-context';
import notify from '../../utils/toast-notifier';
import routes from '../../utils/routes';

const ChatMain = (props) => {
  const { socket } = props;
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { user } = useContext(CurrentUserContext);
  const dispatch = useDispatch();
  const [activeChannel, setActiveChannel] = useState({ id: 1, channelName: 'general' });
  const messages = useSelector(msgSelectors.selectAll);

  useEffect(() => {
    socket.on('removeChannel', (data) => {
      const messagesIdsToDelete = messages
        .filter((msg) => msg.relatedChannelId === data.id)
        .map((m) => m.id);
      dispatch(channelsActions.deleteChannel(data.id));
      dispatch(messagesActions.deleteMessagesByChannel(messagesIdsToDelete));
      setActiveChannel({ id: 1, channelName: 'general' });
      notify.onChannelRemoved(t('chat.toast.channelDeleted'));
    });

    socket.on('renameChannel', (renamedChannel) => {
      dispatch(channelsActions.renameChannel({
        id: renamedChannel.id,
        changes: { name: renamedChannel.name },
      }));
      notify.onChannelRenamed(t('chat.toast.channelRenamed'));
      if (activeChannel.id === renamedChannel.id) {
        setActiveChannel({
          id: renamedChannel.id,
          channelName: renamedChannel.name,
        });
      }
    });

    socket.on('newChannel', (createdChannel) => {
      dispatch(channelsActions.addChannel(createdChannel));
      if (user.userName === createdChannel.createdByUser) {
        setActiveChannel({
          id: createdChannel.id,
          channelName: createdChannel.name,
        });
        notify.onChannelCreated(t('chat.toast.channelCreated'));
      }
    });

    socket.on('newMessage', (messageWithId) => {
      dispatch(messagesActions.addMessage(messageWithId));
    });
  }, []);

  useEffect(() => {
    if (!user.userName) navigate('/login');
    else {
      const response = axios({ method: 'get', url: routes.data, headers: { Authorization: `Bearer ${user.token}` } });
      response.then((data) => {
        dispatch(channelsActions.addChannels(data.data.channels));
        dispatch(messagesActions.addMessages(data.data.messages));
      })
        .catch(() => {
          notify.onLoadingDataError(t('chat.toast.loadError'));
        });
    }
  }, []);

  return (
    <div className="h-100" id="chat">
      <ToastContainer />
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ActiveChannelContext.Provider value={{ activeChannel, setActiveChannel }}>
              <ChannelsBox socket={socket} />
              <MessagesBox socket={socket} />
            </ActiveChannelContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
