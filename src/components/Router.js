import { Navigate, useRoutes } from 'react-router-dom';
import Home from '../pages/Home/Home';

import ProtectedRoute from './ProtectedRoute';
import Auth from './Auth';

const Router = () => {
  // INFO: All elements that requireed logged in user, must be wrapped with ProtectedRoute
  // Nested routes must have the full path. e.g profile nested in home is /home/profile.

  const elements = useRoutes([
    {
      path: '/home',
      children: [
        {
          path: '',
          element: (
            <ProtectedRoute redirectTo="/auth">
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: '/home/profile',
          element: (
            <ProtectedRoute redirectTo="/auth">
              <>
                <h1>This is Profile Page</h1>
              </>
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '/auth',
      children: [],
      element: <Auth />,
    },
    {
      path: '*',
      children: [],
      element: <Navigate to="/home" />,
    },
  ]);

  return elements;
};

export default Router;
