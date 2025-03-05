import React, { useMemo, lazy, useEffect } from 'react';
import { Suspense } from 'react';
import type { RouteProps } from 'react-router-dom';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  matchPath,
} from 'react-router-dom';

import Loader from '@src/shared/ui/Loader/Loader';
import { useAppSelector } from '@src/store/store';

import Protector, { AuthPropsType } from '../Protector';

const SignIn = lazy(() => import('../../pages/auth/SignIn'));
const SignUp = lazy(() => import('../../pages/auth/SignUp'));
const ResetPassword = lazy(() => import('../../pages/auth/ResetPassword'));
const Home = lazy(() => import('../../pages/main/Home'));

const Router = () => {
  const user = useAppSelector(({ main }) => main.user);

  const availableRoutes = useMemo(() => {
    if (!user) {
      return authRoutes;
    }

    return routes;
  }, [user]);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const availablePaths = availableRoutes.map((route) => route.path);
    const isPathAvailable = availablePaths.some((path) =>
      matchPath(path, location.pathname),
    );

    if (!isPathAvailable && user) {
      navigate('/home');
    }
  }, [user, navigate, availableRoutes, location.pathname]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {availableRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
};

type RawRouteType = {
  path: string;
  component: React.LazyExoticComponent<React.FC>;
  auth?: AuthPropsType;
};

const withProtection = (rawRoutesArr: RawRouteType[]) => {
  return rawRoutesArr.map((route): RouteProps => {
    const Page = route.component;
    const element = (
      <Protector {...route.auth}>
        <Page />
      </Protector>
    );

    return {
      path: route.path,
      element,
    };
  });
};

const rawAuthRoutes = [
  { path: '/', component: SignIn, auth: { isAuthRequired: false } },
  { path: '/sign-up', component: SignUp, auth: { isAuthRequired: false } },
  {
    path: '/reset-password',
    component: ResetPassword,
    auth: { isAuthRequired: false },
  },
];

const rawRoutes = [
  { path: '/home', component: Home, auth: { isAuthRequired: true } },
];

const routes = withProtection(rawRoutes);

const authRoutes: RouteProps[] = rawAuthRoutes.map((route) => {
  const Component = route.component;
  return {
    path: route.path,
    element: <Component />,
  };
});

export default Router;
