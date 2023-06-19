import Dropdown from "react-bootstrap/Dropdown";
import { socket } from "../index.jsx";
import Modal from "react-bootstrap/Modal"; //TODO: вынести модалку подтверждения в отдельный компонент
import Button from "react-bootstrap/Button";
import { useState } from "react";
import RenameChannelButton from "./RenameChannelModal.jsx";

const ChannelControlBtn = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => async (e) => {
    e.preventDefault();
    await socket.emit("removeChannel", { id });
    //TODO: добавить отслеживание ошибки, елси не получилось удалить канал
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant={props.active ? "secondary" : "light"}
          id="dropdown-basic"
          className="rounded-0"
        >
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShow}>
            Удалить
          </Dropdown.Item>

          <Dropdown.Item>
            <RenameChannelButton channelId={props.channelId}/>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>Уверены?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Отменить
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete(props.channelId)}
          >
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChannelControlBtn;
