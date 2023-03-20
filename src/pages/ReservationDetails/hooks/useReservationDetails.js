import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../../API/api';
import { apiKeys } from '../../../API/apiKeys';

const useReservationDetails = (reservationId) => {
  const [showAlert, setShowAlert] = useState({ open: false });
  const {
    data: reservationDetails,
    error: reservationDetailsError,
    isLoading: reservationDetailsLoading,
    isError: reservationDetailsIsError,
    refetch: refetchDetails,
  } = useQuery(apiKeys.reservationById(reservationId), async () => {
    const response = await api.get(`/reservation/${reservationId}`);
    return response.data.reservation;
  });

  const {
    mutateAsync: updateReservation,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
    error: updateError,
  } = useMutation(
    apiKeys.reservationById(reservationId),
    async (updateDates) => {
      const response = await api.put(`/reservation`, {
        _id: reservationId,
        checkInDate: updateDates.checkIn || reservationDetails.checkInDate,
        checkOutDate: updateDates.checkOut || reservationDetails.checkOutDate,
        type: updateDates.type || reservationDetails.roomId.type,
        numberOfGuests:
          updateDates.numberOfGuests || reservationDetails.numberOfGuests,
      });
      return response.data.reservation;
    },
    {
      onSuccess: () =>
        setShowAlert({
          open: true,
          severity: 'success',
          title: 'Success',
          message: 'Reservation updated successfully',
        }),
      onError: () =>
        setShowAlert({
          open: true,
          severity: 'error',
          title: 'Error',
          message: 'Reservation could not update. Try again later',
        }),
      onSettled: () => {
        refetchDetails();
      },
    },
  );

  useEffect(() => {
    if (showAlert.open) {
      const timeout = setTimeout(() => {
        setShowAlert((prev) => ({ ...prev, open: false }));
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [showAlert.open]);

  useEffect(() => {
    if (!showAlert.open && Object.keys(showAlert).length > 1) {
      setShowAlert({ open: false });
    }
  }, [showAlert, updateReservation]);

  return {
    reservationDetails,
    reservationDetailsError,
    reservationDetailsLoading,
    reservationDetailsIsError,
    updateReservation,
    isUpdateLoading,
    isUpdateError,
    updateError,
    showAlert,
    setShowAlert,
  };
};
export default useReservationDetails;
