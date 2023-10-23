import { WINNING_COMBINATIONS } from './constants';

export const checkWin = (selectedCells, turn) => {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return selectedCells[turn]?.includes(index);
    });
  });
};
