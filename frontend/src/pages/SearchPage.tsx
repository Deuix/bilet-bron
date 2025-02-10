import { useState, useEffect } from 'react';
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
  Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

interface City {
  code: string;
  name: string;
  country_code: string;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [originCities, setOriginCities] = useState<City[]>([]);
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: dayjs(),
    returnDate: dayjs().add(7, 'day'),
  });

  const searchCities = async (term: string, setResults: (cities: City[]) => void) => {
    if (term.length < 2) return;
    
    try {
      const response = await axios.get(`${API_URL}/cities`, {
        params: { term }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/search`, {
        origin: formData.origin,
        destination: formData.destination,
        departDate: formData.departDate.format('YYYY-MM-DD'),
        returnDate: formData.returnDate.format('YYYY-MM-DD'),
        adults: 1,
      });

      navigate('/booking', { state: { flights: response.data } });
    } catch (error) {
      console.error('Error searching flights:', error);
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
            <Autocomplete
              fullWidth
              options={originCities}
              getOptionLabel={(option) => `${option.name} (${option.code})`}
              onInputChange={(_, value) => {
                searchCities(value, setOriginCities);
              }}
              onChange={(_, value) => {
                setFormData({ ...formData, origin: value?.code || '' });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={destinationCities}
              getOptionLabel={(option) => `${option.name} (${option.code})`}
              onInputChange={(_, value) => {
                searchCities(value, setDestinationCities);
              }}
              onChange={(_, value) => {
                setFormData({ ...formData, destination: value?.code || '' });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  fullWidth
                />
              )}
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