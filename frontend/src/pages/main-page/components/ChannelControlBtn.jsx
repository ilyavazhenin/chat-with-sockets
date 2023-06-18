import Dropdown from "react-bootstrap/Dropdown";
import { actions as channelsActions } from '../../../slices/channelsSlice.js';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../index.jsx';
import { msgSelectors } from '../../../slices/messagesSlice.js';
import { actions as messagesActions } from '../../../slices/messagesSlice.js';
import ActiveChannelContext from '../../../utils/active-channel-context.js';

const ChannelControlBtn = (props) => {
  const dispatch = useDispatch();
  const messages = useSelector(msgSelectors.selectAll);
  const { setActiveChannel } = useContext(ActiveChannelContext);

  const deleteChannel = (id) => async (e) => {
    e.preventDefault();
    //TODO: здесь надо вызвать модалку подтверждения
    await socket.emit('removeChannel', { id });
    //TODO: добавить отслеживание ошибки, елси не получилось удалить канал
    
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={props.active ? "secondary" : "light"}
        id="dropdown-basic"
        className="rounded-0"
      >
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={deleteChannel(props.channelId)}>Удалить</Dropdown.Item>
        <Dropdown.Item>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelControlBtn;
