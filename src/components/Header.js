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
  Avatar,
  Divider
} from '@mui/material';
import { 
  ShoppingCart, 
  AccountCircle,
  Person,
  ExitToApp,
  Login,
  PersonAdd 
} from '@mui/icons-material';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { getTotalItems } = useCart();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    } finally {
      setIsLoading(false);
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

  // Don't show anything while loading to avoid layout shift
  if (isLoading) {
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
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

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
            {/* Always visible navigation */}
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

            {/* Cart - Always visible but only functional for logged-in users */}
            <IconButton
              color="inherit"
              component={Link}
              href={user ? "/cart" : "/auth/login"}
              size="large"
            >
              <Badge badgeContent={user ? getTotalItems() : 0} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Conditional rendering based on authentication */}
            {user ? (
              // USER IS LOGGED IN - Show user menu
              <>
                {/* Admin link - only for admin users */}
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
                
                {/* User menu with dropdown */}
                <IconButton
                  color="inherit"
                  onClick={handleMenu}
                  size="large"
                >
                  {user.avatar ? (
                    <Avatar 
                      src={user.avatar} 
                      sx={{ width: 32, height: 32 }}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      minWidth: 180,
                    }
                  }}
                >
                  {/* User info in dropdown */}
                  <MenuItem disabled>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                      <Typography variant="caption" color="primary">
                        {user.role === 'admin' ? 'Administrator' : 'Member'}
                      </Typography>
                    </Box>
                  </MenuItem>
                  
                  <Divider />
                  
                  <MenuItem onClick={handleClose} component={Link} href="/profile">
                    <Person sx={{ mr: 1, fontSize: 20 }} />
                    My Profile
                  </MenuItem>
                  
                  {user.role === 'admin' && (
                    <MenuItem onClick={handleClose} component={Link} href="/admin">
                      <Person sx={{ mr: 1, fontSize: 20 }} />
                      Admin Dashboard
                    </MenuItem>
                  )}
                  
                  <Divider />
                  
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp sx={{ mr: 1, fontSize: 20 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              // USER IS NOT LOGGED IN - Show auth buttons
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  component={Link}
                  href="/auth/login"
                  startIcon={<Login />}
                  sx={{ fontWeight: 600 }}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  href="/auth/register"
                  startIcon={<PersonAdd />}
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