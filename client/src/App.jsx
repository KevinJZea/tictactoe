import { useEffect, useCallback } from 'react';
import { socket } from './socket';

import { Home } from './pages/Home';
import { ChatButton } from './components/ChatButton';
import { ChatPortal } from './components/ChatPortal';
import { LoginForm } from './components/LoginForm';
import { Message } from './components/Message';
import { RoomContainer } from './components/RoomContainer';
import { TicTacToe } from './components/TicTacToe';
import { WinningMessage } from './components/WinningMessage';

import { useAppContext } from './context/useAppContext';
import { ACTIONS, ERRORS } from './utils/constants';

import './App.scss';

export function App() {
  const { state, dispatch } = useAppContext();
  const { draw, isChatOpen, error, messages, user, winner } = state;

  const onInitializeRoom = useCallback(
    (roomData) => {
      if (error.type === ERRORS.ROOM_FULL)
        dispatch({ type: ACTIONS.CLEAN_ERROR });

      dispatch({ type: ACTIONS.UPDATE_ROOM, payload: roomData });
      socket.emit('client:joinRoom', roomData.id);
    },
    [dispatch, error.type]
  );

  const onInitializeUser = useCallback(
    (newUserData) => {
      dispatch({ type: ACTIONS.UPDATE_USER, payload: newUserData });
    },
    [dispatch]
  );

  const onRoomFull = useCallback(() => {
    dispatch({ type: ACTIONS.ROOM_FULL });
  }, [dispatch]);

  const onNewMessage = useCallback(
    (newMessage) => {
      dispatch({ type: ACTIONS.NEW_MESSAGE, payload: newMessage });
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on('server:initializeRoom', onInitializeRoom);
    socket.on('server:initializeUser', onInitializeUser);
    socket.on('server:newMessage', onNewMessage);
    socket.on('server:error:roomFull', onRoomFull);

    return () => {
      socket.off('server:initializeRoom', onInitializeRoom);
      socket.off('server:initializeUser', onInitializeUser);
      socket.off('server:newMessage', onNewMessage);
      socket.off('server:error:roomFull', onRoomFull);
    };
  }, [onInitializeRoom, onInitializeUser, onNewMessage, onRoomFull]);

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
          <RoomContainer />

          <TicTacToe />
          {winner || draw ? <WinningMessage /> : null}

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
