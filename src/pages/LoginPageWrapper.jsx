// src/pages/LoginPageWrapper.jsx
import { useAuth } from '../contexts/AuthContext';
import LoginPage from './LoginPage';

export default function LoginPageWrapper() {
  const { user, loading } = useAuth();

  if (loading) return <div>Checking session…</div>;
  if (user) return null; // let AppInitializer handle redirects

  return <LoginPage />;
}
