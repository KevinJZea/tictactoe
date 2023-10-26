import { Suspense, lazy, useState } from 'react';
import { socket } from '../../socket';
import { useAppContext } from '../../context/useAppContext';
import { ACTIONS } from '../../utils/constants';
import './ChatPortal.scss';

const Message = lazy(() =>
  import('../Message').then((module) => ({ default: module.Message }))
);

export function ChatPortal() {
  const { state, dispatch } = useAppContext();
  const { isChatOpen, messages, user } = state;

  const [messageContent, setMessageContent] = useState('');

  const closeChat = () => {
    dispatch({ type: ACTIONS.CLOSE_CHAT });
  };

  const addMessage = (content) => {
    socket.emit('client:newMessage', { sender: user.username, content });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMessage(messageContent);
    setMessageContent('');
  };

  const handleChange = (event) => {
    setMessageContent(event.target.value);
  };

  return (
    <div className={`${isChatOpen ? 'ChatPortal' : 'hide'}`}>
      <button
        className="ChatPortal--exit-button"
        type="button"
        onClick={closeChat}
      >
        X
      </button>

      <div className="ChatPortal--messages-container">
        <Suspense>
          {messages.map((message) => (
            <Message
              key={message.id}
              content={message.content}
              sender={message.sender}
              isSameUser={message.sender === user.username}
            />
          ))}
        </Suspense>
      </div>

      <form
        className="ChatPortal--form-container"
        onSubmit={handleSubmit}
      >
        <input
          className="ChatPortal--input"
          id="message"
          name="message"
          placeholder="Type your message here..."
          required
          type="text"
          value={messageContent}
          onChange={handleChange}
        />

        <input
          className="ChatPortal--submit-button"
          type="submit"
          value="Send"
        />
      </form>
    </div>
  );
}
