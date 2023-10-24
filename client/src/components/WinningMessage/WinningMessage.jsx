import { useAppContext } from '../../context/useAppContext';
import { ACTIONS } from '../../utils/constants';
import './WinningMessage.scss';

export function WinningMessage() {
  const { state, dispatch } = useAppContext();

  const handleClick = () => {
    dispatch({ type: ACTIONS.RESTART_GAME });
  };

  return (
    <div className="WinningMessage">
      <p className="WinningMessage--message">
        {state.draw ? (
          <>
            Draw! <br /> Wanna try again?
          </>
        ) : (
          <>
            {state.winner} Wins!
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
