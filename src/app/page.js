import * as React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
} from '@mui/material';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../lib/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
          background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
          borderRadius: 4,
          color: 'white',
          mb: 8,
          px: 2
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          All Your Digital Products
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
          Is One Click Away.
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
          Start Exploring State of the Art Assets Now!
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main', 
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { 
                bgcolor: 'grey.100',
                transform: 'translateY(-2px)'
              },
              transition: 'transform 0.2s'
            }}
            component={Link}
            href="/shop"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { 
                bgcolor: 'rgba(255,255,255,0.1)',
                transform: 'translateY(-2px)'
              },
              transition: 'transform 0.2s'
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      {/* Brand New Section */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          px: 2
        }}>
          <Typography variant="h3" component="h2" fontWeight="bold">
            Brand New
          </Typography>
          <Button
            variant="text"
            component={Link}
            href="/shop"
            endIcon={<span>→</span>}
            sx={{ fontSize: '1.1rem', fontWeight: 600 }}
          >
            View All Collection
          </Button>
        </Box>
        
        <Grid container spacing={3} sx={{ px: 2 }}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}