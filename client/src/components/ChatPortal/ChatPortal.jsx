import { useState } from 'react';
import './ChatPortal.scss';

export function ChatPortal({ children, closeChat, addMessage }) {
  const [messageContent, setMessageContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addMessage(messageContent);
    setMessageContent('');
  };

  const handleChange = (event) => {
    setMessageContent(event.target.value);
  };

  return (
    <div className="ChatPortal">
      <button
        className="ChatPortal--exit-button"
        type="button"
        onClick={closeChat}
      >
        X
      </button>

      <div className="ChatPortal--messages-container">{children}</div>

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
