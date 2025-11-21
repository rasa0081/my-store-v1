import AdminLayout from '../../../components/admin/AdminLayout';
import AuthGuard from '../../../components/auth/AuthGuard';

export const metadata = {
  title: 'Admin Dashboard - Digital Store',
  description: 'Admin panel for Digital Store',
};

export default function RootLayout({ children }) {
  return (
    <AuthGuard requireAdmin>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  );
}