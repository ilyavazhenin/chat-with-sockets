import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../../slices/channelsSlice.js';
import ActiveChannelContext from '../../../utils/active-channel-context.js';
import AddChannelButton from './ChannelModal.jsx';
import ChannelControlBtn from './ChannelControlBtn.jsx';
import { useTranslation } from 'react-i18next';

const ChannelsBox = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const { activeChannel, setActiveChannel } = useContext(ActiveChannelContext);

  const activeChannelClasses = 'w-100 rounded-0 text-start text-truncate btn btn-secondary';
  const innactiveChannelClasses = 'w-100 rounded-0 text-start text-truncate btn';

  const isChannelActive = (currentIterId) => activeChannel.id === currentIterId;

  console.log(channels, 'channels!');

 return (
  <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('chat.channelsHeader')}</b>
      <AddChannelButton />
    </div>
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      { channels.map((channel) => {
        return (
//TODO: УБРАТЬ В ОТДЕЛЬНЫЙ КОМПОНЕНТ элемент канала в списке
          <li key={channel.id} className="nav-item w-100">
            <div role="group" className="d-flex dropdown btn-group">
              <button 
                type="button" 
                className={ isChannelActive(channel.id) ? activeChannelClasses : innactiveChannelClasses }
                onClick={() => setActiveChannel({id: channel.id, channelName: channel.name})}
              >
                <span className="me-1">#</span>{channel.name}
              </button>
              {
                channel.removable ? <ChannelControlBtn active={isChannelActive(channel.id)} channelId={channel.id}/> : null
              }
            </div>
          </li>
        )
      }) }
    </ul>
  </div>
 );
};

export default ChannelsBox;
