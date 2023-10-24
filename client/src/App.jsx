import { useEffect, useCallback } from 'react';
import { socket } from './socket';

import { Home } from './pages/Home';
import { ChatButton } from './components/ChatButton';
import { ChatPortal } from './components/ChatPortal';
import { LoginForm } from './components/LoginForm';
import { Message } from './components/Message';
import { RoomContainer } from './components/RoomContainer';
import { ScoreBoard } from './components/ScoreBoard';
import { SinglePlayerTicTacToe, TicTacToe } from './components/TicTacToe';
import { WinningMessage } from './components/WinningMessage';

import { useAppContext } from './context/useAppContext';
import { ACTIONS, ERRORS } from './utils/constants';
import { checkWin } from './utils/helpers';

import './App.scss';

export function App() {
  const { state, dispatch } = useAppContext();
  const {
    draw,
    error,
    isChatOpen,
    messages,
    rival,
    selectedCells,
    turn,
    user,
    winner,
  } = state;

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
      socket.emit('client:rivalJoinedRoom', { ...user }, { ...rival });
      dispatch({ type: ACTIONS.UPDATE_RIVAL, payload: { ...rival } });
    },
    [dispatch, user]
  );

  const onUpdateHostData = (host, rival) => {
    dispatch({ type: ACTIONS.UPDATE_RIVAL, payload: { ...host } });
    dispatch({ type: ACTIONS.UPDATE_USER, payload: { ...rival } });
  };

  const onCellSelected = (selectedCellIndex, turn) => {
    if (selectedCells[turn].includes(selectedCellIndex)) return;
    dispatch({
      type: ACTIONS.CELL_SELECTED,
      payload: { mark: turn, index: selectedCellIndex },
    });
  };

  useEffect(() => {
    socket.on('server:initializeRoom', onInitializeRoom);
    socket.on('server:initializeUser', onInitializeUser);
    socket.on('server:newMessage', onNewMessage);
    socket.on('server:newRival', onNewRival);
    socket.on('server:cellSelected', onCellSelected);
    socket.on('server:updateHostData', onUpdateHostData);
    socket.on('server:error:roomFull', onRoomFull);
    socket.on('server:error:roomNotFound', onRoomNotFound);

    return () => {
      socket.off('server:initializeRoom', onInitializeRoom);
      socket.off('server:initializeUser', onInitializeUser);
      socket.off('server:newMessage', onNewMessage);
      socket.off('server:newRival', onNewRival);
      socket.off('server:cellSelected', onCellSelected);
      socket.off('server:updateHostData', onUpdateHostData);
      socket.off('server:error:roomFull', onRoomFull);
      socket.off('server:error:roomNotFound', onRoomNotFound);
    };
  }, [onInitializeRoom, onNewRival, onUpdateHostData]);

  useEffect(() => {
    if (checkWin(selectedCells, turn)) {
      const winnerName = user.mark === turn ? user.username : rival.username;
      return dispatch({ type: ACTIONS.UPDATE_WINNER, payload: winnerName });
    } else if (selectedCells[turn]?.length === 5) {
      return dispatch({ type: ACTIONS.DRAW });
    }

    dispatch({ type: ACTIONS.SWITCH_TURNS });
  }, [selectedCells]);

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

          {rival.id ? <TicTacToe /> : <SinglePlayerTicTacToe />}
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
