import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../API/api';
import { apiKeys } from '../API/apiKeys';
import useLocalStorage from './useLocalStorage';

const useDeleteReservation = () => {
  const { getValue } = useLocalStorage();

  const user = getValue(apiKeys.current()[0]);
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteReservation,
    error: deletedError,
    isLoading: deletedLoading,
    isError: deletedIsError,
  } = useMutation(
    apiKeys.deleteReservation(),
    async (reservationId) => {
      const response = await api.delete(`/reservation/${reservationId}`);
      console.log('delete res: ', response);
      return response;
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries(apiKeys.userReservations(user.localId)),
      onError: (error) => {
        console.error('delete reservation error: ', error);
      },
    },
  );
  return {
    deleteReservation,
    deletedError,
    deletedLoading,
    deletedIsError,
  };
};

export default useDeleteReservation;
