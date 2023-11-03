import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const Home = lazy(() =>
  import('../pages/Home').then((module) => ({ default: module.Home }))
);
const Login = lazy(() =>
  import('../pages/Login').then((module) => ({
    default: module.Login,
  }))
);
const Menu = lazy(() =>
  import('../pages/RivalMenu').then((module) => ({
    default: module.RivalMenu,
  }))
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then((module) => ({
    default: module.NotFound,
  }))
);

const routes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.MENU, element: <Menu /> },
  { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              {...route}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
