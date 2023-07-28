import { toast } from 'react-toastify';
import { appRoutes } from './routes';

const toastSettings = {
  position: 'top-right',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const onChannelRemoved = (msg) => toast(msg, {
  toastId: 'removed',
  ...toastSettings,
});

const onChannelCreated = (msg) => toast(msg, {
  toastId: 'created',
  ...toastSettings,
});

const onChannelRenamed = (msg) => toast(msg, {
  toastId: 'renamed',
  ...toastSettings,
});

const onLoadingDataError = (msg, navigate) => toast.error(msg, {
  toastId: 'loadError',
  ...toastSettings,
  autoClose: 3000,
  onClose: () => {
    localStorage.clear();
    return navigate(appRoutes.loginUrl);
  },
});

const onUnableToEmitEvent = (msg) => toast.error(msg, {
  toastId: 'unableToEmit',
  ...toastSettings,
  autoClose: 3000,
});

const notify = {
  onChannelRemoved,
  onChannelCreated,
  onChannelRenamed,
  onLoadingDataError,
  onUnableToEmitEvent,
};

export default notify;
