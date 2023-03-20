import { useQuery } from '@tanstack/react-query';
import { api } from '../../API/api';
import { apiKeys } from '../../API/apiKeys';

const useHotelReservationStat = (hotelId) => {
  const { data: statSubmittedOrders } = useQuery(
    apiKeys.hotelMonthlyStats(hotelId),
    async () => {
      const response = await api.get(`stats//hotel/${hotelId}/months`);
      return response.data.data;
    },
  );

  return { statSubmittedOrders };
};
export default useHotelReservationStat;
