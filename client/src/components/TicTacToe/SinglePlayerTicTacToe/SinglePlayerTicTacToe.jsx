import { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/useAppContext';
import { ACTIONS, WINNING_COMBINATIONS } from '../../../utils/constants';
import '../TicTacToe.scss';

export function SinglePlayerTicTacToe() {
  const { state } = useAppContext();
  const { turn } = state;

  return (
    <div className={`TicTacToe--board ${turn}`}>
      <SinglePlayerTicTacToeCell index={0} />
      <SinglePlayerTicTacToeCell index={1} />
      <SinglePlayerTicTacToeCell index={2} />
      <SinglePlayerTicTacToeCell index={3} />
      <SinglePlayerTicTacToeCell index={4} />
      <SinglePlayerTicTacToeCell index={5} />
      <SinglePlayerTicTacToeCell index={6} />
      <SinglePlayerTicTacToeCell index={7} />
      <SinglePlayerTicTacToeCell index={8} />
    </div>
  );
}

function SinglePlayerTicTacToeCell({ index }) {
  const { state, dispatch } = useAppContext();
  const { draw, turn, selectedCells, winner } = state;
  const [mark, setMark] = useState('');

  const handleClick = () => {
    if (mark !== '') return;
    setMark(turn);
    dispatch({
      type: ACTIONS.CELL_SELECTED,
      payload: { mark: turn, index },
    });
  };

  const checkWin = () => {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return selectedCells[mark]?.includes(index);
      });
    });
  };

  useEffect(() => {
    setMark('');
  }, [draw, winner]);

  useEffect(() => {
    if (mark === '') return;

    if (checkWin()) {
      dispatch({ type: ACTIONS.UPDATE_WINNER, payload: mark });
    } else if (selectedCells[mark]?.length === 5) {
      dispatch({ type: ACTIONS.DRAW });
    }
  }, [mark]);

  return (
    <div
      className={`TicTacToe--cell ${mark}`}
      onClick={handleClick}
    ></div>
  );
}
