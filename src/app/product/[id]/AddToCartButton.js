'use client';
import * as React from 'react';
import { Button, Snackbar, Alert, Box } from '@mui/material';
import { useCart } from '../../../components/CartProvider';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [open, setOpen] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleAddToCart}
        sx={{ 
          py: 2, 
          px: 6, 
          fontSize: '1.1rem',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 4
          },
          transition: 'all 0.2s'
        }}
      >
        Add To Cart
      </Button>
      <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
}