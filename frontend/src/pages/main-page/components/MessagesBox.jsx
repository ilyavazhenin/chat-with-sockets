import { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { msgSelectors } from '../../../slices/messagesSlice.js';
import { usersSelectors } from '../../../slices/usersSlice.js';
import ActiveChannelContext from '../../../utils/active-channel-context.js';
// import { useEffect, useContext } from 'react';
// import CurrentUserContext from '../../../utils/auth-context.js';
// import axios from 'axios';

const MessagesBox = () => {

  // const { user } = useContext(CurrentUserContext);
  // const dispatch = useDispatch(); // понадобится чтобы диспатчить сообщения чата
  const messages = useSelector(msgSelectors.selectAll);
  const users = useSelector(usersSelectors.selectAll);
  const { activeChannel } = useContext(ActiveChannelContext);

  console.log(messages, 'messages!');
  // const [currentMsg, setCurrentMsg] = useState('');
  const msgRef = useRef();

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    const currentMsg = msgRef.current.value;
    console.log(currentMsg);
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {activeChannel.channelName}</b></p>
          <span className="text-muted">{messages.length} сообщений в канале</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((msg) => {
            return (
              <div className="text-break mb-2"><b>{users[0].name}</b>: {msg.text}</div>
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
      </div>
    </div>
  );
};

export default MessagesBox;
