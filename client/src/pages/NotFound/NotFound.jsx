import { Link } from 'react-router-dom';
import './NotFound.scss';
import { ROUTES } from '../../utils/constants';

export function NotFound() {
  return (
    <main className="NotFoundPage">
      <h1 className="NotFoundPage--title">404 - Page Not Found 😥</h1>
      <p>Sorry, we couldn&apos;t find the page you were looking for.</p>
      <p>
        Wanna go back to{' '}
        <Link
          className="NotFoundPage--link"
          to={ROUTES.HOME}
        >
          Home
        </Link>
        ?
      </p>
    </main>
  );
}
