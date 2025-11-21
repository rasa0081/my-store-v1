'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Paper,
  Typography,
  Alert,
} from '@mui/material';

const categories = ['TECH', 'MARKETING', 'SECURITY', 'DESIGN', 'BUSINESS'];

export default function ProductForm({ product, onSubmit, onCancel, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    delivery: 'Eligible For Instant Delivery'
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price?.toString() || '',
        description: product.description || '',
        image: product.image || '',
        delivery: product.delivery || 'Eligible For Instant Delivery'
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      try {
        await onSubmit({
          ...formData,
          price: parseFloat(formData.price)
        });
      } catch (error) {
        setSubmitError('Failed to save product');
      }
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {product ? 'Edit Product' : 'Create New Product'}
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Product Name"
          value={formData.name}
          onChange={handleChange('name')}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal" error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            label="Category"
            onChange={handleChange('category')}
            required
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
        </FormControl>

        <TextField
          fullWidth
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleChange('price')}
          error={!!errors.price}
          helperText={errors.price}
          margin="normal"
          required
          inputProps={{ step: "0.01", min: "0" }}
        />

        <TextField
          fullWidth
          label="Image URL"
          value={formData.image}
          onChange={handleChange('image')}
          error={!!errors.image}
          helperText={errors.image}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange('description')}
          error={!!errors.description}
          helperText={errors.description}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Delivery Info"
          value={formData.delivery}
          onChange={handleChange('delivery')}
          margin="normal"
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}