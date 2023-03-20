import {
  Avatar,
  Grid,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useReservationDetails from './hooks/useReservationDetails';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMemo, useState } from 'react';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import { rooms } from '../../consts/roomType';

const BrowserInput = function BrowserInput(props) {
  const { inputProps, InputProps, ownerState, inputRef, error, ...other } =
    props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      ref={InputProps?.ref}
    >
      <input
        ref={inputRef}
        {...inputProps}
        {...other}
        style={{ width: '100px' }}
      />
      {InputProps?.endAdornment}
    </Box>
  );
};

const ReservationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    reservationDetails,
    reservationDetailsError,
    reservationDetailsLoading,
    reservationDetailsIsError,
    updateReservation,
    isUpdateLoading,
    showAlert,
    setShowAlert,
  } = useReservationDetails(id);

  const [updateDates, setUpdateDates] = useState({
    checkIn: null,
    checkOut: null,
    type: null,
    numberOfGuests: 1,
  });

  const {
    hotelId,
    roomId,
    guest,
    numberOfGuests,
    checkInDate,
    checkOutDate,
    updatedAt,
  } = reservationDetails || {};

  const { name, image } = hotelId || {};
  const { numOfBeds, cost: roomCost, type: roomType } = roomId || {};
  const { firstName, lastName } = guest || {};

  const showUpdateButton = useMemo(() => {
    return (
      (!!updateDates.checkIn &&
        updateDates.checkIn !== dayjs(checkInDate).toISOString()) ||
      (!!updateDates.checkOut &&
        updateDates.checkOut !== dayjs(checkOutDate).toISOString()) ||
      (!!updateDates.type && updateDates.type !== roomType) ||
      (!!updateDates.numberOfGuests &&
        updateDates.numberOfGuests !== numberOfGuests)
    );
  }, [
    checkInDate,
    checkOutDate,
    numberOfGuests,
    roomType,
    updateDates.checkIn,
    updateDates.checkOut,
    updateDates.numberOfGuests,
    updateDates.type,
  ]);

  if (reservationDetailsLoading) {
    return <h2>Loading...</h2>;
  }

  if (reservationDetailsIsError) {
    return (
      <h2>error :{reservationDetailsError?.message || 'error unknown'}</h2>
    );
  }

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '60%' },
        m: { md: 'auto' },
      }}
    >
      <Grid container spacing={2} sx={{ mt: { xs: 1, sm: -2, md: 2 }, mb: 5 }}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              width: 'fit-content',
              m: 'auto',
              pb: 1,
              fontSize: { sm: '3rem' },
            }}
          >
            Reservation Details
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: 'center',
            m: 'auto',
            display: { xs: 'grid', sm: 'flex' },
            flexDirection: 'column',
            alignContent: 'center',
          }}
        >
          <Grid item xs={11} sm={8} sx={{ m: 'auto' }}>
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
          <Grid item xs={11} sm={5} sx={{ m: 'auto' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'cornflowerblue',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/hotel/${hotelId?._id}`)}
            >
              {name}
            </Typography>
          </Grid>
          <Typography
            variant="caption"
            sx={{ color: 'cornflowerblue', m: 'auto', fontWeight: 'bold' }}
          >
            {`Last Update: ${dayjs(updatedAt).format('DD/MM/YYYY')}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ m: 'auto' }}>
          <Grid
            container
            spacing={0}
            sx={{
              color: 'cornflowerblue',
              pl: { xs: 7, sm: 18, md: 12, lg: 35 },
              mt: { xs: -1 },
              mb: { xs: 2 },
            }}
          >
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Typography variant="subtitle2" noWrap>
                {`Cost Per Night: `}
                <span style={{ color: 'black' }}>{roomCost}$</span>
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {`# of guests: `}
                <span style={{ color: 'black' }}>{numberOfGuests}</span>
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {`Reservation Booked By: `}
              </Typography>
              <Typography variant="subtitle2" noWrap sx={{ color: 'black' }}>
                {firstName} {lastName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: { sm: -2 } }}>
          <Grid
            container
            spacing={0}
            sx={{
              width: { xs: '70%', sm: '40%', md: '50%', lg: '30%' },
              m: 'auto',
            }}
          >
            <Grid item xs={3} sx={{ m: 'auto' }}>
              <Typography variant="subtitle2">{`Check-In: `}</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  disablePast
                  disableOpenPicker
                  value={dayjs(updateDates?.checkIn || checkInDate)}
                  slots={{ textField: BrowserInput }}
                  onChange={(e) =>
                    setUpdateDates({ checkIn: e.toISOString(), checkOut: null })
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Typography
              variant="subtitle2"
              sx={{ mt: { xs: 3 }, pl: { xs: 2 } }}
            >
              -
            </Typography>
            <Grid item xs={3} sx={{ m: 'auto' }}>
              <Typography variant="subtitle2">{`Check-Out: `}</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  disablePast
                  disableOpenPicker
                  value={dayjs(updateDates?.checkOut || checkOutDate)}
                  minDate={dayjs(checkInDate).add(1, 'day')}
                  slots={{ textField: BrowserInput }}
                  onChange={(e) =>
                    setUpdateDates((prev) => ({
                      ...prev,
                      checkOut: e.toISOString(),
                    }))
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{ ml: { xs: 2 } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: { xs: 2 },
                }}
              >
                <FormControl sx={{ mb: { xs: 2 } }}>
                  <InputLabel id="room-type-select">Room Type</InputLabel>
                  <Select
                    sx={{ width: { xs: '130px' } }}
                    labelId="room-type-select"
                    label="Room Type"
                    defaultValue={roomType}
                    onChange={(e) =>
                      setUpdateDates((prev) => ({
                        ...prev,
                        type: e.target.value.toLowerCase(),
                      }))
                    }
                  >
                    {rooms.map((room) => (
                      <MenuItem value={room.id}>{room.value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    # of guests
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={numberOfGuests || 1}
                    label="# of guests"
                    sx={{ width: { xs: '130px' } }}
                    onChange={(e) =>
                      setUpdateDates((prev) => ({
                        ...prev,
                        numberOfGuests: e.target.value,
                      }))
                    }
                  >
                    {new Array(numOfBeds || 1).fill(1).map((_, index) => (
                      <MenuItem key={`beds_${index}`} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {showUpdateButton && (
                <Button
                  variant="contained"
                  sx={{
                    width: 'fit-content',
                    fontSize: '0.5rem',
                    ml: { xs: 15, sm: 14, md: 13, lg: 15 },
                  }}
                  onClick={(e) => updateReservation(updateDates)}
                >
                  Update Reservation
                </Button>
              )}
            </Grid>
            <Grid
              item
              sx={{
                m: 'auto',
                position: 'absolute',
                left: '10%',
                bottom: 0,
                borderRadius: '5px',
              }}
            >
              <CustomAlert
                open={!isUpdateLoading && showAlert.open}
                title={showAlert.title}
                message={showAlert.message}
                severity={showAlert.severity}
                onClose={() => setShowAlert({ open: false })}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ReservationDetails;
