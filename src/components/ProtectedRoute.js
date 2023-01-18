import { Navigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { apiKeys } from '../API/apiKeys';

const ProtectedRoute = ({ children }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(apiKeys.current());
  console.log('user: ', user);
  return !!queryClient.getQueryData(apiKeys.current()) ? (
    children
  ) : (
    <Navigate to="/auth" />
  );
};
export default ProtectedRoute;
