import { i18inst } from '../i18n';

const useSocket = (socketInstance) => ({
  emitMessage: async (payload, notifyInst) => socketInstance.emit(
    'newMessage',
    payload,
    async (respData) => {
      if (respData.status !== 'ok') { notifyInst.onUnableToEmitEvent(i18inst.t('chat.toast.cantSendMsg')); }
    },
  ),

  createChannel: async (payload, notifyInst) => socketInstance.emit(
    'newChannel',
    payload,
    async (respData) => {
      if (respData.status !== 'ok') notifyInst.onUnableToEmitEvent(i18inst.t('chat.toast.cantCreateChannel'));
    },
  ),

  removeChannel: async (payload, notifyInst) => socketInstance.emit(
    'removeChannel',
    payload,
    async (respData) => {
      if (respData.status !== 'ok') notifyInst.onUnableToEmitEvent(i18inst.t('chat.toast.cantDeleteChannel'));
    },
  ),

  renameChannel: async (payload, notifyInst) => socketInstance.emit(
    'renameChannel',
    payload,
    async (respData) => {
      if (respData.status !== 'ok') notifyInst.onUnableToEmitEvent(i18inst.t('chat.toast.cantRenameChannel'));
    },
  ),
});

export default useSocket;
