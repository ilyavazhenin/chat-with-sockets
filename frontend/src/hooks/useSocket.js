import { useContext } from 'react';
import { i18inst } from '../i18n';
import SocketContext from '../context/socket-context';

const useSocket = () => {
  const socketInstance = useContext(SocketContext);

  return ({
    emitMessage: async (payload, notifyInst) => socketInstance.emit(
      'newMessage',
      payload,
      (respData) => {
        if (respData.status !== 'ok') { notifyInst.onUnableToEmitEvent(i18inst.t('chat.toast.cantSendMsg')); }
      },
    ),

    createChannel: async (payload, notifyInst) => socketInstance.emit(
      'newChannel',
      payload,
      (respData) => {
        if (respData.status !== 'ok') notifyInst.onUnableToEmitEvent(i18inst.t('chat.toast.cantCreateChannel'));
      },
    ),

    removeChannel: async (payload, notifyInst) => socketInstance.emit(
      'removeChannel',
      payload,
      (respData) => {
        if (respData.status !== 'ok') notifyInst.onUnableToEmitEvent(i18inst.t('chat.toast.cantDeleteChannel'));
      },
    ),

    renameChannel: async (payload, notifyInst) => socketInstance.emit(
      'renameChannel',
      payload,
      (respData) => {
        if (respData.status !== 'ok') notifyInst.onUnableToEmitEvent(i18inst.t('chat.toast.cantRenameChannel'));
      },
    ),
  });
};

export default useSocket;
