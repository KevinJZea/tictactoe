import { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../context/AppRoute';
import { GAME_ROUTES, ROUTES } from '../utils/constants';

const Game = lazy(() =>
  import('../pages/Game').then((module) => ({ default: module.Game }))
);
const Login = lazy(() =>
  import('../pages/Login').then((module) => ({
    default: module.Login,
  }))
);
const Menu = lazy(() =>
  import('../pages/GameMenu').then((module) => ({
    default: module.GameMenu,
  }))
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then((module) => ({
    default: module.NotFound,
  }))
);

const gameRoutes = [
  { index: true, element: <Menu /> },
  { path: GAME_ROUTES.FRIEND, element: <Game /> },
];
const gameChildren = gameRoutes.map((route) => (
  <Route
    {...route}
    key={`game-${route.path || 'index'}`}
    element={<AppRoute>{route.element}</AppRoute>}
  />
));

const routes = [
  { index: true, element: null },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.GAME, children: gameChildren, element: <Outlet /> },
  { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];

const elementToRender = (routeData) =>
  routeData.path === ROUTES.LOGIN || routeData.path === ROUTES.NOT_FOUND ? (
    routeData.element
  ) : (
    <AppRoute>{routeData.element}</AppRoute>
  );

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          {routes.map((route) => (
            <Route
              {...route}
              key={`${route.path || 'index'}`}
              element={elementToRender(route)}
            >
              {route.children}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
