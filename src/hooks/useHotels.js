import { useQuery } from '@tanstack/react-query';
import { api } from '../API/api';
import { apiKeys } from '../API/apiKeys';

const useHotels = () => {
  const { data, isError, error, isLoading } = useQuery(
    apiKeys.allHotels(),
    async () => {
      const res = await api.get('/hotels');
      return res.data;
    },
    {
      onSuccess: ({ data }) => {
        if (data?.hotels.length) {
          return data.hotels;
        }
        return [];
      },
      onError: (error) => {
        console.error('all hotels error: ', error);
      },
    },
  );

  return { isError, error, isLoading, hotels: data?.hotels };
};

export default useHotels;
