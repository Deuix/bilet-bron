import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.SITE_URL || '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Aviasales API endpoints
const AVIASALES_API_URL = 'https://api.travelpayouts.com';

// City suggestions endpoint
app.get('/api/cities', async (req, res) => {
  try {
    const { term } = req.query;
    const response = await axios.get(`${AVIASALES_API_URL}/data/en/cities.json`);
    
    const cities = response.data.filter((city: any) => 
      city.name.toLowerCase().includes(String(term).toLowerCase()) ||
      city.code.toLowerCase().includes(String(term).toLowerCase())
    ).slice(0, 5);
    
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

// Search flights
app.post('/api/search', async (req, res) => {
  try {
    const { origin, destination, departDate, returnDate, adults } = req.body;
    
    const response = await axios.get(`${AVIASALES_API_URL}/v1/prices/cheap`, {
      params: {
        origin,
        destination,
        depart_date: departDate,
        return_date: returnDate,
        token: process.env.AVIASALES_API_TOKEN,
        marker: process.env.PARTNER_ID,
        trip_class: 'Y',
        currency: 'USD',
        page: 1,
        limit: 30,
        show_to_affiliates: true,
        sorting: 'price',
        host: process.env.SITE_URL
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

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// For Vercel
export default app; 