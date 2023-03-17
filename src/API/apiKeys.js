export const apiKeys = {
  auth: () => ['userAuth'],
  current: () => ['currentUser'],
  allHotels: () => ['all', 'hotels'],
  hotelById: (id) => ['hotel', id],
  hotelReservations: (id) => ['hotel', id, 'reservations'],
  createBooking: (id) => ['hotel', id, 'reservations', 'create'],
};
