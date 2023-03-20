import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useHotelDetails from './hooks/useHotalDetails';
import { Box, Grid, Avatar, Typography, Button } from '@mui/material';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    hotelDetails,
    isHotelDetailsLoading,
    isHotelDetailsError,
    hotelDetailsError,
  } = useHotelDetails(id);

  const { address, image, name, rooms } = hotelDetails;

  const { street, city, country } = address;
  const mappedRooms = useMemo(
    () =>
      rooms?.map((room) => ({
        ...room.room,
        available: room.available,
        booked: room.booked,
      })) || [],
    [rooms],
  );
  if (isHotelDetailsLoading) {
    return <>Loading...</>;
  }
  if (isHotelDetailsError) {
    return <>Error: {hotelDetailsError?.message || 'Unkwown error'}</>;
  }

  return (
    <Box
      sx={{
        mt: { xs: 2 },
        width: { xs: '90%' },
        m: 'auto',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{
              color: 'cornflowerblue',
              fontSize: { xs: '1.75rem' },
              pl: { xs: 3 },
              mb: { xs: 1 },
              fontWeight: { xs: 'bold' },
            }}
          >
            {name}
          </Typography>
          <Avatar
            src={image}
            variant="square"
            sx={{
              width: '100%',
              height: { xs: '250px', sm: '350px' },
              m: 'auto',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', pl: { xs: 0.5 } }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'cornflowerblue',
                textDecorationLine: 'underline',
                mb: { xs: -0.5 },
              }}
            >
              Address:
            </Typography>
            <Typography variant="caption">
              {street}, {city}, {country}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', pl: { xs: 0.5 } }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'cornflowerblue',
                textDecorationLine: 'underline',
              }}
            >
              Rooms:
            </Typography>
            {mappedRooms?.map((room) => {
              const { available, booked, ...rest } = room;

              return (
                <Typography variant="button" sx={{ display: { xs: 'block' } }}>
                  {rest.type}, {rest.cost}$, {available - booked} rooms
                  available
                </Typography>
              );
            })}
            <Button
              variant="contained"
              sx={{ mt: { xs: 1 }, fontSize: { xs: '0.5rem' } }}
              onClick={() => navigate('/home')}
            >
              Book Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default HotelDetails;
