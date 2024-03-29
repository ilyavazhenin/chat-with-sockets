import Dropdown from 'react-bootstrap/Dropdown';
import RenameChannelBtn from '../../../shared-components/RenameChannelBtn.jsx';
import DeleteChannelBtn from '../../../shared-components/DeleteChannelBtn.jsx';

const ChannelControlDropdown = (props) => {
  const { active, channelId } = props;

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
          <DeleteChannelBtn channelId={channelId} />
        </Dropdown.Item>

        <Dropdown.Item className="px-2">
          <RenameChannelBtn channelId={channelId} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelControlDropdown;
