/* eslint-disable react/destructuring-assignment */
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelsBox from './components/ChannelsBox';
import MessagesBox from './components/MessagesBox';
import { actions as channelsActions, fetchExistedChatData } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import notify from '../../utils/toast-notifier';
import useUser from '../../hooks/useUser';
import UnitedModal from '../../shared-components/modals';
import SocketContext from '../../context/socket-context';

const ChatMain = () => {
  const socketInstance = useContext(SocketContext);
  const { t } = useTranslation();
  const navigateToLogin = useNavigate();
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  useEffect(() => {
    socketInstance.on('removeChannel', (data) => {
      const defaultChannel = { id: 1, name: 'general', removable: false };
      dispatch(channelsActions.deleteChannel(data.id));
      notify.onChannelRemoved(t('chat.toast.channelDeleted'));
      if (activeChannel.id === data.id) {
        dispatch(channelsActions.setActiveChannel(defaultChannel));
      }
    });

    socketInstance.on('renameChannel', (renamedChannel) => {
      dispatch(channelsActions.renameChannel({
        id: renamedChannel.id,
        changes: { name: renamedChannel.name },
      }));
      notify.onChannelRenamed(t('chat.toast.channelRenamed'));
      if (activeChannel.id === renamedChannel.id) {
        dispatch(channelsActions.setActiveChannel(renamedChannel));
      }
    });

    socketInstance.on('newChannel', (createdChannel) => {
      dispatch(channelsActions.addChannel(createdChannel));
      if (currentUser?.userName === createdChannel.createdByUser) {
        dispatch(channelsActions.setActiveChannel(createdChannel));
        notify.onChannelCreated(t('chat.toast.channelCreated'));
      }
    });

    socketInstance.on('newMessage', (messageWithId) => {
      dispatch(messagesActions.addMessage(messageWithId));
    });

    socketInstance.on('connect_error', () => {
      notify.onLoadingDataError(t('chat.toast.loadError'), navigateToLogin);
    });
    return () => socketInstance.removeAllListeners();
  }, [activeChannel, currentUser, dispatch, navigateToLogin, socketInstance, t]);

  useEffect(() => {
    try {
      dispatch(fetchExistedChatData(currentUser));
    } catch {
      notify.onLoadingDataError(t('chat.toast.loadError'));
    }
  }, [currentUser, dispatch, t]);

  return (
    <div className="h-100 pt-5" id="chat">
      <ToastContainer />
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <MessagesBox />
          </div>
        </div>
      </div>
      <UnitedModal />
    </div>
  );
};

export default ChatMain;
