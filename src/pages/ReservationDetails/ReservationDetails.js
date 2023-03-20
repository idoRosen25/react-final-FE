import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useReservationDetails from './hooks/useReservationDetails';

const ReservationDetails = () => {
  const { id } = useParams();
  const {
    // reservationDetails,
    reservationDetailsError,
    reservationDetailsLoading,
    reservationDetailsIsError,
  } = useReservationDetails(id);

  if (reservationDetailsLoading) {
    return <h2>Loading...</h2>;
  }

  if (reservationDetailsIsError) {
    return (
      <h2>error :{reservationDetailsError?.message || 'error unknown'}</h2>
    );
  }

  //   const {
  //     hotelId: { name, image },
  //     roomId: { numOfBeds, roomCost, RoomType },
  //     guest: {
  //       firstName,
  //       lastName,
  //       email,
  //       address: { city, country, street },
  //     },
  //     numberOfGuests,
  //     checkInDate,
  //     checkOutDate,
  //     updatedAt,
  //   } = reservationDetails;
  return (
    <Grid
      container
      spacing={2}
      sx={{ border: '1px solid red', px: { xs: 1 }, alignItems: 'center' }}
    >
      <Grid item xs={12} sx={{ alignItems: 'center' }}>
        <Typography
          variant="h4"
          sx={{ width: 'fit-content', m: 'auto', mt: { xs: 1 } }}
        >
          Reservation Details
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ alignItems: 'center' }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ alignItems: 'center', border: '1px solid green' }}
        >
          IMAGE
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            item
            xs={5}
            sm={3}
            sx={{ alignItems: 'center', border: '1px solid green' }}
          >
            HOTEL DATA
          </Grid>
          <Grid
            item
            xs={5}
            sm={3}
            sx={{ alignItems: 'center', border: '1px solid green' }}
          ></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ReservationDetails;
