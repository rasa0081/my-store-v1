'use client';
import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'grey.100',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          Copyright © 2024. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}