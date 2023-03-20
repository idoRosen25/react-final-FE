import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../API/api';
import { apiKeys } from '../API/apiKeys';

const useBooking = (hotelId) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState({ show: false, message: '' });

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

      const response = await api.post(`/reservation`, {
        hotelId: hotelDetails.data?.hotel?._id,
        userId,
        roomId: data.room,
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
        if (data.code === 200) {
          navigate('/home', { replace: true });
        }
      },
      onError: (error) => {
        console.warn('add booking error: ', error);
      },
    },
  );

  useEffect(() => {
    if (!isBookingLoading && isBookingError && bookingError) {
      setShowAlert({
        show: true,
        message: bookingError?.mesage || bookingError.toString(),
      });
    }
  }, [bookingError, isBookingError, isBookingLoading]);

  useEffect(() => {
    if (showAlert?.show) {
      const timeout = setTimeout(
        () => setShowAlert({ show: false, message: '' }),
        3000,
      );
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  return {
    hotelDetails: hotelDetails?.data?.hotel || {},
    hotelDetailsError,
    hotelDetailsLoading,
    submitBooking,
    isBookingLoading,
    isBookingError,
    bookingError,
    showAlert,
    setShowAlert,
  };
};
export default useBooking;
