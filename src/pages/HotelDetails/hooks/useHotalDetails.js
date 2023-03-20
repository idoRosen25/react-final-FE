import { useQuery } from '@tanstack/react-query';
import { api } from '../../../API/api';
import { apiKeys } from '../../../API/apiKeys';

const useHotelDetails = (hotelId) => {
  const {
    data: hotelDetails,
    isLoading: isHotelDetailsLoading,
    isError: isHotelDetailsError,
    error: hotelDetailsError,
  } = useQuery(apiKeys.hotelById(hotelId), async () => {
    const response = await api.get(`/hotels/${hotelId}`);
    return response.data.hotel;
  });

  return {
    hotelDetails,
    isHotelDetailsLoading,
    isHotelDetailsError,
    hotelDetailsError,
  };
};

export default useHotelDetails;
