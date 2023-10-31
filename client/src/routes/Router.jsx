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

const routes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <LoginForm /> },
  { path: ROUTES.NOT_FOUND, element: <h2>Not Found</h2> },
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
