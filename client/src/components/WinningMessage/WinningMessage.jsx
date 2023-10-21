import { useAppContext } from '../../context/useAppContext';
import { ACTIONS, PLAYERS } from '../../utils/constants';
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
            {state.winner === PLAYERS.CROSS ? 'Cross' : 'Circle'} Wins!
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
