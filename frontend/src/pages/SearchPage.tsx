import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';

const SearchPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: dayjs(),
    returnDate: dayjs().add(7, 'day'),
  });

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/search', {
        origin: formData.origin,
        destination: formData.destination,
        departDate: formData.departDate.format('YYYY-MM-DD'),
        returnDate: formData.returnDate.format('YYYY-MM-DD'),
        adults: 1,
      });

      // Navigate to booking page with flight data
      navigate('/booking', { state: { flights: response.data } });
    } catch (error) {
      console.error('Error searching flights:', error);
      // Add error handling here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Flight Search
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="From"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="To"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Departure Date"
              value={formData.departDate}
              onChange={(newValue) => setFormData({ ...formData, departDate: newValue || dayjs() })}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Return Date"
              value={formData.returnDate}
              onChange={(newValue) => setFormData({ ...formData, returnDate: newValue || dayjs() })}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSearch}
                disabled={loading}
                sx={{ minWidth: 200 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Search Flights'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SearchPage; 