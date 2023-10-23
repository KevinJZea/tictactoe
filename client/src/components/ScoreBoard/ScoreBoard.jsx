import { useAppContext } from '../../context/useAppContext';
import './ScoreBoard.scss';

export function ScoreBoard() {
  const { state } = useAppContext();
  const { rival, user } = state;

  return (
    <div className="ScoreBoard">
      <div className="ScoreBoard--info-container">
        <span className="ScoreBoard--username">{user.username}</span>
        <span className="ScoreBoard--points">{user.points}</span>
      </div>
      <div className="ScoreBoard--info-container">
        <span className="ScoreBoard--username">{rival.username || '???'}</span>
        <span className="ScoreBoard--points">{rival.points}</span>
      </div>
    </div>
  );
}
