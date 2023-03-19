import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Alert,
  Zoom,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import useBooking from '../../hooks/useBooking';
import useBookingPage from './hooks';
import './styles.css';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
const Booking = () => {
  const { id } = useParams();

  const {
    hotelDetails,
    hotelDetailsError,
    hotelDetailsLoading,
    submitBooking,
    isBookingLoading,
    isBookingError,
    bookingError,
  } = useBooking(id);

  const { id: hotelId, image, name, rooms } = hotelDetails;

  const { bookingFormData, setBookingFormData } = useBookingPage(
    hotelId,
    rooms,
  );
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, message: '' });

  useEffect(() => {
    if (!isBookingLoading && isBookingError && bookingError) {
      setShowAlert({
        show: true,
        message: bookingError?.mesage || bookingError.toString(),
      });
    }
  }, [bookingError, isBookingError, isBookingLoading]);

  useEffect(() => {
    if (showAlert?.show) {
      const timeout = setTimeout(
        () => setShowAlert({ show: false, message: '' }),
        3000,
      );
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);
  if (hotelDetailsLoading) return <h2>Loading...</h2>;
  if (hotelDetailsError) return <h2>Error</h2>;

  return (
    <Card className="booking-container">
      <CardMedia className="hotel-image" image={image} title={name} />
      <CardContent className="booking-content">
        <div className="hotel-details">
          <h2>{name}</h2>
          <Box className="form-container">
            <Zoom
              in={!showDetailsForm}
              style={showDetailsForm ? { width: '0', height: '0' } : {}}
            >
              <div style={{ width: 'fit-content' }}>
                <FormControl style={{ marginBottom: '5%' }} l>
                  <FormLabel>Choose A Room:</FormLabel>
                  <RadioGroup
                    defaultValue={'standard'}
                    onChange={(e) =>
                      setBookingFormData((prev) => ({
                        ...prev,
                        room: rooms[e.target.value]?.id || null,
                      }))
                    }
                  >
                    {Object.keys(rooms).map(
                      (roomKey) =>
                        roomKey !== '_id' && (
                          <FormControlLabel
                            key={roomKey}
                            value={rooms[roomKey]?.id.roomType}
                            control={<Radio />}
                            label={`${roomKey}`}
                          ></FormControlLabel>
                        ),
                    )}
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    # of guests
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={1}
                    label="# of guests"
                    onChange={(e) =>
                      setBookingFormData((prev) => ({
                        ...prev,
                        numberOfGuests: e.target.value,
                      }))
                    }
                  >
                    {new Array(bookingFormData.room?.numOfBeds || 0)
                      .fill(1)
                      .map((_, index) => (
                        <MenuItem key={`beds_${index}`} value={index + 1}>
                          {index + 1}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <div style={{ marginTop: '5%' }}>
                  <Typography variant="subtitle2">Arrival Date</Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      required
                      disablePast
                      onChange={(e) =>
                        setBookingFormData((prev) => ({
                          ...prev,
                          checkInDate: e.toISOString(),
                        }))
                      }
                    />
                  </LocalizationProvider>
                </div>
                <div style={{ marginTop: '5%' }}>
                  <Typography variant="subtitle2">Departure Date</Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      required
                      minDate={
                        bookingFormData?.checkInDate &&
                        dayjs(bookingFormData?.checkInDate)
                      }
                      disableHighlightToday
                      onChange={(e) =>
                        setBookingFormData((prev) => ({
                          ...prev,
                          checkOutDate: e.toISOString(),
                        }))
                      }
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </Zoom>
            <Zoom
              in={showDetailsForm}
              style={!showDetailsForm ? { width: '0', height: '0' } : {}}
            >
              <div>
                <TextField
                  required
                  label="First Name"
                  defaultValue=""
                  onChange={(e) =>
                    setBookingFormData((prev) => ({
                      ...prev,
                      guest: { ...prev.guest, firstName: e.target.value },
                    }))
                  }
                  style={{ marginBottom: '5%' }}
                />
                <TextField
                  required
                  label="Last Name"
                  defaultValue=""
                  onChange={(e) =>
                    setBookingFormData((prev) => ({
                      ...prev,
                      guest: { ...prev.guest, lastName: e.target.value },
                    }))
                  }
                  style={{ marginBottom: '5%' }}
                />
                <TextField
                  required
                  label="Email Address"
                  defaultValue=""
                  onChange={(e) =>
                    setBookingFormData((prev) => ({
                      ...prev,
                      guest: { ...prev.guest, email: e.target.value },
                    }))
                  }
                  style={{ marginBottom: '5%' }}
                />
                <div>
                  <Typography variant="h6" style={{ marginLeft: '2%' }}>
                    Address
                  </Typography>
                  <TextField
                    label="City"
                    style={{ marginBottom: '2%' }}
                    defaultValue=""
                    onChange={(e) =>
                      setBookingFormData((prev) => ({
                        ...prev,
                        guest: {
                          ...prev.guest,
                          address: {
                            ...prev.guest.address,
                            city: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                  <TextField
                    label="Country"
                    style={{ marginBottom: '2%' }}
                    defaultValue=""
                    onChange={(e) =>
                      setBookingFormData((prev) => ({
                        ...prev,
                        guest: {
                          ...prev.guest,
                          address: {
                            ...prev.guest.address,
                            country: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                  <TextField
                    label="Street"
                    style={{ marginBottom: '2%' }}
                    defaultValue=""
                    onChange={(e) =>
                      setBookingFormData((prev) => ({
                        ...prev,
                        guest: {
                          ...prev.guest,
                          address: {
                            ...prev.guest.address,
                            street: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </Zoom>
          </Box>
        </div>
        <Zoom in={showAlert.show}>
          <Alert
            severity="error"
            variant="outlined"
            style={{
              maxHeight: '50px',
              marginTop: '3%',
              display: 'flex',
            }}
          >
            {showAlert.message}
          </Alert>
        </Zoom>
        <Button
          style={{ width: 'fit-content' }}
          disabled={isBookingLoading}
          onClick={(e) => {
            if (showDetailsForm) {
              if (
                !bookingFormData?.guest.firstName ||
                !bookingFormData?.guest.lastName ||
                !bookingFormData?.guest.email
              ) {
                setShowAlert({
                  show: true,
                  message: 'Please fill all required fields',
                });
              } else {
                submitBooking(bookingFormData);
              }
              return;
            }

            if (!showDetailsForm) {
              if (
                !(bookingFormData?.checkInDate && bookingFormData?.checkOutDate)
              ) {
                setShowAlert({ show: true, message: 'Please select dates' });
                return;
              }
              setShowDetailsForm((prev) => !prev);
            }
          }}
        >
          {isBookingLoading
            ? 'Loading...'
            : showDetailsForm
            ? 'Submit Booking'
            : 'Go To Details'}
        </Button>
      </CardContent>
    </Card>
  );
};
export default Booking;
