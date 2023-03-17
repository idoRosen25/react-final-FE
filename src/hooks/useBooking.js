import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../API/api';
import { apiKeys } from '../API/apiKeys';

const useBooking = (hotelId) => {
  const {
    data: hotelDetails,
    error: hotelDetailsError,
    isLoading: hotelDetailsLoading,
  } = useQuery(
    apiKeys.hotelById(hotelId),
    async () => {
      const response = await api.get(`/hotels/${hotelId}`);
      return response;
    },
    {
      onSuccess: ({ data }) => {
        if (data?.hotel) {
          return data.hotel;
        }
        return null;
      },
      onError: (error) => {
        console.error('hotel details error: ', error);
      },
    },
  );

  const {
    mutateAsync: submitBooking,
    isLoading: isBookingLoading,
    isError: isBookingError,
    error: bookingError,
  } = useMutation(
    apiKeys.createBooking(hotelId),
    async (data) => {
      const userId = JSON.parse(
        localStorage.getItem('currentUser') ?? {},
      )?.localId;

      console.log('data for mutation: ', data);
      const response = await api.post(`/reservation`, {
        hotelId: hotelDetails.data?.hotel?._id,
        userId,
        roomId: data.room._id,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        numberOfGuests: data.numberOfGuests,
        guest: data.guest,
      });
      if (response?.data?.status === 'error') {
        throw new Error(response?.data?.message);
      }
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('success data: ', data);
        return data;
      },
      onError: (error) => {
        console.warn('add booking error: ', error);
      },
    },
  );
  return {
    hotelDetails: hotelDetails?.data?.hotel || {},
    hotelDetailsError,
    hotelDetailsLoading,
    submitBooking,
    isBookingLoading,
    isBookingError,
    bookingError,
  };
};
export default useBooking;
