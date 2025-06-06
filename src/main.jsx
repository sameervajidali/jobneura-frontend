// import React, { StrictMode } from "react";
// import { createRoot }      from "react-dom/client";
// import { BrowserRouter }   from "react-router-dom";    // ← import here
// import App                 from "./App.jsx";
// import "./index.css";
// import { Toaster }         from "react-hot-toast";
// import { AuthProvider }    from "./contexts/AuthContext.jsx";
// import { ThemeProvider }   from "./contexts/ThemeContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { ToastProvider } from "./contexts/ToastContext.jsx";
// import { NotificationProvider } from './contexts/NotificationContext';

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <BrowserRouter>  {/* ← Wrap everything in Router */}
//       <ThemeProvider>
//         <AuthProvider>
//           <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//             <ToastProvider>
//                <NotificationProvider>
//               <App />
//               </NotificationProvider>
//               <Toaster position="top-right" />
//             </ToastProvider>
//           </GoogleOAuthProvider>
//         </AuthProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   </StrictMode>
// );



import React, { StrictMode } from "react";
import { createRoot }      from "react-dom/client";
import { BrowserRouter }   from "react-router-dom";
import App                 from "./App.jsx";
import "./index.css";
import { Toaster }         from "react-hot-toast";
import { AuthProvider }    from "./contexts/AuthContext.jsx";
import { ThemeProvider }   from "./contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { NotificationProvider } from './contexts/NotificationContext';
import { HelmetProvider } from "react-helmet-async"; // ← Add this line

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <ToastProvider>
                <NotificationProvider>
                  <App />
                </NotificationProvider>
                <Toaster position="top-right" />
              </ToastProvider>
            </GoogleOAuthProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
