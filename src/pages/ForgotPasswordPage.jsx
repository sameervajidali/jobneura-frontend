// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import AuthLayout from "../components/auth/AuthLayout";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: wire up your reset-password API call here
//     console.log("Send reset link to:", email);
//   };

//   return (
//     <AuthLayout>
//       {/* Logo / Title */}
//       <h1 className="text-2xl font-bold text-indigo-600 text-center">
//         JobNeura
//       </h1>

//       {/* Heading */}
//       <h2 className="text-lg font-extrabold text-gray-800 text-center">
//         Forgot Password?
//       </h2>
//       <p className="text-xs text-center text-gray-600">
//         Enter your email and we’ll send you a link to reset your password.
//       </p>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div>
//           <label className="block text-xs font-medium text-gray-700">
//             Email Address
//           </label>
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             className="
//               mt-1
//               w-full
//               px-3 py-2
//               border border-gray-300
//               rounded-lg
//               text-sm
//               focus:ring-indigo-400 focus:border-indigo-400
//               outline-none
//             "
//           />
//         </div>

//         <button
//           type="submit"
//           className="
//             w-full
//             py-2
//             bg-indigo-600
//             text-white
//             rounded-lg
//             text-sm font-medium
//             hover:bg-indigo-700
//             transition
//           "
//         >
//           Send Reset Link
//         </button>
//       </form>

//       {/* Footer Link */}
//       <p className="text-xs text-center text-gray-600">
//         Remembered?{" "}
//         <Link to="/login" className="text-indigo-600 font-medium hover:underline">
//           Log In
//         </Link>
//       </p>
//     </AuthLayout>
//   );
// }



import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Send reset link to:", email);
  };

  return (
    <AuthLayout>
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-indigo-600 text-center mb-1">
        JobNeura
      </h1>

      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
        Forgot Password?
      </h2>

      {/* Subtext */}
      <p className="text-sm text-center text-gray-500 mb-6">
        Enter your email and we’ll send you a link to reset your password.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          {/* Label */}
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email Address
          </label>

          {/* Input */}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="
              w-full
              px-4 py-2
              border border-gray-300
              rounded-lg
              text-sm
              focus:ring-2 focus:ring-indigo-400
              focus:border-transparent
              outline-none
              transition
            "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            py-2
            bg-gradient-to-r from-indigo-500 to-indigo-600
            text-white
            rounded-lg
            text-sm font-semibold
            hover:shadow-md hover:scale-[1.02]
            transition duration-200
          "
        >
          Send Reset Link
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-xs text-center text-gray-500 mt-4">
        Remembered?{" "}
        <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
          Log In
        </Link>
      </p>
    </AuthLayout>
  );
}
