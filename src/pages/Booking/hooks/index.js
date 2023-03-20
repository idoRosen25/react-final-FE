import { useState, useEffect, useMemo, useCallback } from 'react';

const useBookingPage = (hotelId, rooms = []) => {
  const mappedRooms = useMemo(
    () =>
      rooms?.map((room) => ({
        ...room.room,
        available: room.available,
        booked: room.booked,
      })) || [],
    [rooms],
  );
  const [bookingFormData, setBookingFormData] = useState({
    hotelId,
    room: mappedRooms[0]?._id || null,
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

  const maxGuests = useCallback(
    (roomId) => {
      if (!roomId) return 0;
      const room = mappedRooms.find((room) => room._id === roomId);
      return room?.numOfBeds || 0;
    },
    [mappedRooms],
  );

  useEffect(() => {
    setBookingFormData((prev) => ({
      ...prev,
      room: mappedRooms[0]?._id || null,
    }));
  }, [hotelId, mappedRooms]);

  return { bookingFormData, setBookingFormData, maxGuests, mappedRooms };
};
export default useBookingPage;
