// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import { ADMIN_ROLES } from "../../constants/roles";
// import API from "../../services/axios";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPwd, setShowPwd] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Load Google SDK dynamically
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.onload = initializeGoogle;
//     document.body.appendChild(script);
//   }, []);

//   const initializeGoogle = () => {
//     window.google.accounts.id.initialize({
//       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//       callback: handleGoogleCallback,
//     });

//     window.google.accounts.id.renderButton(
//       document.getElementById("google-login-btn"),
//       { theme: "outline", size: "large", width: "100%" }
//     );
//   };

//   const handleGoogleCallback = async (response) => {
//     try {
//       const { data } = await API.post("/auth/google", {
//         idToken: response.credential,
//       });
//       login(data.user);
//       navigate(ADMIN_ROLES.includes(data.user.role) ? "/admin" : "/dashboard", {
//         replace: true,
//       });
//     } catch (err) {
//       console.error("Google login failed", err);
//       alert("Google login failed. Please try again.");
//     }
//   };

//   const handleGitHubLogin = () => {
//     const API_BASE =
//       import.meta.env.VITE_API_BASE_URL || window.location.origin;

//     const authWindow = window.open(
//       `${API_BASE}/auth/github`,
//       "_blank",
//       "width=600,height=700"
//     );

//     if (!authWindow) {
//       alert("Please allow pop-ups for this site to enable GitHub sign-in.");
//       return;
//     }

//     // Securely listen for postMessage from popup
//     const handleMessage = async (event) => {
//       try {
//         const expectedOrigin = new URL(API_BASE).origin;
//         if (event.origin !== expectedOrigin) return;

//         const { success, error } = event.data;

//         if (success) {
//           const { data } = await API.get("/auth/me");
//           const authedUser = data?.user || data;

//           if (authedUser && authedUser.role) {
//             login(authedUser);

//             const dest = ADMIN_ROLES.includes(authedUser.role)
//               ? "/admin"
//               : "/dashboard";

//             navigate(dest, { replace: true });
//           }
//         } else if (error) {
//           alert("GitHub login failed: " + error);
//         }
//       } catch (err) {
//         console.error("Error in postMessage handler:", err);
//         alert("Failed to fetch authenticated user");
//       } finally {
//         window.removeEventListener("message", handleMessage);
//       }
//     };

//     window.addEventListener("message", handleMessage);
//   };

 
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Show loading indicator
  
//     try {
//       const res = await API.post("/auth/login", { email, password });
  
//       // Successful login
//       login(res.data.user);
//       navigate(ADMIN_ROLES.includes(res.data.user.role) ? "/admin" : "/dashboard", { replace: true });
//     } catch (err) {
//       setLoading(false); // Stop loading
//       console.error("Login failed:", err);
  
//       if (err.response) {
//         const errorMessage = err.response.data.message || "Login failed";
//         alert(errorMessage); // Show the specific backend error message
//       } else {
//         alert("An error occurred. Please try again.");
//       }
  
//       // Optional: Reset form fields or take other actions
//       setEmail("");
//       setPassword("");
//     }
//   };
  
  
  


//   return (
//     <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
//       <h2 className="text-4xl font-extrabold text-center mb-6">Welcome Back</h2>

//       <div className="flex flex-col gap-4 mb-6">
//         <div id="google-login-btn"></div>

//         <button
//           onClick={handleGitHubLogin}
//           className="relative w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition"
//         >
//           <img
//             src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
//             alt="GitHub"
//             className="w-5 h-5 absolute left-4"
//           />
//           <span className="text-sm font-medium text-gray-700">
//             Sign in with GitHub
//           </span>
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
//             type={showPwd ? "text" : "password"}
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
//             {showPwd ? "Hide" : "Show"}
//           </span>
//         </div>

//         <div className="flex justify-between text-sm">
//           <label className="flex items-center gap-2">
//             <input type="checkbox" className="accent-indigo-600" />
//             Remember me
//           </label>
//           <Link to="/forgot-password" className="text-indigo-600">
//             Forgot password?
//           </Link>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition disabled:opacity-60"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center text-sm">
//           New here?{" "}
//           <Link to="/register" className="text-indigo-600 font-semibold">
//             Create account
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }



// src/components/auth/LoginForm.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ADMIN_ROLES } from "../../constants/roles";
import API from "../../services/axios";
import { useToast } from "../../contexts/ToastContext";

export default function LoginForm() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const { login } = useAuth();
  const toast     = useToast();
  const navigate  = useNavigate();
  const location  = useLocation();

  // where to go after login (default to dashboard)
  const from = location.state?.from?.pathname || "/dashboard";

  // on mount, load Google SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src   = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: onGoogleSuccess,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large", width: "100%" }
      );
    };
    document.body.appendChild(script);
  }, []);

  // local email/password submit
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data.user);
      toast.success("Logged in successfully");
      const redirectTo = ADMIN_ROLES.includes(data.user.role) ? "/admin" : from;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  // Google callback
  const onGoogleSuccess = async credentialResponse => {
    try {
      const { data } = await API.post("/auth/google", {
        idToken: credentialResponse.credential,
      });
      login(data.user);
      toast.success("Signed in with Google");
      const redirectTo = ADMIN_ROLES.includes(data.user.role) ? "/admin" : from;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  // GitHub popup flow
  const handleGitHubLogin = () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || window.location.origin;
    const popup = window.open(
      `${API_BASE}/auth/github`,
      "_blank",
      "width=600,height=700"
    );
    if (!popup) {
      toast.error("Please enable pop-ups");
      return;
    }

    const onMessage = async event => {
      if (event.origin !== new URL(API_BASE).origin) return;
      const { success, error } = event.data;
      if (success) {
        // fetch current user
        const { data } = await API.get("/auth/me");
        login(data.user || data);
        toast.success("Signed in with GitHub");
        const redirectTo = ADMIN_ROLES.includes(data.user.role) ? "/admin" : from;
        navigate(redirectTo, { replace: true });
      } else {
        toast.error(error || "GitHub login failed");
      }
      window.removeEventListener("message", onMessage);
      popup.close();
    };

    window.addEventListener("message", onMessage);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
      <div className="space-y-4 mb-6">
        <div id="google-login-btn"></div>
        <button
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-50 transition"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className="w-5 h-5 mr-2"
          />
          Sign in with GitHub
        </button>
      </div>

      <div className="flex items-center mb-6">
        <hr className="flex-grow border-gray-200" />
        <span className="px-3 text-gray-400">OR</span>
        <hr className="flex-grow border-gray-200" />
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 w-full p-2 border rounded focus:ring-indigo-400"
            placeholder="you@example.com"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            type={showPwd ? "text" : "password"}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 w-full p-2 border rounded focus:ring-indigo-400 pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPwd(v => !v)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-indigo-600 text-sm"
          >
            {showPwd ? "Hide" : "Show"}
          </button>
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
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        <p className="text-center text-sm">
          New?{" "}
          <Link to="/register" className="font-medium text-indigo-600">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
