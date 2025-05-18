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
//   const [emailExists, setEmailExists] = useState(null);
//   const [formError, setFormError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formMessage, setFormMessage] = useState("");
//   const [messageType, setMessageType] = useState(""); // "success" | "error"

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.onload = initializeGoogle;
//     document.body.appendChild(script);
//   }, []);

//   useEffect(() => {
//     if (email.length > 5) {
//       const timeout = setTimeout(async () => {
//         try {
//           const { data } = await axios.post("/auth/check-email", { email });
//           setEmailExists(data.exists);
//         } catch (err) {
//           console.error("Email check failed");
//         }
//       }, 500);
//       return () => clearTimeout(timeout);
//     }
//   }, [email]);

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
//     if (!authWindow) return toast.error("Enable pop-ups to use GitHub sign-up");

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
//     setFormMessage(""); // Reset

//     if (password.length < 8) {
//       setFormMessage("Password must be at least 8 characters long.");
//       setMessageType("error");
//       return;
//     }

//     try {
//       await axios.post("/auth/register", { name, email, password });

//       navigate("/account-activation-info");
//     } catch (err) {
//       setFormMessage(err.response?.data?.message || "Registration failed.");
//       setMessageType("error");
//     }
//   };

//   const passwordStrength =
//     password.length === 0
//       ? ""
//       : password.length < 6
//       ? "Weak"
//       : password.length < 10
//       ? "Moderate"
//       : "Strong";

//   return (
//     <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
//       <h2 className="text-3xl font-extrabold text-center mb-6">
//         Create Account
//       </h2>

//       <div className="flex flex-col gap-4 mb-6">
//         <div id="google-signup-btn"></div>
//         <button
//           onClick={handleGitHubSignup}
//           type="button"
//           className="relative w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition"
//         >
//           <img
//             src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
//             alt="GitHub"
//             className="w-5 h-5 absolute left-4"
//           />
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
//         {formError && (
//           <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded-md">
//             {formError}
//           </div>
//         )}

//         <div>
//           <label className="block text-sm font-medium">Full Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Your name"
//             className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             className={`mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none ${
//               emailExists ? "border-red-500" : ""
//             }`}
//             required
//           />
//           {emailExists === true && (
//             <p className="text-sm text-red-500 mt-1">Email already exists.</p>
//           )}
//         </div>

//         <div className="relative">
//           <label className="block text-sm font-medium">Password</label>
//           <input
//             type={showPwd ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//             className="mt-1 w-full p-2 border rounded-lg focus:ring-indigo-400 focus:outline-none pr-12"
//             required
//           />
//           <span
//             onClick={() => setShowPwd(!showPwd)}
//             className="absolute right-4 top-11 text-sm text-indigo-600 cursor-pointer"
//           >
//             {showPwd ? "Hide" : "Show"}
//           </span>
//           {password && (
//             <p className="text-xs mt-1 text-gray-500">
//               Strength: {passwordStrength}
//             </p>
//           )}
//         </div>

//         <p className="text-xs text-gray-500">
//           By signing up, you agree to our
//           <Link to="/terms" className="text-indigo-600 ml-1">
//             Terms
//           </Link>{" "}
//           &
//           <Link to="/privacy" className="text-indigo-600 ml-1">
//             Privacy
//           </Link>
//           .
//         </p>
//         {formMessage && (
//           <div
//             className={`text-sm px-4 py-2 rounded-md ${
//               messageType === "success"
//                 ? "bg-green-100 text-green-700 border border-green-300"
//                 : "bg-red-100 text-red-700 border border-red-300"
//             }`}
//           >
//             {formMessage}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading || emailExists}
//           className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
//         >
//           {loading ? "Creating..." : "Create Account"}
//         </button>

