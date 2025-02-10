import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';
import { jsPDF } from 'jspdf';

interface PassengerDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: dayjs.Dayjs;
  gender: string;
  citizenship: string;
  passportNumber: string;
  passportExpiry: dayjs.Dayjs;
}

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    firstName: '',
    lastName: '',
    dateOfBirth: dayjs(),
    gender: '',
    citizenship: '',
    passportNumber: '',
    passportExpiry: dayjs().add(6, 'month'),
  });

  const flightData = location.state?.flights;

  const handleInputChange = (field: keyof PassengerDetails, value: any) => {
    setPassengerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Flight Booking Confirmation', 20, 20);
    
    // Add flight details
    doc.setFontSize(12);
    doc.text('Flight Details:', 20, 40);
    doc.text(`From: ${flightData.origin}`, 30, 50);
    doc.text(`To: ${flightData.destination}`, 30, 60);
    doc.text(`Date: ${flightData.departDate}`, 30, 70);
    doc.text(`Price: €${flightData.price}`, 30, 80);
    
    // Add passenger details
    doc.text('Passenger Details:', 20, 100);
    doc.text(`Name: ${passengerDetails.firstName} ${passengerDetails.lastName}`, 30, 110);
    doc.text(`Passport: ${passengerDetails.passportNumber}`, 30, 120);
    doc.text(`Citizenship: ${passengerDetails.citizenship}`, 30, 130);
    
    // Save the PDF
    doc.save('booking-confirmation.pdf');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Generate PDF
      generatePDF();
      
      // Navigate back to search page
      navigate('/');
    } catch (error) {
      console.error('Error generating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Passenger Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={passengerDetails.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={passengerDetails.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Date of Birth"
              value={passengerDetails.dateOfBirth}
              onChange={(newValue) => handleInputChange('dateOfBirth', newValue)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={passengerDetails.gender}
                label="Gender"
                onChange={(e: SelectChangeEvent) => handleInputChange('gender', e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Citizenship"
              value={passengerDetails.citizenship}
              onChange={(e) => handleInputChange('citizenship', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Passport Number"
              value={passengerDetails.passportNumber}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Passport Expiry Date"
              value={passengerDetails.passportExpiry}
              onChange={(newValue) => handleInputChange('passportExpiry', newValue)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ minWidth: 200 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Booking'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookingPage; 