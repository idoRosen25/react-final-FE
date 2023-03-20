export const apiKeys = {
  auth: () => ['userAuth'],
  current: () => ['currentUser'],
  allHotels: () => ['all', 'hotels'],
  hotelById: (id) => ['hotel', id],
  userReservations: (id) => ['user', id, 'reservations'],
  reservationById: (id) => ['reservation', id],
  deleteReservation: (id) => ['reservation', id, 'delete'],
  createBooking: (id) => ['hotel', id, 'reservations', 'create'],
};
