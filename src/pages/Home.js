import useHotels from '../hooks/useHotels';

const Home = () => {
  const { isError, error, isLoading, hotels } = useHotels();

  console.log('hotel: ', hotels);
  if (isError) {
    return <h1>Something went wrong {error?.message || error}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>This isHome Page</h1>
      {hotels?.map((hotel) => (
        <h2 key={hotel._id}>{hotel.name}</h2>
      ))}
    </>
  );
};
export default Home;
