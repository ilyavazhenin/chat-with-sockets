/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelsBox from './components/ChannelsBox';
import MessagesBox from './components/MessagesBox';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import { actions as modalsActions } from '../../slices/modalsSlices';
import notify from '../../utils/toast-notifier';
import routes from '../../utils/routes';
import useUser from '../../hooks/useUser';
import socketInstance from '../../utils/socket-init';
import UniversalModal from '../../shared-components/UniversalModal';

const ChatMain = () => {
  const { t } = useTranslation();
  const navigateToLogin = useNavigate();
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const modalState = useSelector((state) => state.modals);

  useEffect(() => {
    socketInstance.connect();
    socketInstance.on('removeChannel', (data) => {
      dispatch(channelsActions.deleteChannel(data.id));
      dispatch(channelsActions.setActiveChannel({ id: 1, name: 'general' }));
      notify.onChannelRemoved(t('chat.toast.channelDeleted'));
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
  }, [socketInstance, useUser, dispatch]);

  useEffect(() => {
    const response = axios({ method: 'get', url: routes.data, headers: { Authorization: `Bearer ${currentUser?.token}` } });
    response.then((data) => {
      dispatch(channelsActions.addChannels(data.data.channels));
      dispatch(messagesActions.addMessages(data.data.messages));
    })
      .catch(() => {
        notify.onLoadingDataError(t('chat.toast.loadError'));
      });
  }, [dispatch, socketInstance]);

  return (
    <div className="h-100" id="chat">
      <ToastContainer />
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <MessagesBox />
          </div>
        </div>
      </div>
      <UniversalModal
        show={modalState.isOpened}
        onHide={() => dispatch(modalsActions.closeModal(false))}
      />
    </div>
  );
};

export default ChatMain;
