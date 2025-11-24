'use client';
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  Paper,
  Grid
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AdminSignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    adminKey: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.adminKey !== 'ADMIN2024') {
      setError('Invalid admin registration key');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Admin Sign Up
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              autoComplete="family-name"
            />
          </Grid>
        </Grid>
        
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          autoComplete="email"
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          label="Admin Username"
          value={formData.username}
          onChange={handleChange('username')}
          autoComplete="username"
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          autoComplete="new-password"
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          autoComplete="new-password"
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          label="Admin Registration Key"
          type="password"
          value={formData.adminKey}
          onChange={handleChange('adminKey')}
          helperText="Enter the admin registration key to create an admin account"
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
        </Button>
        
        <Box textAlign="center">
          <Link href="/admin/auth/login" variant="body2">
            Already have an admin account? Sign In
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}