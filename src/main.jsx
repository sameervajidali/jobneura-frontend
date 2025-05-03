
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <App />
</GoogleOAuthProvider>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)

