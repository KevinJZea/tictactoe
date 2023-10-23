import { useEffect, useCallback } from 'react';
import { socket } from './socket';

import { Home } from './pages/Home';
import { ChatButton } from './components/ChatButton';
import { ChatPortal } from './components/ChatPortal';
import { LoginForm } from './components/LoginForm';
import { Message } from './components/Message';
import { RoomContainer } from './components/RoomContainer';
import { ScoreBoard } from './components/ScoreBoard';
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

      if (error.type === ERRORS.ROOM_NOT_FOUND)
        dispatch({ type: ACTIONS.CLEAN_ERROR });

      dispatch({ type: ACTIONS.UPDATE_ROOM, payload: roomData });
      socket.emit('client:joinRoom', roomData.id);
    },
    [dispatch, error.type]
  );

  const onInitializeUser = (newUserData) => {
    dispatch({ type: ACTIONS.UPDATE_USER, payload: newUserData });
  };

  const onRoomFull = () => {
    dispatch({ type: ACTIONS.ROOM_FULL });
  };

  const onRoomNotFound = () => {
    dispatch({ type: ACTIONS.ROOM_NOT_FOUND });
  };

  const onNewMessage = (newMessage) => {
    dispatch({ type: ACTIONS.NEW_MESSAGE, payload: newMessage });
  };

  const onNewRival = useCallback(
    (rival) => {
      socket.emit('client:rivalJoinedRoom', { ...user }, rival.id);
      dispatch({ type: ACTIONS.UPDATE_RIVAL, payload: { ...rival } });
    },
    [dispatch, user]
  );

  const onUpdateHostData = (host) => {
    dispatch({ type: ACTIONS.UPDATE_RIVAL, payload: { ...host } });
  };

  useEffect(() => {
    socket.on('server:initializeRoom', onInitializeRoom);
    socket.on('server:initializeUser', onInitializeUser);
    socket.on('server:newMessage', onNewMessage);
    socket.on('server:newRival', onNewRival);
    socket.on('server:updateHostData', onUpdateHostData);
    socket.on('server:error:roomFull', onRoomFull);
    socket.on('server:error:roomNotFound', onRoomNotFound);

    return () => {
      socket.off('server:initializeRoom', onInitializeRoom);
      socket.off('server:initializeUser', onInitializeUser);
      socket.off('server:newMessage', onNewMessage);
      socket.off('server:newRival', onNewRival);
      socket.off('server:updateHostData', onUpdateHostData);
      socket.off('server:error:roomFull', onRoomFull);
      socket.off('server:error:roomNotFound', onRoomNotFound);
    };
  }, [onInitializeRoom, onNewRival, onUpdateHostData]);

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

          <ScoreBoard />

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
