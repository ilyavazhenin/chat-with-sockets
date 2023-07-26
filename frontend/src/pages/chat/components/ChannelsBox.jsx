import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors, actions as channelsActions } from '../../../slices/channelsSlice.js';
import AddChannelBtn from '../../../shared-components/AddChannelBtn.jsx';
import ChannelControlDropdown from './ChannelControlDroprown.jsx';

const ChannelsBox = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);

  const activeChannelClasses = 'w-100 rounded-0 text-start text-truncate btn btn-secondary';
  const innactiveChannelClasses = 'w-100 rounded-0 text-start text-truncate btn';

  const isChannelActive = (currentIterId) => activeChannel.id === currentIterId;

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channelsHeader')}</b>
        <AddChannelBtn />
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        { channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <div role="group" className="d-flex dropdown btn-group">
              <button
                type="button"
                className={
                  isChannelActive(channel.id) ? activeChannelClasses : innactiveChannelClasses
                }
                onClick={() => dispatch(channelsActions.setActiveChannel(channel))}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
              {
                channel.removable
                  ? (
                    <ChannelControlDropdown
                      active={isChannelActive(channel.id)}
                      channelId={channel.id}
                    />
                  )
                  : null
              }
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
};

export default ChannelsBox;
