import { Navigate, useRoutes } from 'react-router';
import { Link } from 'react-router-dom';

import SignInSide from './Auth';
import ProtectedRoute from './ProtectedRoute';

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
              <>
                <h1>This isHome Page</h1>
                <Link to="/home/profile">Go To Profile</Link>
              </>
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
      element: <SignInSide />,
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
