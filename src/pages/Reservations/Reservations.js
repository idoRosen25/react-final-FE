import { Button, List, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ReservationItem from '../../components/ReservationItem/ReservationItem';
import useReservations from '../../hooks/useReservations';

const Reservations = () => {
  const navigate = useNavigate();
  const {
    reservationData,
    isReservationDataLoading,
    isReservationDataError,
    reservationDataError,
  } = useReservations();

  if (isReservationDataLoading) {
    <h2>Loading...</h2>;
  }

  if (isReservationDataError) {
    <h2>error :{reservationDataError?.message || 'error unknown'}</h2>;
  }
  return (
    <Box
      sx={{
        pt: { xs: 2, sm: 3 },
        px: { xs: 1, md: 10, lg: 25 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">My Reservations</Typography>
      {reservationData?.length ? (
        <List sx={{ width: '100%' }}>
          {reservationData.map((reservation) => (
            <ReservationItem
              key={reservation._id}
              reservation={reservation}
              onItemClick={() =>
                navigate(`/reservations/${reservation._id}`, { replace: true })
              }
            />
          ))}
        </List>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            border: '1px solid red',
          }}
        >
          <Typography variant="h6">
            We Couldn't find any reservations.
          </Typography>
          <Typography variant="h6">Book one NOW!</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate('/home')}
          >
            Book Now
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Reservations;
