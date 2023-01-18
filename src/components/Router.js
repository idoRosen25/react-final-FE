import { Navigate, useNavigate, Routes, Route } from 'react-router';
import SignInSide from './Auth';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  const navigate = useNavigate();

  // INFO: All elements that requireed logged in user, must be wrapped with ProtectedRoute
  return (
    <Routes>
      <Route path="/home">
        <Route
          path=""
          element={
            <ProtectedRoute>
              <>
                <h1>This is HOME page</h1>
                <button
                  onClick={() => {
                    navigate('/home/profile');
                  }}
                >
                  Go To Profile
                </button>
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <>
                <h1>This is Profile page</h1>
              </>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/auth" element={<SignInSide />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Router;
