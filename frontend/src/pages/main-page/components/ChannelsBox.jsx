import { useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../../slices/channelsSlice.js';
import ActiveChannelContext from '../../../utils/active-channel-context.js';
// import { useEffect, useContext } from 'react';
// import CurrentUserContext from '../../../utils/auth-context.js';
// import axios from 'axios';

const ChannelsBox = () => {
  // const { user } = useContext(CurrentUserContext);
  // const dispatch = useDispatch(); // понадобится чтобы диспатчить новые каналые
  const channels = useSelector(selectors.selectAll);
  const { activeChannel, setActiveChannel } = useContext(ActiveChannelContext);

  //TODO: использовать cn-библиотеку? или refы?
  const activeChannelClasses = 'w-100 rounded-0 text-start btn btn-secondary';
  const innactiveChannelClasses = 'w-100 rounded-0 text-start btn';

  const isChannelActive = (currentIterId) => activeChannel.id === currentIterId;

  console.log(channels, 'channels!');

  useEffect(() => {
    setActiveChannel({ id: 1, channelName: 'general' })
  }, [setActiveChannel])

 return (
  <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>Каналы</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fillRule="currentColor">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
        </svg>
        <span className="visually-hidden">+</span>
      </button>
    </div>
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      { channels.map((channel) => {
        return (
          //TODO: УБРАТЬ В ОТДЕЛЬНЫЙ КОМПОНЕНТ элемент канала в списке
          <li key={channel.id} className="nav-item w-100">
          <button 
            type="button" 
            className={ isChannelActive(channel.id) ? activeChannelClasses : innactiveChannelClasses }
            onClick={() => setActiveChannel({id: channel.id, channelName: channel.name})}
          >
            <span className="me-1">#</span>{channel.name}
          </button>
          </li>
        )
      }) }
    </ul>
  </div>
 );
};

export default ChannelsBox;
