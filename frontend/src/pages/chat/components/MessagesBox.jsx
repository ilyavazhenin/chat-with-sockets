/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { msgSelectors } from '../../../slices/messagesSlice.js';
import ActiveChannelContext from '../../../utils/active-channel-context.js';
import CurrentUserContext from '../../../utils/auth-context.js';
import notify from '../../../utils/toast-notifier.js';

const MessagesBox = (props) => {
  const { socket } = props;
  const { t } = useTranslation();
  const messages = useSelector(msgSelectors.selectAll);

  const { activeChannel } = useContext(ActiveChannelContext);
  const { user } = useContext(CurrentUserContext);

  const msgRef = useRef();
  const bottomRef = useRef();
  const msgsCount = messages.filter((msg) => msg.relatedChannelId === activeChannel.id).length;

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const cleanedMsg = filter.clean(values.message);
      await socket.emit(
        'newMessage',
        {
          message: cleanedMsg,
          relatedChannelId: activeChannel.id,
          user: user.userName,
        },
        async (respData) => {
          if (respData.status !== 'ok') { notify.onUnableToEmitEvent(t('chat.toast.cantSendMsg')); }
        },
      );
      formik.resetForm();
    },
  });

  useEffect(() => {
    msgRef.current.focus();
  }, [activeChannel]);

  useEffect(() => {
    bottomRef.current.scrollIntoView();
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {activeChannel.channelName}
            </b>
          </p>
          <span className="text-muted">
            {msgsCount}
            {' '}
            {t('chat.messages', { count: msgsCount })}
          </span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
        >
          {messages
            .filter((msg) => msg.relatedChannelId === activeChannel.id)
            .map((msg) => (
              <div
                className="text-break mb-2"
                key={msg.id}
              >
                <b>{msg.user}</b>
                :
                {' '}
                {msg.message}
              </div>
            ))}
          <div ref={bottomRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup className="d-flex">
              <Form.Control
                name="message"
                size="sm"
                type="text"
                placeholder={t('chat.enterMessage')}
                value={formik.values.message || ''}
                onChange={formik.handleChange}
                ref={msgRef}
              />
              <button
                type="submit"
                disabled=""
                className="btn btn-group-vertical text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
