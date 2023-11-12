import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { ICONS } from '../../utils/constants';
import './GoBackLink.scss';

export function GoBackLink({ children, to }) {
  return (
    <Link
      className="GoBackLink"
      to={to}
    >
      <Icon name={ICONS.ArrowLeft} />
      {children}
    </Link>
  );
}
