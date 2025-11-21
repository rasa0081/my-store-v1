import * as React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from '../../components/ProductCard';
import { getAllProducts } from '../../lib/products';

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, px: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          All Products
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover our collection of digital products
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ px: 2 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}