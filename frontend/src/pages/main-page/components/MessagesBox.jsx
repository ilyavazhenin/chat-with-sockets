import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { msgSelectors } from '../../../slices/messagesSlice.js';
import ActiveChannelContext from '../../../utils/active-channel-context.js';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../../../slices/messagesSlice';
import CurrentUserContext from '../../../utils/auth-context.js';
import Badge from 'react-bootstrap/Badge';
import { socket } from '../index';

const MessagesBox = () => {
  const [socketError, setSocketError] = useState({ message: ''});
  
  const dispatch = useDispatch();

  const messages = useSelector(msgSelectors.selectAll);
  const { activeChannel } = useContext(ActiveChannelContext);
  const { user } = useContext(CurrentUserContext);

  console.log(messages, 'messages!');
  const msgRef = useRef();

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    const currentMsg = msgRef.current.value;
    socket.connect();
    socket.emit('newMessage', { 
    message: currentMsg, 
    activeChannelId: activeChannel.id, 
    user: user.userName }, 
    (response) => console.log(response.status, 'RESPONSE STATUS'));
    socket.on('connect_error', () => {
      setSocketError({ message: 'Не получилось отправить сообщение' });
    });
    msgRef.current.value = '';
    setSocketError({ message: '' });
  };

  useEffect(() => {
    socket.on('newMessage', (messageWithId) => {
      console.log(messageWithId, 'getting msg obj from server');
      dispatch(messagesActions.addMessage(messageWithId)); 
    });
    // socket.close();
  }, [dispatch]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {activeChannel.channelName}</b></p>
          <span className="text-muted">{messages.filter((msg) => msg.activeChannelId === activeChannel.id).length} сообщений в канале</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.filter((msg) => msg.activeChannelId === activeChannel.id)
            .map((msg) => {
            return (
              <div className="text-break mb-2" key={msg.id}><b>{msg.user}</b>: {msg.message}</div>
            );
          })}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2" onSubmit={handleMsgSubmit}>
            <div className="input-group has-validation">
              <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" ref={msgRef} />
              <button type="submit" disabled="" className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fillRule="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
        {socketError.message.length ? <Badge bg="danger">{socketError.message}</Badge> : null}
      </div>
    </div>
  );
};

export default MessagesBox;
