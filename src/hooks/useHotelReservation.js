import { useQuery } from '@tanstack/react-query';
import { apiKeys } from '../API/apiKeys';
import { api } from '../API/api';

const useHotelReservation = (hotelId) => {
  const {
    data: { hotel: hotelReservations },
    error: hotelReservationsError,
    isLoading: hotelReservationsLoading,
  } = useQuery(apiKeys.hotelReservations(hotelId), async () => {
    const response = await api.get(`/hotels/${hotelId}/reservations`);
    return response.data;
  });
  return {
    hotelReservations,
    hotelReservationsError,
    hotelReservationsLoading,
  };
};
export default useHotelReservation;
