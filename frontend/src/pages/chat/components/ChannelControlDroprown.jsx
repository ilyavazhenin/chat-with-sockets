import Dropdown from 'react-bootstrap/Dropdown';
import RenameChannelBtn from '../../../shared-components/rename-channel/RenameChannelBtn.jsx';
import DeleteChannelBtn from '../../../shared-components/delete-channel/DeleteChannelBtn.jsx';

const ChannelControlDropdown = (props) => {
  const { active, channelId, socket } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={active ? 'secondary' : 'light'}
        id="dropdown-basic"
        className="rounded-0"
      >
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className="px-2">
          <DeleteChannelBtn channelId={channelId} socket={socket} />
        </Dropdown.Item>

        <Dropdown.Item className="px-2">
          <RenameChannelBtn channelId={channelId} socket={socket} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelControlDropdown;
