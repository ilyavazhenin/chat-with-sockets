import Dropdown from "react-bootstrap/Dropdown";

const ChannelControlBtn = (props) => {
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
        <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelControlBtn;
