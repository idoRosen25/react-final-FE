import { DeleteForeverOutlined } from '@mui/icons-material';
import {
  Box,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import useDeleteReservation from '../../hooks/useDeleteReservation';

const ReservationItem = ({ reservation, onItemClick }) => {
  const { checkOutDate, checkInDate, hotelId, roomId, numberOfGuests } =
    reservation;

  const { name, image } = hotelId;

  const { deleteReservation, deletedLoading } = useDeleteReservation();
  return (
    <ListItem
      sx={{
        borderRadius: { xs: '7px' },
        background: { xs: 'rgb(211,211,211)' },
        p: { xs: 1, sm: 2 },
        mb: { xs: 1, sm: 2 },
        cursor: 'pointer',
      }}
      onClick={onItemClick}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete'"
          disabled={deletedLoading}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteReservation(reservation._id);
          }}
        >
          <DeleteForeverOutlined
            sx={{
              color: 'red',
              width: { sm: '33px' },
              height: { sm: '33px' },
              mr: { xs: 0, sm: 2, md: 4 },
            }}
          />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar
          src={image}
          sx={{ width: { xs: 80, sm: 200 }, height: { xs: 80, sm: 200 } }}
          variant="rounded"
        />
      </ListItemAvatar>

      <Box
        sx={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'fit-content', sm: '200px' },
          pl: { xs: 2 },
        }}
      >
        <ListItemText
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              mb: { sm: 1 },
              color: 'cornflowerblue',
              width: { xs: '200px', sm: '100%' },
              display: { xs: 'block', sm: 'none' },
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mb: { sm: 1 },
              fontWeight: 'bold',
              color: 'cornflowerblue',
              width: { xs: '200px', sm: '100%' },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ textDecorationLine: { xs: 'none', sm: 'underline' } }}
          >
            {`Check-In: ${format(new Date(checkInDate), 'dd/MM/yyyy')}`}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ textDecorationLine: { xs: 'none', sm: 'underline' } }}
          >
            {`Check-Out: ${format(new Date(checkOutDate), 'dd/MM/yyyy')}`}
          </Typography>
        </ListItemText>
        <ListItemText sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="subtitle2">
            {`Number of Guests: ${numberOfGuests}`}
          </Typography>
          <Typography variant="subtitle2">
            {`Total Beds: ${roomId.numOfBeds}`}
          </Typography>
          <Typography variant="subtitle2">
            {`${roomId.cost} USD per night`}
          </Typography>
        </ListItemText>
      </Box>
    </ListItem>
  );
};
export default ReservationItem;
