import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Aviasales API endpoints
const AVIASALES_API_URL = 'https://api.travelpayouts.com/v2';

// Search flights
app.post('/api/search', async (req, res) => {
  try {
    const { origin, destination, departDate, returnDate, adults } = req.body;
    
    const response = await axios.get(`${AVIASALES_API_URL}/prices/latest`, {
      params: {
        origin,
        destination,
        beginning_of_period: departDate,
        period_type: 'year',
        token: process.env.AVIASALES_API_TOKEN,
        trip_class: 'Y',
        currency: 'USD'
      },
      headers: {
        'Accept-Encoding': 'gzip,deflate,compress'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ error: 'Failed to search flights' });
  }
});

// Generate booking PDF
app.post('/api/generate-booking', async (req, res) => {
  try {
    const { flightDetails, passengerDetails } = req.body;
    // PDF generation logic will be implemented here
    res.json({ message: 'Booking document generated successfully' });
  } catch (error) {
    console.error('Error generating booking:', error);
    res.status(500).json({ error: 'Failed to generate booking document' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 