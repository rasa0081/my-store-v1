import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Authentication - Digital Store',
  description: 'Admin login and signup for Digital Store',
};

export default function AdminAuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          <Typography variant="h6" color="white" sx={{ mt: 1 }}>
            Admin Portal
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
}