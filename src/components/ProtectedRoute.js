import { Navigate } from 'react-router';
import { apiKeys } from '../API/apiKeys';
import useLocalStorage from '../hooks/useLocalStorage';

const ProtectedRoute = ({ children, redirectTo }) => {
  const { getValue } = useLocalStorage();

  return !!getValue(apiKeys.current()[0]) ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};
export default ProtectedRoute;
