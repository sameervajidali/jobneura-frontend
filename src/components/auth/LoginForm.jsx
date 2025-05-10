
// // src/components/LoginForm.jsx
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { ADMIN_ROLES } from '../../constants/roles';
// import API from '../../services/axios';

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPwd, setShowPwd] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || '/';

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.onload = initializeGoogle;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//       if (window.google?.accounts?.id) {
//         window.google.accounts.id.cancel();
//       }
//     };
//   }, []);

//   const initializeGoogle = () => {
//     if (!window.google?.accounts) return;
//     window.google.accounts.id.initialize({
//       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//       callback: handleGoogleCallback,
//     });
//     window.google.accounts.id.renderButton(
//       document.getElementById('google-login-btn'),
//       { theme: 'outline', size: 'large', width: '100%' }
//     );
//   };

//   const handleGoogleCallback = async (response) => {
//     setLoading(true);
//     try {
//       const { data } = await API.post('/auth/google', { idToken: response.credential });
//       login(data.user);
//       redirectUser(data.user);
//     } catch (err) {
//       console.error('Google login failed:', err);
//       alert('Google login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGitHubLogin = () => {
//     const API_BASE = import.meta.env.VITE_API_BASE_URL || window.location.origin;
//     const authWindow = window.open(`${API_BASE}/auth/github`, '_blank', 'width=600,height=700');
//     if (!authWindow) return alert('Enable pop-ups to login via GitHub');

//     const handleMessage = async (event) => {
//       if (event.origin !== new URL(API_BASE).origin) return;
//       const { success, error } = event.data;
//       if (success) {
//         try {
//           const { data } = await API.get('/auth/me');
//           const authedUser = data.user || data;
//           login(authedUser);
//           redirectUser(authedUser);
//         } catch (err) {
//           alert('GitHub login failed');
//         }
//       } else if (error) {
//         alert('GitHub login failed: ' + error);
//       }
//       window.removeEventListener('message', handleMessage);
//     };

//     window.addEventListener('message', handleMessage);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await API.post('/auth/login', { email, password });
//       const user = res.data.user;
//       login(user);
//       redirectUser(user);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//       setEmail('');
//       setPassword('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const redirectUser = (user) => {
//     const role = user?.role?.toUpperCase();
//     const isAdmin = ADMIN_ROLES.includes(role);
//     const dest = isAdmin ? '/admin' : from;
//     navigate(dest, { replace: true });
//   };

//   return (
//     <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
//       <h2 className="text-4xl font-extrabold text-center mb-6">Welcome Back</h2>
//       <div className="flex flex-col gap-4 mb-6">
//         <div id="google-login-btn"></div>
//         <button
//           onClick={handleGitHubLogin}
//           className="relative w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition disabled:opacity-60"
//           disabled={loading}
//         >
//           <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5 absolute left-4" />
//           <span className="text-sm font-medium text-gray-700">Sign in with GitHub</span>
//         </button>
//       </div>

//       <div className="flex items-center my-4">
//         <hr className="flex-grow border-gray-300" />
//         <span className="px-4 text-gray-400">OR</span>
//         <hr className="flex-grow border-gray-300" />
//       </div>

//       <form className="space-y-5" onSubmit={handleLogin}>
//         <div>
//           <label className="block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none"
//             required
//           />
//         </div>

//         <div className="relative">
//           <label className="block text-sm font-medium">Password</label>
//           <input
//             type={showPwd ? 'text' : 'password'}
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none pr-12"
//             required
//           />
//           <span
//             onClick={() => setShowPwd(!showPwd)}
//             className="absolute right-3 top-[38px] text-sm text-indigo-600 cursor-pointer"
//           >
//             {showPwd ? 'Hide' : 'Show'}
//           </span>
//         </div>

//         <div className="flex justify-between text-sm">
//           <label className="flex items-center gap-2">
//             <input type="checkbox" className="accent-indigo-600" />
//             Remember me
//           </label>
//           <Link to="/forgot-password" className="text-indigo-600">Forgot password?</Link>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition disabled:opacity-60"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>

//         <p className="text-center text-sm">
//           New here? <Link to="/register" className="text-indigo-600 font-semibold">Create account</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ADMIN_ROLES } from '../../constants/roles';
import API from '../../services/axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Grab redirect target from localStorage or default
  //const from = localStorage.getItem("loginRedirectFrom") || '/dashboard';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = initializeGoogle;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const initializeGoogle = () => {
    if (!window.google?.accounts) return;
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('google-login-btn'),
      { theme: 'outline', size: 'large', width: '100%' }
    );
  };

const redirectUser = (user) => {
  const role = user.role?.toUpperCase();
  const stored = localStorage.getItem('loginRedirectFrom');

  if (ADMIN_ROLES.includes(role)) {
    navigate('/admin', { replace: true });
  } else if (stored && stored !== '/login') {
    navigate(stored, { replace: true });
    localStorage.removeItem('loginRedirectFrom');
  } else {
    navigate('/', { replace: true });
  }
};


  const handleGoogleCallback = async (response) => {
    setLoading(true);
    try {
      const { data } = await API.post('/auth/google', {
        idToken: response.credential,
      });
      login(data.user);
      redirectUser(data.user);
    } catch (err) {
      console.error('❌ Google login error:', err);
      alert('Google login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || window.location.origin;
    const authWindow = window.open(`${API_BASE}/auth/github`, '_blank', 'width=600,height=700');

    if (!authWindow) return alert('Please enable pop-ups for GitHub login.');

    const handleMessage = async (event) => {
      if (new URL(API_BASE).origin !== event.origin) return;

      const { success, error } = event.data;
      if (success) {
        try {
          const { data } = await API.get('/auth/me');
          login(data.user);
          redirectUser(data.user);
        } catch (err) {
          console.error('GitHub post-login fetch failed:', err);
          alert('GitHub login error.');
        }
      } else if (error) {
        alert('GitHub login failed: ' + error);
      }

      window.removeEventListener('message', handleMessage);
    };

    window.addEventListener('message', handleMessage);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data.user);
      redirectUser(data.user);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
      console.error(err);
      setEmail('');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 className="text-4xl font-extrabold text-center mb-6">Welcome Back</h2>

      <div className="flex flex-col gap-4 mb-6">
        <div id="google-login-btn"></div>
        <button
          onClick={handleGitHubLogin}
          className="relative w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition disabled:opacity-60"
          disabled={loading}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className="w-5 h-5 absolute left-4"
          />
          <span className="text-sm font-medium text-gray-700">
            Sign in with GitHub
          </span>
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none pr-12"
            required
          />
          <span
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-[38px] text-sm text-indigo-600 cursor-pointer"
          >
            {showPwd ? 'Hide' : 'Show'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-indigo-600" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-indigo-600">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-sm">
          New here?{' '}
          <Link to="/register" className="text-indigo-600 font-semibold">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
