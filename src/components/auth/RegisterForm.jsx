// // src/components/auth/RegisterForm.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../../services/axios";
// import { toast } from "react-hot-toast";
// import { useAuth } from "../../contexts/AuthContext";
// import { ADMIN_ROLES } from "../../constants/roles";

// export default function RegisterForm() {
//   const [showPwd, setShowPwd] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   useEffect(() => {
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
//       document.getElementById("google-signup-btn"),
//       { theme: "outline", size: "large", width: "100%" }
//     );
//   };

//   const handleGoogleCallback = async (response) => {
//     try {
//       const { data } = await axios.post("/auth/google", {
//         idToken: response.credential,
//       });
//       login(data.user);
//       navigate(ADMIN_ROLES.includes(data.user.role) ? "/admin" : "/dashboard", {
//         replace: true,
//       });
//     } catch (err) {
//       toast.error("Google sign-up failed");
//     }
//   };

//   const handleGitHubSignup = () => {
//     const API_BASE =
//       import.meta.env.VITE_API_BASE_URL || window.location.origin;
//     const authWindow = window.open(
//       `${API_BASE}/api/auth/github`,
//       "_blank",
//       "width=600,height=700"
//     );

//     if (!authWindow) {
//       toast.error("Enable pop-ups to use GitHub sign-up");
//       return;
//     }

//     const handleMessage = async (event) => {
//       const expectedOrigin = new URL(API_BASE).origin;
//       if (event.origin !== expectedOrigin) return;

//       const { success, error } = event.data;

//       if (success) {
//         const { data } = await axios.get("/auth/me");
//         login(data?.user || data);
//         const dest = ADMIN_ROLES.includes(data.user?.role)
//           ? "/admin"
//           : "/dashboard";
//         navigate(dest, { replace: true });
//       } else if (error) {
//         toast.error("GitHub sign-up failed: " + error);
//       }

//       window.removeEventListener("message", handleMessage);
//     };

//     window.addEventListener("message", handleMessage);
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/auth/register", { name, email, password });
//       toast.success("Registration successful! Please check your email.");
//       navigate("/account-activation-info");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed.");
//     }
//   };

//   return (
//     <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
//       <h2 className="text-3xl font-extrabold text-center mb-6">
//         Create Account
//       </h2>

//       {/* Social Signup Buttons */}
//       <div className="flex flex-col gap-4 mb-6">
//         <div id="google-signup-btn"></div>

//         <button
//           onClick={handleGitHubSignup}
//           className="relative w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition"
//         >
//           {/* Left-aligned icon */}
//           <img
//             src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
//             alt="GitHub"
//             className="w-5 h-5 absolute left-4"
//           />

//           {/* Centered text */}
//           <span className="text-sm font-medium text-gray-700">
//             Sign up with GitHub
//           </span>
//         </button>
//       </div>

//       <div className="flex items-center my-4">
//         <hr className="flex-grow border-gray-300" />
//         <span className="px-4 text-gray-400">OR</span>
//         <hr className="flex-grow border-gray-300" />
//       </div>

//       <form className="space-y-5" onSubmit={handleRegister}>
//         <div>
//           <label className="block text-sm font-medium">Full Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Your name"
//             className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none"
//           />
//         </div>
//         <div className="relative">
//           <label className="block text-sm font-medium">Password</label>
//           <input
//             type={showPwd ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//             className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none pr-12"
//           />
//           <span
//             onClick={() => setShowPwd(!showPwd)}
//             className="absolute right-4 top-11 text-sm text-indigo-600 cursor-pointer"
//           >
//             {showPwd ? "Hide" : "Show"}
//           </span>
//         </div>
//         <p className="text-xs text-gray-500">
//           By signing up, you agree to our{" "}
//           <Link to="/terms" className="text-indigo-600">
//             Terms
//           </Link>{" "}
//           &{" "}
//           <Link to="/privacy" className="text-indigo-600">
//             Privacy
//           </Link>
//           .
//         </p>
//         <button
//           type="submit"
//           className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition"
//         >
//           Create Account
//         </button>
//         <p className="text-center text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-semibold">
//             Log In
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// ✅ Improved RegisterForm.jsx with
// - Inline form validation messages
// - Password strength indicator
// - Real-time email availability check
// - International SaaS-level UX

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { ADMIN_ROLES } from "../../constants/roles";

