import { useEffect, useCallback, Suspense } from 'react';
import { socket } from './socket';
import { Router } from './routes/Router';

import { useAppContext } from './context/useAppContext';
import { ACTIONS, ERRORS } from './utils/constants';
import { checkWin } from './utils/helpers';

export function App() {
  const { state, dispatch } = useAppContext();
  const { darkTheme, error, rival, selectedCells, turn, user } = state;

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

  const onRivalAbandoned = () => {
    dispatch({ type: ACTIONS.CLEAN_GAME });
    dispatch({ type: ACTIONS.RIVAL_ABANDONED });
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
    socket.on('server:rivalAbandoned', onRivalAbandoned);
    socket.on('server:error:roomFull', onRoomFull);
    socket.on('server:error:roomNotFound', onRoomNotFound);

    return () => {
      socket.off('server:initializeRoom', onInitializeRoom);
      socket.off('server:initializeUser', onInitializeUser);
      socket.off('server:newMessage', onNewMessage);
      socket.off('server:newRival', onNewRival);
      socket.off('server:cellSelected', onCellSelected);
      socket.off('server:updateHostData', onUpdateHostData);
      socket.off('server:rivalAbandoned', onRivalAbandoned);
      socket.off('server:error:roomFull', onRoomFull);
      socket.off('server:error:roomNotFound', onRoomNotFound);
    };
  }, [onInitializeRoom, onNewRival, onUpdateHostData]);

  useEffect(() => {
    if (!rival.id) return dispatch({ type: ACTIONS.RESTART_TURN });

    if (checkWin(selectedCells, turn)) {
      const isUserWinner = user.mark === turn;

      if (isUserWinner) {
        dispatch({ type: ACTIONS.INCREASE_USER_SCORE });
      } else {
        dispatch({ type: ACTIONS.INCREASE_RIVAL_SCORE });
      }

      dispatch({ type: ACTIONS.CLEAN_GAME });

      const winnerUsername = isUserWinner ? user.username : rival.username;
      return dispatch({
        type: ACTIONS.UPDATE_WINNER,
        payload: winnerUsername,
      });
    } else if (selectedCells[turn]?.length === 5) {
      dispatch({ type: ACTIONS.CLEAN_GAME });
      return dispatch({ type: ACTIONS.DRAW });
    }

    dispatch({ type: ACTIONS.SWITCH_TURNS });
  }, [selectedCells, rival.id]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkTheme);
    return () => {
      document.body.classList.remove('dark');
    };
  }, [darkTheme]);

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Router />
    </Suspense>
  );
}