//         <p className="text-center text-sm">
//           Already have an account?
//           <Link to="/login" className="text-indigo-600 font-semibold ml-1">
//             Log In
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { ADMIN_ROLES } from "../../constants/roles";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (email.length > 5) {
      const timeout = setTimeout(async () => {
        try {
          const { data } = await axios.post("/auth/check-email", { email });
          setEmailExists(data.exists);
        } catch (err) {
          // do nothing
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [email]);

  const initializeGoogle = () => {
    if (!window.google?.accounts?.id) return;
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
      const { data } = await axios.post("/api/auth/google", {
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
    setLoading(true);

    if (password.length < 8) {
      setFormMessage("Password must be at least 8 characters long.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/auth/register", { name, email, password });
      setLoading(false);
      navigate("/account-activation-info");
    } catch (err) {
      setLoading(false);
      setFormMessage(err.response?.data?.message || "Registration failed.");
      setMessageType("error");
    }
  };

  // Password strength logic (bar)
  const getStrength = () => {
    if (password.length < 1) return { text: "", color: "" };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    if (score <= 1) return { text: "Weak", color: "bg-red-400" };
    if (score === 2) return { text: "Moderate", color: "bg-yellow-400" };
    if (score >= 3) return { text: "Strong", color: "bg-green-500" };
    return { text: "", color: "" };
  };
  const strength = getStrength();

  return (
    <motion.div
      className="bg-white bg-opacity-90 backdrop-blur-md p-5 md:p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: "36px", marginBottom: "36px" }}
    >
      {/* Icon and Heading */}
      <div className="flex flex-col items-center mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow-lg mb-2">
          <span className="text-white text-3xl font-bold">+</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-1 text-violet-700 tracking-tight">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500">
          Join <span className="font-semibold text-indigo-600">JobNeura</span>{" "}
          and supercharge your career!
        </p>
      </div>

      {/* Social Auth (side by side on md+) */}
      <div className="flex flex-col md:flex-row gap-3 mb-5 w-full">
        <div className="flex-1">
          <div id="google-signup-btn" className="w-full"></div>
        </div>
        <button
          onClick={handleGitHubSignup}
          type="button"
          className="flex-1 relative flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm bg-white gap-2"
        >
          <span className="flex items-center justify-center w-6 h-6 mr-2">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-6 h-6"
              style={{ display: "block" }}
            />
          </span>
          <span className="text-sm font-medium text-gray-700">
            Sign up with GitHub
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center my-2 mb-5">
        <hr className="flex-grow border-gray-200" />
        <span className="px-3 text-gray-400 text-xs">OR</span>
        <hr className="flex-grow border-gray-200" />
      </div>

      <form className="space-y-4" onSubmit={handleRegister} autoComplete="off">
        {formError && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded-md">
            {formError}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-1 w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-base"
            required
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-500">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`mt-1 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-base ${
              emailExists ? "border-red-500" : "border-slate-200"
            }`}
            required
            autoComplete="email"
          />
          {emailExists === true && (
            <p className="text-xs text-red-500 mt-1">Email already exists.</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500">
            Password
          </label>
          <input
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a secure password"
            className="mt-1 w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-base pr-12"
            required
            autoComplete="new-password"
          />
          <span
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-4 top-[38px] text-gray-400 cursor-pointer select-none"
            title={showPwd ? "Hide password" : "Show password"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowPwd(!showPwd);
            }}
          >
            {showPwd ? <FaEyeSlash size={19} /> : <FaEye size={19} />}
          </span>
          {/* Strength bar */}
          {strength.text && (
            <div className="mt-2 flex items-center gap-2">
              <div className="w-24 h-1 rounded bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded transition-all duration-200 ${strength.color}`}
                  style={{
                    width:
                      strength.text === "Weak"
                        ? "33%"
                        : strength.text === "Moderate"
                        ? "66%"
                        : "100%",
                  }}
                ></div>
              </div>
              <span
                className={`text-xs font-semibold ${
                  strength.color === "bg-green-500"
                    ? "text-green-600"
                    : strength.color === "bg-yellow-400"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {strength.text}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="rounded border-gray-300 focus:ring-indigo-400 mt-1"
          />
          <label htmlFor="terms" className="text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-indigo-600 underline">
              Terms
            </Link>{" "}
            &{" "}
            <Link to="/privacy" className="text-indigo-600 underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {formMessage && (
          <motion.div
            className={`text-sm px-4 py-2 rounded-md ${
              messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formMessage}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={loading || emailExists}
          whileTap={{ scale: 0.97 }}
          whileHover={!loading && !emailExists ? { scale: 1.02 } : {}}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all focus:ring-2 focus:ring-indigo-300 hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Account"
          )}
        </motion.button>

        <p className="text-center text-sm mt-2">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-600 font-semibold ml-1 hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>

      {/* Trust Badge */}
      <div className="mt-5 flex flex-col items-center text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <svg
            width="16"
            height="16"
            fill="currentColor"
            className="text-yellow-400"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
          Trusted by <span className="font-bold text-indigo-500">12,000+</span>{" "}
          users
        </span>
      </div>
    </motion.div>
  );
}
