'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  CircularProgress, 
  Box, 
  Typography,
  Button,
  Container 
} from '@mui/material';

export default function AuthGuard({ children, requireAuth = false, requireAdmin = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        
        if (requireAdmin && data.user.role !== 'admin') {
          router.push('/');
          return;
        }
      } else {
        if (requireAuth) {
          router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      if (requireAuth) {
        router.push('/auth/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (requireAuth && !user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Authentication Required
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Please log in to access this page.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => router.push('/auth/login')}
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  if (requireAdmin && user?.role !== 'admin') {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          You don't have permission to access this page.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => router.push('/')}
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Container>
    );
  }

  return children;
}