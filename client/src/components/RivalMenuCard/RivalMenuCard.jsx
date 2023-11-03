import { Link } from 'react-router-dom';
import './RivalMenuCard.scss';

export function RivalMenuCard({ description, disabled = false, title, to }) {
  return (
    <Link
      aria-disabled={disabled}
      className="RivalMenuCard"
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      to={disabled ? '' : to}
    >
      {disabled ? (
        <h5 className="RivalMenuCard--coming-soon-text">
          {title}
          <br />
          Coming Soon!
        </h5>
      ) : (
        <>
          <h2 className="RivalMenuCard--title">{title}</h2>
          <p className="RivalMenuCard--description">{description}</p>
        </>
      )}
    </Link>
  );
}
