'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Home, Inventory, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '../../../../../lib/products';
import ProductForm from '../../../../../components/admin/ProductForm';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = () => {
    setLoading(true);
    const productData = getProductById(params.id);
    if (productData) {
      setProduct(productData);
    } else {
      setMessage('Product not found');
    }
    setLoading(false);
  };

  const handleSubmit = async (productData) => {
    setSaving(true);
    setMessage('');
    
    try {
      // In a real app, you would call an API to update the product
      console.log('Updating product:', productData);
      setMessage('Product updated successfully!');
      
      // Redirect back to products list after a delay
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    } catch (error) {
      setMessage('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/products');
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Product not found</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink
          component={Link}
          href="/admin"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="small" />
          Dashboard
        </MuiLink>
        <MuiLink
          component={Link}
          href="/admin/products"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Inventory sx={{ mr: 0.5 }} fontSize="small" />
          Products
        </MuiLink>
        <Typography color="text.primary">Edit Product</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          component={Link}
          href="/admin/products"
          startIcon={<ArrowBack />}
        >
          Back to Products
        </Button>
        <Typography variant="h4" fontWeight="bold">
          Edit Product
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={saving}
      />
    </Box>
  );
}