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
import { useState } from 'react';
import { Box } from '@mui/system';
const Booking = () => {
  const { id } = useParams();

  const {
    hotelDetails,
    hotelDetailsError,
    hotelDetailsLoading,
    submitBooking,
    isBookingLoading,
    showAlert,
    setShowAlert,
  } = useBooking(id);

  const { _id: hotelId, image, name, rooms } = hotelDetails;

  const { bookingFormData, setBookingFormData, maxGuests, mappedRooms } =
    useBookingPage(hotelId, rooms);

  const [showDetailsForm, setShowDetailsForm] = useState(false);

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
                        room: mappedRooms.find(
                          ({ type }) => type === e.target.value,
                        )._id,
                      }))
                    }
                  >
                    {mappedRooms.map((room) => {
                      const {
                        booked,
                        available,
                        _id: roomId,
                        type,
                        cost,
                      } = room;
                      return (
                        <FormControlLabel
                          key={`room_${roomId}`}
                          value={type}
                          control={<Radio disabled={available === 0} />}
                          label={`${type.charAt(0).toUpperCase()}${type.slice(
                            1,
                          )} - $${cost} (${
                            available > 0 ? `${available - booked}` : 'None'
                          } Available)`}
                        ></FormControlLabel>
                      );
                    })}
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
                    disabled={!bookingFormData.room}
                    onChange={(e) =>
                      setBookingFormData((prev) => ({
                        ...prev,
                        numberOfGuests: e.target.value,
                      }))
                    }
                  >
                    {new Array(maxGuests(bookingFormData?.room) || 1)
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
                        dayjs(bookingFormData?.checkInDate).add(1, 'day')
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
