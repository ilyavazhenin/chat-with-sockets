/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelsBox from './components/ChannelsBox';
import MessagesBox from './components/MessagesBox';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions, msgSelectors } from '../../slices/messagesSlice';
import ActiveChannelContext from '../../utils/active-channel-context';
import notify from '../../utils/toast-notifier';
import routes from '../../utils/routes';
import useUser from '../../hooks/useUser';

const ChatMain = (props) => {
  const { socket } = props;
  // socket.connect(); // only in this component we need socket connection
  const { t } = useTranslation();
  const navigateToLogin = useNavigate();

  const user = useUser();

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
      if (user?.userName === createdChannel.createdByUser) {
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

    socket.on('connect_error', () => {
      console.log('connect_error');
      notify.onLoadingDataError(t('chat.toast.loadError'), navigateToLogin);
    });
  }, [socket]);

  useEffect(() => {
    const response = axios({ method: 'get', url: routes.data, headers: { Authorization: `Bearer ${user?.token}` } });
    response.then((data) => {
      dispatch(channelsActions.addChannels(data.data.channels));
      dispatch(messagesActions.addMessages(data.data.messages));
    })
      .catch(() => {
        notify.onLoadingDataError(t('chat.toast.loadError'));
      });
  }, []);

  useEffect(() => {
    socket.open();
    console.log('socket connect');
    return () => {
      console.log('close socket');
      socket.close();
    };
  }, []);

  // useEffect(() => {
  //   socket.on('connect_error', () => {
  //     notify.onLoadingDataError(i18inst.t('chat.toast.loadError'));
  //   });
  // }, [socket]);

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
