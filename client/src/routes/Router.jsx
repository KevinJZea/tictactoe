import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const Home = lazy(() =>
  import('../pages/Home').then((module) => ({ default: module.Home }))
);
const LoginForm = lazy(() =>
  import('../components/LoginForm').then((module) => ({
    default: module.LoginForm,
  }))
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then((module) => ({
    default: module.NotFound,
  }))
);

const routes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <LoginForm /> },
  { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            {...route}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
