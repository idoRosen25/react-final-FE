import { Navigate } from 'react-router-dom';
import { apiKeys } from '../API/apiKeys';
import useLocalStorage from '../hooks/useLocalStorage';

const ProtectedRoute = ({ children }) => {
  const { getValue } = useLocalStorage();

  return !!getValue(apiKeys.current()[0]) ? (
    children
  ) : (
    <Navigate to={'/auth'} />
  );
};
export default ProtectedRoute;
