import { useState, useEffect } from 'react';

const useBookingPage = (hotelId, rooms) => {
  const [bookingFormData, setBookingFormData] = useState({
    hotelId,
    room: rooms?.['standard']?.id || null,
    checkInDate: null,
    checkOutDate: null,
    numberOfGuests: 1,
    guest: {
      firstName: '',
      lastName: '',
      email: '',
      address: {
        street: '',
        city: '',
        country: '',
      },
    },
  });

  useEffect(() => {
    setBookingFormData((prev) => ({
      ...prev,
      room: rooms?.['standard']?.id || null,
    }));
  }, [hotelId, rooms]);

  return { bookingFormData, setBookingFormData };
};
export default useBookingPage;
