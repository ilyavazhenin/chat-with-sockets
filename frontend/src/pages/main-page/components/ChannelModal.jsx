import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as Yup from "yup";

const ChannelModal = (props) => {
  const formik = useFormik({
    initialValues: {
      channelName: "",
    },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов")
        .required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      console.log(values.channelName, 'Channel name!');
      props.onHide();
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="channelName"
          >
            <Form.Label>Название канала</Form.Label>
            <Form.Control
              type="text"
              name="channelName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
            />

            <Form.Text className="text-danger">
              {formik.touched.channelName && formik.errors.channelName ? (
                <div className="text-danger">{formik.errors.channelName}</div>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Row
            xs={"auto"}
            className="justify-content-end"
          >
            <Col>
              <Button
                onClick={props.onHide}
                variant="secondary"
              >
                Отменить
              </Button>
            </Col>
            <Col>
              <Button
                type="submit"
                variant="primary"
              >
                Отправить
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const AddChannelButton = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalShow(true)}
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fillRule="currentColor"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
        </svg>
        <span className="visually-hidden">+</span>
      </button>

      <ChannelModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddChannelButton;
