'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CardActions
} from '@mui/material';
import Link from 'next/link';
import { useCart } from './CartProvider';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || '/placeholder-image.jpg'}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Chip 
            label={product.category} 
            color="primary" 
            size="small" 
            variant="outlined"
          />
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${product.price}
          </Typography>
        </Box>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ 
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.3,
            height: '2.6em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{
            height: '3em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddToCart}
            size="medium"
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href={`/product/${product.id}`}
            fullWidth
            size="medium"
          >
            Details
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}