import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
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
          <Button
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/hotel/${hotel.id}/booking`, {
                replace: true,
              });
            }}
          >
            Book
          </Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default HotelCard;
