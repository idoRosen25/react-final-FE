import { useQuery } from '@tanstack/react-query';
import { api } from '../API/api';
import { apiKeys } from '../API/apiKeys';
import useLocalStorage from '../hooks/useLocalStorage';

const useReservations = () => {
  const { getValue } = useLocalStorage();

  const user = getValue(apiKeys.current()[0]);

  const {
    data: reservationData,
    isLoading: isReservationDataLoading,
    isError: isReservationDataError,
    error: reservationDataError,
  } = useQuery(apiKeys.userReservations(user.localId), async () => {
    const response = await api.get(`/reservation/user/${user.localId}`);
    return response.data;
  });
  return {
    reservationData: reservationData?.reservations || [],
    isReservationDataLoading,
    isReservationDataError,
    reservationDataError,
  };
};
export default useReservations;
