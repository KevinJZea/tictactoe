import { useAppContext } from '../../context/useAppContext';
import { ACTIONS } from '../../utils/constants';
import './WinningMessage.scss';

export function WinningMessage() {
  const { state, dispatch } = useAppContext();
  const { draw, winner } = state;

  const handleClick = () => {
    if (draw) return dispatch({ type: ACTIONS.CLEAN_DRAW });
    dispatch({ type: ACTIONS.CLEAN_WINNER });
  };

  return (
    <div className="WinningMessage">
      <p className="WinningMessage--message">
        {draw ? (
          <>
            Draw! <br /> Wanna try again?
          </>
        ) : (
          <>
            {winner} Wins!
            <br />
            🥳🥳🥳
          </>
        )}
      </p>
      <button
        className="WinningMessage--button"
        type="button"
        onClick={handleClick}
      >
        Restart
      </button>
    </div>
  );
}
