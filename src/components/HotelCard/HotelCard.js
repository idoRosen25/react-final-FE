import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import './styles.css';

const HotelCard = ({ hotel }) => {
  return (
    <Card key={`hotel_${hotel.id}`} className="hotel-card">
      <CardMedia
        className="card-image"
        image={hotel.image}
        title={hotel.name}
      />
      <div className="card-content">
        <CardContent style={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {hotel.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hotel.description}
          </Typography>
        </CardContent>
        <CardActions className="card-actions">
          <Button size="small">Book</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default HotelCard;
