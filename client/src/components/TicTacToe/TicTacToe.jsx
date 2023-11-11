import { useCallback } from 'react';
import { socket } from '../../socket';
import { useAppContext } from '../../context/useAppContext';
import { ACTIONS } from '../../utils/constants';
import './TicTacToe.scss';

export function TicTacToe() {
  const { state } = useAppContext();
  const { cells, user } = state;

  const cellsArray = Object.entries(cells);

  return (
    <div className={`TicTacToe--board ${user.mark}`}>
      {cellsArray.map(([index, mark]) => (
        <TicTacToeCell
          key={index}
          index={index}
          mark={mark}
        />
      ))}
    </div>
  );
}

function TicTacToeCell({ index, mark }) {
  const { state, dispatch } = useAppContext();
  const { room, turn, user } = state;

  const handleClick = useCallback(() => {
    // If mark empty, continue
    if (mark !== '') return;

    // If turn is user's mark, continue
    if (user.mark !== turn) return;

    dispatch({
      type: ACTIONS.CELL_SELECTED,
      payload: { mark: turn, index },
    });

    socket.emit('client:cellSelected', room.id, index, turn);
  }, [dispatch, room.id, turn, user]);

  return (
    <button
      className={`TicTacToe--cell ${mark}`}
      type="button"
      onClick={handleClick}
    ></button>
  );
}
