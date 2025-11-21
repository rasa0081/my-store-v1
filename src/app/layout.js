import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../../theme';
import { CartProvider } from '../../components/CartProvider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Digital Products Store',
  description: 'Your one-stop shop for digital products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
              <Header />
              <main style={{ flex: 1 }}>
                {children}
              </main>
              <Footer />
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}