import useHotels from '../../hooks/useHotels';
import HotelCard from '../../components/HotelCard/HotelCard';
import './styles.css';
const Home = () => {
  const { isError, error, isLoading, hotels } = useHotels();

  if (isError) {
    console.log('error');
    return <h1>Something went wrong {error?.message || error}</h1>;
  }

  if (isLoading) {
    console.log('loading');
    return <h1>Loading...</h1>;
  }

  return (
    <section className="hotel-card-container">
      {hotels?.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </section>
  );
};
export default Home;
