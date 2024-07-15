import { LoginCallback } from '@okta/okta-react';
import { RouteObject } from 'react-router';
import { App } from './App';
import { RequiredAuth } from './components/required-auth/RequiredAuth';
import { Dashboard } from './pages/dashboard/dashboard';
import Details from './pages/details/details';
import { Home } from './pages/home/home';
import { SignIn } from './pages/sign-in/sign-in';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        index: true,
        element: <Home />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signin/callback',
        element: <LoginCallback />,
      },
      {
        path: 'dashboard',
        element: <RequiredAuth />,
        children: [
          {
            path: '',
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: 'details',
        element: <RequiredAuth />,
        children: [
          {
            path: ':id',
            element: <Details />,
          },
        ],
      },
    ],
  },
] satisfies RouteObject[];
