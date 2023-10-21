import { useEffect } from 'react';
import { socket } from './socket';

import { Home } from './pages/Home';
import { ChatButton } from './components/ChatButton';
import { ChatPortal } from './components/ChatPortal';
import { LoginForm } from './components/LoginForm';
import { Message } from './components/Message';

import { useAppContext } from './context/useAppContext';
import { ACTIONS } from './utils/constants';

import './App.scss';

export function App() {
  const { state, dispatch } = useAppContext();
  const { isChatOpen, messages, user } = state;

  const onInitializeUser = (newUserData) => {
    dispatch({ type: ACTIONS.UPDATE_USER, payload: newUserData });
  };

  const onNewMessage = (newMessage) => {
    dispatch({ type: ACTIONS.NEW_MESSAGE, payload: newMessage });
  };

  useEffect(() => {
    socket.on('server:initializeUser', onInitializeUser);
    socket.on('server:newMessage', onNewMessage);

    return () => {
      socket.off('server:initializeUser', onInitializeUser);
      socket.off('server:newMessage', onNewMessage);
    };
  }, []);

  const toggleChat = () => {
    dispatch({ type: ACTIONS.TOGGLE_CHAT });
  };

  const closeChat = () => {
    dispatch({ type: ACTIONS.CLOSE_CHAT });
  };

  const addMessage = (content) => {
    socket.emit('client:newMessage', { sender: user.username, content });
  };

  return (
    <>
      {!user.username ? (
        <LoginForm />
      ) : (
        <Home>
          <ChatButton onClick={toggleChat} />
          {isChatOpen ? (
            <ChatPortal
              closeChat={closeChat}
              addMessage={addMessage}
            >
              {messages.map((message) => (
                <Message
                  key={message.id}
                  content={message.content}
                  sender={message.sender}
                  isSameUser={message.sender === user.username}
                />
              ))}
            </ChatPortal>
          ) : null}
        </Home>
      )}
    </>
  );
}
