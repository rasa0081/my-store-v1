'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Grid,
} from '@mui/material';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Digital Store',
    siteDescription: 'Your one-stop shop for digital products',
    currency: 'USD',
    taxRate: 10,
    enableRegistration: true,
    enableReviews: true,
    maintenanceMode: false,
  });
  const [message, setMessage] = useState('');

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      // In a real app, you would save settings to an API
      console.log('Saving settings:', settings);
      setMessage('Settings saved successfully!');
    } catch (error) {
      setMessage('Failed to save settings');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Site Settings
      </Typography>

      {message && (
        <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Name"
                value={settings.siteName}
                onChange={handleChange('siteName')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Currency</InputLabel>
                <Select
                  value={settings.currency}
                  label="Currency"
                  onChange={handleChange('currency')}
                >
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Site Description"
                value={settings.siteDescription}
                onChange={handleChange('siteDescription')}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tax Rate (%)"
                type="number"
                value={settings.taxRate}
                onChange={handleChange('taxRate')}
                margin="normal"
                inputProps={{ min: "0", max: "100", step: "0.1" }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Features
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableRegistration}
                  onChange={handleChange('enableRegistration')}
                />
              }
              label="Enable User Registration"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableReviews}
                  onChange={handleChange('enableReviews')}
                />
              }
              label="Enable Product Reviews"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={handleChange('maintenanceMode')}
                />
              }
              label="Maintenance Mode"
            />
          </Box>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" size="large">
              Save Settings
            </Button>
            <Button variant="outlined" size="large">
              Reset to Defaults
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}