// // src/main.jsx
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./contexts/AuthContext.jsx";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { ToastProvider } from "./contexts/ToastContext.jsx";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <ThemeProvider>
//       <AuthProvider>
//         <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//         <ToastProvider>
//             <App />
//             </ToastProvider>
//         </GoogleOAuthProvider>
//         <Toaster position="top-right" />
//       </AuthProvider>
//     </ThemeProvider>
//   </StrictMode>
// );


import React, { StrictMode } from "react";
import { createRoot }      from "react-dom/client";
import { BrowserRouter }   from "react-router-dom";    // ← import here
import App                 from "./App.jsx";
import "./index.css";
import { Toaster }         from "react-hot-toast";
import { AuthProvider }    from "./contexts/AuthContext.jsx";
import { ThemeProvider }   from "./contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider }   from "./contexts/ToastContext.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>  {/* ← Wrap everything in Router */}
      <ThemeProvider>
        <AuthProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <ToastProvider>
              <App />
              <Toaster position="top-right" />
            </ToastProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

