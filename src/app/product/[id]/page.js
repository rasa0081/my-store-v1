import * as React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Check, Home, Store } from '@mui/icons-material';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import { getProductById, getSimilarProducts } from '../../../lib/products';
import AddToCartButton from './AddToCartButton';

export default function ProductPage({ params }) {
  const product = getProductById(params.id);
  const similarProducts = getSimilarProducts(params.id);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <MuiLink
          component={Link}
          href="/"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="small" />
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          href="/shop"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Store sx={{ mr: 0.5 }} fontSize="small" />
          Shop
        </MuiLink>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={6}>
        {/* Product Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {product.name}
          </Typography>
          <Chip 
            label={product.category} 
            color="primary" 
            sx={{ mb: 3 }} 
            size="medium"
          />
          <Typography variant="body1" paragraph sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
            {product.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Check color="success" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary" fontSize="1rem">
              {product.delivery}
            </Typography>
          </Box>
          
          <Typography variant="h3" color="primary" sx={{ mb: 4 }} fontWeight="bold">
            ${product.price}
          </Typography>
          
          <AddToCartButton product={product} />
        </Grid>
        
        {/* Product Image */}
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={product.image || '/placeholder-image.jpg'}
            alt={product.name}
            sx={{
              width: '100%',
              height: '400px',
              borderRadius: 3,
              boxShadow: 3,
              objectFit: 'cover'
            }}
          />
        </Grid>
      </Grid>

      {/* Similar Products */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }} fontWeight="bold">
          Similar Products
        </Typography>
        <Grid container spacing={3}>
          {similarProducts.map((similarProduct) => (
            <Grid item xs={12} sm={6} md={3} key={similarProduct.id}>
              <ProductCard product={similarProduct} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export async function generateStaticParams() {
  const { getAllProducts } = await import('../../../lib/products');
  const products = getAllProducts();
  
  return products.map((product) => ({
    id: product.id,
  }));
}