export default function RegisterForm() {
  const [showPwd, setShowPwd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error"

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = initializeGoogle;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (email.length > 5) {
      const timeout = setTimeout(async () => {
        try {
          const { data } = await axios.post("/auth/check-email", { email });
          setEmailExists(data.exists);
        } catch (err) {
          console.error("Email check failed");
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [email]);

  const initializeGoogle = () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("google-signup-btn"),
      { theme: "outline", size: "large", width: "100%" }
    );
  };

  const handleGoogleCallback = async (response) => {
    try {
      const { data } = await axios.post("/auth/google", {
        idToken: response.credential,
      });
      login(data.user);
      navigate(ADMIN_ROLES.includes(data.user.role) ? "/admin" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      toast.error("Google sign-up failed");
    }
  };

  const handleGitHubSignup = () => {
    const API_BASE =
      import.meta.env.VITE_API_BASE_URL || window.location.origin;
    const authWindow = window.open(
      `${API_BASE}/api/auth/github`,
      "_blank",
      "width=600,height=700"
    );
    if (!authWindow) return toast.error("Enable pop-ups to use GitHub sign-up");

    const handleMessage = async (event) => {
      const expectedOrigin = new URL(API_BASE).origin;
      if (event.origin !== expectedOrigin) return;

      const { success, error } = event.data;
      if (success) {
        const { data } = await axios.get("/auth/me");
        login(data?.user || data);
        const dest = ADMIN_ROLES.includes(data.user?.role)
          ? "/admin"
          : "/dashboard";
        navigate(dest, { replace: true });
      } else if (error) {
        toast.error("GitHub sign-up failed: " + error);
      }
      window.removeEventListener("message", handleMessage);
    };

    window.addEventListener("message", handleMessage);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormMessage(""); // Reset

    if (password.length < 8) {
      setFormMessage("Password must be at least 8 characters long.");
      setMessageType("error");
      return;
    }

    try {
      await axios.post("/auth/register", { name, email, password });
     
      navigate("/account-activation-info");
    } catch (err) {
      setFormMessage(err.response?.data?.message || "Registration failed.");
      setMessageType("error");
    }
  };

  const passwordStrength =
    password.length === 0
      ? ""
      : password.length < 6
      ? "Weak"
      : password.length < 10
      ? "Moderate"
      : "Strong";

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 className="text-3xl font-extrabold text-center mb-6">
        Create Account
      </h2>

      <div className="flex flex-col gap-4 mb-6">
        <div id="google-signup-btn"></div>
        <button
          onClick={handleGitHubSignup}
          type="button"
          className="relative w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className="w-5 h-5 absolute left-4"
          />
          <span className="text-sm font-medium text-gray-700">
            Sign up with GitHub
          </span>
        </button>
      </div>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-400">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <form className="space-y-5" onSubmit={handleRegister}>
        {formError && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded-md">
            {formError}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none ${
              emailExists ? "border-red-500" : ""
            }`}
            required
          />
          {emailExists === true && (
            <p className="text-sm text-red-500 mt-1">Email already exists.</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none pr-12"
            required
          />
          <span
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-4 top-11 text-sm text-indigo-600 cursor-pointer"
          >
            {showPwd ? "Hide" : "Show"}
          </span>
          {password && (
            <p className="text-xs mt-1 text-gray-500">
              Strength: {passwordStrength}
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500">
          By signing up, you agree to our
          <Link to="/terms" className="text-indigo-600 ml-1">
            Terms
          </Link>{" "}
          &
          <Link to="/privacy" className="text-indigo-600 ml-1">
            Privacy
          </Link>
          .
        </p>
        {formMessage && (
          <div
            className={`text-sm px-4 py-2 rounded-md ${
              messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {formMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || emailExists}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm">
          Already have an account?
          <Link to="/login" className="text-indigo-600 font-semibold ml-1">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
