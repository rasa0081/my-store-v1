'use client';
import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Container,
  Box,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  ShoppingCart, 
  AccountCircle,
  Person,
  ExitToApp 
} from '@mui/icons-material';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { getTotalItems } = useCart();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

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
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      handleClose();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Digital Store
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              color="inherit"
              component={Link}
              href="/"
              sx={{ fontWeight: 600 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/shop"
              sx={{ fontWeight: 600 }}
            >
              Shop
            </Button>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Button
                    color="inherit"
                    component={Link}
                    href="/admin"
                    sx={{ fontWeight: 600 }}
                  >
                    Admin
                  </Button>
                )}
                
                <IconButton
                  color="inherit"
                  component={Link}
                  href="/cart"
                  size="large"
                >
                  <Badge badgeContent={getTotalItems()} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>

                <IconButton
                  color="inherit"
                  onClick={handleMenu}
                  size="large"
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} href="/profile">
                    <Person sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  component={Link}
                  href="/auth/login"
                  sx={{ fontWeight: 600 }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  href="/auth/register"
                  sx={{ fontWeight: 600 }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}