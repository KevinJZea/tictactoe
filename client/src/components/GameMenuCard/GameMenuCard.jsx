import { Link } from 'react-router-dom';
import './GameMenuCard.scss';

export function GameMenuCard({ description, disabled = false, title, to }) {
  return (
    <Link
      aria-disabled={disabled}
      className="GameMenuCard"
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      to={disabled ? '' : to}
    >
      {disabled ? (
        <h5 className="GameMenuCard--coming-soon-text">
          {title}
          <br />
          Coming Soon!
        </h5>
      ) : (
        <>
          <h2 className="GameMenuCard--title">{title}</h2>
          <p className="GameMenuCard--description">{description}</p>
        </>
      )}
    </Link>
  );
}
