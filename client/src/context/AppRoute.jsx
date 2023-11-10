import { Navigate } from 'react-router-dom';
import { useAppContext } from './useAppContext';
import { ROUTES } from '../utils/constants';

export function AppRoute(props) {
  const { state } = useAppContext();
  return !state.user.username ? <Navigate to={ROUTES.LOGIN} /> : props.children;
}
