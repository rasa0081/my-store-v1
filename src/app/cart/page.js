'use client';
import * as React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Divider,
  Alert
} from '@mui/material';
import { Delete, Add, Remove, ShoppingCart, Login } from '@mui/icons-material';
import Link from 'next/link';
import { useCart } from '../../components/CartProvider';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (!user) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    if (!user) return;
    removeFromCart(productId);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4">Loading...</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Authentication Required
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Please log in to view your cart and make purchases
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            component={Link}
            href="/auth/login"
            size="large"
            startIcon={<Login />}
            sx={{ px: 4, py: 1.5 }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            component={Link}
            href="/auth/register"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Create Account
          </Button>
        </Box>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Your Cart is Empty
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Start shopping to add items to your cart
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/shop"
          size="large"
          sx={{ px: 4, py: 1.5 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Your Cart
      </Typography>
      
      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="img"
                      src={item.image || '/placeholder-image.jpg'}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 2
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom fontWeight="600">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.category}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
                      ${item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          color="primary"
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.quantity}
                          inputProps={{ 
                            style: { 
                              textAlign: 'center', 
                              width: 50,
                              fontWeight: 'bold'
                            },
                            readOnly: true
                          }}
                          variant="outlined"
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          color="primary"
                        >
                          <Add />
                        </IconButton>
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" sx={{ mt: 1, textAlign: 'center' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 100 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Order Summary
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</Typography>
                <Typography>${getTotalPrice().toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Shipping</Typography>
                <Typography color="success.main">FREE</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tax</Typography>
                <Typography>${(getTotalPrice() * 0.1).toFixed(2)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  ${(getTotalPrice() * 1.1).toFixed(2)}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mb: 2, py: 1.5 }}
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={clearCart}
                sx={{ py: 1.5 }}
              >
                Clear Cart
              </Button>
              
              <Button
                variant="text"
                component={Link}
                href="/shop"
                fullWidth
                sx={{ mt: 1 }}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}