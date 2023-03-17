import { Navigate, useRoutes } from 'react-router-dom';
import Home from '../pages/Home/Home';

import ProtectedRoute from './ProtectedRoute';
import Auth from './Auth';
import Booking from '../pages/Booking/Booking';

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
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: '/home/profile',
          element: (
            <ProtectedRoute>
              <>
                <h1>This is Profile Page</h1>
              </>
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: 'hotel/:id',
      children: [
        {
          path: '/hotel/:id/booking',
          element: (
            <ProtectedRoute>
              <Booking />
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
