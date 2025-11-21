import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';

export const metadata = {
  title: 'Authentication - Digital Store',
  description: 'Login or register for Digital Store',
};

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            component={Link}
            href="/"
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'white'
            }}
          >
            Digital Store
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
}