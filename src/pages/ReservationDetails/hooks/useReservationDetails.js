import { useQuery } from '@tanstack/react-query';
import { api } from '../../../API/api';
import { apiKeys } from '../../../API/apiKeys';

const useReservationDetails = (reservationId) => {
  const {
    data: reservationDetails,
    error: reservationDetailsError,
    isLoading: reservationDetailsLoading,
    isError: reservationDetailsIsError,
  } = useQuery(apiKeys.reservationById(reservationId), async () => {
    const response = await api.get(`/reservation/${reservationId}`);
    return response.data.reservation;
  });

  return {
    reservationDetails,
    reservationDetailsError,
    reservationDetailsLoading,
    reservationDetailsIsError,
  };
};
export default useReservationDetails;
