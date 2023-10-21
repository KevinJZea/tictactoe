import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { ACTIONS, WINNING_COMBINATIONS } from '../../utils/constants';
import './TicTacToe.scss';

export function TicTacToe() {
  const { state } = useAppContext();
  const { turn } = state;

  return (
    <div className={`TicTacToe--board ${turn}`}>
      <TicTacToeCell index={0} />
      <TicTacToeCell index={1} />
      <TicTacToeCell index={2} />
      <TicTacToeCell index={3} />
      <TicTacToeCell index={4} />
      <TicTacToeCell index={5} />
      <TicTacToeCell index={6} />
      <TicTacToeCell index={7} />
      <TicTacToeCell index={8} />
    </div>
  );
}

function TicTacToeCell({ index }) {
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
    dispatch({ type: ACTIONS.SWITCH_TURNS });
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
