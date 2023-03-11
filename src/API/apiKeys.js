export const apiKeys = {
  auth: () => ['userAuth'],
  current: () => ['currentUser'],
  allHotels: () => ['all', 'hotels'],
  hotelName: (name) => ['hotel', name],
};
