import { RouteObject } from 'react-router';
import { App } from './App';
import { ProtectedRoute } from './components/protected-route/protected-route';
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
        path: 'dashboard',
        element: <ProtectedRoute />,
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
        element: <ProtectedRoute />,
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
