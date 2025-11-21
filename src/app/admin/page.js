'use client';
import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Inventory as ProductsIcon,
  ShoppingCart as OrdersIcon,
  AttachMoney as RevenueIcon,
  People as CustomersIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import StatsCard from '../../components/admin/StatsCard';
import { getAllProducts } from '../../lib/products';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });

  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const products = getAllProducts();
    
    setStats({
      totalProducts: products.length,
      totalOrders: 42, // Mock data
      totalRevenue: 2899.50, // Mock data
      totalCustomers: 156, // Mock data
    });

    setRecentProducts(products.slice(0, 5));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<ProductsIcon />}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<OrdersIcon />}
            color="secondary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalRevenue}`}
            icon={<RevenueIcon />}
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<CustomersIcon />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Recent Products Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingIcon />
              Recent Products
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {product.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box 
                          sx={{ 
                            px: 1, 
                            py: 0.5, 
                            backgroundColor: 'primary.light', 
                            color: 'white',
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            display: 'inline-block'
                          }}
                        >
                          {product.category}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold">
                          ${product.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box 
                          sx={{ 
                            px: 1, 
                            py: 0.5, 
                            backgroundColor: 'success.light', 
                            color: 'white',
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            display: 'inline-block'
                          }}
                        >
                          Active
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                • Add new product
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • View all orders
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Manage users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Update site settings
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}